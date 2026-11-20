import Image from "next/image";
import Link from "next/link";

type ManufacturerCardProps = {
  href: string;
  name: string;
  description: string;
  detail?: string;
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
  detail,
  image,
  alt,
  selected = false,
  surface = "solid",
}: ManufacturerCardProps) {
  const veil = surface === "veil" ? "bg-[#182B3E]/75 backdrop-blur-[2px]" : "bg-[#2B3E50]/85";

  return (
    <Link
      href={href}
      aria-current={selected ? "true" : undefined}
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-[4px] border transition-all hover:border-white/35 hover:bg-[#31465A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${veil} ${
        selected ? "border-sky-400 ring-2 ring-sky-400" : "border-white/15"
      }`}
    >
      <span className="relative flex h-52 w-full shrink-0 items-center justify-center overflow-hidden bg-white sm:h-56">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 300px, 280px"
            className="h-full w-full object-contain p-6"
          />
        ) : (
          <span className="px-4 text-center text-sm font-extrabold uppercase tracking-wider text-[#0B192C]">
            No Preference
          </span>
        )}
      </span>
      <span className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden p-5 sm:p-6">
        <span>
          <span className="mb-2 block text-[15px] font-bold leading-tight text-white">{name}</span>
          <span className="line-clamp-4 block text-xs leading-relaxed text-slate-300">{description}</span>
        </span>
        <span className="mt-auto pt-3">
          {detail ? (
            <span className="mb-2 block text-xs font-medium leading-snug text-sky-400">{detail}</span>
          ) : null}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
            Select Brand
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
