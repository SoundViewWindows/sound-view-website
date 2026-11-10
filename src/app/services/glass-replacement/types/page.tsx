import { Suspense } from "react";
import { GlassTypesStep } from "./types-step";

export default function GlassTypesPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#132238] px-4 py-16 text-center text-white">
          Loading glass types.
        </p>
      }
    >
      <GlassTypesStep />
    </Suspense>
  );
}
