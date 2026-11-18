import type { JobberAppointmentPayload } from "./booking-types";
import { searchClientProperties } from "./appointment-client-search";
import type { JobberCaller } from "./appointment-reserve";

type UserError = { message?: string | null; path?: string[] | null };

type PropertyCreateData = {
  propertyCreate: {
    properties: { id: string | null }[] | null;
    userErrors: UserError[];
  };
};

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

export async function establishAppointmentProperty(
  graphql: JobberCaller,
  clientId: string,
  appointment: JobberAppointmentPayload,
) {
  const address: Record<string, string> = {
    street1: appointment.address.street,
    city: appointment.address.city,
    province: appointment.address.state,
    postalCode: appointment.address.zip,
    country: "US",
  };
  if (appointment.address.unit) address.street2 = appointment.address.unit;
  let data: PropertyCreateData;
  try {
    data = await graphql<PropertyCreateData>(createPropertyMutation, {
      clientId,
      input: { properties: [{ address }] },
    });
  } catch (error) {
    console.error(
      "appointment property was not created",
      error instanceof Error ? error.message : "Jobber did not create the property.",
    );
    const searched = await searchClientProperties(graphql, clientId, appointment);
    if (searched.status === "found") return searched.id;
    throw new Error("Jobber property lookup did not finish.");
  }
  if (data.propertyCreate.userErrors?.length) {
    console.error(
      "appointment property was not created",
      data.propertyCreate.userErrors.map((error) => error.message).filter(Boolean).join(" "),
    );
    return propertyIdAfterCompletedCreate(graphql, clientId, appointment);
  }
  const createdId = data.propertyCreate.properties?.find((property) => property.id)?.id;
  if (createdId) return createdId;
  return propertyIdAfterCompletedCreate(graphql, clientId, appointment);
}

async function propertyIdAfterCompletedCreate(
  graphql: JobberCaller,
  clientId: string,
  appointment: JobberAppointmentPayload,
) {
  const searched = await searchClientProperties(graphql, clientId, appointment);
  if (searched.status === "found") return searched.id;
  if (searched.status === "incomplete") throw new Error("Jobber property lookup did not finish.");
  throw new Error("Jobber did not set up the property.");
}
