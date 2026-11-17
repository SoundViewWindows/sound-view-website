import { findBookingUserId } from "@/lib/jobber/booking-user";
import { jobberGraphql } from "@/lib/jobber/graphql";
import { type JobberAppointmentPayload } from "@/lib/jobber/booking-types";
import { reserveScheduledAppointment } from "./appointment-reserve";

export { appointmentRequestTitle, appointmentSummary, assessmentMatchesRequestedSlot } from "./appointment-reserve";

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

type ClientPropertiesData = {
  client: {
    properties: {
      nodes: { id: string; address?: { street1?: string | null; postalCode?: string | null } | null }[];
    } | null;
  } | null;
};

type ScheduledAssessment = { id: string; startAt: string | null; endAt: string | null } | null;

type RequestCreateData = {
  requestCreate: {
    request: {
      id: string;
      title: string | null;
      jobberWebUri: string | null;
      assessment: ScheduledAssessment;
    } | null;
    userErrors: UserError[];
  };
};

type AssessmentCreateData = {
  assessmentCreate: {
    assessment: ScheduledAssessment;
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
  assessmentMatchesSlot: boolean;
};

export type { JobberCaller } from "./appointment-reserve";

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

const clientPropertiesQuery = `
  query WebsiteClientProperties($id: EncodedId!) {
    client(id: $id) {
      properties(first: 20) {
        nodes {
          id
          address {
            street1
            postalCode
          }
        }
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
  pendingRequestId?: string | null,
): Promise<AppointmentSyncResult> {
  const bookingUserId = await findBookingUserId();
  const clientId = await matchOrCreateClient(appointment);
  const propertyId = await createProperty(clientId, appointment);
  await recordConsentNote(clientId, appointment);
  const request = await reserveScheduledAppointment({
    graphql: jobberGraphql,
    clientId,
    propertyId,
    appointment,
    referenceId,
    bookingUserId,
    pendingRequestId,
  });
  const booked = Boolean(request.requestId) && request.assessmentScheduled && request.assessmentMatchesSlot;
  return {
    jobberSynced: booked,
    jobberRequestId: request.requestId,
    jobberWebUri: request.jobberWebUri,
    clientId,
    propertyId,
    assessmentScheduled: request.assessmentScheduled,
    assessmentMatchesSlot: request.assessmentMatchesSlot,
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
    return data.propertyCreate.properties?.[0]?.id ?? (await findProperty(clientId, appointment));
  } catch (error) {
    console.error(
      "appointment property was not created",
      error instanceof Error ? error.message : "Jobber did not create the property.",
    );
    return findProperty(clientId, appointment);
  }
}

async function findProperty(clientId: string, appointment: JobberAppointmentPayload) {
  try {
    const data = await jobberGraphql<ClientPropertiesData>(clientPropertiesQuery, { id: clientId });
    const street = appointment.address.street.trim().toLowerCase();
    const zip = appointment.address.zip.trim();
    const nodes = data.client?.properties?.nodes ?? [];
    const match = nodes.find((property) => {
      const propertyStreet = property.address?.street1?.trim().toLowerCase() ?? "";
      const propertyZip = property.address?.postalCode?.trim() ?? "";
      return propertyStreet === street && propertyZip === zip;
    });
    return match?.id ?? null;
  } catch (error) {
    console.info(
      "appointment property lookup was unavailable",
      error instanceof Error ? error.message : "Jobber did not return properties.",
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

function e164Phone(phone: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? `+1${digits}` : phone;
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
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
