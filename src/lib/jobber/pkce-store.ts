import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

type PkceEntry = {
  verifier: string;
  expiresAt: number;
};

const pkcePath = path.join(process.cwd(), ".data", "jobber-pkce.json");
const tenMinutes = 60 * 60 * 1000;

export async function savePkce(state: string, verifier: string) {
  const entries = await readEntries();
  entries[state] = { verifier, expiresAt: Date.now() + tenMinutes };
  await writeEntries(prune(entries));
}

export async function takePkce(state: string) {
  const entries = await readEntries();
  const entry = entries[state];
  delete entries[state];
  await writeEntries(prune(entries));
  if (!entry || entry.expiresAt < Date.now()) return null;
  return entry.verifier;
}

async function readEntries(): Promise<Record<string, PkceEntry>> {
  try {
    return JSON.parse(await readFile(pkcePath, "utf8")) as Record<string, PkceEntry>;
  } catch {
    return {};
  }
}

async function writeEntries(entries: Record<string, PkceEntry>) {
  await mkdir(path.dirname(pkcePath), { recursive: true });
  const temporary = `${pkcePath}.tmp`;
  await writeFile(temporary, JSON.stringify(entries), { mode: 0o600 });
  await rename(temporary, pkcePath);
}

function prune(entries: Record<string, PkceEntry>) {
  const now = Date.now();
  return Object.fromEntries(Object.entries(entries).filter(([, entry]) => entry.expiresAt > now));
}
