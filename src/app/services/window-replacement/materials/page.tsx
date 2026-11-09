import { Suspense } from "react";
import { MaterialsStep } from "./materials-step";

export default function WindowMaterialsPage() {
  return (
    <Suspense fallback={<p className="bg-[#132238] px-4 py-16 text-center text-white">Loading frame materials.</p>}>
      <MaterialsStep />
    </Suspense>
  );
}
