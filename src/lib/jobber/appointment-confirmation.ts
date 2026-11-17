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
