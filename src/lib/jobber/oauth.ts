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

export class JobberTokenExchangeError extends Error {
  readonly status: number;
  readonly sanitizedBody: string;
  readonly redirectUri: string;
  readonly verifierLength: number;

  constructor(status: number, sanitizedBody: string, redirectUri: string, verifierLength: number) {
    super(`Jobber token exchange failed with HTTP ${status}.`);
    this.name = "JobberTokenExchangeError";
    this.status = status;
    this.sanitizedBody = sanitizedBody;
    this.redirectUri = redirectUri;
    this.verifierLength = verifierLength;
  }
}

export async function exchangeAuthorizationCode(code: string, verifier: string) {
  return requestToken(
    {
      grant_type: "authorization_code",
      code,
      redirect_uri: jobberConfig().redirectUri,
      code_verifier: verifier,
    },
    { verifierLength: verifier.length },
  );
}

export async function refreshAccessToken(refreshToken: string) {
  return requestToken({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
}

const REDACTED_RESPONSE_KEYS = new Set([
  "access_token",
  "refresh_token",
  "client_secret",
  "code",
  "code_verifier",
  "id_token",
]);

async function requestToken(fields: Record<string, string>, details: { verifierLength: number } = { verifierLength: 0 }) {
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
  const rawBody = await response.text();
  const secrets = [config.clientSecret, fields.code, fields.code_verifier, fields.refresh_token].filter(
    (value): value is string => Boolean(value),
  );
  const sanitizedBody = sanitizeTokenResponse(rawBody, secrets);
  const payload = parseTokenPayload(rawBody);
  if (!response.ok || !payload?.access_token) {
    throw new JobberTokenExchangeError(response.status, sanitizedBody, config.redirectUri, details.verifierLength);
  }
  return payload;
}

function parseTokenPayload(rawBody: string) {
  try {
    return JSON.parse(rawBody) as JobberTokenResponse;
  } catch {
    return null;
  }
}

function sanitizeTokenResponse(rawBody: string, secrets: string[]) {
  const trimmed = rawBody.trim();
  if (!trimmed) return "Jobber returned an empty response.";

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    parsed = null;
  }

  const visible =
    parsed && typeof parsed === "object"
      ? JSON.stringify(redactTokenFields(parsed), null, 2)
      : trimmed.slice(0, 2000);

  return secrets.reduce((text, secret) => (secret.length >= 8 ? text.split(secret).join("[redacted]") : text), visible);
}

function redactTokenFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => redactTokenFields(item));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      REDACTED_RESPONSE_KEYS.has(key) ? "[redacted]" : redactTokenFields(entry),
    ]),
  );
}
