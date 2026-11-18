import { jobberRedis } from "./persistent-store";

export type VisitStatus = "claiming" | "mutating" | "request_saved" | "scheduled" | "lookup_required" | "not_found";

export type VisitRecord = {
  kind: "visit";
  status: VisitStatus;
  token: string;
  visitHash: string;
  referenceId: string;
  email: string;
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  date: string;
  hour: number;
  requestId: string | null;
  jobberWebUri: string | null;
  jobberCallStartedAt: number | null;
  updatedAt: number;
};

export type SlotRecord = {
  kind: "slot";
  status: "reserving" | "scheduled";
  token: string;
  visitHash: string;
  jobberCallStartedAt: number | null;
  updatedAt: number;
};

export type LockRecord = VisitRecord | SlotRecord;

export type LockStore = {
  get(key: string): Promise<LockRecord | null>;
  claim(key: string, record: LockRecord, ttlSeconds: number): Promise<boolean>;
  compare(key: string, token: string, allowed: string[], next: LockRecord, ttlSeconds: number): Promise<boolean>;
  comparePair(
    firstKey: string,
    firstToken: string,
    firstAllowed: string[],
    firstNext: LockRecord,
    secondKey: string,
    secondToken: string,
    secondAllowed: string[],
    secondNext: LockRecord,
    ttlSeconds: number,
  ): Promise<boolean>;
  claimSlotIfClear(input: {
    slotKey: string;
    originalVisitKey: string;
    now: number;
    protectionEnds: number;
    next: SlotRecord;
    ttlSeconds: number;
  }): Promise<boolean>;
  claimNotification(key: string, ttlSeconds: number): Promise<boolean>;
};

const CLAIM_SCRIPT = `
local ok = redis.call('SET', KEYS[1], ARGV[1], 'NX', 'EX', ARGV[2])
if ok then return 1 else return 0 end
`;

const NOTIFY_SCRIPT = `
local ok = redis.call('SET', KEYS[1], '1', 'NX', 'EX', ARGV[1])
if ok then return 1 else return 0 end
`;

const COMPARE_PAIR_SCRIPT = `
local firstRaw = redis.call('GET', KEYS[1])
local secondRaw = redis.call('GET', KEYS[2])
if not firstRaw or not secondRaw then return 0 end
local first = cjson.decode(firstRaw)
local second = cjson.decode(secondRaw)
if first.token ~= ARGV[1] or second.token ~= ARGV[4] then return 0 end
local firstAllowed = cjson.decode(ARGV[2])
local secondAllowed = cjson.decode(ARGV[5])
local firstMatch = false
local secondMatch = false
for _, status in ipairs(firstAllowed) do
  if first.status == status then firstMatch = true end
end
for _, status in ipairs(secondAllowed) do
  if second.status == status then secondMatch = true end
end
if not firstMatch or not secondMatch then return 0 end
redis.call('SET', KEYS[1], ARGV[3], 'EX', ARGV[7])
redis.call('SET', KEYS[2], ARGV[6], 'EX', ARGV[7])
return 1
`;

const COMPARE_SCRIPT = `
local raw = redis.call('GET', KEYS[1])
if not raw then return 0 end
local current = cjson.decode(raw)
if current.token ~= ARGV[1] then return 0 end
local allowed = cjson.decode(ARGV[2])
local match = false
for _, status in ipairs(allowed) do
  if current.status == status then match = true end
end
if not match then return 0 end
redis.call('SET', KEYS[1], ARGV[3], 'EX', ARGV[4])
return 1
`;

const CLAIM_SLOT_SCRIPT = `
local raw = redis.call('GET', KEYS[1])
local nextSlot = ARGV[3]
if not raw then
  redis.call('SET', KEYS[1], nextSlot, 'EX', ARGV[4])
  return 1
end
local slot = cjson.decode(raw)
local nextRecord = cjson.decode(nextSlot)
if slot.visitHash == nextRecord.visitHash then return 1 end
if slot.jobberCallStartedAt then return 0 end
local hold = (tonumber(slot.updatedAt) or 0) + 20000
if slot.status == 'scheduled' or tonumber(ARGV[1]) < hold then return 0 end
local visitRaw = redis.call('GET', KEYS[2])
if not visitRaw then return 0 end
local visit = cjson.decode(visitRaw)
if visit.status ~= 'request_saved' and visit.status ~= 'not_found' then return 0 end
redis.call('SET', KEYS[1], nextSlot, 'EX', ARGV[4])
return 1
`;

