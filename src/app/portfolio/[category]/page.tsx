import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHub } from "@/components/portfolio/PortfolioViews";
import { canonicalUrl } from "@/config/site";
import { getPortfolioCategory, portfolioCategoryParams } from "@/lib/portfolio-categories";

export function generateStaticParams() {
  return portfolioCategoryParams();
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await props.params;
  const item = getPortfolioCategory(category);
  if (!item) return {};
  return {
    title: `${item.name} Portfolio | Sound View Window & Door`,
    description: item.summary,
    alternates: { canonical: canonicalUrl(`/portfolio/${item.slug}/`) },
  };
}

export default async function PortfolioCategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const item = getPortfolioCategory(category);
  if (!item) notFound();
  return <CategoryHub category={item} />;
}
