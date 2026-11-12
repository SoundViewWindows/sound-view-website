import { Suspense } from "react";
import { MaterialsStep } from "./materials-step";

export default function WindowMaterialsPage() {
  return (
    <Suspense fallback={<p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">Loading frame materials.</p>}>
      <MaterialsStep />
    </Suspense>
  );
}
