import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sound View Window & Door | Seattle Window, Door & Glass Replacement",
  description:
    "Premier Seattle window replacement, custom doors, frameless shower enclosures, and glass repair. Visit our showrooms in Lake City, West Queen Anne, and Bellevue.",
  openGraph: {
    title: "Sound View Window & Door | Seattle Window, Door & Glass Replacement",
    description:
      "Premier Seattle window replacement, custom doors, frameless shower enclosures, and glass repair. Visit our showrooms in Lake City, West Queen Anne, and Bellevue.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#0B192C] text-slate-100">
        <JsonLd />
        {children}
        <Footer />
      </body>
    </html>
  );
}
