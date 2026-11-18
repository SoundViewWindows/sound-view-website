export type AppointmentSyncProof = {
  jobberSynced?: boolean;
  jobberRequestId?: string | null;
  assessmentScheduled?: boolean;
  assessmentMatchesSlot?: boolean;
};

export const appointmentSaveError =
  "We could not save your appointment. Your details are still here. Please try again.";

export const appointmentTimeError =
  "That time could not be reserved. Your details are still here. Please choose another available time.";

export const appointmentProcessingMessage =
  "We are still saving this appointment. Please wait a moment and try again. Your details are still here.";

export const appointmentSavedTimeMessage =
  "That time could not be reserved. We saved your request, and the office can see it. Please choose another available time, or call the office and we will help.";

export const appointmentUnconfirmedMessage =
  "We could not confirm this appointment. Your details are still here. Please call the office before trying again so we do not create a duplicate.";

export function confirmedAppointment(result: AppointmentSyncProof | null | undefined) {
  const jobberRequestId = result?.jobberRequestId?.trim() ?? "";
  if (
    result?.jobberSynced === true &&
    jobberRequestId &&
    result.assessmentScheduled === true &&
    result.assessmentMatchesSlot === true
  ) {
    return { ok: true as const, jobberRequestId };
  }
  if (jobberRequestId) {
    return { ok: false as const, pendingRequestId: jobberRequestId, message: appointmentTimeError };
  }
  return { ok: false as const, pendingRequestId: null, message: appointmentSaveError };
}
