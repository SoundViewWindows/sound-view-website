import { Suspense } from "react";
import { ShowerQuoteStep } from "./quote-step";

export default function ShowerQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#FAF8F5] px-4 py-16 text-center text-[#1B2A4A]">
          Loading your estimate.
        </p>
      }
    >
      <ShowerQuoteStep />
    </Suspense>
  );
}
