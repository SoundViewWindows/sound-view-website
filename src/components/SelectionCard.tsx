import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";

type SelectionCardProps = {
  href: string;
  image?: string;
  alt: string;
  title: string;
  description: string;
  detail?: string;
  cta?: string;
  sizes: string;
  fit?: "cover" | "contain";
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  theme?: "default" | "home";
  layout?: "material" | "type";
  tallImage?: boolean;
};

export function SelectionCard({
  href,
  image,
  alt,
  title,
  description,
  detail,
  cta = "Select Option",
  sizes,
  selected = false,
  onClick,
  layout = "type",
  tallImage = false,
}: SelectionCardProps) {
  const imageFrame = tallImage
    ? "relative mb-3.5 h-72 w-full shrink-0 overflow-hidden rounded-xl bg-slate-800 sm:h-80"
    : layout === "material"
      ? "relative mb-3.5 h-44 w-full shrink-0 overflow-hidden rounded-lg bg-slate-800 sm:h-52"
      : "relative mb-3 h-40 w-full shrink-0 overflow-hidden rounded-lg bg-slate-800 sm:h-44";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className={`group flex h-full cursor-pointer flex-col rounded-xl bg-[#2B3E50]/85 p-3.5 transition-all hover:border-white/35 hover:bg-[#31465A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] sm:p-4 ${
        tallImage ? "justify-between" : ""
      } ${
        selected ? "border border-sky-400 ring-2 ring-sky-400" : "border border-white/15"
      }`}
    >
      <span className={imageFrame} style={tallImage ? { height: "320px" } : undefined}>
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            className="block h-full w-full object-cover object-center"
          />
        ) : null}
        {selected ? (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-[#38BDF8] px-2.5 py-1 text-xs font-semibold text-[#0B192C]">
            Selected
          </span>
        ) : null}
      </span>
      <span className="flex min-h-0 flex-1 flex-col">
        <span className="mb-1.5 text-base font-bold text-white sm:text-lg">{title}</span>
        <span className="mb-2.5 text-xs leading-relaxed text-slate-300 sm:text-[13px]">
          {description}
        </span>
        {detail ? (
          <span className="mb-2 text-xs font-medium text-sky-400">{detail}</span>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-white sm:text-sm">
          {cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
