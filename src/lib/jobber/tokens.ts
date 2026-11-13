import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type StoredJobberTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accountId?: string;
  accountName?: string;
};

const tokenPath = path.join(process.cwd(), ".data", "jobber-tokens.json");

export async function readJobberTokens(): Promise<StoredJobberTokens | null> {
  try {
    const raw = await readFile(tokenPath, "utf8");
    const parsed = JSON.parse(raw) as StoredJobberTokens;
    if (!parsed.refreshToken || !parsed.accessToken) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function writeJobberTokens(tokens: StoredJobberTokens) {
  await mkdir(path.dirname(tokenPath), { recursive: true });
  const temporary = `${tokenPath}.tmp`;
  await writeFile(temporary, JSON.stringify(tokens), { mode: 0o600 });
  await rename(temporary, tokenPath);
}
