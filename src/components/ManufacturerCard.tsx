import Image from "next/image";
import Link from "next/link";

type ManufacturerCardProps = {
  href: string;
  name: string;
  description: string;
  image?: string;
  alt: string;
  selected?: boolean;
  theme?: "default" | "home";
  surface?: "solid" | "veil";
};

export function ManufacturerCard({
  href,
  name,
  description,
  image,
  alt,
  selected = false,
  theme = "default",
  surface = "solid",
}: ManufacturerCardProps) {
  const home = theme === "home";
  const veil = surface === "veil" ? "bg-[#182B3E]/75 backdrop-blur-[2px]" : "";
  return (
    <Link
      href={href}
      aria-current={selected ? "true" : undefined}
      className={`group flex cursor-pointer flex-col justify-between p-5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        home
          ? `rounded-xl border ${veil || "bg-home-panel/80"} shadow-sm transition-shadow hover:shadow-md focus-visible:outline-home-accent ${
              selected ? "border-home-accent ring-2 ring-home-accent" : "border-[#8AA0B2]/35"
            }`
          : `rounded-2xl border bg-[#132238] transition-all duration-200 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10 focus-visible:outline-[#38BDF8] ${
              selected ? "border-transparent ring-2 ring-sky-400" : "border-slate-700/70"
            }`
      }`}
    >
      <span>
        <span className="relative mb-4 flex h-28 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 shadow-inner">
          {image ? (
            <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 40vw, 100vw" className="object-contain p-2" />
          ) : (
            <span className="text-center text-sm font-extrabold uppercase tracking-wider text-[#0B192C]">
              No Preference
            </span>
          )}
        </span>
        <span className={`mb-1 block text-white ${home ? "text-base font-bold sm:text-lg" : "text-lg font-extrabold sm:text-xl"}`}>{name}</span>
        <span className={`mb-4 line-clamp-2 block ${home ? "text-xs text-slate-200 sm:text-sm" : "text-xs text-slate-300 sm:text-sm"}`}>{description}</span>
      </span>
      <span
        className={`inline-flex items-center text-xs ${
          home
            ? "font-semibold text-white transition-colors group-hover:text-home-accent"
            : "font-bold uppercase tracking-wider text-sky-400 group-hover:text-sky-300"
        }`}
      >
        Select Brand
        <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
