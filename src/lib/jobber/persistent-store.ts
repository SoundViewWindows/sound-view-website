import { Redis } from "@upstash/redis";
import type { StoredJobberTokens } from "@/lib/jobber/tokens";

const TOKEN_KEY = "jobber:tokens";
const LOCK_KEY = "jobber:refresh-lock";
const PKCE_PREFIX = "jobber:pkce:";

export function jobberRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim() || process.env.KV_REST_API_URL?.trim() || "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || process.env.KV_REST_API_TOKEN?.trim() || "";
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function readStoredJobberTokens() {
  const redis = jobberRedis();
  if (!redis) return null;
  const stored = await redis.get<StoredJobberTokens>(TOKEN_KEY);
  if (!stored?.accessToken || !stored.refreshToken) return null;
  return stored;
}

export async function writeStoredJobberTokens(tokens: StoredJobberTokens) {
  const redis = jobberRedis();
  if (!redis) {
    throw new Error("Jobber token storage is not configured.");
  }
  await redis.set(TOKEN_KEY, tokens);
}

export async function refreshWithLock(refresh: () => Promise<StoredJobberTokens>) {
  const redis = jobberRedis();
  if (!redis) return refresh();

  const acquired = await redis.set(LOCK_KEY, "1", { nx: true, ex: 30 });
  if (!acquired) {
    for (let attempt = 0; attempt < 15; attempt += 1) {
      await delay(400);
      const stored = await readStoredJobberTokens();
      if (stored && stored.accessTokenExpiresAt > Date.now() + 30_000) return stored;
    }
    throw new Error("Jobber is refreshing its connection. Please submit the quote again.");
  }

  try {
    return await refresh();
  } finally {
    await redis.del(LOCK_KEY);
  }
}

export async function saveStoredPkce(state: string, verifier: string, ttlSeconds: number) {
  const redis = jobberRedis();
  if (!redis) return false;
  await redis.set(`${PKCE_PREFIX}${state}`, verifier, { ex: ttlSeconds });
  return true;
}

export async function takeStoredPkce(state: string) {
  const redis = jobberRedis();
  if (!redis) return undefined;
  const key = `${PKCE_PREFIX}${state}`;
  const verifier = await redis.get<string>(key);
  await redis.del(key);
  return verifier || null;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
