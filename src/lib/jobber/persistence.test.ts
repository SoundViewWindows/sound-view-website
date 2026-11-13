import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { PRODUCTION_REDIRECT_URI, jobberConfig } from "./config.ts";

function source(file: string) {
  return readFileSync(file, "utf8");
}

test("production OAuth callback uses the deployed website", () => {
  const previous = process.env.VERCEL_ENV;
  const previousRedirect = process.env.JOBBER_REDIRECT_URI;
  delete process.env.JOBBER_REDIRECT_URI;
  process.env.VERCEL_ENV = "production";
  try {
    assert.equal(PRODUCTION_REDIRECT_URI, "https://sound-view-website.vercel.app/api/jobber/oauth/callback");
    assert.equal(jobberConfig().redirectUri, PRODUCTION_REDIRECT_URI);
  } finally {
    if (previous === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previous;
    if (previousRedirect === undefined) delete process.env.JOBBER_REDIRECT_URI;
    else process.env.JOBBER_REDIRECT_URI = previousRedirect;
  }
});

test("tokens and refresh lock use Redis instead of the laptop file", () => {
  const tokens = source("src/lib/jobber/tokens.ts");
  const store = source("src/lib/jobber/persistent-store.ts");
  const graphql = source("src/lib/jobber/graphql.ts");
  const pkce = source("src/lib/jobber/pkce-store.ts");
  assert.match(tokens, /readStoredJobberTokens/);
  assert.match(tokens, /writeStoredJobberTokens/);
  assert.match(tokens, /Jobber token storage is not configured/);
  assert.match(store, /KV_REST_API_URL/);
  assert.match(store, /KV_REST_API_TOKEN/);
  assert.match(store, /jobber:tokens/);
  assert.match(store, /jobber:refresh-lock/);
  assert.match(store, /refreshWithLock/);
  assert.match(graphql, /refreshWithLock/);
  assert.match(graphql, /writeJobberTokens\(stored\)/);
  assert.match(pkce, /saveStoredPkce/);
  assert.match(pkce, /takeStoredPkce/);
});
