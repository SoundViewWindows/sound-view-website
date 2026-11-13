export type QuoteAnswer = {
  label: string;
  value: string;
};

export type WebsiteQuoteSubmission = {
  name: string;
  phone: string;
  zip: string;
  email: string;
  projectType: string;
  details: string;
  answers: QuoteAnswer[];
  form: string;
  photoNames?: string[];
};

type Customer = {
  name: string;
  phone: string;
  zip: string;
  email: string;
};

export function standardQuoteSubmission(
  input: Customer & {
    variant: "sidebar" | "horizontal";
    projectType: string;
    details: string;
    photoNames: string[];
  },
): WebsiteQuoteSubmission {
  return {
    name: input.name,
    phone: input.phone,
    zip: input.zip,
    email: input.email,
    projectType: input.projectType,
    details: input.details,
    answers: [],
    form: input.variant === "sidebar" ? "Homepage quote" : "Interior quote",
    photoNames: input.photoNames,
  };
}

export function windowQuoteSubmission(
  input: Customer & {
    notes: string;
    windowCount: string;
    material: string;
    style: string;
    manufacturer: string;
  },
): WebsiteQuoteSubmission {
  return {
    name: input.name,
    phone: input.phone,
    zip: input.zip,
    email: input.email,
    projectType: "window-replacement",
    details: input.notes,
    form: "Window quote",
    answers: [
      { label: "Approximate window count", value: input.windowCount },
      { label: "Preferred material", value: input.material || "No preference yet" },
      { label: "Preferred window style", value: input.style || "No preference yet" },
      { label: "Preferred manufacturer", value: input.manufacturer || "No preference yet" },
    ],
  };
}

export function doorQuoteSubmission(
  input: Customer & {
    notes: string;
    doorCount: string;
    style: string;
    material: string;
    manufacturer: string;
  },
): WebsiteQuoteSubmission {
  return {
    name: input.name,
    phone: input.phone,
    zip: input.zip,
    email: input.email,
    projectType: "door-replacement",
    details: input.notes,
    form: "Door quote",
    answers: [
      { label: "Approximate door count", value: input.doorCount },
      { label: "Preferred door style", value: input.style || "No preference yet" },
      { label: "Preferred material", value: input.material || "No preference yet" },
      { label: "Preferred manufacturer", value: input.manufacturer || "No preference yet" },
    ],
  };
}

export function glassQuoteSubmission(
  input: Customer & {
    notes: string;
    paneCount: string;
    glassType: string;
  },
): WebsiteQuoteSubmission {
  return {
    name: input.name,
    phone: input.phone,
    zip: input.zip,
    email: input.email,
    projectType: "glass-replacement",
    details: input.notes,
    form: "Glass quote",
    answers: [
      { label: "Estimated pane count", value: input.paneCount },
      { label: "Preferred glass type", value: input.glassType || "No preference yet" },
    ],
  };
}

export function showerQuoteSubmission(
  input: Customer & {
    notes: string;
    layout: string;
    style: string;
  },
): WebsiteQuoteSubmission {
  return {
    name: input.name,
    phone: input.phone,
    zip: input.zip,
    email: input.email,
    projectType: "shower-door-replacement",
    details: input.notes,
    form: "Shower door quote",
    answers: [
      { label: "Enclosure layout", value: input.layout },
      { label: "Preferred shower door style", value: input.style || "No preference yet" },
    ],
  };
}

export function railingQuoteSubmission(
  input: Customer & {
    notes: string;
  },
): WebsiteQuoteSubmission {
  return {
    name: input.name,
    phone: input.phone,
    zip: input.zip,
    email: input.email,
    projectType: "glass-railing-installation",
    details: input.notes,
    form: "Glass railing request",
    answers: [],
  };
}

const REQUEST_TITLES: Record<string, string> = {
  "window-replacement": "Window Replacement Quote",
  "door-replacement": "Door Replacement Quote",
  "shower-door-replacement": "Shower Door Quote",
  "glass-replacement": "Glass Replacement Quote",
  "glass-railing-installation": "Glass Railing Request",
  "window-blinds-shades": "Window Blinds & Shades Quote",
};

export function quoteRequestTitle(input: { projectType: string; form: string }) {
  if (input.form === "Glass railing request" || input.projectType === "glass-railing-installation") {
    return "Glass Railing Request";
  }
  if (input.form === "Shower door quote" || input.projectType === "shower-door-replacement") {
    return "Shower Door Quote";
  }
  return REQUEST_TITLES[input.projectType] ?? "Website Quote";
}

export function splitCustomerName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "Website";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

