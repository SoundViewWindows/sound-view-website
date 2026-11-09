import { Suspense } from "react";
import { DoorManufacturersStep } from "./manufacturers-step";

export default function DoorManufacturersPage() {
  return (
    <Suspense
      fallback={<p className="bg-[#0B192C] px-4 py-16 text-center text-white">Loading manufacturers.</p>}
    >
      <DoorManufacturersStep />
    </Suspense>
  );
}
