import { services } from "@/lib/services";
import { jobberConfig } from "@/lib/jobber/config";
import { jobberGraphql } from "@/lib/jobber/graphql";

export type WebsiteQuoteInput = {
  name: string;
  phone: string;
  zip: string;
  email: string;
  projectType: string;
  details: string;
  photoNames: string[];
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
  mutation CreateWebsiteQuoteClient($input: ClientCreateAttributes!) {
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
  mutation CreateWebsiteQuoteRequest($input: RequestCreateAttributes!) {
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
  const { firstName, lastName } = splitName(input.name);
  const serviceTitle = services.find((service) => service.id === input.projectType)?.title ?? input.projectType;
  const clientData = await jobberGraphql<ClientCreateData>(createClientMutation, {
    input: {
      firstName,
      lastName,
      emails: [{ description: "MAIN", primary: true, address: input.email }],
    },
  });
  assertNoUserErrors(clientData.clientCreate.userErrors, "Jobber did not create the client.");
  const clientId = clientData.clientCreate.client?.id;
  if (!clientId) {
    throw new Error("Jobber did not create the client.");
  }

  const requestData = await jobberGraphql<RequestCreateData>(createRequestMutation, {
    input: {
      clientId,
      title: jobberConfig().requestTitle,
      requestDetails: {
        form: {
          sections: [
            {
              label: "Website quote",
              items: [
                { label: "Name", answerText: input.name },
                { label: "Phone", answerText: input.phone },
                { label: "Email", answerText: input.email },
                { label: "ZIP", answerText: input.zip },
                { label: "Service", answerText: serviceTitle },
                { label: "Project details", answerText: input.details.trim() || "None provided" },
                {
                  label: "Photos selected on the website",
                  answerText: input.photoNames.length > 0 ? input.photoNames.join(", ") : "None",
                },
              ],
            },
          ],
        },
      },
    },
  });
  assertNoUserErrors(requestData.requestCreate.userErrors, "Jobber did not create the request.");
  const request = requestData.requestCreate.request;
  if (!request?.id) {
    throw new Error("Jobber did not create the request.");
  }
  return {
    clientId,
    requestId: request.id,
    title: request.title || jobberConfig().requestTitle,
    jobberWebUri: request.jobberWebUri,
    serviceTitle,
  };
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "Website";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

function assertNoUserErrors(errors: UserError[], fallback: string) {
  if (!errors?.length) return;
  const message = errors
    .map((error) => error.message)
    .filter(Boolean)
    .join(" ");
  throw new Error(message || fallback);
}
