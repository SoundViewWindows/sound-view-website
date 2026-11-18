import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImagePortfolio } from "@/components/portfolio/PortfolioViews";
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
    title: `${item.name} Image Portfolio | Sound View Window & Door`,
    description: `Photo gallery of ${item.name.toLowerCase()} projects across Greater Seattle.`,
    alternates: { canonical: canonicalUrl(`/portfolio/${item.slug}/images/`) },
  };
}

export default async function PortfolioImagesPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const item = getPortfolioCategory(category);
  if (!item) notFound();
  return <ImagePortfolio category={item} />;
}
