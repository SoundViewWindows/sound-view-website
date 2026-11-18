import assert from "node:assert/strict";
import test from "node:test";
import type { JobberCaller } from "./appointment-reserve";
import { lookupAppointmentRequest, searchClientByEmail, searchClientProperties } from "./appointment-client-search";

const target = {
  contact: { email: "ada@example.com" },
  address: { street: "1 Main St", unit: "12A", city: "Seattle", state: "WA", zip: "98125" },
};

function caller(pages: unknown[]): JobberCaller {
  return (async () => {
    const next = pages.shift();
    if (next instanceof Error) throw next;
    if (!next) throw new Error("missing page");
    return next;
  }) as JobberCaller;
}

function clientPage(emails: string[], hasNextPage: boolean, endCursor?: string) {
  return {
    clients: {
      nodes: emails.map((address, index) => ({ id: `client-${address}`, emails: [{ address }] })),
      pageInfo: { hasNextPage, endCursor: endCursor ?? null },
    },
  };
}

test("a client search API error stays incomplete", async () => {
  const result = await searchClientByEmail(caller([new Error("Jobber unavailable")]), "ada@example.com");
  assert.equal(result.status, "incomplete");
  const lookup = await lookupAppointmentRequest(target, "SV-TEST1", caller([new Error("timeout")]));
  assert.equal(lookup.status, "failed");
});

test("a matching client after the first page is found", async () => {
  const first = clientPage(["a@example.com", "b@example.com", "c@example.com", "d@example.com", "e@example.com"], true, "cursor-2");
  const second = clientPage(["ada@example.com"], false);
  const result = await searchClientByEmail(caller([first, second]), "ada@example.com");
  assert.equal(result.status, "found");
  if (result.status === "found") assert.equal(result.id, "client-ada@example.com");
});

test("client pagination without a next cursor stays incomplete", async () => {
  const result = await searchClientByEmail(caller([clientPage(["a@example.com"], true)]), "ada@example.com");
  assert.equal(result.status, "incomplete");
});

test("client pagination without a nodes array stays incomplete", async () => {
  const result = await searchClientByEmail(
    caller([{ clients: { pageInfo: { hasNextPage: false, endCursor: null } } }]),
    "ada@example.com",
  );
  assert.equal(result.status, "incomplete");
});

test("client pagination without page info stays incomplete", async () => {
  const result = await searchClientByEmail(
    caller([{ clients: { nodes: [{ id: "client-1", emails: [{ address: "a@example.com" }] }] } }]),
    "ada@example.com",
  );
  assert.equal(result.status, "incomplete");
});

test("a completed client search with no match is none", async () => {
  const result = await searchClientByEmail(caller([clientPage(["a@example.com"], false)]), "ada@example.com");
  assert.equal(result.status, "none");
});

test("an incomplete request search stays unresolved", async () => {
  const client = clientPage(["ada@example.com"], false);
  const requests = {
    client: {
      email: "ada@example.com",
      requests: {
        nodes: [],
        pageInfo: { hasNextPage: true, endCursor: null },
      },
    },
  };
  const lookup = await lookupAppointmentRequest(target, "SV-TEST1", caller([client, requests]));
  assert.equal(lookup.status, "failed");
});

function propertyPage(
  addresses: { id: string; street1: string }[],
  hasNextPage: boolean,
  endCursor?: string,
) {
  return {
    client: {
      properties: {
        nodes: addresses.map((item) => ({
          id: item.id,
          address: { street1: item.street1, street2: "12A", city: "Seattle", province: "WA", postalCode: "98125" },
        })),
        pageInfo: { hasNextPage, endCursor: endCursor ?? null },
      },
    },
  };
}

test("a matching property on the second page is found", async () => {
  const first = propertyPage(
    Array.from({ length: 20 }, (_, index) => ({ id: `property-${index}`, street1: `${index} Other St` })),
    true,
    "property-cursor-2",
  );
  const second = propertyPage([{ id: "property-main", street1: "1 Main St" }], false);
  const result = await searchClientProperties(caller([first, second]), "client-1", target);
  assert.equal(result.status, "found");
  if (result.status === "found") assert.equal(result.id, "property-main");
});

test("a property search API error stays incomplete", async () => {
  const result = await searchClientProperties(caller([new Error("Jobber unavailable")]), "client-1", target);
  assert.equal(result.status, "incomplete");
});

test("property pagination without page info stays incomplete", async () => {
  const result = await searchClientProperties(
    caller([{ client: { properties: { nodes: [{ id: "property-1", address: { street1: "9 Other St" } }] } } }]),
    "client-1",
    target,
  );
  assert.equal(result.status, "incomplete");
});

test("a repeated property cursor stays incomplete", async () => {
  const page = propertyPage([{ id: "property-1", street1: "9 Other St" }], true, "same-cursor");
  const result = await searchClientProperties(caller([page, page]), "client-1", target);
  assert.equal(result.status, "incomplete");
});

test("request pagination without a nodes array stays unresolved", async () => {
  const client = clientPage(["ada@example.com"], false);
  const requests = { client: { email: "ada@example.com", requests: { pageInfo: { hasNextPage: false, endCursor: null } } } };
  const lookup = await lookupAppointmentRequest(target, "SV-TEST1", caller([client, requests]));
  assert.equal(lookup.status, "failed");
});

test("request pagination without page info stays unresolved", async () => {
  const client = clientPage(["ada@example.com"], false);
  const requests = { client: { email: "ada@example.com", requests: { nodes: [] } } };
  const lookup = await lookupAppointmentRequest(target, "SV-TEST1", caller([client, requests]));
  assert.equal(lookup.status, "failed");
});
