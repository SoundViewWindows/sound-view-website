import { pacificWallTimeToUtc } from "./booking-schedule";
import { APPOINTMENT_TIME_SLOTS, APPOINTMENT_TIME_ZONE, type JobberAppointmentPayload } from "./booking-types";

type UserError = { message?: string | null; path?: string[] | null };
type ScheduledAssessment = { id: string; startAt: string | null; endAt: string | null } | null;
type RequestCreateData = {
  requestCreate: {
    request: { id: string; title: string | null; jobberWebUri: string | null; assessment: ScheduledAssessment } | null;
    userErrors: UserError[];
  };
};
type AssessmentCreateData = {
  assessmentCreate: { assessment: ScheduledAssessment; userErrors: UserError[] };
};

export type JobberCaller = <T>(query: string, variables: Record<string, unknown>) => Promise<T>;

const createRequestMutation = `
  mutation CreateWebsiteAppointmentRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request { id title jobberWebUri assessment { id startAt endAt } }
      userErrors { message path }
    }
  }
`;

const createAssessmentMutation = `
  mutation CreateWebsiteAppointmentAssessment($requestId: EncodedId!, $input: AssessmentCreateInput!) {
    assessmentCreate(requestId: $requestId, input: $input) {
      assessment { id startAt endAt }
      userErrors { message path }
    }
  }
`;

export function appointmentRequestTitle(_appointment: JobberAppointmentPayload) {
  return "Website Appointment Booking";
}

