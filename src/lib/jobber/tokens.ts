import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { jobberRedis, readStoredJobberTokens, writeStoredJobberTokens } from "@/lib/jobber/persistent-store";

export type StoredJobberTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accountId?: string;
  accountName?: string;
};

const tokenPath = path.join(process.cwd(), ".data", "jobber-tokens.json");

export async function readJobberTokens(): Promise<StoredJobberTokens | null> {
  if (jobberRedis()) return readStoredJobberTokens();
  return readTokenFile();
}

export async function writeJobberTokens(tokens: StoredJobberTokens) {
  if (jobberRedis()) {
    await writeStoredJobberTokens(tokens);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("Jobber token storage is not configured.");
  }
  await writeTokenFile(tokens);
}

async function readTokenFile(): Promise<StoredJobberTokens | null> {
  try {
    const raw = await readFile(tokenPath, "utf8");
    const parsed = JSON.parse(raw) as StoredJobberTokens;
    if (!parsed.refreshToken || !parsed.accessToken) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function writeTokenFile(tokens: StoredJobberTokens) {
  await mkdir(path.dirname(tokenPath), { recursive: true });
  const temporary = `${tokenPath}.tmp`;
  await writeFile(temporary, JSON.stringify(tokens), { mode: 0o600 });
  await rename(temporary, tokenPath);
}