export function jobberQuoteInputs(input: {
  name: string;
  phone: string;
  zip: string;
  email: string;
  form: string;
  details: string;
  answers: QuoteAnswer[];
  photoNames?: string[] | null;
  projectType: string;
  serviceTitle: string;
  clientId: string;
}) {
  const { firstName, lastName } = splitCustomerName(input.name);
  const items = websiteQuoteAnswerItems(input);
  return {
    clientMutation: "ClientCreateInput",
    requestMutation: "RequestCreateInput",
    clientInput: {
      firstName,
      lastName,
      emails: [{ description: "MAIN", primary: true, address: input.email }],
    },
    requestInput: {
      clientId: input.clientId,
      title: quoteRequestTitle(input),
      requestDetails: {
        form: {
          sections: [
            {
              label: "Website quote",
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
    },
  };
}

export function normalizeQuoteBody(body: {
  name?: unknown;
  phone?: unknown;
  zip?: unknown;
  email?: unknown;
  projectType?: unknown;
  details?: unknown;
  photoNames?: unknown;
  answers?: unknown;
  form?: unknown;
} | null):
  | {
      ok: true;
      value: {
        name: string;
        phone: string;
        zip: string;
        email: string;
        projectType: string;
        details: string;
        answers: QuoteAnswer[];
        form: string;
        photoNames: string[] | null;
      };
    }
  | { ok: false; message: string } {
  const name = textValue(body?.name);
  const phone = textValue(body?.phone);
  const zip = textValue(body?.zip);
  const email = textValue(body?.email);
  const projectType = textValue(body?.projectType);
  const details = textValue(body?.details);
  const form = textValue(body?.form).trim() || "Website quote";
  const photoNames = Array.isArray(body?.photoNames)
    ? body.photoNames.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, 5)
    : null;
  const answers = normalizeAnswers(body?.answers);

  if (name.trim().length < 2) return { ok: false, message: "Enter your name. Your details are still here." };
  if (phone.replace(/\D/g, "").length < 10) {
    return { ok: false, message: "Enter a phone number with an area code. Your details are still here." };
  }
  if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
    return { ok: false, message: "Enter a 5 digit ZIP code. Your details are still here." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { ok: false, message: "Enter a valid email address. Your details are still here." };
  }
  if (!projectType) return { ok: false, message: "Choose a project type. Your details are still here." };
  if (details.trim().length > 2000) {
    return { ok: false, message: "Keep project details under 2,000 characters. Your details are still here." };
  }
  if (!answers.ok) return answers;

  return {
    ok: true,
    value: {
      name: name.trim(),
      phone: phone.trim(),
      zip: zip.trim(),
      email: email.trim(),
      projectType,
      details,
      answers: answers.value,
      form: form.slice(0, 80),
      photoNames,
    },
  };
}

function normalizeAnswers(value: unknown): { ok: true; value: QuoteAnswer[] } | { ok: false; message: string } {
  if (value == null) return { ok: true, value: [] };
  if (!Array.isArray(value) || value.length > 20) {
    return { ok: false, message: "We could not read the quote details. Your details are still here." };
  }
  const answers: QuoteAnswer[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      return { ok: false, message: "We could not read the quote details. Your details are still here." };
    }
    const label = textValue("label" in item ? item.label : "").trim();
    const answer = textValue("value" in item ? item.value : "").trim();
    if (!label || label.length > 80 || answer.length > 2000) {
      return { ok: false, message: "We could not read the quote details. Your details are still here." };
    }
    answers.push({ label, value: answer || "None provided" });
  }
  return { ok: true, value: answers };
}

function textValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function submitWebsiteQuote(
  input: WebsiteQuoteSubmission,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
    if (!response.ok || !payload?.ok) {
      return {
        ok: false,
        message: payload?.message || "We could not send your quote request. Your details are still here.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "We could not send your quote request. Your details are still here." };
  }
}

export function websiteQuoteAnswerItems(input: {
  form: string;
  name: string;
  phone: string;
  zip: string;
  email: string;
  serviceTitle: string;
  details: string;
  answers: QuoteAnswer[];
  photoNames?: string[] | null;
}) {
  const items = [
    { label: "Website form", answerText: input.form },
    { label: "Name", answerText: input.name },
    { label: "Phone", answerText: input.phone },
    { label: "Email", answerText: input.email },
    { label: "ZIP", answerText: input.zip },
    { label: "Service", answerText: input.serviceTitle },
    ...input.answers.map((answer) => ({ label: answer.label, answerText: answer.value })),
    { label: "Project details", answerText: input.details.trim() || "None provided" },
  ];
  if (input.photoNames) {
    items.push({
      label: "File names selected on the website",
      answerText:
        input.photoNames.length > 0
          ? `${input.photoNames.join(", ")}. File names only. The photo and video files were not uploaded.`
          : "None. File names only. The photo and video files were not uploaded.",
    });
  }
  return items;
}
