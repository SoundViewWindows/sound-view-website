import { Suspense } from "react";
import { ShowerQuoteStep } from "./quote-step";

export default function ShowerQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">
          Loading your estimate.
        </p>
      }
    >
      <ShowerQuoteStep />
    </Suspense>
  );
}
