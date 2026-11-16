import { jobberConfig, jobberGraphqlUrl } from "@/lib/jobber/config";
import { refreshAccessToken } from "@/lib/jobber/oauth";
import { refreshWithLock } from "@/lib/jobber/persistent-store";
import { readJobberTokens, writeJobberTokens, type StoredJobberTokens } from "@/lib/jobber/tokens";

type GraphQlError = { message?: string };
type GraphQlResult<T> = { data?: T; errors?: GraphQlError[] };

let refreshInFlight: Promise<StoredJobberTokens> | null = null;

export async function jobberGraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const result = await jobberGraphqlDetailed<T>(query, variables);
  if (result.errors.length > 0 || !result.data) {
    throw new Error(result.errors.join(" ") || "Jobber did not return any data.");
  }
  return result.data;
}

export async function jobberGraphqlDetailed<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<{ data: T | null; errors: string[] }> {
  const first = await getValidTokens();
  const firstResult = await postGraphQl<T>(first.accessToken, query, variables);
  const result = isInvalidToken(firstResult.status)
    ? await postGraphQl<T>((await forceRefresh()).accessToken, query, variables)
    : firstResult;
  return unwrapDetailed<T>(result.payload);
}

async function getValidTokens() {
  const stored = await readJobberTokens();
  const seeded = stored ?? (await seedFromEnv());
  if (!seeded) {
    throw new Error("Jobber is not connected yet.");
  }
  if (seeded.accessToken && seeded.accessTokenExpiresAt > Date.now() + 60_000) {
    return seeded;
  }
  return forceRefresh();
}

async function seedFromEnv(): Promise<StoredJobberTokens | null> {
  const refreshToken = jobberConfig().refreshToken;
  if (!refreshToken) return null;
  return forceRefresh(refreshToken);
}

async function forceRefresh(refreshToken?: string) {
  if (!refreshInFlight) {
    refreshInFlight = refreshWithLock(() => rotate(refreshToken)).finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

async function rotate(explicitRefresh?: string) {
  const current = await readJobberTokens();
  const refreshToken = explicitRefresh || current?.refreshToken || jobberConfig().refreshToken;
  if (!refreshToken) {
    throw new Error("Jobber is not connected yet.");
  }
  const next = await refreshAccessToken(refreshToken);
  const stored: StoredJobberTokens = {
    accessToken: next.access_token,
    refreshToken: next.refresh_token || refreshToken,
    accessTokenExpiresAt: Date.now() + next.expires_in * 1000,
    accountId: current?.accountId,
    accountName: current?.accountName,
  };
  await writeJobberTokens(stored);
  return stored;
}

async function postGraphQl<T>(accessToken: string, query: string, variables?: Record<string, unknown>) {
  const response = await fetch(jobberGraphqlUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-JOBBER-GRAPHQL-VERSION": jobberConfig().graphqlVersion,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as GraphQlResult<T> | null;
  return { status: response.status, payload };
}

function isInvalidToken(status: number) {
  return status === 401;
}

function unwrapDetailed<T>(payload: GraphQlResult<T> | null): { data: T | null; errors: string[] } {
  if (!payload) {
    throw new Error("Jobber returned an empty response.");
  }
  const errors = payload.errors?.map((error) => error.message).filter((message): message is string => Boolean(message)) ?? [];
  return { data: payload.data ?? null, errors };
}

export async function rememberAccount(accountId: string, accountName: string) {
  const current = await readJobberTokens();
  if (!current) return;
  await writeJobberTokens({ ...current, accountId, accountName });
}
