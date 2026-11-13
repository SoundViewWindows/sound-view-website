import { services } from "@/lib/services";
import { jobberGraphql } from "@/lib/jobber/graphql";
import { jobberQuoteInputs, quoteRequestTitle, type QuoteAnswer } from "@/lib/quote-payloads";

export type { QuoteAnswer };

export type WebsiteQuoteInput = {
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

type UserError = { message?: string | null; path?: string[] | null };

type ClientCreateData = {
  clientCreate: {
    client: { id: string } | null;
    userErrors: UserError[];
  };
};

type RequestCreateData = {
  requestCreate: {
    request: { id: string; title: string | null; jobberWebUri: string | null } | null;
    userErrors: UserError[];
  };
};

const createClientMutation = `
  mutation CreateWebsiteQuoteClient($input: ClientCreateInput!) {
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

const createRequestMutation = `
  mutation CreateWebsiteQuoteRequest($input: RequestCreateInput!) {
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

export async function createWebsiteQuoteRequest(input: WebsiteQuoteInput) {
  const serviceTitle = services.find((service) => service.id === input.projectType)?.title ?? input.projectType;
  const prepared = jobberQuoteInputs({
    ...input,
    serviceTitle,
    clientId: "",
  });
  const clientData = await jobberGraphql<ClientCreateData>(createClientMutation, {
    input: prepared.clientInput,
  });
  assertNoUserErrors(clientData.clientCreate.userErrors, "Jobber did not create the client.");
  const clientId = clientData.clientCreate.client?.id;
  if (!clientId) {
    throw new Error("Jobber did not create the client.");
  }

  const requestData = await jobberGraphql<RequestCreateData>(createRequestMutation, {
    input: { ...prepared.requestInput, clientId },
  });
  assertNoUserErrors(requestData.requestCreate.userErrors, "Jobber did not create the request.");
  const request = requestData.requestCreate.request;
  if (!request?.id) {
    throw new Error("Jobber did not create the request.");
  }
  return {
    clientId,
    requestId: request.id,
    title: request.title || quoteRequestTitle(input),
    jobberWebUri: request.jobberWebUri,
    serviceTitle,
  };
}

function assertNoUserErrors(errors: UserError[], fallback: string) {
  if (!errors?.length) return;
  const message = errors
    .map((error) => error.message)
    .filter(Boolean)
    .join(" ");
  throw new Error(message || fallback);
}
