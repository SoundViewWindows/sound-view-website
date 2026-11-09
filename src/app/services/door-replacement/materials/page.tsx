import { Suspense } from "react";
import { DoorMaterialsStep } from "./materials-step";

export default function DoorMaterialsPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#F7F5F0] px-4 py-16 text-center text-[#1D2C43]">
          Loading door materials.
        </p>
      }
    >
      <DoorMaterialsStep />
    </Suspense>
  );
}
