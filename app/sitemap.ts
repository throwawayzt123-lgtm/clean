import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...SERVICES.map((s) => page(`/services/${s.id}`, 0.85)),
    page("/best-cleaning-company-in-lahore", 0.9),
    page("/cleaning-services-pakistan", 0.85),
    page("/faq", 0.8),
    page("/gallery", 0.7, "weekly"),
    page("/about", 0.6),
    page("/contact", 0.8),
  ];
}
