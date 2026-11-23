import type { Metadata } from "next";
import { BRAND, PLANS, SERVICES } from "./content";
import { ALL_KEYWORDS } from "./keywords";

/** Set NEXT_PUBLIC_SITE_URL in production if the domain differs. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://c4cleanings.com").replace(/\/$/, "");
export const SITE_NAME = "C4 Cleaning";
export const LEGAL_NAME = "Crystal Clear Cleaning Company";

export const abs = (path: string) => `${SITE_URL}${path}`;

/** Per-page metadata: unique title/description, canonical, Open Graph and Twitter cards. */
export function pageMeta(opts: { title: string; description: string; path: string; image?: string; keywords?: string[] }): Metadata {
  const url = abs(opts.path);
  const image = opts.image ? abs(opts.image) : undefined;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      locale: "en_PK",
      url,
      siteName: SITE_NAME,
      title: opts.title,
      description: opts.description,
      ...(image ? { images: [{ url: image, alt: opts.title }] } : {}),
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, ...(image ? { images: [image] } : {}) },
  };
}

/** Search-focused copy for every service (titles, descriptions, H1s and schema). */
export const SERVICE_SEO: Record<string, { title: string; description: string; keywords: string[]; h1: string; area: string }> = {
  commercial: {
    title: "Commercial & Office Cleaning in Lahore",
    description:
      "Professional commercial and office cleaning in Lahore. Disinfected workstations, spotless floors, restrooms and reception areas by trained teams. Get a free quote from C4 Cleaning.",
    keywords: ["commercial cleaning Lahore", "office cleaning Lahore", "janitorial services Lahore", "corporate cleaning services Lahore"],
    h1: "Commercial & Office Cleaning in Lahore",
    area: "offices and workplaces across Lahore",
  },
  residential: {
    title: "House Deep Cleaning in Lahore: 10 Marla & 1 Kanal",
    description:
      "Top-to-bottom house deep cleaning in Lahore. Fixed prices: 10 Marla PKR 70,000, 1 Kanal PKR 110,000, 1 Kanal with basement PKR 160,000. Kitchens, bathrooms, floors and glass. Book C4 Cleaning.",
    keywords: ["house deep cleaning Lahore", "home cleaning services Lahore", "deep cleaning service Lahore", "10 marla house cleaning", "1 kanal house cleaning"],
    h1: "House Deep Cleaning in Lahore",
    area: "homes in DHA and across Lahore",
  },
  window: {
    title: "Window & Facade Cleaning in Lahore",
    description:
      "Streak-free window and facade cleaning in Lahore. Glass, frames and sills polished for a crystal-clear finish and better curb appeal. Request a quote from C4 Cleaning.",
    keywords: ["window cleaning Lahore", "facade cleaning Lahore", "glass cleaning Lahore", "building glass cleaning services"],
    h1: "Window & Facade Cleaning in Lahore",
    area: "homes and commercial buildings in Lahore",
  },
  "post-construction": {
    title: "Post-Construction Cleaning in Lahore",
    description:
      "Move-in-ready post-construction and renovation cleaning in Lahore. We remove debris, dust and fine particles from floors, windows, kitchens and bathrooms. Call C4 Cleaning for a quote.",
    keywords: ["post construction cleaning Lahore", "after renovation cleaning Lahore", "builders cleaning Lahore", "new house cleaning Lahore"],
    h1: "Post-Construction Cleaning in Lahore",
    area: "new builds and renovations in DHA and across Lahore",
  },
};

export const SITE_DESCRIPTION =
  "C4 Cleaning is a professional cleaning company in Lahore: house deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning. Fixed prices, trained teams, available 24/7.";

export const SITE_KEYWORDS = ALL_KEYWORDS;

/** Contact-page FAQ (also emitted as FAQPage schema). */
export const FAQ_ITEMS: string[][] = [
  ["How fast will you reply?", "Usually within a few hours, and the same day for most enquiries. WhatsApp is the quickest."],
  ["Do you give fixed prices?", "Yes. Home deep cleans start at PKR 70,000 for 10 Marla, with fixed prices by property size."],
  ["Which areas do you cover?", "We are based in DHA Phase 6, Lahore and serve homes and offices across the city."],
  ["Can I book out of hours?", "Yes. We work for you 24/7, so tell us a time that suits you."],
];

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqSchema = (items: string[][]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export const BUSINESS_ID = `${SITE_URL}/#business`;

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": BUSINESS_ID,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  alternateName: [LEGAL_NAME, "C4 Cleaning Lahore"],
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: abs("/c4logo.png"),
  image: abs("/opengraph-image"),
  telephone: BRAND.phone,
  email: BRAND.officialEmail,
  priceRange: "PKR 70,000 - PKR 160,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "DHA Phase 6",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: [{ "@type": "City", name: "Lahore" }, { "@type": "AdministrativeArea", name: "DHA Lahore" }],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  slogan: "Shining Standards, Spotless Results",
  knowsAbout: ["House deep cleaning", "Commercial cleaning", "Office cleaning", "Window and facade cleaning", "Post-construction cleaning"],
  sameAs: [BRAND.instagram],
  contactPoint: [
    { "@type": "ContactPoint", telephone: BRAND.phone, contactType: "customer service", areaServed: "PK", availableLanguage: ["English", "Urdu"] },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: abs(`/services/${s.id}`) },
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-PK",
  publisher: { "@id": BUSINESS_ID },
};

export const serviceSchema = (id: string) => {
  const s = SERVICES.find((x) => x.id === id)!;
  const seo = SERVICE_SEO[id];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: seo.description,
    url: abs(`/services/${id}`),
    image: abs(s.img),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Lahore" },
    ...(id === "residential"
      ? {
          offers: PLANS.map((p) => ({
            "@type": "Offer",
            name: `${p.name}: full house cleaned`,
            price: p.price.replace(/,/g, ""),
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
            url: abs(`/services/${id}`),
          })),
        }
      : {}),
  };
};

/** WebPage schema with speakable markers (voice assistants / AI answer engines read the .speakable blocks). */
export const webPageSchema = (opts: { path: string; name: string; description: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${abs(opts.path)}#webpage`,
  url: abs(opts.path),
  name: opts.name,
  description: opts.description,
  inLanguage: "en-PK",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": BUSINESS_ID },
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".speakable"] },
});

export const KNOWS_ABOUT = [
  "House deep cleaning",
  "Commercial cleaning",
  "Office cleaning",
  "Window and facade cleaning",
  "Post-construction cleaning",
  "Home cleaning in Lahore",
];
