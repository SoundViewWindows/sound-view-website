import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { canonicalUrl } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/privacy") },
  title: "Privacy Policy | Sound View Window & Door",
  description: "How Sound View Window & Door handles information shared through this website.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-black sm:text-5xl">Privacy Policy</h1>
        <p className="mt-6 text-base leading-relaxed text-[#556980]">
          Sound View Window & Door uses the details you submit on a quote or
          contact form to respond to your project. We do not sell that
          information. Form submissions stay in your browser until you choose
          to contact us by phone, email, or a booked appointment.
        </p>
      </main>
    </div>
  );
}
