import { jobberConfig, jobberGraphqlUrl } from "@/lib/jobber/config";
import { refreshAccessToken } from "@/lib/jobber/oauth";
import { readJobberTokens, writeJobberTokens, type StoredJobberTokens } from "@/lib/jobber/tokens";

type GraphQlError = { message?: string };
type GraphQlResult<T> = { data?: T; errors?: GraphQlError[] };

let refreshInFlight: Promise<StoredJobberTokens> | null = null;

export async function jobberGraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const first = await getValidTokens();
  const firstResult = await postGraphQl<T>(first.accessToken, query, variables);
  if (!isInvalidToken(firstResult.status)) {
    return unwrap<T>(firstResult.payload);
  }
  const refreshed = await forceRefresh();
  const secondResult = await postGraphQl<T>(refreshed.accessToken, query, variables);
  return unwrap<T>(secondResult.payload);
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
    refreshInFlight = rotate(refreshToken).finally(() => {
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

function unwrap<T>(payload: GraphQlResult<T> | null): T {
  if (!payload) {
    throw new Error("Jobber returned an empty response.");
  }
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).filter(Boolean).join(" ") || "Jobber rejected the request.");
  }
  if (!payload.data) {
    throw new Error("Jobber did not return any data.");
  }
  return payload.data;
}

export async function rememberAccount(accountId: string, accountName: string) {
  const current = await readJobberTokens();
  if (!current) return;
  await writeJobberTokens({ ...current, accountId, accountName });
}
