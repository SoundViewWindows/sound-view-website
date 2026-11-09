import { Suspense } from "react";
import { QuoteStep } from "./quote-step";

export default function WindowQuotePage() {
  return (
    <Suspense fallback={<p className="bg-[#132238] px-4 py-16 text-center text-white">Loading your estimate.</p>}>
      <QuoteStep />
    </Suspense>
  );
}
