import { Suspense } from "react";
import { DoorQuoteStep } from "./quote-step";

export default function DoorQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#F7F5F0] px-4 py-16 text-center text-[#1D2C43]">
          Loading your estimate.
        </p>
      }
    >
      <DoorQuoteStep />
    </Suspense>
  );
}
