import { Suspense } from "react";
import { DoorManufacturersStep } from "./manufacturers-step";

export default function DoorManufacturersPage() {
  return (
    <Suspense
      fallback={<p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">Loading manufacturers.</p>}
    >
      <DoorManufacturersStep />
    </Suspense>
  );
}
