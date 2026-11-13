import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { services } from "./services.ts";
import {
  doorQuoteSubmission,
  glassQuoteSubmission,
  jobberQuoteInputs,
  normalizeQuoteBody,
  quoteRequestTitle,
  railingQuoteSubmission,
  showerQuoteSubmission,
  standardQuoteSubmission,
  submitWebsiteQuote,
  windowQuoteSubmission,
  type WebsiteQuoteSubmission,
} from "./quote-payloads.ts";

const customer = {
  name: "Test Website",
  phone: "206-555-0199",
  zip: "98101",
  email: "test.quote@example.com",
};

function source(file: string) {
  return readFileSync(file, "utf8");
}

function serviceTitle(projectType: string) {
  return services.find((service) => service.id === projectType)?.title ?? projectType;
}

function assertConnectedHandler(file: string, builder: string) {
  const text = source(file);
  assert.match(text, /async function handleSubmit/);
  assert.match(text, /<form[\s\S]*onSubmit=\{handleSubmit\}/);
  assert.match(text, /type="submit"/);
  assert.match(text, new RegExp(builder));
  assert.match(text, /submitWebsiteQuote\(/);
  const failure = text.indexOf("if (!result.ok)");
  const success = text.lastIndexOf("setIsSubmitted(true)");
  assert.ok(failure > 0 && success > failure, `${file} can show success before Jobber accepts the request`);
}

async function expectEndpointResult(submission: WebsiteQuoteSubmission, mode: "success" | "jobber-error" | "offline") {
  const original = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    assert.equal(String(url), "/api/quote");
    assert.equal(init?.method, "POST");
    assert.deepEqual(JSON.parse(String(init?.body)), submission);
    if (mode === "offline") throw new Error("offline");
    if (mode === "jobber-error") {
      return new Response(
        JSON.stringify({ ok: false, message: "Jobber did not accept the quote request. Your details are still here." }),
        { status: 502 },
      );
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof fetch;
  try {
    return await submitWebsiteQuote(submission);
  } finally {
    globalThis.fetch = original;
  }
}

function assertJobberMapping(submission: WebsiteQuoteSubmission, requiredAnswers: string[]) {
  const normalized = normalizeQuoteBody(submission);
  assert.equal(normalized.ok, true);
  if (!normalized.ok) return;
  const mapped = jobberQuoteInputs({
    ...normalized.value,
    serviceTitle: serviceTitle(normalized.value.projectType),
    clientId: "CLIENT_ID",
  });
  assert.equal(mapped.clientMutation, "ClientCreateInput");
  assert.equal(mapped.requestMutation, "RequestCreateInput");
  assert.equal(mapped.clientInput.emails[0]?.address, customer.email);
  assert.equal(mapped.clientInput.firstName, "Test");
  assert.equal(mapped.clientInput.lastName, "Website");
  assert.equal(mapped.requestInput.title, quoteRequestTitle(normalized.value));
  assert.equal(mapped.requestInput.title.includes("TEST - Website Quote Integration"), false);
  assert.deepEqual(Object.keys(mapped.requestInput).sort(), ["clientId", "requestDetails", "title"]);
  const items = mapped.requestInput.requestDetails.form.sections[0]?.items ?? [];
  const text = (label: string) => items.find((item) => item.label === label)?.answerText;
  assert.equal(text("Name"), customer.name);
  assert.equal(text("Phone"), customer.phone);
  assert.equal(text("Email"), customer.email);
  assert.equal(text("ZIP"), customer.zip);
  assert.equal(text("Service"), serviceTitle(submission.projectType));
  assert.equal(text("Website form"), submission.form);
  for (const label of requiredAnswers) {
    assert.equal(text(label), submission.answers.find((answer) => answer.label === label)?.value);
  }
  assert.equal(text("Project details"), submission.details);
  if (submission.photoNames) {
    const files = text("File names selected on the website") ?? "";
    assert.match(files, /File names only/);
    assert.match(files, /were not uploaded/);
    for (const name of submission.photoNames) assert.match(files, new RegExp(name.replace(".", "\\.")));
  } else {
    assert.equal(text("File names selected on the website"), undefined);
  }
  const description = text("Request description") ?? "";
  for (const label of ["Name", "Phone", "Email", "ZIP", "Service", ...requiredAnswers, "Project details"]) {
    assert.match(description, new RegExp(label));
  }
  const route = source("src/app/api/quote/route.ts");
  const creator = source("src/lib/jobber/create-quote-request.ts");
  assert.match(route, /normalizeQuoteBody/);
  assert.match(route, /createWebsiteQuoteRequest/);
  assert.match(creator, /\$input: ClientCreateInput!/);
  assert.match(creator, /\$input: RequestCreateInput!/);
  assert.match(creator, /jobberQuoteInputs/);
  assert.match(creator, /quoteRequestTitle/);
  assert.equal(creator.includes("JOBBER_REQUEST_TITLE"), false);
  assert.equal(creator.includes("TEST - Website Quote Integration"), false);
  assert.equal(source("src/lib/jobber/config.ts").includes("JOBBER_REQUEST_TITLE"), false);
}

async function verifyInstance(submission: WebsiteQuoteSubmission, requiredAnswers: string[]) {
  assertJobberMapping(submission, requiredAnswers);
  assert.deepEqual(await expectEndpointResult(submission, "success"), { ok: true });
  const failed = await expectEndpointResult(submission, "jobber-error");
  assert.equal(failed.ok, false);
  const offline = await expectEndpointResult(submission, "offline");
  assert.equal(offline.ok, false);
}

test("homepage quote uses the sidebar handler", async () => {
  const page = source("src/app/page.tsx");
  assert.match(page, /<QuoteRequestForm/);
  assert.doesNotMatch(page, /variant="horizontal"/);
  assertConnectedHandler("src/components/quote-request-form.tsx", "standardQuoteSubmission");
  const sidebar = source("src/components/quote-request-form.tsx");
  assert.match(sidebar, /variant = "sidebar"/);
  assert.match(source("src/lib/quote-payloads.ts"), /variant === "sidebar" \? "Homepage quote" : "Interior quote"/);
  await verifyInstance(
    standardQuoteSubmission({
      ...customer,
      variant: "sidebar",
      projectType: "window-replacement",
      details: "Homepage test details",
      photoNames: ["front.jpg"],
    }),
    [],
  );
});

const interiorPages = [
  ["Financing", "src/app/financing/page.tsx", "HeroQuoteLayout"],
  ["Energy Rebates", "src/app/energy-rebates/page.tsx", "HeroQuoteLayout"],
  ["Blog index", "src/app/blog/blog-index.tsx", "HeroQuoteLayout"],
  ["Portfolio", "src/app/portfolio/page.tsx", "HeroQuoteLayout"],
  ["About", "src/app/about/page.tsx", "HeroQuoteLayout"],
  ["Contact quote box", "src/app/contact/page.tsx", "HeroQuoteLayout"],
  ["All showrooms", "src/components/showrooms/ShowroomSections.tsx", "HeroQuoteLayout"],
] as const;

for (const [label, file, marker] of interiorPages) {
  test(`${label} renders the interior quote handler`, async () => {
    const page = source(file);
    assert.match(page, new RegExp(marker));
    assert.doesNotMatch(page, /variant="sidebar"/);
    const card = source("src/components/HeroQuoteSidebar.tsx");
    assert.match(card, /variant="horizontal"/);
    assert.match(card, /<QuoteRequestForm/);
    assertConnectedHandler("src/components/quote-request-form.tsx", "standardQuoteSubmission");
    await verifyInstance(
      standardQuoteSubmission({
        ...customer,
        variant: "horizontal",
        projectType: "door-replacement",
        details: `${label} project details`,
        photoNames: [],
      }),
      [],
    );
  });
}

for (const [label, file] of [
  ["Lake City showroom", "src/app/showrooms/lake-city/page.tsx"],
  ["Queen Anne showroom", "src/app/showrooms/west-queen-anne/page.tsx"],
  ["Bellevue showroom", "src/app/showrooms/bellevue/page.tsx"],
] as const) {
  test(`${label} reaches the interior quote through ShowroomHero`, async () => {
    assert.match(source(file), /<ShowroomLocation/);
    assert.match(source("src/components/showrooms/ShowroomLocation.tsx"), /<ShowroomHero/);
    assert.match(source("src/components/showrooms/ShowroomSections.tsx"), /<HeroQuoteLayout/);
    assert.match(source("src/components/HeroQuoteSidebar.tsx"), /variant="horizontal"/);
    await verifyInstance(
      standardQuoteSubmission({
        ...customer,
        variant: "horizontal",
        projectType: "glass-replacement",
        details: `${label} project details`,
        photoNames: ["showroom.png"],
      }),
      [],
    );
  });
}

test("window quote page passes material, style, and manufacturer into its box", async () => {
  assert.match(source("src/app/services/window-replacement/quote/page.tsx"), /<QuoteStep/);
  const step = source("src/app/services/window-replacement/quote/quote-step.tsx");
  assert.match(step, /<WindowQuoteBox/);
  assert.match(step, /material=\{material\}/);
  assert.match(step, /style=\{style\}/);
  assert.match(step, /manufacturer=\{manufacturer\}/);
  assertConnectedHandler("src/components/WindowQuoteBox.tsx", "windowQuoteSubmission");
  await verifyInstance(
    windowQuoteSubmission({
      ...customer,
      notes: "North wall",
      windowCount: "6 to 12",
      material: "Vinyl",
      style: "Casement",
      manufacturer: "Milgard",
    }),
    ["Approximate window count", "Preferred material", "Preferred window style", "Preferred manufacturer"],
  );
});

test("door quote page passes style, material, and manufacturer into its box", async () => {
  assert.match(source("src/app/services/door-replacement/quote/page.tsx"), /<DoorQuoteStep/);
  const step = source("src/app/services/door-replacement/quote/quote-step.tsx");
  assert.match(step, /<DoorQuoteBox/);
  assert.match(step, /material=\{material\}/);
  assert.match(step, /style=\{style\}/);
  assert.match(step, /manufacturer=\{manufacturer\}/);
  assertConnectedHandler("src/components/DoorQuoteBox.tsx", "doorQuoteSubmission");
  await verifyInstance(
    doorQuoteSubmission({
      ...customer,
      notes: "Patio door",
      doorCount: "2 to 3 Doors",
      style: "Sliding Patio Door",
      material: "Fiberglass",
      manufacturer: "",
    }),
    ["Approximate door count", "Preferred door style", "Preferred material", "Preferred manufacturer"],
  );
});

test("shower quote page passes the selected style into its box", async () => {
  assert.match(source("src/app/services/shower-door-replacement/quote/page.tsx"), /<ShowerQuoteStep/);
  const step = source("src/app/services/shower-door-replacement/quote/quote-step.tsx");
  assert.match(step, /<ShowerDoorQuoteBox/);
  assert.match(step, /style=\{style\}/);
  assertConnectedHandler("src/components/ShowerDoorQuoteBox.tsx", "showerQuoteSubmission");
  await verifyInstance(
    showerQuoteSubmission({
      ...customer,
      notes: "Tile to ceiling",
      layout: "Custom Enclosure",
      style: "Frameless",
    }),
    ["Enclosure layout", "Preferred shower door style"],
  );
});

test("glass quote page passes the selected glass type into its box", async () => {
  assert.match(source("src/app/services/glass-replacement/quote/page.tsx"), /<GlassQuoteStep/);
  const step = source("src/app/services/glass-replacement/quote/quote-step.tsx");
  assert.match(step, /<GlassQuoteBox/);
  assert.match(step, /glassType=\{glassType\}/);
  assertConnectedHandler("src/components/GlassQuoteBox.tsx", "glassQuoteSubmission");
  await verifyInstance(
    glassQuoteSubmission({
      ...customer,
      notes: "Foggy pane",
      paneCount: "2 to 4 Panes",
      glassType: "Low-E",
    }),
    ["Estimated pane count", "Preferred glass type"],
  );
});

test("glass railing page renders its own request form", async () => {
  const page = source("src/app/services/glass-railing-installation/page.tsx");
  assert.match(page, /<GlassRailingRequest/);
  assertConnectedHandler("src/components/GlassRailingRequest.tsx", "railingQuoteSubmission");
  await verifyInstance(
    railingQuoteSubmission({ ...customer, notes: "Deck, about 12 feet" }),
    [],
  );
});

test("blog and showroom pages render the traced quote components", () => {
  assert.match(source("src/app/blog/page.tsx"), /<BlogIndex/);
  assert.match(source("src/app/showrooms/page.tsx"), /<ShowroomHero/);
});

test("contact message form and pages without a quote box do not submit quotes", () => {
  const contact = source("src/app/contact/contact-form.tsx");
  assert.doesNotMatch(contact, /submitWebsiteQuote|\/api\/quote/);
  assert.match(contact, /setSubmittedName/);
  const noQuoteForm = [
    "src/app/services/window-replacement/page.tsx",
    "src/app/services/window-replacement/materials/page.tsx",
    "src/app/services/window-replacement/types/page.tsx",
    "src/app/services/window-replacement/manufacturers/page.tsx",
    "src/app/services/door-replacement/types/page.tsx",
    "src/app/services/door-replacement/materials/page.tsx",
    "src/app/services/door-replacement/manufacturers/page.tsx",
    "src/app/services/shower-door-replacement/types/page.tsx",
    "src/app/services/glass-replacement/types/page.tsx",
    "src/app/services/window-blinds-shades/page.tsx",
    "src/app/blog/[slug]/page.tsx",
  ];
  for (const file of noQuoteForm) {
    const text = source(file);
    assert.doesNotMatch(text, /QuoteRequestForm|WindowQuoteBox|DoorQuoteBox|GlassQuoteBox|ShowerDoorQuoteBox|GlassRailingRequest|<form/);
  }
});
