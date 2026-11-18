import { type JobberAppointmentPayload } from "./booking-types";
import { jobberAddressMatches, normalizeEmail, titleMatchesVisit } from "./appointment-identity";
import type { JobberCaller } from "./appointment-reserve";

type ClientMatchData = {
  clients: {
    nodes: { id: string; emails: { address: string | null }[] }[] | null;
    pageInfo?: { hasNextPage?: boolean | null; endCursor?: string | null } | null;
  } | null;
};

type VisitRequestData = {
  client: {
    email: string | null;
    requests: {
      nodes: {
        id: string;
        title: string | null;
        email: string | null;
        jobberWebUri: string | null;
        assessment: { id: string; startAt: string | null; endAt: string | null } | null;
        property: {
          address: {
            street1: string | null;
            street2: string | null;
            city: string | null;
            province: string | null;
            postalCode: string | null;
          } | null;
        } | null;
      }[];
      pageInfo?: { hasNextPage?: boolean | null; endCursor?: string | null } | null;
    } | null;
  } | null;
};

const matchClientQuery = `
  query MatchWebsiteAppointmentClient($search: String!, $afterCursor: String) {
    clients(searchTerm: $search, first: 5, after: $afterCursor) {
      nodes {
        id
        emails {
          address
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const visitRequestsQuery = `
  query WebsiteVisitRequests($id: EncodedId!, $afterCursor: String) {
    client(id: $id) {
      email
      requests(first: 50, after: $afterCursor) {
        nodes {
          id
          title
          email
          jobberWebUri
          assessment { id startAt endAt }
          property { address { street1 street2 city province postalCode } }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

export type AppointmentLookup =
  | { status: "failed" }
  | { status: "none" }
  | { status: "ambiguous" }
  | {
      status: "found";
      requestId: string;
      jobberWebUri: string | null;
      assessment: { id: string; startAt: string | null; endAt: string | null } | null;
    };

export type ClientSearch =
  | { status: "found"; id: string }
  | { status: "none" }
  | { status: "incomplete" };

export async function lookupAppointmentRequest(
  appointment: Pick<JobberAppointmentPayload, "contact" | "address">,
  referenceId: string,
  graphql: JobberCaller,
): Promise<AppointmentLookup> {
  try {
    const client = await searchClientByEmail(graphql, appointment.contact.email);
    if (client.status === "incomplete") return { status: "failed" };
    if (client.status === "none") return { status: "none" };
    return await readMatchingRequests(graphql, client.id, appointment, referenceId);
  } catch (error) {
    console.error(
      "[appointment] Jobber visit lookup failed",
      error instanceof Error ? error.message : "Jobber did not return requests.",
    );
    return { status: "failed" };
  }
}

export type PropertySearch =
  | { status: "found"; id: string }
  | { status: "none" }
  | { status: "incomplete" };

type PropertyMatchData = {
  client: {
    properties: {
      nodes: {
        id: string;
        address?: {
          street1?: string | null;
          street2?: string | null;
          city?: string | null;
          province?: string | null;
          postalCode?: string | null;
        } | null;
      }[] | null;
      pageInfo?: { hasNextPage?: boolean | null; endCursor?: string | null } | null;
    } | null;
  } | null;
};

const clientPropertiesQuery = `
  query WebsiteClientProperties($id: EncodedId!, $afterCursor: String) {
    client(id: $id) {
      properties(first: 20, after: $afterCursor) {
        nodes {
          id
          address {
            street1
            street2
            city
            province
            postalCode
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export async function searchClientProperties(
  graphql: JobberCaller,
  clientId: string,
  appointment: Pick<JobberAppointmentPayload, "address">,
): Promise<PropertySearch> {
  let afterCursor: string | null = null;
  const seen = new Set<string>();
  try {
    for (let page = 0; page < 20; page += 1) {
      const data: PropertyMatchData = await graphql<PropertyMatchData>(clientPropertiesQuery, { id: clientId, afterCursor });
      const connection = data.client?.properties;
      if (!data.client || !connection || !connection.pageInfo || typeof connection.pageInfo.hasNextPage !== "boolean") {
        return { status: "incomplete" };
      }
      const match = (connection.nodes ?? []).find((property) => jobberAddressMatches(appointment, property.address ?? {}));
      if (match?.id) return { status: "found", id: match.id };
      if (connection.nodes == null) return { status: "incomplete" };
      if (!connection.pageInfo.hasNextPage) return { status: "none" };
      const nextCursor = connection.pageInfo.endCursor?.trim() ?? "";
      if (!nextCursor || seen.has(nextCursor)) return { status: "incomplete" };
      seen.add(nextCursor);
      afterCursor = nextCursor;
    }
    return { status: "incomplete" };
  } catch (error) {
    console.info(
      "appointment property search did not finish",
      error instanceof Error ? error.message : "Jobber property search was not available.",
    );
    return { status: "incomplete" };
  }
}

export async function searchClientByEmail(graphql: JobberCaller, email: string): Promise<ClientSearch> {
  const target = email.trim().toLowerCase();
  let afterCursor: string | null = null;
  const seen = new Set<string>();
  try {
    for (let page = 0; page < 20; page += 1) {
      const data: ClientMatchData = await graphql<ClientMatchData>(matchClientQuery, { search: email, afterCursor });
      const connection = data.clients;
      if (!connection || !connection.pageInfo || typeof connection.pageInfo.hasNextPage !== "boolean" || !Array.isArray(connection.nodes)) {
        return { status: "incomplete" };
      }
      const match = connection.nodes.find((client) =>
        client.emails.some((item) => item.address?.trim().toLowerCase() === target),
      );
      if (match?.id) return { status: "found", id: match.id };
      if (!connection.pageInfo.hasNextPage) return { status: "none" };
      const nextCursor = connection.pageInfo.endCursor?.trim() ?? "";
      if (!nextCursor || seen.has(nextCursor)) return { status: "incomplete" };
      seen.add(nextCursor);
      afterCursor = nextCursor;
    }
    return { status: "incomplete" };
  } catch (error) {
    console.info(
      "appointment client search did not finish",
      error instanceof Error ? error.message : "Jobber client search was not available.",
    );
    return { status: "incomplete" };
  }
}

async function readMatchingRequests(
  graphql: JobberCaller,
  clientId: string,
  appointment: Pick<JobberAppointmentPayload, "contact" | "address">,
  referenceId: string,
): Promise<AppointmentLookup> {
  const email = normalizeEmail(appointment.contact.email);
  const matches: NonNullable<NonNullable<VisitRequestData["client"]>["requests"]>["nodes"] = [];
  let afterCursor: string | null = null;
  const seen = new Set<string>();
  for (let page = 0; page < 20; page += 1) {
    const data: VisitRequestData = await graphql<VisitRequestData>(visitRequestsQuery, { id: clientId, afterCursor });
    const connection = data.client?.requests;
    if (!data.client || !connection || !connection.pageInfo || typeof connection.pageInfo.hasNextPage !== "boolean" || !Array.isArray(connection.nodes)) {
      return { status: "failed" };
    }
    for (const request of connection.nodes) {
      const requestEmail = normalizeEmail(request.email || data.client.email || "");
      if (
        titleMatchesVisit(request.title, referenceId) &&
        requestEmail === email &&
        jobberAddressMatches(appointment, request.property?.address ?? {})
      ) {
        matches.push(request);
      }
    }
    if (matches.length > 1) return { status: "ambiguous" };
    if (!connection.pageInfo.hasNextPage) break;
    const nextCursor = connection.pageInfo.endCursor?.trim() ?? "";
    if (!nextCursor || seen.has(nextCursor)) return { status: "failed" };
    seen.add(nextCursor);
    afterCursor = nextCursor;
    if (page === 19) return { status: "failed" };
  }
  if (matches.length === 0) return { status: "none" };
  const match = matches[0];
  return { status: "found", requestId: match.id, jobberWebUri: match.jobberWebUri, assessment: match.assessment };
}
