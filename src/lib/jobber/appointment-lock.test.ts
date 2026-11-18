import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "redis";
import { RedisMemoryServer } from "redis-memory-server";
import { createRedisLockStore, type SlotRecord, type VisitRecord } from "./appointment-lock.ts";

function visit(token: string, status: VisitRecord["status"]): VisitRecord {
  return {
    kind: "visit",
    status,
    token,
    visitHash: "visit-hash",
    referenceId: "SV-TEST1",
    email: "ada@example.com",
    street: "1 main st",
    unit: "",
    city: "seattle",
    state: "WA",
    zip: "98125",
    date: "2026-12-16",
    hour: 10,
    requestId: null,
    jobberWebUri: null,
    jobberCallStartedAt: null,
    updatedAt: 1,
  };
}

function slot(token: string, visitHash: string, started: number | null): SlotRecord {
  return {
    kind: "slot",
    status: "reserving",
    token,
    visitHash,
    jobberCallStartedAt: started,
    updatedAt: 1,
  };
}

async function redisStore() {
  const server = new RedisMemoryServer();
  const host = await server.getHost();
  const port = await server.getPort();
  const client = createClient({ socket: { host, port } });
  await client.connect();
  const store = createRedisLockStore({
    get: (key) => client.get(key),
    eval: (script, keys, args) => client.eval(script, { keys, arguments: args }),
  });
  return {
    store,
    async close() {
      await client.quit();
      await server.stop();
    },
  };
}

test("redis scripts keep one owner and reject a stale token", async () => {
  const { store, close } = await redisStore();
  try {
    const original = visit("token-a", "claiming");
    const claims = await Promise.all([
      store.claim("appointment:visit:visit-hash", original, 600),
      store.claim("appointment:visit:visit-hash", visit("token-b", "claiming"), 600),
    ]);
    assert.equal(claims.filter(Boolean).length, 1);
    const saved = await store.get("appointment:visit:visit-hash");
    assert.equal(saved?.kind === "visit" ? saved.token : "", claims[0] ? "token-a" : "token-b");

    const current = saved as VisitRecord;
    const newer = visit("token-c", "mutating");
    const moved = await store.compare("appointment:visit:visit-hash", current.token, ["claiming"], newer, 600);
    assert.equal(moved, true);
    const rejectedStatus = await store.compare("appointment:visit:visit-hash", "token-c", ["scheduled"], visit("token-d", "scheduled"), 600);
    assert.equal(rejectedStatus, false);
    const stale = await store.compare("appointment:visit:visit-hash", current.token, ["mutating"], visit("token-old", "scheduled"), 600);
    assert.equal(stale, false);
    const after = await store.get("appointment:visit:visit-hash");
    assert.equal(after?.kind === "visit" ? after.token : "", "token-c");
    assert.equal(after?.kind === "visit" ? after.status : "", "mutating");
  } finally {
    await close();
  }
});

test("redis pair and slot scripts do not let an old owner replace a newer one", async () => {
  const { store, close } = await redisStore();
  try {
    const firstVisit = visit("visit-1", "claiming");
    const firstSlot = slot("slot-1", "visit-hash", null);
    assert.equal(await store.claim("appointment:visit:visit-hash", firstVisit, 600), true);
    assert.equal(await store.claim("appointment:slot:2026-12-16:10", firstSlot, 600), true);
    const nextVisit = visit("visit-2", "mutating");
    const nextSlot = slot("slot-2", "visit-hash", 50);
    assert.equal(
      await store.comparePair(
        "appointment:visit:visit-hash",
        "visit-1",
        ["claiming"],
        nextVisit,
        "appointment:slot:2026-12-16:10",
        "slot-1",
        ["reserving"],
        nextSlot,
        600,
      ),
      true,
    );
    const beforeVisit = JSON.stringify(await store.get("appointment:visit:visit-hash"));
    const beforeSlot = JSON.stringify(await store.get("appointment:slot:2026-12-16:10"));
    assert.equal(
      await store.comparePair(
        "appointment:visit:visit-hash",
        "visit-1",
        ["mutating"],
        visit("visit-3", "scheduled"),
        "appointment:slot:2026-12-16:10",
        "slot-1",
        ["reserving"],
        slot("slot-3", "other-visit", null),
        600,
      ),
      false,
    );
    assert.equal(JSON.stringify(await store.get("appointment:visit:visit-hash")), beforeVisit);
    assert.equal(JSON.stringify(await store.get("appointment:slot:2026-12-16:10")), beforeSlot);

    const otherSlot = slot("slot-other", "other-visit", null);
    assert.equal(
      await store.claimSlotIfClear({
        slotKey: "appointment:slot:2026-12-16:10",
        originalVisitKey: "appointment:visit:visit-hash",
        now: 1_000_000,
        protectionEnds: 0,
        next: otherSlot,
        ttlSeconds: 600,
      }),
      false,
    );
    const held = await store.get("appointment:slot:2026-12-16:10");
    assert.equal(held?.kind === "slot" ? held.visitHash : "", "visit-hash");
    assert.equal(held?.kind === "slot" ? held.token : "", "slot-2");

    const firstNotice = await store.claimNotification("appointment:visit:visit-hash", 600);
    const secondNotice = await store.claimNotification("appointment:visit:visit-hash", 600);
    assert.equal(firstNotice, true);
    assert.equal(secondNotice, false);
  } finally {
    await close();
  }
});
