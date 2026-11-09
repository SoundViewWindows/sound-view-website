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
  fit = "cover",
  selected = false,
  onClick,
}: SelectionCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className={`group relative flex aspect-[4/3] cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
        selected
          ? "border-transparent ring-2 ring-sky-400 shadow-sky-500/30"
          : "border-slate-700/60"
      }`}
    >
      <span className="absolute inset-0 bg-[#132238]" aria-hidden="true" />
      {image && fit === "contain" ? (
        <span className="absolute inset-x-0 top-0 h-[58%]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </span>
      ) : null}
      {image && fit !== "contain" ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <span className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/75 to-transparent" />
      {selected ? (
        <span className="absolute right-3 top-3 z-20 rounded-full bg-[#38BDF8] px-2.5 py-1 text-xs font-semibold text-[#0B192C]">
          Selected
        </span>
      ) : null}
      <span className="relative z-10 flex w-full flex-col justify-end p-5 sm:p-6">
        <span className="mb-1.5 text-xl font-extrabold leading-tight text-white sm:text-2xl">
          {title}
        </span>
        <span className="mb-2 line-clamp-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
          {description}
        </span>
        {detail ? (
          <span className="mb-3 text-xs font-medium text-slate-300">{detail}</span>
        ) : null}
        <span className="inline-flex items-center text-xs font-bold tracking-wide text-sky-400 group-hover:text-sky-300 sm:text-sm">
          {cta}
          <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
        </span>
      </span>
    </Link>
  );
}
