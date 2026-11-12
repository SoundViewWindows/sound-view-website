import Link from "next/link";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const links = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-white px-4 py-8 text-xs sm:px-8 sm:text-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-400">
          © 2026 Sound View Window & Door. All Rights Reserved.
        </p>
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-2 font-medium text-slate-500">
          {links.map((link, index) => (
            <span key={link.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              <Link href={link.href} className={`hover:text-[#0B192C] ${focusRing}`}>
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
