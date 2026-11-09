import { Suspense } from "react";
import { GlassQuoteStep } from "./quote-step";

export default function GlassQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#FAF8F5] px-4 py-16 text-center text-[#1B2A4A]">
          Loading your estimate.
        </p>
      }
    >
      <GlassQuoteStep />
    </Suspense>
  );
}
