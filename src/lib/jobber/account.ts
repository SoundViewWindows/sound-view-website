import { jobberGraphql, rememberAccount } from "@/lib/jobber/graphql";

const accountQuery = `
  query WebsiteQuoteAccount {
    account {
      id
      name
    }
  }
`;

export async function readJobberAccount() {
  const data = await jobberGraphql<{ account: { id: string; name: string } | null }>(accountQuery);
  const account = data.account;
  if (!account?.id) {
    throw new Error("Jobber did not return an account.");
  }
  await rememberAccount(account.id, account.name);
  return { id: account.id, name: account.name };
}
