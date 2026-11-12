import { Suspense } from "react";
import { GlassTypesStep } from "./types-step";

export default function GlassTypesPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">
          Loading glass types.
        </p>
      }
    >
      <GlassTypesStep />
    </Suspense>
  );
}
