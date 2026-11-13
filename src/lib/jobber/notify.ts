import { quoteNotifyConfig } from "@/lib/jobber/config";

export type QuoteNotification = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  serviceTitle: string;
  details: string;
  photoNames: string[];
  requestTitle: string;
  jobberWebUri: string | null;
  requestId: string;
};

export async function sendQuoteNotification(notice: QuoteNotification) {
  const notify = quoteNotifyConfig();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notify.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: notify.from,
      to: notify.to,
      subject: notice.requestTitle,
      text: [
        notice.requestTitle,
        "",
        `Name: ${notice.name}`,
        `Phone: ${notice.phone}`,
        `Email: ${notice.email}`,
        `ZIP: ${notice.zip}`,
        `Service: ${notice.serviceTitle}`,
        `Project details: ${notice.details.trim() || "None provided"}`,
        `Photos selected: ${notice.photoNames.length > 0 ? notice.photoNames.join(", ") : "None"}`,
        `Jobber request id: ${notice.requestId}`,
        `Jobber request: ${notice.jobberWebUri || "Link was not returned"}`,
      ].join("\n"),
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("The notification email did not send.");
  }
}
