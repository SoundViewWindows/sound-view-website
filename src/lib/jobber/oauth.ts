import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { jobberAuthorizeUrl, jobberConfig, jobberTokenUrl, missingJobberCredentials } from "@/lib/jobber/config";

export type JobberTokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
};

export function createPkcePair() {
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const state = randomBytes(16).toString("base64url");
  return { verifier, challenge, state };
}

export function authorizationUrl(challenge: string, state: string) {
  const config = jobberConfig();
  const missing = missingJobberCredentials();
  if (missing.length > 0) {
    throw new Error(`Missing ${missing.join(", ")}`);
  }
  const url = new URL(jobberAuthorizeUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  return url;
}

export function statesMatch(expected: string, received: string) {
  const left = Buffer.from(expected);
  const right = Buffer.from(received);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function exchangeAuthorizationCode(code: string, verifier: string) {
  return requestToken({
    grant_type: "authorization_code",
    code,
    redirect_uri: jobberConfig().redirectUri,
    code_verifier: verifier,
  });
}

export async function refreshAccessToken(refreshToken: string) {
  return requestToken({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
}

async function requestToken(fields: Record<string, string>) {
  const config = jobberConfig();
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    ...fields,
  });
  const response = await fetch(jobberTokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as
    | (JobberTokenResponse & { error?: string; error_description?: string })
    | null;
  if (!response.ok || !payload?.access_token) {
    const detail = payload?.error_description || payload?.error || "Jobber did not return an access token.";
    throw new Error(detail);
  }
  return payload;
}
