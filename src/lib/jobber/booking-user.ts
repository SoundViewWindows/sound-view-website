import { jobberGraphql } from "@/lib/jobber/graphql";

type BookingUsersData = {
  users: {
    nodes: { id: string; name?: { full?: string | null } | null }[];
  } | null;
};

const bookingUserQuery = `
  query GetBookingUser {
    users(first: 25) {
      nodes {
        id
        name {
          full
        }
      }
    }
  }
`;

export async function findBookingUserId() {
  const override = process.env.JOBBER_BOOKING_USER_ID?.trim() || "";
  try {
    const data = await jobberGraphql<BookingUsersData>(bookingUserQuery);
    const match = data.users?.nodes.find((node) => node.name?.full?.trim().toLowerCase() === "booking");
    if (match?.id) return match.id;
  } catch (error) {
    console.info(
      "appointment booking user lookup was unavailable",
      error instanceof Error ? error.message : "Jobber did not return users.",
    );
  }
  return override || null;
}
