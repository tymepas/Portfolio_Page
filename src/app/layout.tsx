import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hubot_Sans } from "next/font/google";
import { Suspense } from "react";
import { InteractionLayer } from "@/components/interaction-layer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face. The width axis lets headings run slightly expanded.
const hubotSans = Hubot_Sans({
  variable: "--font-hubot-sans",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // globals.css scrolls smoothly; this attribute tells Next.js to turn that off while
    // it scrolls a newly opened page to the top, so the scroll isn't animated or cut short.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${hubotSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* Reads the pathname, so it sits behind a boundary for routes with unknown params. */}
        <Suspense fallback={null}>
          <InteractionLayer />
        </Suspense>
      </body>
    </html>
  );
}
