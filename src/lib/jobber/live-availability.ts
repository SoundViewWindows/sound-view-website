import { jobberGraphql } from "@/lib/jobber/graphql";
import {
  BOOKING_SCHEDULE_CONFIG,
  buildMonthAvailability,
  datesInMonth,
  pacificWallTimeToUtc,
  pacificYearMonth,
  type BusyInterval,
} from "@/lib/jobber/booking-schedule";

type ScheduledNode = {
  id?: string | null;
  startAt?: string | null;
  endAt?: string | null;
  title?: string | null;
};

type RequestNode = {
  id?: string | null;
  title?: string | null;
  requestStatus?: string | null;
  assessment?: { id?: string | null; startAt?: string | null; endAt?: string | null } | null;
};

type PageInfo = { hasNextPage?: boolean | null; endCursor?: string | null } | null;

const SLOT_MS = BOOKING_SCHEDULE_CONFIG.slotDurationMinutes * 60 * 1000;

export async function getLiveAvailability(month = pacificYearMonth(), now = new Date()) {
  const bounds = monthBounds(month);
  const loaded = await loadBusyIntervals(new Date(bounds.start).toISOString(), new Date(bounds.end).toISOString());
  return {
    month,
    timeZone: BOOKING_SCHEDULE_CONFIG.timeZone,
    syncedWithJobber: loaded.synced,
    busy: loaded.intervals,
    busyCount: loaded.intervals.length,
    availabilityError: loaded.availabilityError,
    availability: buildMonthAvailability(month, loaded.intervals, now),
  };
}

function monthBounds(month: string) {
  const dates = datesInMonth(month);
  const [year, monthNumber] = month.split("-").map(Number);
  const nextMonth = monthNumber === 12 ? `${year + 1}-01-01` : `${year}-${String(monthNumber + 1).padStart(2, "0")}-01`;
  return {
    start: pacificWallTimeToUtc(dates[0] ?? `${month}-01`, 0),
    end: pacificWallTimeToUtc(nextMonth, 0),
  };
}

async function loadBusyIntervals(after: string, before: string) {
  const collected = new Map<string, BusyInterval>();
  const failures: string[] = [];
  let synced = false;

  const remember = (source: string, node: ScheduledNode, index: number) => {
    if (isCancelledTitle(node.title)) return;
    const interval = toInterval(node);
    if (!interval) return;
    if (interval.end <= Date.parse(after) || interval.start >= Date.parse(before)) return;
    const key = node.id || `${source}-${interval.start}-${interval.end}-${index}`;
    if (!collected.has(key)) collected.set(key, interval);
  };

  const scheduled = await runQuery("scheduledItems", failures, () => readScheduledItems(after, before));
  if (scheduled) {
    synced = true;
    scheduled.forEach((node, index) => remember("scheduled", node, index));
  }

  const requests = await runQuery("requests", failures, () => readRequestAssessments());
  if (requests) {
    synced = true;
    requests.forEach((request, index) => {
      if (isClosedRequest(request)) return;
      if (!request.assessment) return;
      remember("request", { id: request.assessment.id, startAt: request.assessment.startAt, endAt: request.assessment.endAt, title: request.title }, index);
    });
  }

  return {
    intervals: [...collected.values()],
    synced,
    availabilityError: failures.length > 0 ? failures.join("; ") : null,
  };
}

async function runQuery<T>(label: string, failures: string[], load: () => Promise<T>): Promise<T | null> {
  try {
    return await load();
  } catch (error) {
    const message = sanitizeError(error);
    console.error("[availability] Jobber GraphQL error:", label, message);
    failures.push(`${label}: ${message}`);
    return null;
  }
}

async function readScheduledItems(after: string, before: string) {
  const attempts = [scheduledItemsQuery, scheduledItemsFirstPageQuery];
  let lastError: unknown = new Error("Jobber did not return scheduled items.");
  for (const query of attempts) {
    try {
      return await readConnection<ScheduledNode>(query, "scheduledItems", { after, before });
    } catch (error) {
      if (isDisconnected(error)) throw error;
      const message = sanitizeError(error);
      console.error("[availability] Jobber GraphQL error:", "scheduledItems", message);
      lastError = error;
    }
  }
  throw lastError;
}

async function readRequestAssessments() {
  try {
    return await readConnection<RequestNode>(requestAssessmentsQuery, "requests", {});
  } catch (error) {
    if (isDisconnected(error)) throw error;
    const message = sanitizeError(error);
    console.error("[availability] Jobber GraphQL error:", "requests", message);
    return readConnection<RequestNode>(requestAssessmentsPlainQuery, "requests", {});
  }
}

async function readConnection<T>(query: string, field: string, variables: Record<string, unknown>) {
  const nodes: T[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 6; page += 1) {
    const data: Record<string, { nodes?: T[] | null; pageInfo?: PageInfo } | null> = await jobberGraphql(query, {
      ...variables,
      ...(query.includes("$cursor") ? { cursor } : {}),
    });
    const connection = data[field];
    nodes.push(...(connection?.nodes ?? []));
    if (!connection?.pageInfo?.hasNextPage || !connection.pageInfo.endCursor) break;
    cursor = connection.pageInfo.endCursor;
  }
  return nodes;
}

function toInterval(node: ScheduledNode): BusyInterval | null {
  const start = node.startAt ? Date.parse(node.startAt) : Number.NaN;
  if (!Number.isFinite(start)) return null;
  const rawEnd = node.endAt?.trim() ?? "";
  const endIso = rawEnd ? rawEnd : new Date(new Date(start).getTime() + 60 * 60 * 1000).toISOString();
  const parsedEnd = Date.parse(endIso);
  const end = Number.isFinite(parsedEnd) && parsedEnd > start ? parsedEnd : start + SLOT_MS;
  return { start, end };
}

function isCancelledTitle(title: string | null | undefined) {
  return (title ?? "").toLowerCase().includes("cancelled");
}

function isClosedRequest(request: RequestNode) {
  const status = (request.requestStatus ?? "").trim().toUpperCase();
  return status === "ARCHIVED" || status === "CANCELLED" || isCancelledTitle(request.title);
}

function isDisconnected(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return /not connected|token storage|network|fetch failed/i.test(message);
}

function sanitizeError(error: unknown) {
  const message = error instanceof Error ? error.message : "Jobber query failed.";
  return message.replace(/\s+/g, " ").slice(0, 300);
}

const scheduledItemsQuery = `
  query GetScheduledItems($after: ISO8601DateTime!, $before: ISO8601DateTime!, $cursor: String) {
    scheduledItems(first: 100, after: $cursor, filter: { startAt: { after: $after, before: $before } }) {
      nodes {
        id
        title
        ... on Assessment { startAt endAt }
        ... on Visit { startAt endAt }
        ... on Event { startAt endAt }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const scheduledItemsFirstPageQuery = `
  query GetScheduledItemsFirstPage($after: ISO8601DateTime!, $before: ISO8601DateTime!) {
    scheduledItems(first: 100, filter: { startAt: { after: $after, before: $before } }) {
      nodes {
        id
        title
        ... on Assessment { startAt endAt }
        ... on Visit { startAt endAt }
        ... on Event { startAt endAt }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const requestAssessmentsQuery = `
  query GetRequestAssessments($cursor: String) {
    requests(first: 100, after: $cursor) {
      nodes {
        id
        title
        requestStatus
        assessment { id startAt endAt }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const requestAssessmentsPlainQuery = `
  query GetRequestAssessmentsPlain($cursor: String) {
    requests(first: 100, after: $cursor) {
      nodes {
        id
        title
        assessment { id startAt endAt }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;
