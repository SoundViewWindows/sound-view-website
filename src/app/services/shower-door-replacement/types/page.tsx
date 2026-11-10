import { Suspense } from "react";
import { ShowerTypesStep } from "./types-step";

export default function ShowerTypesPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#132238] px-4 py-16 text-center text-white">
          Loading shower door styles.
        </p>
      }
    >
      <ShowerTypesStep />
    </Suspense>
  );
}
