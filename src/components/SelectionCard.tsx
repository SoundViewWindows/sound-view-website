import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, MouseEventHandler } from "react";

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
  imageClassName?: string;
  imageStyle?: CSSProperties;
  descriptionClassName?: string;
  paddingClassName?: string;
  surface?: "solid" | "veil";
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
  imageClassName,
  imageStyle,
  surface = "solid",
}: SelectionCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-[4px] transition-all hover:border-white/35 hover:bg-[#31465A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
        surface === "veil" ? "bg-[#182B3E]/75 backdrop-blur-[2px]" : "bg-[#2B3E50]/85"
      } ${selected ? "border border-sky-400 ring-2 ring-sky-400" : "border border-white/15"}`}
    >
      <span className="relative h-52 w-full shrink-0 overflow-hidden bg-slate-800 sm:h-56">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            className={`h-full w-full object-cover ${imageClassName ?? "object-center"}`}
            style={imageStyle}
          />
        ) : null}
        {selected ? (
          <span className="absolute right-2 top-2 z-10 rounded-[4px] bg-[#38BDF8] px-2.5 py-1 text-xs font-semibold text-[#0B192C]">
            Selected
          </span>
        ) : null}
      </span>
      <span className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden p-5 sm:p-6">
        <span>
          <span className="mb-2 block text-[15px] font-bold leading-tight text-white">{title}</span>
          <span className="line-clamp-4 block text-xs leading-relaxed text-slate-300">{description}</span>
        </span>
        <span className="mt-auto pt-3">
          {detail ? (
            <span className="mb-2 block text-xs font-medium leading-snug text-sky-400">{detail}</span>
          ) : null}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
            {cta}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