export function appointmentSummary(appointment: JobberAppointmentPayload, referenceId: string) {
  return {
    title: appointmentRequestTitle(appointment),
    location: appointment.location,
    requestedWhen: longDate(appointment.schedule.date) + " | " + appointment.schedule.timeSlot + " (" + APPOINTMENT_TIME_ZONE + ")",
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

export function assessmentMatchesRequestedSlot(
  assessment: ScheduledAssessment,
  appointment: Pick<JobberAppointmentPayload, "schedule">,
) {
  if (!assessment?.startAt || !assessment.endAt) return false;
  const slot = APPOINTMENT_TIME_SLOTS.find((item) => item.label === appointment.schedule.timeSlot);
  if (!slot) return false;
  const start = Date.parse(assessment.startAt);
  const end = Date.parse(assessment.endAt);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
  const expectedStart = pacificWallTimeToUtc(appointment.schedule.date, slot.startHour * 60);
  const expectedEnd = expectedStart + 60 * 60 * 1000;
  return start === expectedStart && end === expectedEnd;
}

export async function reserveScheduledAppointment(input: {
  graphql: JobberCaller;
  clientId: string;
  propertyId: string | null;
  appointment: JobberAppointmentPayload;
  referenceId: string;
  bookingUserId: string | null;
  pendingRequestId?: string | null;
}) {
  const slot = APPOINTMENT_TIME_SLOTS.find((item) => item.label === input.appointment.schedule.timeSlot);
  if (!slot) throw new Error("Jobber did not create the request.");
  const summary = appointmentSummary(input.appointment, input.referenceId);
  const items = appointmentFormItems(input.appointment, summary);
  const assessmentInput = {
    instructions: items.map((item) => `${item.label}: ${item.answerText}`).join("\n"),
    ...(input.bookingUserId ? { assignedUserIds: [input.bookingUserId] } : {}),
    schedule: localDateTime(input.appointment.schedule.date, slot.startHour),
  };
  const pendingRequestId = input.pendingRequestId?.trim() || null;
  let requestId = pendingRequestId;
  let jobberWebUri: string | null = null;
  let assessment: ScheduledAssessment = null;
  let assessmentRejected = false;

  if (!requestId) {
    let created: Awaited<ReturnType<typeof submitRequest>> | null = null;
    try {
      created = await submitRequest(input.graphql, requestInput(input, items, assessmentInput));
    } catch (error) {
      console.error(
        "[appointment] Jobber requestCreate error:",
        error instanceof Error ? error.message : "Jobber did not create the scheduled assessment.",
      );
      throw new Error("Jobber did not create the request.");
    }
    if (!created.request?.id) throw new Error("Jobber did not create the request.");
    requestId = created.request.id;
    jobberWebUri = created.request.jobberWebUri;
    assessment = created.request.assessment;
    assessmentRejected = created.assessmentRejected;
  }

  let matches = !assessmentRejected && assessmentMatchesRequestedSlot(assessment, input.appointment);
  if (!matches) {
    const scheduled = await createAssessment(input.graphql, requestId, assessmentInput);
    matches = assessmentMatchesRequestedSlot(scheduled, input.appointment);
    if (!matches && input.bookingUserId) {
      const { assignedUserIds: _assignedUserIds, ...withoutAssignee } = assessmentInput;
      const unassigned = await createAssessment(input.graphql, requestId, withoutAssignee);
      matches = assessmentMatchesRequestedSlot(unassigned, input.appointment);
    }
  }

  return {
    requestId,
    jobberWebUri,
    assessmentScheduled: matches,
    assessmentMatchesSlot: matches,
  };
}

function appointmentFormItems(
  appointment: JobberAppointmentPayload,
  summary: ReturnType<typeof appointmentSummary>,
) {
  return [
    { label: "Name", answerText: `${appointment.contact.firstName} ${appointment.contact.lastName}` },
    { label: "Company", answerText: appointment.contact.companyName || "-" },
    { label: "Email", answerText: appointment.contact.email },
    { label: "Phone", answerText: appointment.contact.phone },
    { label: "Address", answerText: summary.address },
    { label: "Location", answerText: appointment.location },
    { label: "Requested date and time", answerText: summary.requestedWhen },
    { label: "Products requested", answerText: summary.products },
    { label: "Installation needed", answerText: summary.installationNeeded },
    { label: "Working with someone at Sound View", answerText: summary.workingWith },
    { label: "How did you hear about us", answerText: summary.referralSource },
    { label: "Scope of work", answerText: summary.scopeOfWork },
    { label: "Reference ID", answerText: summary.referenceId },
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
}

function requestInput(
  input: {
    clientId: string;
    propertyId: string | null;
  },
  items: { label: string; answerText: string }[],
  assessmentInput: Record<string, unknown>,
) {
  const base: Record<string, unknown> = {
    clientId: input.clientId,
    title: "Website Appointment Booking",
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
    assessment: assessmentInput,
  };
  if (input.propertyId) base.propertyId = input.propertyId;
  return base;
}

async function submitRequest(graphql: JobberCaller, input: Record<string, unknown>) {
  const data = await graphql<RequestCreateData>(createRequestMutation, { input });
  const request = data.requestCreate.request;
  const assessmentRejected = userErrorsMentionAssessment(data.requestCreate.userErrors);
  if (request?.id) {
    if (data.requestCreate.userErrors?.length) {
      console.error(
        "[appointment] Jobber requestCreate error:",
        data.requestCreate.userErrors.map((error) => error.message).filter(Boolean).join(" "),
      );
    }
    return { request, assessmentRejected };
  }
  if (assessmentRejected) return { request: null, assessmentRejected: true };
  assertNoUserErrors(data.requestCreate.userErrors, "Jobber did not create the request.");
  throw new Error("Jobber did not create the request.");
}

async function createAssessment(graphql: JobberCaller, requestId: string, input: Record<string, unknown>) {
  try {
    const data = await graphql<AssessmentCreateData>(createAssessmentMutation, { requestId, input });
    const errors = data.assessmentCreate.userErrors;
    if (errors?.length) {
      console.error(
        "[appointment] Jobber assessmentCreate error:",
        errors.map((error) => error.message).filter(Boolean).join(" "),
      );
    }
    return data.assessmentCreate.assessment;
  } catch (error) {
    console.error(
      "[appointment] Jobber assessmentCreate error:",
      error instanceof Error ? error.message : "Jobber did not schedule the assessment.",
    );
    return null;
  }
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

function assertNoUserErrors(errors: UserError[] | null | undefined, fallback: string) {
  if (!errors?.length) return;
  const message = errors
    .map((error) => error.message)
    .filter(Boolean)
    .join(" ");
  throw new Error(message || fallback);
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


