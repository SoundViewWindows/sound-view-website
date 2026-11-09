import { Suspense } from "react";
import { DoorQuoteStep } from "./quote-step";

export default function DoorQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#132238] px-4 py-16 text-center text-white">
          Loading your estimate.
        </p>
      }
    >
      <DoorQuoteStep />
    </Suspense>
  );
}
