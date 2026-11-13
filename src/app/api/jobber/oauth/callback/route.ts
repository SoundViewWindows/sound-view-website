import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readJobberAccount } from "@/lib/jobber/account";
import { exchangeAuthorizationCode, statesMatch } from "@/lib/jobber/oauth";
import { writeJobberTokens } from "@/lib/jobber/tokens";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") ?? "";
  const state = url.searchParams.get("state") ?? "";
  const cookieStore = await cookies();
  const stored = cookieStore.get("jobber_oauth")?.value ?? "";
  const separator = stored.indexOf(".");
  const expectedState = separator >= 0 ? stored.slice(0, separator) : "";
  const verifier = separator >= 0 ? stored.slice(separator + 1) : "";

  if (!code || !state || !expectedState || !verifier || !statesMatch(expectedState, state)) {
    return html("Jobber did not finish connecting. Start again from the local connect link.", 400);
  }

  try {
    const tokens = await exchangeAuthorizationCode(code, verifier);
    if (!tokens.refresh_token) {
      return html("Jobber returned an access token without a refresh token. Connect again.", 502);
    }
    await writeJobberTokens({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      accessTokenExpiresAt: Date.now() + tokens.expires_in * 1000,
    });
    const account = await readJobberAccount();
    const response = html(
      `Jobber is connected to ${account.name}. No quote request was created. You can close this tab.`,
      200,
    );
    response.cookies.set("jobber_oauth", "", { httpOnly: true, path: "/", maxAge: 0 });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Jobber could not be connected.";
    return html(message, 502);
  }
}

function html(message: string, status: number) {
  const safe = message.replace(/[&<>]/g, (character) => {
    if (character === "&") return "&amp;";
    if (character === "<") return "&lt;";
    return "&gt;";
  });
  return new NextResponse(
    `<!doctype html><html lang="en"><body style="font-family: sans-serif; padding: 2rem;"><p>${safe}</p></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
