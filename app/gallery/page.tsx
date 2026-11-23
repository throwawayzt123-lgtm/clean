import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { WORK } from "@/lib/content";
import { abs, breadcrumb, pageMeta } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = pageMeta({
  title: "Cleaning Project Gallery: Homes & Offices in Lahore",
  description:
    "Browse real residential and commercial cleaning projects by C4 Cleaning in Lahore: luxury homes, bathrooms, kitchens, staircases and offices left spotless.",
  path: "/gallery",
  image: WORK[0].src,
  keywords: ["cleaning before and after Lahore", "house cleaning gallery", "C4 Cleaning projects"],
});

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: "radial-gradient(ellipse at 70% 0%, #1b2105 0%, #050505 55%, #000 100%)" }}
        aria-hidden="true"
      />
      <JsonLd
        data={[
          breadcrumb([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]),
          {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "C4 Cleaning project gallery",
            url: abs("/gallery"),
            image: WORK.slice(0, 20).map((w) => ({ "@type": "ImageObject", contentUrl: abs(w.src), caption: `${w.tag} cleaning by C4 Cleaning, Lahore` })),
          },
        ]}
      />
      <Header revealed />
      <GalleryGrid />
      <Footer />
    </main>
  );
}
