import { portfolioCategoryParams } from "@/lib/portfolio-categories";

export function generateStaticParams() {
  return portfolioCategoryParams();
}

export default function PortfolioCategoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
