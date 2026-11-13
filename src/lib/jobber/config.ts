const DEFAULT_GRAPHQL_VERSION = "2025-04-16";
const DEFAULT_REDIRECT_URI = "http://localhost:3000/api/jobber/oauth/callback";
const DEFAULT_REQUEST_TITLE = "TEST - Website Quote Integration";
const DEFAULT_NOTIFY_TO = ["dan@soundviewseattle.com", "matthew@soundviewseattle.com"];

export const jobberGraphqlUrl = "https://api.getjobber.com/api/graphql";
export const jobberAuthorizeUrl = "https://api.getjobber.com/api/oauth/authorize";
export const jobberTokenUrl = "https://api.getjobber.com/api/oauth/token";

export function jobberConfig() {
  return {
    clientId: process.env.JOBBER_CLIENT_ID?.trim() ?? "",
    clientSecret: process.env.JOBBER_CLIENT_SECRET?.trim() ?? "",
    redirectUri: process.env.JOBBER_REDIRECT_URI?.trim() || DEFAULT_REDIRECT_URI,
    graphqlVersion: process.env.JOBBER_GRAPHQL_VERSION?.trim() || DEFAULT_GRAPHQL_VERSION,
    refreshToken: process.env.JOBBER_REFRESH_TOKEN?.trim() ?? "",
    writesEnabled: process.env.JOBBER_ALLOW_WRITES === "true",
    requestTitle: process.env.JOBBER_REQUEST_TITLE?.trim() || DEFAULT_REQUEST_TITLE,
  };
}

export function missingJobberCredentials() {
  const config = jobberConfig();
  const missing: string[] = [];
  if (!config.clientId) missing.push("JOBBER_CLIENT_ID");
  if (!config.clientSecret) missing.push("JOBBER_CLIENT_SECRET");
  return missing;
}

export function quoteNotifyConfig() {
  const from = process.env.QUOTE_NOTIFY_FROM?.trim() ?? "";
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const rawTo = process.env.QUOTE_NOTIFY_TO?.trim();
  const to = (rawTo ? rawTo.split(",") : DEFAULT_NOTIFY_TO).map((item) => item.trim()).filter(Boolean);
  return { from, apiKey, to };
}

export function missingQuoteNotifySettings() {
  const notify = quoteNotifyConfig();
  const missing: string[] = [];
  if (!notify.apiKey) missing.push("RESEND_API_KEY");
  if (!notify.from) missing.push("QUOTE_NOTIFY_FROM");
  if (notify.to.length < 2) missing.push("QUOTE_NOTIFY_TO");
  return missing;
}
