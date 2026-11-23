import { BRAND, PLANS, SERVICES } from "@/lib/content";
import { SERVICE_SEO, SITE_URL } from "@/lib/seo";
import { FAQ_GENERAL } from "@/lib/faq";

export const dynamic = "force-static";

/** llms.txt: a plain-text summary of the business for AI assistants and answer engines. */
export function GET() {
  const lines = [
    "# C4 Cleaning (Crystal Clear Cleaning Company)",
    "",
    "> C4 Cleaning is a professional cleaning company in DHA Phase 6, Lahore, Pakistan. It provides house deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning with fixed prices, trained teams, safe products and 24/7 availability.",
    "",
    "## Business facts",
    `- Name: C4 Cleaning (legal/brand name: Crystal Clear Cleaning Company)`,
    `- Location: ${BRAND.address}`,
    `- Phone / WhatsApp: ${BRAND.phone}`,
    `- Email: ${BRAND.officialEmail}`,
    `- Website: ${SITE_URL}`,
    `- Availability: ${BRAND.availability}`,
    "- Service area: Lahore, Pakistan",
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.id}): ${SERVICE_SEO[s.id].description}`),
    "",
    "## House deep cleaning prices (fixed, PKR, full house cleaned)",
    ...PLANS.map((p) => `- ${p.name}: PKR ${p.price} (${p.note})`),
    "",
    "## Key pages",
    `- [Home](${SITE_URL}/)`,
    `- [All services](${SITE_URL}/services)`,
    `- [Best cleaning company in Lahore: how to choose](${SITE_URL}/best-cleaning-company-in-lahore)`,
    `- [Cleaning services in Pakistan](${SITE_URL}/cleaning-services-pakistan)`,
    `- [FAQ](${SITE_URL}/faq)`,
    `- [Project gallery](${SITE_URL}/gallery)`,
    `- [About us](${SITE_URL}/about)`,
    `- [Contact and free quote](${SITE_URL}/contact)`,
    "",
    "## Frequently asked questions",
    ...FAQ_GENERAL.flatMap(([q, a]) => [`### ${q}`, a, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
