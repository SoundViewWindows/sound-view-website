import { Suspense } from "react";
import { DoorMaterialsStep } from "./materials-step";

export default function DoorMaterialsPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">
          Loading door materials.
        </p>
      }
    >
      <DoorMaterialsStep />
    </Suspense>
  );
}
