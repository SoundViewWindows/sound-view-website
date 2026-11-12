import type { CSSProperties } from "react";
import Link from "next/link";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function CtaBanner({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section
      className={`border-t border-slate-100 bg-white px-4 text-center ${className ?? "py-16 sm:py-24"}`}
      style={style}
    >
      <h2 className="text-3xl font-black text-[#0B192C] sm:text-5xl">
        Ready To Upgrade Your Home? Get A Quote Now!
      </h2>
      <p className="mx-auto mb-8 mt-4 max-w-2xl text-sm text-[#556980] sm:text-base">
        Connect with our Seattle specialists to discuss your project, explore
        top-tier products from brands like Milgard and Andersen, or schedule a
        personalized consultation at one of our local showrooms.
      </p>
      <Link
        href="/#quote"
        className={`inline-flex items-center justify-center rounded-lg bg-[#0090c8] px-8 py-3.5 font-bold text-white shadow-md transition-colors hover:bg-[#007fb1] ${focusRing}`}
      >
        Get A Free Quote
      </Link>
    </section>
  );
}
