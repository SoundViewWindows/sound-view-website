import assert from "node:assert/strict";
import test from "node:test";
import { isCompanyClosedDate, openSlotLabels, type BusyInterval } from "./booking-schedule.ts";

const beforeTheMonth = new Date("2026-11-01T18:00:00.000Z");

function pacific(date: string, hours: number, minutes: number) {
  const hour = String(hours).padStart(2, "0");
  const minute = String(minutes).padStart(2, "0");
  return Date.parse(`${date}T${hour}:${minute}:00.000-08:00`);
}

test("a 12:30 PM to 3:30 PM block removes every overlapping hour on November 18", () => {
  const busy: BusyInterval[] = [
    { start: pacific("2026-11-18", 12, 30), end: pacific("2026-11-18", 15, 30) },
  ];
  const open = openSlotLabels("2026-11-18", busy, beforeTheMonth);
  for (const label of ["12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM"]) {
    assert.equal(open.includes(label), false, label);
  }
  for (const label of ["8:00 AM - 9:00 AM", "11:00 AM - 12:00 PM"]) {
    assert.equal(open.includes(label), true, label);
  }
});

test("overlap is inclusive of a partial hour at either end", () => {
  const morning: BusyInterval[] = [
    { start: pacific("2026-11-18", 9, 15), end: pacific("2026-11-18", 9, 45) },
  ];
  const morningOpen = openSlotLabels("2026-11-18", morning, beforeTheMonth);
  assert.equal(morningOpen.includes("9:00 AM - 10:00 AM"), false);
  assert.equal(morningOpen.includes("8:00 AM - 9:00 AM"), true);
  assert.equal(morningOpen.includes("10:00 AM - 11:00 AM"), true);

  const endingAtThreeThirty: BusyInterval[] = [
    { start: pacific("2026-11-18", 15, 30), end: pacific("2026-11-18", 16, 0) },
  ];
  const afternoonOpen = openSlotLabels("2026-11-18", endingAtThreeThirty, beforeTheMonth);
  assert.equal(afternoonOpen.includes("3:00 PM - 4:00 PM"), false);
  assert.equal(afternoonOpen.includes("2:00 PM - 3:00 PM"), true);
});

test("a block that ends when a slot starts does not remove that slot", () => {
  const busy: BusyInterval[] = [
    { start: pacific("2026-11-18", 11, 0), end: pacific("2026-11-18", 12, 0) },
  ];
  const open = openSlotLabels("2026-11-18", busy, beforeTheMonth);
  assert.equal(open.includes("11:00 AM - 12:00 PM"), false);
  assert.equal(open.includes("12:00 PM - 1:00 PM"), true);
});

test("holiday closures and the 24 hour notice stay in front of busy time", () => {
  assert.equal(isCompanyClosedDate("2026-11-26"), true);
  assert.deepEqual(openSlotLabels("2026-11-26", [], beforeTheMonth), []);
  const duringTheAfternoon = new Date("2026-11-18T20:00:00.000Z");
  const open = openSlotLabels("2026-11-19", [], duringTheAfternoon);
  assert.equal(open.includes("8:00 AM - 9:00 AM"), false);
  assert.equal(open.includes("12:00 PM - 1:00 PM"), true);
});
