import { jobberGraphql } from "@/lib/jobber/graphql";
import { BOOKING_ACCOUNT_EMAIL, bookingUserIdForEmail } from "@/lib/jobber/booking-schedule";

export { BOOKING_ACCOUNT_EMAIL };

type BookingUserNode = {
  id?: string | null;
  email?: { raw?: string | null } | null;
};

type BookingUsersData = {
  users: {
    nodes: Array<BookingUserNode | null> | null;
    pageInfo?: { hasNextPage?: boolean | null; endCursor?: string | null } | null;
  } | null;
};

const bookingUserQuery = `
  query GetBookingUsers($afterCursor: String) {
    users(first: 50, after: $afterCursor) {
      nodes {
        id
        email {
          raw
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export async function findBookingUserId() {
  const resolved = await resolveBookingUser();
  return resolved.id;
}

export async function resolveBookingUser(): Promise<{ id: string | null; error: string | null }> {
  try {
    const id = await readBookingUserId();
    if (id) return { id, error: null };
    return {
      id: null,
      error: `Jobber did not return a team member for ${BOOKING_ACCOUNT_EMAIL}. The authorizing user's schedule was not used.`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Jobber did not return users.";
    console.info("appointment booking user lookup was unavailable", message);
    return {
      id: null,
      error: `The booking account ${BOOKING_ACCOUNT_EMAIL} could not be read (${message}). The authorizing user's schedule was not used.`,
    };
  }
}

async function readBookingUserId() {
  let afterCursor: string | null = null;
  const seen = new Set<string>();

  for (let page = 0; page < 20; page += 1) {
    const data: BookingUsersData = await jobberGraphql<BookingUsersData>(bookingUserQuery, { afterCursor });
    const connection: BookingUsersData["users"] = data.users;
    if (!connection) {
      throw new Error("Jobber did not return users.");
    }
    const id = bookingUserIdForEmail(connection.nodes);
    if (id) return id;
    const nextCursor: string = connection.pageInfo?.endCursor?.trim() ?? "";
    if (!connection.pageInfo?.hasNextPage || !nextCursor || seen.has(nextCursor)) return null;
    seen.add(nextCursor);
    afterCursor = nextCursor;
  }

  return null;
}
