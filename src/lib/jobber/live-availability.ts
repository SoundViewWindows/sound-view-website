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
  scheduledStartAt?: string | null;
  scheduledEndAt?: string | null;
  title?: string | null;
};

type ConnectionData = {
  nodes?: ScheduledNode[] | null;
  pageInfo?: { hasNextPage?: boolean | null; endCursor?: string | null } | null;
};

const SLOT_MS = BOOKING_SCHEDULE_CONFIG.slotDurationMinutes * 60 * 1000;

export async function getLiveAvailability(month = pacificYearMonth(), now = new Date()) {
  const bounds = monthBounds(month);
  let busy: BusyInterval[] = [];
  let syncedWithJobber = false;
  if (bounds.start < bounds.end) {
    const loaded = await loadBusyIntervals(new Date(bounds.start).toISOString(), new Date(bounds.end).toISOString());
    busy = loaded.intervals;
    syncedWithJobber = loaded.synced;
  }
  return {
    month,
    timeZone: BOOKING_SCHEDULE_CONFIG.timeZone,
    syncedWithJobber,
    busy,
    availability: buildMonthAvailability(month, busy, now),
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

async function loadBusyIntervals(start: string, end: string) {
  const collected = new Map<string, BusyInterval>();
  let synced = false;
  const sources = [
    ["assessments", assessmentQueries],
    ["scheduledItems", scheduledItemQueries],
    ["visits", visitQueries],
    ["events", eventQueries],
  ] as const;
  for (const [field, queries] of sources) {
    try {
      const nodes = await readCollection(field, queries, start, end);
      synced = true;
      nodes.forEach((node, index) => {
        if (isCancelled(node)) return;
        const interval = toInterval(node);
        if (!interval) return;
        if (interval.end <= Date.parse(start) || interval.start >= Date.parse(end)) return;
        const key = node.id || `${field}-${interval.start}-${interval.end}-${index}`;
        if (!collected.has(key)) collected.set(key, interval);
      });
    } catch (error) {
      if (isDisconnected(error)) return { intervals: [...collected.values()], synced };
      console.info(
        `appointment availability ${field} query was unavailable`,
        error instanceof Error ? error.message : "Jobber did not return that calendar.",
      );
    }
  }
  return { intervals: [...collected.values()], synced };
}

async function readCollection(field: string, queries: readonly string[], start: string, end: string) {
  const nodes: ScheduledNode[] = [];
  let succeeded = false;
  let lastError: unknown = new Error(`Jobber did not return ${field}.`);
  for (const query of queries) {
    try {
      const page = await readPages(field, query, start, end);
      succeeded = true;
      nodes.push(...page);
      if (page.length > 0) break;
    } catch (error) {
      if (isDisconnected(error)) throw error;
      lastError = error;
    }
  }
  if (!succeeded) throw lastError;
  return nodes;
}

async function readPages(field: string, query: string, start: string, end: string) {
  const nodes: ScheduledNode[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 6; page += 1) {
    const data: Record<string, ConnectionData | null> = await jobberGraphql(query, { start, end, cursor });
    const connection: ConnectionData | null | undefined = data[field];
    nodes.push(...(connection?.nodes ?? []));
    if (!connection?.pageInfo?.hasNextPage || !connection.pageInfo.endCursor) break;
    cursor = connection.pageInfo.endCursor;
  }
  return nodes;
}

function toInterval(node: ScheduledNode): BusyInterval | null {
  const startRaw = node.startAt || node.scheduledStartAt;
  const endRaw = node.endAt || node.scheduledEndAt;
  const start = startRaw ? Date.parse(startRaw) : Number.NaN;
  if (!Number.isFinite(start)) return null;
  const parsedEnd = endRaw ? Date.parse(endRaw) : Number.NaN;
  const end = Number.isFinite(parsedEnd) && parsedEnd > start ? parsedEnd : start + SLOT_MS;
  return { start, end };
}

function isCancelled(node: ScheduledNode) {
  return (node.title ?? "").trim().toLowerCase() === "cancelled";
}

function isDisconnected(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return /not connected|token storage|network|fetch failed/i.test(message);
}

const assessmentQueries = [
  `
    query WebsiteAssessmentsWindow($start: ISO8601DateTime!, $end: ISO8601DateTime!, $cursor: String) {
      assessments(first: 50, after: $cursor, filter: { startAt: { after: $start, before: $end } }) {
        nodes { id title startAt endAt }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
  `
    query WebsiteAssessments($cursor: String) {
      assessments(first: 50, after: $cursor) {
        nodes { id title startAt endAt }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
  `
    query WebsiteAssessmentsPlain($cursor: String) {
      assessments(first: 50, after: $cursor) {
        nodes { id startAt endAt }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
] as const;

const scheduledItemQueries = [
  `
    query WebsiteScheduledItems($cursor: String) {
      scheduledItems(first: 50, after: $cursor) {
        nodes {
          ... on Assessment { id title startAt endAt }
          ... on Visit { id title startAt endAt }
          ... on Event { id title startAt endAt }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
  `
    query WebsiteScheduledItemsWindow($start: ISO8601DateTime!, $end: ISO8601DateTime!, $cursor: String) {
      scheduledItems(first: 50, after: $cursor, filter: { startAt: { after: $start, before: $end } }) {
        nodes {
          ... on Assessment { id startAt endAt }
          ... on Visit { id startAt endAt }
          ... on Event { id startAt endAt }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
] as const;

const visitQueries = [
  `
    query WebsiteVisits($cursor: String) {
      visits(first: 50, after: $cursor) {
        nodes { id title startAt endAt }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
  `
    query WebsiteVisitsPlain($cursor: String) {
      visits(first: 50, after: $cursor) {
        nodes { id startAt endAt }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
] as const;

const eventQueries = [
  `
    query WebsiteEvents($cursor: String) {
      events(first: 50, after: $cursor) {
        nodes { id title startAt endAt }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
  `
    query WebsiteEventsPlain($cursor: String) {
      events(first: 50, after: $cursor) {
        nodes { id startAt endAt }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
] as const;
