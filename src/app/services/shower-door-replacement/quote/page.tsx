import { Suspense } from "react";
import { ShowerQuoteStep } from "./quote-step";

export default function ShowerQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#132238] px-4 py-16 text-center text-white">
          Loading your estimate.
        </p>
      }
    >
      <ShowerQuoteStep />
    </Suspense>
  );
}
