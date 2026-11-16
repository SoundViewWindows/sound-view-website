import { jobberGraphqlDetailed } from "@/lib/jobber/graphql";
import {
  BOOKING_SCHEDULE_CONFIG,
  buildMonthAvailability,
  datesInMonth,
  pacificWallTimeToUtc,
  pacificYearMonth,
  type BusyInterval,
} from "@/lib/jobber/booking-schedule";

type ScheduledNode = {
  __typename?: string | null;
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

type PageInfo = {
  hasNextPage?: boolean | null;
  endCursor?: string | null;
} | null;

type ScheduledConnection = {
  nodes?: Array<ScheduledNode | null> | null;
  pageInfo?: PageInfo;
};

type ScheduledItemsResult = {
  data: { scheduledItems?: ScheduledConnection | null } | null;
  errors: string[];
};

const SLOT_MS = 60 * 60 * 1000;

export type BusySample = { title: string; startAt: string; endAt: string };

export async function getLiveAvailability(month = pacificYearMonth(), now = new Date()) {
  const bounds = monthBounds(month);
  const dayMs = 24 * 60 * 60 * 1000;
  const loaded = await loadBusyIntervals(
    new Date(bounds.start - dayMs).toISOString(),
    new Date(bounds.end + dayMs).toISOString(),
  );
  return {
    month,
    timeZone: BOOKING_SCHEDULE_CONFIG.timeZone,
    syncedWithJobber: loaded.synced,
    busy: loaded.intervals,
    busyCount: loaded.intervals.length,
    busySample: loaded.samples,
    permissionWarning: loaded.permissionWarning,
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
  const samples: BusySample[] = [];
  const failures: string[] = [];
  const permissionWarnings: string[] = [];
  let synced = false;

  const remember = (source: string, node: ScheduledNode | null | undefined) => {
    if (!node || isCancelledTitle(node.title)) return;
    const interval = toInterval(node);
    if (!interval) return;
    const windowStart = Date.parse(after);
    const windowEnd = Date.parse(before);
    if (interval.end <= windowStart || interval.start >= windowEnd) return;
    const key = `${node.id ?? source}|${interval.start}`;
    if (collected.has(key)) return;
    collected.set(key, interval);
    if (samples.length < 10) {
      samples.push({
        title: publicTitle(node.title),
        startAt: new Date(interval.start).toISOString(),
        endAt: new Date(interval.end).toISOString(),
      });
    }
  };

  const scheduled = await runQuery("scheduledItems", failures, () => readScheduledItems(after, before));
  if (scheduled) {
    synced = true;
    permissionWarnings.push(...scheduled.permissionWarnings);
    if (scheduled.note) failures.push(`scheduledItems: ${scheduled.note}`);
    scheduled.nodes.forEach((node) => remember("scheduled", node));
  }

  const requests = await runQuery("requests", failures, () => readRequestAssessments());
  if (requests) {
    synced = true;
    requests.forEach((request) => {
      if (isClosedRequest(request) || !request.assessment) return;
      remember("request", {
        id: request.assessment.id,
        startAt: request.assessment.startAt,
        endAt: request.assessment.endAt,
        title: request.title,
      });
    });
  }

  return {
    intervals: [...collected.values()],
    synced,
    samples,
    permissionWarning: permissionWarnings.length > 0 ? [...new Set(permissionWarnings)].join("; ") : null,
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
  const nodes: ScheduledNode[] = [];
  const permissionWarnings: string[] = [];
  const fatal: string[] = [];
  let afterCursor: string | null = null;
  let sawConnection = false;

  for (let page = 0; page < 100; page += 1) {
    const result: ScheduledItemsResult = await jobberGraphqlDetailed(scheduledItemsQuery, {
      occursWithin: { startAt: after, endAt: before },
      afterCursor,
    });
    const hidden = result.errors.filter((message: string) => /hidden due to permissions/i.test(message));
    const other = result.errors.filter((message: string) => !/hidden due to permissions/i.test(message));
    if (hidden.length > 0) {
      console.error("[availability] Jobber GraphQL error:", "scheduledItems", [...new Set(hidden)].join("; "));
    }
    permissionWarnings.push(...hidden);
    const connection: ScheduledConnection | null | undefined = result.data?.scheduledItems;
    if (connection?.nodes) {
      sawConnection = true;
      nodes.push(...connection.nodes.filter((node: ScheduledNode | null): node is ScheduledNode => node != null));
    }
    if (other.length > 0) fatal.push(...other);
    const info: PageInfo = connection?.pageInfo ?? null;
    const nextCursor: string | null = info?.endCursor ?? null;
    if (!info?.hasNextPage || !nextCursor || nextCursor === afterCursor) break;
    afterCursor = nextCursor;
  }

  if (!sawConnection) {
    const message = [...new Set([...permissionWarnings, ...fatal])].join("; ");
    throw new Error(message || "Jobber did not return scheduled items.");
  }
  return {
    nodes,
    permissionWarnings: [...new Set(permissionWarnings)],
    note: fatal.length > 0 ? [...new Set(fatal)].join("; ") : null,
  };
}

async function readRequestAssessments() {
  try {
    return await readRequestPage(requestAssessmentsQuery);
  } catch (error) {
    if (isDisconnected(error)) throw error;
    const message = sanitizeError(error);
    console.error("[availability] Jobber GraphQL error:", "requests", message);
    return readRequestPage(requestAssessmentsPlainQuery);
  }
}

async function readRequestPage(query: string) {
  const result: { data: { requests?: { nodes?: RequestNode[] | null } | null } | null; errors: string[] } =
    await jobberGraphqlDetailed(query);
  if (!result.data?.requests) {
    throw new Error(result.errors.join(" ") || "Jobber did not return requests.");
  }
  if (result.errors.length > 0) {
    throw new Error(result.errors.join(" "));
  }
  return result.data.requests.nodes ?? [];
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

function publicTitle(title: string | null | undefined) {
  const cleaned = (title ?? "")
    .replace(/\S+@\S+/g, "")
    .replace(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 80) || "Scheduled block";
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
  query GetScheduledItems($occursWithin: DateRange!, $afterCursor: String) {
    scheduledItems(first: 50, after: $afterCursor, filter: { occursWithin: $occursWithin }) {
      nodes {
        __typename
        id
        title
        ... on Assessment { startAt endAt }
        ... on Visit { startAt endAt }
        ... on Event { startAt endAt }
        ... on Task { startAt endAt }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const requestAssessmentsQuery = `
  query GetRequestAssessments {
    requests(last: 25) {
      nodes {
        id
        title
        requestStatus
        assessment { id startAt endAt }
      }
    }
  }
`;

const requestAssessmentsPlainQuery = `
  query GetRequestAssessmentsPlain {
    requests(last: 25) {
      nodes {
        id
        title
        assessment { id startAt endAt }
      }
    }
  }
`;
