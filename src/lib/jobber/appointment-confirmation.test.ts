import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { confirmedAppointment } from "./appointment-confirmation.ts";

test("a scheduled assessment that matches the slot is the only appointment success", () => {
  const confirmed = confirmedAppointment({
    jobberSynced: true,
    jobberRequestId: "request-1",
    assessmentScheduled: true,
    assessmentMatchesSlot: true,
  });
  assert.equal(confirmed.ok, true);
  if (confirmed.ok) assert.equal(confirmed.jobberRequestId, "request-1");
});

test("a request id without a matching assessment is not a booking", () => {
  for (const result of [
    null,
    undefined,
    {},
    { jobberSynced: true, jobberRequestId: "request-1" },
    { jobberSynced: true, jobberRequestId: "request-1", assessmentScheduled: true, assessmentMatchesSlot: false },
    { jobberSynced: true, jobberRequestId: "request-1", assessmentScheduled: false, assessmentMatchesSlot: true },
    { jobberSynced: false, jobberRequestId: "request-1", assessmentScheduled: false, assessmentMatchesSlot: false },
    { jobberSynced: true, jobberRequestId: "  ", assessmentScheduled: true, assessmentMatchesSlot: true },
  ]) {
    const decision = confirmedAppointment(result);
    assert.equal(decision.ok, false);
  }
  const pending = confirmedAppointment({
    jobberSynced: false,
    jobberRequestId: "request-1",
    assessmentScheduled: false,
    assessmentMatchesSlot: false,
  });
  assert.equal(pending.ok, false);
  if (!pending.ok) assert.equal(pending.pendingRequestId, "request-1");
});

test("the appointment route returns success only after the assessment matches the slot", () => {
  const route = readFileSync(new URL("../../app/api/appointments/route.ts", import.meta.url), "utf8");
  const page = readFileSync(new URL("../../app/book-appointment/page.tsx", import.meta.url), "utf8");
  assert.match(route, /runGuardedAppointment/);
  assert.match(route, /TIME_NOT_RESERVED/);
  assert.match(route, /status: 502/);
  assert.match(route, /status: 503/);
  assert.match(page, /result\.assessmentScheduled !== true/);
  const gate = page.indexOf("result.assessmentScheduled !== true");
  const thanks = page.indexOf("setConfirmation(");
  assert.equal(gate > -1 && thanks > gate, true);
});
