import { Suspense } from "react";
import { DoorMaterialsStep } from "./materials-step";

export default function DoorMaterialsPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-[#132238] px-4 py-16 text-center text-white">
          Loading door materials.
        </p>
      }
    >
      <DoorMaterialsStep />
    </Suspense>
  );
}
