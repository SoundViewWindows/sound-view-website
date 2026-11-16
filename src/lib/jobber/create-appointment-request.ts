import { jobberGraphql } from "@/lib/jobber/graphql";
import {
  APPOINTMENT_TIME_SLOTS,
  APPOINTMENT_TIME_ZONE,
  type JobberAppointmentPayload,
} from "@/lib/jobber/booking-types";

type UserError = { message?: string | null; path?: string[] | null };

type ClientMatchData = {
  clients: {
    nodes: { id: string; emails: { address: string | null }[] }[];
  } | null;
};

type ClientCreateData = {
  clientCreate: {
    client: { id: string } | null;
    userErrors: UserError[];
  };
};

type PropertyCreateData = {
  propertyCreate: {
    properties: { id: string }[] | null;
    userErrors: UserError[];
  };
};

type RequestCreateData = {
  requestCreate: {
    request: { id: string; title: string | null; jobberWebUri: string | null } | null;
    userErrors: UserError[];
  };
};

type NoteCreateData = {
  clientCreateNote: {
    clientNote: { id: string } | null;
    userErrors: UserError[];
  };
};

export type AppointmentSyncResult = {
  jobberSynced: boolean;
  jobberRequestId: string | null;
  jobberWebUri: string | null;
  clientId: string | null;
  propertyId: string | null;
  assessmentScheduled: boolean;
};

const matchClientQuery = `
  query MatchWebsiteAppointmentClient($search: String!) {
    clients(searchTerm: $search, first: 5) {
      nodes {
        id
        emails {
          address
        }
      }
    }
  }
`;

