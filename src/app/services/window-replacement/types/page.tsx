import { Suspense } from "react";
import { TypesStep } from "./types-step";

export default function WindowTypesPage() {
  return (
    <Suspense fallback={<p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">Loading window types.</p>}>
      <TypesStep />
    </Suspense>
  );
}
