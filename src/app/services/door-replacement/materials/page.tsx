import { Suspense } from "react";
import { DoorMaterialsStep } from "./materials-step";

export default function DoorMaterialsPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#FAF8F5] px-4 py-16 text-center text-[#1B2A4A]">
          Loading door materials.
        </p>
      }
    >
      <DoorMaterialsStep />
    </Suspense>
  );
}
