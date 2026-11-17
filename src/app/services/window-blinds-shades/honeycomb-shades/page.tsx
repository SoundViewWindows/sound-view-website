import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { TreatmentStylePage } from "@/components/window-treatments/TreatmentStylePage";
import { getTreatmentStyle } from "@/lib/window-treatments";

const style = getTreatmentStyle("honeycomb-shades");

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(style.path),
  },
  title: `${style.styleName} | Sound View Window & Door`,
  description: style.metaDescription,
};

export default function HoneycombShadesPage() {
  return <TreatmentStylePage style={style} />;
}
