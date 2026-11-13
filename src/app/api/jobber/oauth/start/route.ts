import { NextResponse } from "next/server";
import { createPkcePair, authorizationUrl } from "@/lib/jobber/oauth";
import { savePkce } from "@/lib/jobber/pkce-store";
import { jobberConfig, missingJobberCredentials } from "@/lib/jobber/config";

export async function GET() {
  const missing = missingJobberCredentials();
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, message: `Add ${missing.join(" and ")} to the local environment before connecting Jobber.` },
      { status: 400 },
    );
  }

  const pkce = createPkcePair();
  await savePkce(pkce.state, pkce.verifier);
  const response = NextResponse.redirect(authorizationUrl(pkce.challenge, pkce.state));
  response.cookies.set("jobber_oauth", `${pkce.state}.${pkce.verifier}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: jobberConfig().redirectUri.startsWith("https://"),
    path: "/",
    maxAge: 600,
  });
  return response;
}