function readRecord(value: unknown): LockRecord | null {
  if (!value) return null;
  const parsed = typeof value === "string" ? JSON.parse(value) : value;
  if (!parsed || typeof parsed !== "object" || !("kind" in parsed)) return null;
  return parsed as LockRecord;
}

export function createMemoryLockStore(): LockStore {
  const records = new Map<string, string>();
  return {
    async get(key) {
      return readRecord(records.get(key));
    },
    async claim(key, record) {
      if (records.has(key)) return false;
      records.set(key, JSON.stringify(record));
      return true;
    },
    async compare(key, token, allowed, next) {
      const current = readRecord(records.get(key));
      if (!current || current.token !== token || !allowed.includes(current.status)) return false;
      records.set(key, JSON.stringify(next));
      return true;
    },
    async comparePair(firstKey, firstToken, firstAllowed, firstNext, secondKey, secondToken, secondAllowed, secondNext) {
      const first = readRecord(records.get(firstKey));
      const second = readRecord(records.get(secondKey));
      if (!first || first.token !== firstToken || !firstAllowed.includes(first.status)) return false;
      if (!second || second.token !== secondToken || !secondAllowed.includes(second.status)) return false;
      records.set(firstKey, JSON.stringify(firstNext));
      records.set(secondKey, JSON.stringify(secondNext));
      return true;
    },
    async claimSlotIfClear(input) {
      const current = readRecord(records.get(input.slotKey)) as SlotRecord | null;
      if (!current) {
        records.set(input.slotKey, JSON.stringify(input.next));
        return true;
      }
      if (current.visitHash === input.next.visitHash) return true;
      if (current.jobberCallStartedAt || current.status === "scheduled" || input.now < current.updatedAt + 20_000) return false;
      const visit = readRecord(records.get(input.originalVisitKey));
      if (!visit || (visit.status !== "request_saved" && visit.status !== "not_found")) return false;
      records.set(input.slotKey, JSON.stringify(input.next));
      return true;
    },
    async claimNotification(key) {
      const notifyKey = `${key}:notify`;
      if (records.has(notifyKey)) return false;
      records.set(notifyKey, "1");
      return true;
    },
  };
}

type RedisLike = {
  get: (key: string) => Promise<unknown>;
  eval: (script: string, keys: string[], args: string[]) => Promise<unknown>;
};

export function createRedisLockStore(redis: RedisLike): LockStore {
  return {
    async get(key) {
      return readRecord(await redis.get(key));
    },
    async claim(key, record, ttlSeconds) {
      const result = await redis.eval(CLAIM_SCRIPT, [key], [JSON.stringify(record), String(ttlSeconds)]);
      return Number(result) === 1;
    },
    async compare(key, token, allowed, next, ttlSeconds) {
      const result = await redis.eval(COMPARE_SCRIPT, [key], [
        token,
        JSON.stringify(allowed),
        JSON.stringify(next),
        String(ttlSeconds),
      ]);
      return Number(result) === 1;
    },
    async comparePair(firstKey, firstToken, firstAllowed, firstNext, secondKey, secondToken, secondAllowed, secondNext, ttlSeconds) {
      const result = await redis.eval(COMPARE_PAIR_SCRIPT, [firstKey, secondKey], [
        firstToken,
        JSON.stringify(firstAllowed),
        JSON.stringify(firstNext),
        secondToken,
        JSON.stringify(secondAllowed),
        JSON.stringify(secondNext),
        String(ttlSeconds),
      ]);
      return Number(result) === 1;
    },
    async claimSlotIfClear(input) {
      const result = await redis.eval(CLAIM_SLOT_SCRIPT, [input.slotKey, input.originalVisitKey], [
        String(input.now),
        String(input.protectionEnds),
        JSON.stringify(input.next),
        String(input.ttlSeconds),
      ]);
      return Number(result) === 1;
    },
    async claimNotification(key, ttlSeconds) {
      const result = await redis.eval(NOTIFY_SCRIPT, [`${key}:notify`], [String(ttlSeconds)]);
      return Number(result) === 1;
    },
  };
}

export function appointmentLockStore() {
  const redis = jobberRedis();
  if (!redis) return null;
  return createRedisLockStore(redis as unknown as RedisLike);
}
