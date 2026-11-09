import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#5D6875]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-sm hover:text-[#1D2C43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-[#1D2C43]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
