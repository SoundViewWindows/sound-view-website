import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { publicPaths } from "@/lib/public-paths";

export const metadata: Metadata = {
  title: "Page Not Found | Sound View Window & Door",
  description:
    "This page is not available. Browse windows, doors, glass, showrooms, and guides from Sound View Window & Door.",
};

const links = [
  { label: "Home", href: "/" },
  { label: "Window Replacement", href: publicPaths.windows },
  { label: "Door Replacement", href: publicPaths.doors },
  { label: "Shower Doors", href: publicPaths.shower },
  { label: "Glass Replacement", href: publicPaths.glass },
  { label: "Showrooms", href: publicPaths.showrooms },
  { label: "Blog & Guides", href: publicPaths.blog },
  { label: "Contact Us", href: publicPaths.contact },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export default function NotFound() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">404</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">We could not find that page</h1>
        <p className="mt-6 text-base leading-relaxed text-[#556980]">
          The address may be out of date. You can return home or continue with one of the main sections below.
        </p>
        <ul className="mt-8 grid list-none gap-3 p-0 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-[4px] border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#0B192C] hover:border-[#38BDF8] hover:text-[#0284C7] ${focusRing}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
