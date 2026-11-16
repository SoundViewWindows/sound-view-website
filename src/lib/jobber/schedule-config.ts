export const APPOINTMENT_LOCATIONS = [
  {
    id: "lake-city",
    name: "Lake City",
    address: "12301 Lake City Way NE, Seattle, WA 98125",
    phone: "(206) 572-3411",
    note: "",
  },
  {
    id: "queen-anne",
    name: "Queen Anne",
    address: "921 Elliott Ave W, Seattle, WA 98119",
    phone: "(206) 402-4229",
    note: "",
  },
  {
    id: "bellevue",
    name: "Bellevue",
    address: "13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005",
    phone: "(425) 417-3005",
    note: "By Appointment Only",
  },
] as const;

export type AppointmentLocationId = (typeof APPOINTMENT_LOCATIONS)[number]["id"];
export type AppointmentLocationName = (typeof APPOINTMENT_LOCATIONS)[number]["name"];

const LOCATION_USER_ENV: Record<AppointmentLocationId, string> = {
  "lake-city": "JOBBER_SCHEDULER_USER_IDS_LAKE_CITY",
  "queen-anne": "JOBBER_SCHEDULER_USER_IDS_QUEEN_ANNE",
  bellevue: "JOBBER_SCHEDULER_USER_IDS_BELLEVUE",
};

export function appointmentLocationById(value: string | null | undefined) {
  return APPOINTMENT_LOCATIONS.find((location) => location.id === value) ?? null;
}

export function appointmentLocationByName(value: string | null | undefined) {
  return APPOINTMENT_LOCATIONS.find((location) => location.name === value) ?? null;
}

export function schedulerUserIdsForLocation(id: AppointmentLocationId) {
  const specific = process.env[LOCATION_USER_ENV[id]]?.trim();
  const raw = specific || process.env.JOBBER_SCHEDULER_USER_IDS?.trim() || "";
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
