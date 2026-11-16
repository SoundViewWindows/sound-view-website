import { NextResponse } from "next/server";
import { jobberGraphql } from "@/lib/jobber/graphql";
import {
  BOOKING_SCHEDULE_CONFIG,
  buildMonthAvailability,
  monthQueryWindow,
  pacificYearMonth,
  type BusyInterval,
} from "@/lib/jobber/booking-schedule";

type ScheduledNode = { id?: string | null; startAt?: string | null; endAt?: string | null };

type ConnectionData = {
  nodes?: ScheduledNode[] | null;
  pageInfo?: { hasNextPage?: boolean | null; endCursor?: string | null } | null;
};

const SLOT_MS = BOOKING_SCHEDULE_CONFIG.slotDurationMinutes * 60 * 1000;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const month = url.searchParams.get("month")?.trim() || pacificYearMonth();
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return NextResponse.json({ ok: false, message: "Choose a valid month." }, { status: 400 });
  }

  const now = new Date();
  const window = monthQueryWindow(month, now);
  let busy: BusyInterval[] = [];
  let syncedWithJobber = false;
  if (window.start < window.end) {
    const loaded = await loadBusyIntervals(new Date(window.start).toISOString(), new Date(window.end).toISOString());
    busy = loaded.intervals;
    syncedWithJobber = loaded.synced;
  }

  return NextResponse.json({
    ok: true,
    month,
    timeZone: BOOKING_SCHEDULE_CONFIG.timeZone,
    syncedWithJobber,
    availability: buildMonthAvailability(month, busy, now),
  });
}

async function loadBusyIntervals(start: string, end: string) {
  try {
    const scheduled = await readCollection("scheduledItems", scheduledItemsQuery, start, end);
    return { intervals: scheduled, synced: true };
  } catch (error) {
    if (isDisconnected(error)) return { intervals: [], synced: false };
    console.info(
      "appointment availability scheduledItems query was unavailable",
      error instanceof Error ? error.message : "Jobber did not return scheduled items.",
    );
  }

  const intervals: BusyInterval[] = [];
  let synced = false;
  for (const source of [
    ["visits", visitsQuery],
    ["assessments", assessmentsQuery],
    ["events", eventsQuery],
  ] as const) {
    try {
      intervals.push(...(await readCollection(source[0], source[1], start, end)));
      synced = true;
    } catch (error) {
      if (isDisconnected(error)) return { intervals, synced };
      console.info(
        `appointment availability ${source[0]} query was unavailable`,
        error instanceof Error ? error.message : "Jobber did not return that calendar.",
      );
    }
  }
  return { intervals, synced };
}

async function readCollection(field: string, query: string, start: string, end: string) {
  const windowStart = Date.parse(start);
  const windowEnd = Date.parse(end);
  const intervals: BusyInterval[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 6; page += 1) {
    const data = await jobberGraphql<Record<string, ConnectionData | null>>(query, { start, end, cursor });
    const connection = data[field];
    for (const node of connection?.nodes ?? []) {
      const interval = toInterval(node);
      if (!interval) continue;
      if (interval.end <= windowStart || interval.start >= windowEnd) continue;
      intervals.push(interval);
    }
    if (!connection?.pageInfo?.hasNextPage || !connection.pageInfo.endCursor) break;
    cursor = connection.pageInfo.endCursor;
  }
  return intervals;
}

function toInterval(node: ScheduledNode): BusyInterval | null {
  const start = node.startAt ? Date.parse(node.startAt) : Number.NaN;
  if (!Number.isFinite(start)) return null;
  const parsedEnd = node.endAt ? Date.parse(node.endAt) : Number.NaN;
  const end = Number.isFinite(parsedEnd) && parsedEnd > start ? parsedEnd : start + SLOT_MS;
  return { start, end };
}

function isDisconnected(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return /not connected|token storage|network|fetch failed/i.test(message);
}

const scheduledItemsQuery = `
  query WebsiteScheduledItems($start: ISO8601DateTime!, $end: ISO8601DateTime!, $cursor: String) {
    scheduledItems(first: 50, after: $cursor, filter: { startAt: { after: $start, before: $end } }) {
      nodes {
        ... on Assessment { id startAt endAt }
        ... on Visit { id startAt endAt }
        ... on Event { id startAt endAt }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const visitsQuery = `
  query WebsiteVisits($start: ISO8601DateTime!, $end: ISO8601DateTime!, $cursor: String) {
    visits(first: 50, after: $cursor, filter: { startAt: { after: $start, before: $end } }) {
      nodes { id startAt endAt }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const assessmentsQuery = `
  query WebsiteAssessments($start: ISO8601DateTime!, $end: ISO8601DateTime!, $cursor: String) {
    assessments(first: 50, after: $cursor, filter: { startAt: { after: $start, before: $end } }) {
      nodes { id startAt endAt }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const eventsQuery = `
  query WebsiteEvents($start: ISO8601DateTime!, $end: ISO8601DateTime!, $cursor: String) {
    events(first: 50, after: $cursor, filter: { startAt: { after: $start, before: $end } }) {
      nodes { id startAt endAt }
      pageInfo { hasNextPage endCursor }
    }
  }
`;
