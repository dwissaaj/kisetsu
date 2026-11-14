import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontFredoka, fontJapan } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { LenisSmoothScroll } from "@/components/LenisSmoothScroll";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
      <head >
        <link
  rel="preload"
  href="/loader/wave.svg"
  as="image"
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
