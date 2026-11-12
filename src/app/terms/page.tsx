import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { canonicalUrl } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/terms") },
  title: "Terms of Service | Sound View Window & Door",
  description: "Terms for using the Sound View Window & Door website.",
};

export default function TermsPage() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-black sm:text-5xl">Terms of Service</h1>
        <p className="mt-6 text-base leading-relaxed text-[#556980]">
          This website provides general information about replacement windows,
          doors, and custom glass in the Greater Seattle Area. A quote request
          is not a contract. Project scope, pricing, and scheduling are
          confirmed with you before any work begins.
        </p>
      </main>
    </div>
  );
}
