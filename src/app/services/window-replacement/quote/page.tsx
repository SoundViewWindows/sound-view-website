import { Suspense } from "react";
import { WhyChooseSoundView } from "@/components/WhyChooseSoundView";
import { QuoteStep } from "./quote-step";

export default function WindowQuotePage() {
  return (
    <>
      <Suspense fallback={<p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">Loading your estimate.</p>}>
        <QuoteStep />
      </Suspense>
      <WhyChooseSoundView />
    </>
  );
}
