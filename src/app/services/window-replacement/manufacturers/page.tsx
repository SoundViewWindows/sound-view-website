import { Suspense } from "react";
import { ManufacturersStep } from "./manufacturers-step";

export default function WindowManufacturersPage() {
  return (
    <Suspense
      fallback={<p className="bg-[#0B192C] px-4 py-16 text-center text-white">Loading manufacturers.</p>}
    >
      <ManufacturersStep />
    </Suspense>
  );
}
