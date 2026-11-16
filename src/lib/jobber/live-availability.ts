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

type PageInfo = {
  hasNextPage?: boolean | null;
  endCursor?: string | null;
  hasPreviousPage?: boolean | null;
  startCursor?: string | null;
} | null;

const SLOT_MS = 60 * 60 * 1000;
const SCHEDULE_TYPES = ["Assessment", "Visit", "Event", "Task"] as const;

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
  let synced = false;

  const remember = (source: string, node: ScheduledNode, index: number) => {
    if (isCancelledTitle(node.title)) return;
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
    if (scheduled.note) failures.push(`scheduledItems: ${scheduled.note}`);
    scheduled.nodes.forEach((node, index) => remember("scheduled", node, index));
  }

  const events = await runQuery("events", failures, () => readRecentEvents());
  if (events) {
    synced = true;
    events.forEach((node, index) => remember("events", node, index));
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
    samples,
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
  const schema = await readScheduleSchema();
  const occursWithin = occursWithinValue(schema?.dateRangeFields ?? [], after, before);
  if (!occursWithin) {
    throw new Error(
      `DateRange fields were not found (${schema?.dateRangeFields.join(", ") || "none"}).`,
    );
  }
  const nodes = await readConnection<ScheduledNode>(
    scheduledItemsQuery(schema),
    "scheduledItems",
    { occursWithin },
    "forward",
  );
  return { nodes, note: null };
}

async function readRecentEvents() {
  return readConnection<ScheduledNode>(recentEventsQuery, "events", {}, "backward");
}

type ScheduleSchema = {
  dateRangeFields: string[];
  itemFields: string[];
  possibleTypes: string[];
};

async function readScheduleSchema(): Promise<ScheduleSchema | null> {
  try {
    const data = await jobberGraphql<{
      dateRange: { inputFields?: { name: string }[] | null } | null;
      scheduledItemInterface: { fields?: { name: string }[] | null; possibleTypes?: { name: string }[] | null } | null;
      scheduledItemLegacy: { fields?: { name: string }[] | null; possibleTypes?: { name: string }[] | null } | null;
    }>(scheduleSchemaQuery);
    const item = data.scheduledItemInterface?.fields?.length || data.scheduledItemInterface?.possibleTypes?.length
      ? data.scheduledItemInterface
      : data.scheduledItemLegacy;
    return {
      dateRangeFields: data.dateRange?.inputFields?.map((field) => field.name) ?? [],
      itemFields: item?.fields?.map((field) => field.name) ?? [],
      possibleTypes: item?.possibleTypes?.map((type) => type.name) ?? [],
    };
  } catch (error) {
    console.error("[availability] Jobber GraphQL error:", "schema", sanitizeError(error));
    return null;
  }
}

function occursWithinValue(fieldNames: string[], after: string, before: string) {
  const names = new Set(fieldNames);
  const pairs = [
    ["startAt", "endAt"],
    ["after", "before"],
    ["start", "end"],
    ["from", "to"],
    ["startDate", "endDate"],
  ] as const;
  for (const [startName, endName] of pairs) {
    if (names.has(startName) && names.has(endName)) {
      return { [startName]: after, [endName]: before };
    }
  }
  if (fieldNames.length >= 2) {
    return { [fieldNames[0]]: after, [fieldNames[1]]: before };
  }
  return null;
}

function scheduledItemsQuery(schema: ScheduleSchema | null) {
  const types = schema?.possibleTypes.length
    ? SCHEDULE_TYPES.filter((typeName) => schema.possibleTypes.includes(typeName))
    : SCHEDULE_TYPES;
  const interfaceFields = schema?.itemFields.length
    ? ["id", "title", "startAt", "endAt"].filter((name) => schema.itemFields.includes(name))
    : ["id", "title"];
  const fragments = types.map((typeName) => `... on ${typeName} { startAt endAt }`).join("\n");
  return `
    query GetScheduledItems($occursWithin: DateRange!, $cursor: String) {
      scheduledItems(first: 100, after: $cursor, filter: { occursWithin: $occursWithin }) {
        nodes {
          ${interfaceFields.join("\n")}
          ${fragments}
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;
}

const recentEventsQuery = `
  query GetRecentEvents($cursor: String) {
    events(last: 100, before: $cursor) {
      nodes { id title startAt endAt }
      pageInfo { hasPreviousPage startCursor }
    }
  }
`;

async function readRequestAssessments() {
  try {
    return await readConnection<RequestNode>(requestAssessmentsQuery, "requests", {}, "backward");
  } catch (error) {
    if (isDisconnected(error)) throw error;
    const message = sanitizeError(error);
    console.error("[availability] Jobber GraphQL error:", "requests", message);
    return readConnection<RequestNode>(requestAssessmentsPlainQuery, "requests", {}, "backward");
  }
}

async function readConnection<T>(
  query: string,
  field: string,
  variables: Record<string, unknown>,
  direction: "forward" | "backward",
) {
  const nodes: T[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 40; page += 1) {
    const data: Record<string, { nodes?: T[] | null; pageInfo?: PageInfo } | null> = await jobberGraphql(query, {
      ...variables,
      ...(query.includes("$cursor") ? { cursor } : {}),
    });
    const connection = data[field];
    nodes.push(...(connection?.nodes ?? []));
    const info = connection?.pageInfo;
    const nextCursor = direction === "backward" ? info?.startCursor : info?.endCursor;
    const hasMore = direction === "backward" ? info?.hasPreviousPage : info?.hasNextPage;
    if (!hasMore || !nextCursor || nextCursor === cursor) break;
    cursor = nextCursor;
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

const scheduleSchemaQuery = `
  query IntrospectScheduleTypes {
    dateRange: __type(name: "DateRange") {
      inputFields { name type { name kind ofType { name } } }
    }
    scheduledItemInterface: __type(name: "ScheduledItemInterface") {
      fields { name }
      possibleTypes { name }
    }
    scheduledItemLegacy: __type(name: "ScheduledItem") {
      fields { name }
      possibleTypes { name }
    }
  }
`;

const requestAssessmentsQuery = `
  query GetRequestAssessments($cursor: String) {
    requests(last: 100, before: $cursor) {
      nodes {
        id
        title
        requestStatus
        assessment { id startAt endAt }
      }
      pageInfo { hasPreviousPage startCursor }
    }
  }
`;

const requestAssessmentsPlainQuery = `
  query GetRequestAssessmentsPlain($cursor: String) {
    requests(last: 100, before: $cursor) {
      nodes {
        id
        title
        assessment { id startAt endAt }
      }
      pageInfo { hasPreviousPage startCursor }
    }
  }
`;
