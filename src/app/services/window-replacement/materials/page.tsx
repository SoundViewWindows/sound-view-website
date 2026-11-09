import { Suspense } from "react";
import { MaterialsStep } from "./materials-step";

export default function WindowMaterialsPage() {
  return (
    <Suspense fallback={<p className="bg-[#F7F5F0] px-4 py-16 text-center text-[#1D2C43]">Loading frame materials.</p>}>
      <MaterialsStep />
    </Suspense>
  );
}
