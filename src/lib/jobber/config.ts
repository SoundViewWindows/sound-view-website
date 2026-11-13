const DEFAULT_GRAPHQL_VERSION = "2025-04-16";
const DEFAULT_REDIRECT_URI = "http://localhost:3000/api/jobber/oauth/callback";

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
  };
}

export function missingJobberCredentials() {
  const config = jobberConfig();
  const missing: string[] = [];
  if (!config.clientId) missing.push("JOBBER_CLIENT_ID");
  if (!config.clientSecret) missing.push("JOBBER_CLIENT_SECRET");
  return missing;
}