const createClientMutation = `
  mutation CreateWebsiteAppointmentClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const createPropertyMutation = `
  mutation CreateWebsiteAppointmentProperty($clientId: EncodedId!, $input: PropertyCreateInput!) {
    propertyCreate(clientId: $clientId, input: $input) {
      properties {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const createRequestMutation = `
  mutation CreateWebsiteAppointmentRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request {
        id
        title
        jobberWebUri
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const createClientNoteMutation = `
  mutation CreateWebsiteAppointmentClientNote($clientId: EncodedId!, $message: String!) {
    clientCreateNote(clientId: $clientId, input: { message: $message }) {
      clientNote {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export async function createWebsiteAppointment(
  appointment: JobberAppointmentPayload,
  referenceId: string,
): Promise<AppointmentSyncResult> {
  const clientId = await matchOrCreateClient(appointment);
  const propertyId = await createProperty(clientId, appointment);
  await recordConsentNote(clientId, appointment);
  const request = await createRequest(clientId, propertyId, appointment, referenceId);
  return {
    jobberSynced: true,
    jobberRequestId: request.id,
    jobberWebUri: request.jobberWebUri,
    clientId,
    propertyId,
    assessmentScheduled: request.assessmentScheduled,
  };
}

export function appointmentRequestTitle(appointment: JobberAppointmentPayload) {
  const products = appointment.serviceDetails.products.join(", ") || "Appointment";
  const start = appointment.schedule.timeSlot.split(" - ")[0] || appointment.schedule.timeSlot;
  const title = `Website Appointment Request: ${products} (${shortDate(appointment.schedule.date)} at ${start})`;
  return title.length > 180 ? `${title.slice(0, 177)}...` : title;
}

export function appointmentSummary(appointment: JobberAppointmentPayload, referenceId: string) {
  return {
    title: appointmentRequestTitle(appointment),
    requestedWhen: `${longDate(appointment.schedule.date)} | ${appointment.schedule.timeSlot} (${APPOINTMENT_TIME_ZONE})`,
    products: appointment.serviceDetails.products.join(", "),
    installationNeeded: appointment.serviceDetails.installationNeeded ? "Yes" : "No",
    workingWith: workingWithText(appointment),
    referralSource: appointment.serviceDetails.referralSource || "Not provided",
    scopeOfWork: appointment.serviceDetails.scopeOfWork,
    address: formatAddress(appointment),
    imageNames: appointment.serviceDetails.images.map((image) => image.name),
    referenceId,
  };
}

async function matchOrCreateClient(appointment: JobberAppointmentPayload) {
  const matched = await findClientByEmail(appointment.contact.email);
  if (matched) return matched;
  const phone = e164Phone(appointment.contact.phone);
  const input: Record<string, unknown> = {
    firstName: appointment.contact.firstName,
    lastName: appointment.contact.lastName,
    receivesReminders: true,
    emails: [{ description: "MAIN", primary: true, address: appointment.contact.email }],
    phones: [
      {
        description: "MOBILE",
        primary: true,
        number: phone,
        smsAllowed: true,
      },
    ],
  };
  if (appointment.contact.companyName) {
    input.companyName = appointment.contact.companyName;
    input.isCompany = true;
  }
  const data = await jobberGraphql<ClientCreateData>(createClientMutation, { input });
  assertNoUserErrors(data.clientCreate.userErrors, "Jobber did not create the client.");
  const clientId = data.clientCreate.client?.id;
  if (!clientId) throw new Error("Jobber did not create the client.");
  return clientId;
}

async function findClientByEmail(email: string) {
  try {
    const data = await jobberGraphql<ClientMatchData>(matchClientQuery, { search: email });
    const target = email.trim().toLowerCase();
    const match = data.clients?.nodes.find((client) =>
      client.emails.some((item) => item.address?.trim().toLowerCase() === target),
    );
    return match?.id ?? null;
  } catch (error) {
    console.info(
      "appointment client search skipped",
      error instanceof Error ? error.message : "Jobber client search was not available.",
    );
    return null;
  }
}

async function createProperty(clientId: string, appointment: JobberAppointmentPayload) {
  const address: Record<string, string> = {
    street1: appointment.address.street,
    city: appointment.address.city,
    province: appointment.address.state,
    postalCode: appointment.address.zip,
    country: "US",
  };
  if (appointment.address.unit) address.street2 = appointment.address.unit;
  try {
    const data = await jobberGraphql<PropertyCreateData>(createPropertyMutation, {
      clientId,
      input: { properties: [{ address }] },
    });
    assertNoUserErrors(data.propertyCreate.userErrors, "Jobber did not create the property.");
    return data.propertyCreate.properties?.[0]?.id ?? null;
  } catch (error) {
    console.error(
      "appointment property was not created",
      error instanceof Error ? error.message : "Jobber did not create the property.",
    );
    return null;
  }
}

async function recordConsentNote(clientId: string, appointment: JobberAppointmentPayload) {
  const message = [
    "Website appointment consent",
    `Marketing email: ${yesNo(appointment.consents.marketingEmail)}`,
    `Transactional SMS: ${yesNo(appointment.consents.transactionalSms)}`,
    `Marketing SMS: ${yesNo(appointment.consents.marketingSms)}`,
  ].join("\n");
  try {
    const data = await jobberGraphql<NoteCreateData>(createClientNoteMutation, { clientId, message });
    assertNoUserErrors(data.clientCreateNote.userErrors, "Jobber did not save the client note.");
  } catch (error) {
    console.info(
      "appointment consent note was not saved",
      error instanceof Error ? error.message : "Jobber did not save the client note.",
    );
  }
}

async function createRequest(
  clientId: string,
  propertyId: string | null,
  appointment: JobberAppointmentPayload,
  referenceId: string,
) {
  const summary = appointmentSummary(appointment, referenceId);
  const items = [
    { label: "Name", answerText: `${appointment.contact.firstName} ${appointment.contact.lastName}` },
    { label: "Company", answerText: appointment.contact.companyName || "-" },
    { label: "Email", answerText: appointment.contact.email },
    { label: "Phone", answerText: appointment.contact.phone },
    { label: "Address", answerText: summary.address },
    { label: "Requested date and time", answerText: summary.requestedWhen },
    { label: "Products requested", answerText: summary.products },
    { label: "Installation needed", answerText: summary.installationNeeded },
    { label: "Working with someone at Sound View", answerText: summary.workingWith },
    { label: "How did you hear about us", answerText: summary.referralSource },
    { label: "Scope of work", answerText: summary.scopeOfWork },
    { label: "Reference ID", answerText: referenceId },
    { label: "Marketing email", answerText: yesNo(appointment.consents.marketingEmail) },
    { label: "Marketing SMS", answerText: yesNo(appointment.consents.marketingSms) },
    {
      label: "Uploaded image names",
      answerText:
        summary.imageNames.length > 0
          ? `${summary.imageNames.join(", ")}. File names only. The image files were not uploaded.`
          : "None. File names only. The image files were not uploaded.",
    },
  ];
  const base: Record<string, unknown> = {
    clientId,
    title: summary.title,
    requestDetails: {
      form: {
        sections: [
          {
            label: "Website appointment",
            items: [
              ...items,
              {
                label: "Request description",
                answerText: items.map((item) => `${item.label}: ${item.answerText}`).join("\n"),
              },
            ],
          },
        ],
      },
    },
  };
  if (propertyId) base.propertyId = propertyId;

  const slot = APPOINTMENT_TIME_SLOTS.find((item) => item.label === appointment.schedule.timeSlot);
  const withAssessment = slot
    ? {
        ...base,
        assessment: {
          instructions: items.map((item) => `${item.label}: ${item.answerText}`).join("\n"),
          schedule: {
            startAt: localDateTime(appointment.schedule.date, slot.startHour),
            endAt: localDateTime(appointment.schedule.date, slot.startHour + 1),
          },
        },
      }
    : base;

  if (!slot) {
    const created = await submitRequest(base);
    return { ...created.request, assessmentScheduled: false };
  }

  try {
    const created = await submitRequest(withAssessment);
    if (created.request) {
      return { ...created.request, assessmentScheduled: !created.assessmentRejected };
    }
  } catch (error) {
    console.info(
      "appointment assessment was not scheduled",
      error instanceof Error ? error.message : "Jobber did not schedule the assessment.",
    );
  }

  const created = await submitRequest(base);
  if (!created.request) throw new Error("Jobber did not create the request.");
  return { ...created.request, assessmentScheduled: false };
}

async function submitRequest(input: Record<string, unknown>) {
  const data = await jobberGraphql<RequestCreateData>(createRequestMutation, { input });
  const request = data.requestCreate.request;
  const assessmentRejected = userErrorsMentionAssessment(data.requestCreate.userErrors);
  if (request?.id) {
    if (data.requestCreate.userErrors?.length) {
      console.info(
        "appointment request saved with Jobber warnings",
        data.requestCreate.userErrors.map((error) => error.message).filter(Boolean).join(" "),
      );
    }
    return { request, assessmentRejected };
  }
  if (assessmentRejected) return { request: null, assessmentRejected: true };
  assertNoUserErrors(data.requestCreate.userErrors, "Jobber did not create the request.");
  throw new Error("Jobber did not create the request.");
}

function userErrorsMentionAssessment(errors: UserError[] | null | undefined) {
  return (errors ?? []).some((error) => {
    const path = (error.path ?? []).join(" ").toLowerCase();
    const message = (error.message ?? "").toLowerCase();
    return path.includes("assessment") || message.includes("assessment") || message.includes("schedule");
  });
}

function localDateTime(isoDate: string, hour: number) {
  return {
    date: isoDate,
    time: `${String(hour).padStart(2, "0")}:00:00`,
    timezone: APPOINTMENT_TIME_ZONE,
  };
}

function workingWithText(appointment: JobberAppointmentPayload) {
  if (!appointment.serviceDetails.workingWithSoundView) return "No";
  return appointment.serviceDetails.workingWithName
    ? `Yes (${appointment.serviceDetails.workingWithName})`
    : "Yes";
}

function formatAddress(appointment: JobberAppointmentPayload) {
  const street = [appointment.address.street, appointment.address.unit].filter(Boolean).join(", ");
  return `${street}, ${appointment.address.city}, ${appointment.address.state} ${appointment.address.zip}`;
}

function e164Phone(phone: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? `+1${digits}` : phone;
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
}

function shortDate(iso: string) {
  return formatDate(iso, { month: "short", day: "numeric", year: "numeric" });
}

function longDate(iso: string) {
  return formatDate(iso, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatDate(iso: string, options: Intl.DateTimeFormatOptions) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(
    new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))),
  );
}

function assertNoUserErrors(errors: UserError[] | null | undefined, fallback: string) {
  if (!errors?.length) return;
  const message = errors
    .map((error) => error.message)
    .filter(Boolean)
    .join(" ");
  throw new Error(message || fallback);
}
