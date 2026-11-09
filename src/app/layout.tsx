import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
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
      className={`${outfit.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
