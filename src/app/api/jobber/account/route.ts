import { NextResponse } from "next/server";
import { readJobberAccount } from "@/lib/jobber/account";

export async function GET() {
  try {
    const account = await readJobberAccount();
    return NextResponse.json({ ok: true, accountId: account.id, accountName: account.name });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Jobber could not be read.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
