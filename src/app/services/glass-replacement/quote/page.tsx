import { Suspense } from "react";
import { GlassQuoteStep } from "./quote-step";

export default function GlassQuotePage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#132238] px-4 py-16 text-center text-white">
          Loading your estimate.
        </p>
      }
    >
      <GlassQuoteStep />
    </Suspense>
  );
}
