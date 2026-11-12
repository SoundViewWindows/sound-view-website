import { Suspense } from "react";
import { ShowerTypesStep } from "./types-step";

export default function ShowerTypesPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">
          Loading shower door styles.
        </p>
      }
    >
      <ShowerTypesStep />
    </Suspense>
  );
}
