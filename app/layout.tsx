import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Effects from "@/components/Effects";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL, businessSchema, websiteSchema } from "@/lib/seo";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--f-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--f-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--f-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "C4 Cleaning | Professional Cleaning Company in Lahore", template: "%s | C4 Cleaning" },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Cleaning services",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  icons: { icon: "/c4logo-sm.png", apple: "/c4logo-sm.png" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "C4 Cleaning | Professional Cleaning Company in Lahore",
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: "C4 Cleaning | Professional Cleaning Company in Lahore", description: SITE_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: { "geo.region": "PK-PB", "geo.placename": "Lahore" },
  // Add after verifying in Google Search Console / Bing Webmaster Tools:
  // verification: { google: "YOUR_TOKEN", other: { "msvalidate.01": "YOUR_TOKEN" } },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={[businessSchema, websiteSchema]} />
        <Effects />
        <WhatsAppButton />
        {children}
      </body>
    </html>
  );
}
