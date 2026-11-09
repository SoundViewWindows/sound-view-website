import { Suspense } from "react";
import { TypesStep } from "./types-step";

export default function WindowTypesPage() {
  return (
    <Suspense fallback={<p className="bg-[#132238] px-4 py-16 text-center text-[#0B192C]">Loading window types.</p>}>
      <TypesStep />
    </Suspense>
  );
}
