import { Suspense } from "react";
import { MaterialsStep } from "./materials-step";

export default function WindowMaterialsPage() {
  return (
    <Suspense fallback={<p className="bg-[#FAF8F5] px-4 py-16 text-center text-[#1B2A4A]">Loading frame materials.</p>}>
      <MaterialsStep />
    </Suspense>
  );
}
