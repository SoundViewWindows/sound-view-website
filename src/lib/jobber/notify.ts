import { quoteNotifyConfig } from "@/lib/jobber/config";

export type QuoteNotification = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  serviceTitle: string;
  form: string;
  details: string;
  answers: { label: string; value: string }[];
  photoNames: string[] | null;
  requestTitle: string;
  jobberWebUri: string | null;
  requestId: string;
};

export type AppointmentNotification = {
  referenceId: string;
  requestTitle: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  requestedWhen: string;
  products: string;
  installationNeeded: string;
  workingWith: string;
  referralSource: string;
  scopeOfWork: string;
  marketingEmail: string;
  marketingSms: string;
  imageNames: string[];
  jobberRequestId: string | null;
  jobberWebUri: string | null;
};

export function logQuoteNotificationFailure(requestId: string, reason: string) {
  console.error(`Quote notification failed for Jobber request ${requestId}: ${reason}`);
}

export async function sendQuoteNotification(notice: QuoteNotification) {
  const answers = notice.answers.map((answer) => `${answer.label}: ${answer.value}`);
  const photos = notice.photoNames
    ? `File names selected: ${
        notice.photoNames.length > 0 ? notice.photoNames.join(", ") : "None"
      }. File names only. The photo and video files were not uploaded.`
    : "This form did not include a file field.";
  await sendNotificationEmail(notice.requestTitle, [
    notice.requestTitle,
    "",
    `Name: ${notice.name}`,
    `Phone: ${notice.phone}`,
    `Email: ${notice.email}`,
    `ZIP: ${notice.zip}`,
    `Service: ${notice.serviceTitle}`,
    `Website form: ${notice.form}`,
    ...answers,
    `Project details: ${notice.details.trim() || "None provided"}`,
    photos,
    `Jobber request id: ${notice.requestId}`,
    `Jobber request: ${notice.jobberWebUri || "Link was not returned"}`,
  ]);
}

export async function sendAppointmentNotification(notice: AppointmentNotification) {
  const images =
    notice.imageNames.length > 0
      ? `${notice.imageNames.join(", ")}. File names only. The image files were not uploaded.`
      : "None. File names only. The image files were not uploaded.";
  await sendNotificationEmail("New Appointment Booking", [
    "New Appointment Booking",
    "",
    `Jobber title: ${notice.requestTitle}`,
    `Reference ID: ${notice.referenceId}`,
    `Name: ${notice.name}`,
    `Company: ${notice.companyName || "-"}`,
    `Phone: ${notice.phone}`,
    `Email: ${notice.email}`,
    `Address: ${notice.address}`,
    `Location: ${notice.location}`,
    `Requested date and time: ${notice.requestedWhen}`,
    `Products requested: ${notice.products}`,
    `Installation needed: ${notice.installationNeeded}`,
    `Working with someone at Sound View: ${notice.workingWith}`,
    `How did you hear about us: ${notice.referralSource}`,
    `Scope of work: ${notice.scopeOfWork.trim() || "None provided"}`,
    `Marketing email: ${notice.marketingEmail}`,
    `Marketing SMS: ${notice.marketingSms}`,
    `Uploaded images: ${images}`,
    `Jobber request id: ${notice.jobberRequestId || "Not created"}`,
    `Jobber request: ${notice.jobberWebUri || "Link was not returned"}`,
  ]);
}

async function sendNotificationEmail(subject: string, lines: string[]) {
  const notify = quoteNotifyConfig();
  if (!notify.apiKey || !notify.from || notify.to.length === 0) {
    throw new Error("Quote notification settings are incomplete.");
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notify.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: notify.from,
      to: notify.to,
      subject,
      text: lines.join("\n"),
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Resend returned HTTP ${response.status}.`);
  }
}
