import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontFredoka, fontJapan } from "@/config/fonts";
import { LenisSmoothScroll } from "@/components/LenisSmoothScroll";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  applicationName: siteConfig.name,

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  authors: [
    {
      name: "Dwis Aji",
    },
  ],

  creator: "Dwis Aji",

  publisher: "Dwis Aji",

  category: "Portfolio",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "id_ID",
    alternateLocale: ["en_US", "ja_JP"],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          as="image"
          href="/loader/wave.svg"
          rel="preload"
          type="image/svg+xml"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontJapan.variable,
          fontFredoka.variable,
        )}
      >
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "02d0ba710a5649ba8d1f4f67a6ec8b4a"}'
          type="module"
          strategy="afterInteractive"
        />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex min-h-screen flex-col">
            <LenisSmoothScroll>
              <main className="w-full grow">{children}</main>
            </LenisSmoothScroll>

            <footer className="flex w-full items-center justify-center py-3">
              {/* Your footer */}
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
