import { Suspense } from "react";
import { DoorQuoteStep } from "./quote-step";

export default function DoorQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">
          Loading your estimate.
        </p>
      }
    >
      <DoorQuoteStep />
    </Suspense>
  );
}
