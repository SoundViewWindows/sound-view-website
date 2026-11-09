import { Suspense } from "react";
import { QuoteStep } from "./quote-step";

export default function WindowQuotePage() {
  return (
    <Suspense fallback={<p className="bg-[#FAF8F5] px-4 py-16 text-center text-[#1B2A4A]">Loading your estimate.</p>}>
      <QuoteStep />
    </Suspense>
  );
}
