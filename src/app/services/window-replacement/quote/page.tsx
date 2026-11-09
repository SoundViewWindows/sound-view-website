import { Suspense } from "react";
import { QuoteStep } from "./quote-step";

export default function WindowQuotePage() {
  return (
    <Suspense fallback={<p className="bg-[#F7F5F0] px-4 py-16 text-center text-[#1D2C43]">Loading your estimate.</p>}>
      <QuoteStep />
    </Suspense>
  );
}
