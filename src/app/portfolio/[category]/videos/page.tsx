import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoPortfolio } from "@/components/portfolio/PortfolioViews";
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
    title: `${item.name} Video Portfolio | Sound View Window & Door`,
    description: `Installation and walkthrough videos for ${item.name.toLowerCase()} across Greater Seattle.`,
    alternates: { canonical: canonicalUrl(`/portfolio/${item.slug}/videos/`) },
  };
}

export default async function PortfolioVideosPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const item = getPortfolioCategory(category);
  if (!item) notFound();
  return <VideoPortfolio category={item} />;
}
