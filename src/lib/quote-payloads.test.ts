import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  doorQuoteSubmission,
  glassQuoteSubmission,
  railingQuoteSubmission,
  showerQuoteSubmission,
  quoteRequestTitle,
  standardQuoteSubmission,
  websiteQuoteAnswerItems,
  windowQuoteSubmission,
} from "./quote-payloads.ts";

const customer = {
  name: "Test Website",
  phone: "206-555-0199",
  zip: "98101",
  email: "test.quote@example.com",
};

function answer(submission: { answers: { label: string; value: string }[] }, label: string) {
  return submission.answers.find((item) => item.label === label)?.value;
}

test("homepage and interior quotes keep project details and file names", () => {
  const homepage = standardQuoteSubmission({
    ...customer,
    variant: "sidebar",
    projectType: "window-blinds-shades",
    details: "Need blackout shades",
    photoNames: ["kitchen.jpg"],
  });
  const interior = standardQuoteSubmission({
    ...customer,
    variant: "horizontal",
    projectType: "door-replacement",
    details: "Front entry",
    photoNames: [],
  });

  assert.equal(homepage.form, "Homepage quote");
  assert.equal(homepage.projectType, "window-blinds-shades");
  assert.equal(homepage.details, "Need blackout shades");
  assert.deepEqual(homepage.photoNames, ["kitchen.jpg"]);
  assert.equal(interior.form, "Interior quote");
  assert.equal(interior.projectType, "door-replacement");
  assert.equal(interior.photoNames?.length, 0);
});

test("request titles follow the service and form", () => {
  assert.equal(
    quoteRequestTitle({ projectType: "window-replacement", form: "Homepage quote" }),
    "Window Replacement Quote",
  );
  assert.equal(
    quoteRequestTitle({ projectType: "door-replacement", form: "Interior quote" }),
    "Door Replacement Quote",
  );
  assert.equal(quoteRequestTitle({ projectType: "window-replacement", form: "Window quote" }), "Window Replacement Quote");
  assert.equal(quoteRequestTitle({ projectType: "door-replacement", form: "Door quote" }), "Door Replacement Quote");
  assert.equal(quoteRequestTitle({ projectType: "shower-door-replacement", form: "Shower door quote" }), "Shower Door Quote");
  assert.equal(quoteRequestTitle({ projectType: "glass-replacement", form: "Glass quote" }), "Glass Replacement Quote");
  assert.equal(
    quoteRequestTitle({ projectType: "glass-railing-installation", form: "Glass railing request" }),
    "Glass Railing Request",
  );
  assert.equal(
    quoteRequestTitle({ projectType: "window-blinds-shades", form: "Homepage quote" }),
    "Window Blinds & Shades Quote",
  );
  assert.equal(quoteRequestTitle({ projectType: "window-replacement", form: "Window quote" }).includes("TEST"), false);
  assert.equal(
    quoteRequestTitle({ projectType: "general-inquiry", form: "Contact message" }),
    "General Website Inquiry",
  );
});

test("configurator quotes keep every selection", () => {
  const windowQuote = windowQuoteSubmission({
    ...customer,
    notes: "North wall",
    windowCount: "6 to 12",
    material: "Vinyl",
    style: "Casement",
    manufacturer: "",
  });
  const doorQuote = doorQuoteSubmission({
    ...customer,
    notes: "Patio",
    doorCount: "1 Door",
    style: "Sliding Patio Door",
    material: "",
    manufacturer: "Milgard",
  });
  const glassQuote = glassQuoteSubmission({
    ...customer,
    notes: "Foggy pane",
    paneCount: "1 Pane",
    glassType: "Tempered",
  });
  const showerQuote = showerQuoteSubmission({
    ...customer,
    notes: "Tile to ceiling",
    layout: "Door & Panel",
    style: "",
  });
  const railingQuote = railingQuoteSubmission({ ...customer, notes: "Deck, about 12 feet" });

  assert.equal(answer(windowQuote, "Approximate window count"), "6 to 12");
  assert.equal(answer(windowQuote, "Preferred material"), "Vinyl");
  assert.equal(answer(windowQuote, "Preferred window style"), "Casement");
  assert.equal(answer(windowQuote, "Preferred manufacturer"), "No preference yet");
  assert.equal(windowQuote.details, "North wall");
  assert.equal(answer(doorQuote, "Approximate door count"), "1 Door");
  assert.equal(answer(doorQuote, "Preferred door style"), "Sliding Patio Door");
  assert.equal(answer(doorQuote, "Preferred material"), "No preference yet");
  assert.equal(answer(doorQuote, "Preferred manufacturer"), "Milgard");
  assert.equal(answer(glassQuote, "Estimated pane count"), "1 Pane");
  assert.equal(answer(glassQuote, "Preferred glass type"), "Tempered");
  assert.equal(answer(showerQuote, "Enclosure layout"), "Door & Panel");
  assert.equal(answer(showerQuote, "Preferred shower door style"), "No preference yet");
  assert.equal(railingQuote.projectType, "glass-railing-installation");
  assert.equal(railingQuote.details, "Deck, about 12 feet");
  assert.equal(railingQuote.photoNames, undefined);
});

test("Jobber request items include every answer without uploading files", () => {
  const submission = windowQuoteSubmission({
    ...customer,
    notes: "North wall",
    windowCount: "1 to 5",
    material: "Vinyl",
    style: "Casement",
    manufacturer: "Milgard",
  });
  const items = websiteQuoteAnswerItems({
    ...submission,
    serviceTitle: "Window Replacement",
    photoNames: submission.photoNames ?? null,
  });
  const labels = items.map((item) => item.label);
  for (const answerItem of submission.answers) {
    assert.equal(items.find((item) => item.label === answerItem.label)?.answerText, answerItem.value);
  }
  assert.ok(labels.includes("Project details"));
  assert.equal(items.find((item) => item.label === "Project details")?.answerText, "North wall");
  assert.equal(labels.includes("File names selected on the website"), false);
});

test("every website form either requests a quote or is the contact message form", () => {
  const root = path.resolve("src");
  const files: string[] = [];
  function walk(directory: string) {
    for (const entry of readdirSync(directory)) {
      const fullPath = path.join(directory, entry);
      if (statSync(fullPath).isDirectory()) walk(fullPath);
      else if (fullPath.endsWith(".tsx")) files.push(fullPath);
    }
  }
  walk(root);

  const formFiles = files.filter((file) => /<form[\s>]/.test(readFileSync(file, "utf8")));
  const relative = formFiles.map((file) => path.relative(root, file).replaceAll("\\", "/"));
  assert.deepEqual(
    relative.filter((file) => !readFileSync(path.join(root, file), "utf8").includes("submitWebsiteQuote")).sort(),
    [],
  );

  const contact = readFileSync(path.join(root, "app/contact/contact-form.tsx"), "utf8");
  assert.equal(contact.includes("submitWebsiteQuote"), true);
  assert.equal(contact.includes("contactInquirySubmission"), true);

  const quoteRoute = readFileSync(path.join(root, "app/api/quote/route.ts"), "utf8");
  assert.equal(quoteRoute.includes("resend"), false);
  assert.equal(quoteRoute.includes("createWebsiteQuoteRequest"), true);
});
