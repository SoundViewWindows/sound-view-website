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
  tallImage = false,
  imageClassName,
  imageStyle,
  descriptionClassName,
  paddingClassName = "p-4",
}: SelectionCardProps) {
  const imageFrame =
    "relative mb-2 h-[135px] w-full shrink-0 overflow-hidden rounded-[4px] bg-slate-800 sm:h-[145px]";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className={`group flex h-full cursor-pointer flex-col rounded-[4px] bg-[#2B3E50]/85 ${paddingClassName} transition-all hover:border-white/35 hover:bg-[#31465A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
        tallImage ? "justify-between" : ""
      } ${
        selected ? "border border-sky-400 ring-2 ring-sky-400" : "border border-white/15"
      }`}
    >
      <span className={imageFrame}>
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            className={`block h-full w-full object-cover object-center ${imageClassName ?? ""}`}
            style={imageStyle}
          />
        ) : null}
        {selected ? (
          <span className="absolute right-2 top-2 z-10 rounded-[4px] bg-[#38BDF8] px-2.5 py-1 text-xs font-semibold text-[#0B192C]">
            Selected
          </span>
        ) : null}
      </span>
      <span className="flex min-h-0 flex-1 flex-col">
        <span className="mb-1 text-[15px] font-bold leading-tight text-white">{title}</span>
        <span className={descriptionClassName ?? "text-xs leading-relaxed text-slate-300"}>
          {description}
        </span>
        {detail ? (
          <span className="mt-1.5 text-xs font-medium text-sky-400">{detail}</span>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1 pt-2.5 text-xs font-semibold text-white">
          {cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
