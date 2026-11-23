import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { FAQ_GENERAL } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";

const TITLE = "Best Cleaning Company in Lahore: How to Choose";
const DESC =
  "Looking for the best cleaning company in Lahore? Learn what to check, then see why clients choose C4 Cleaning: trained teams, fixed prices from PKR 70,000, safe products and 24/7 service.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/best-cleaning-company-in-lahore",
  image: "/opengraph-image",
  keywords: [
    "best cleaning company in Lahore",
    "best cleaning services in Lahore",
    "top cleaning company in Lahore",
    "best deep cleaning services in Lahore",
    "reliable cleaning company Lahore",
    "affordable cleaning services Lahore",
    "cleaning company near me Lahore",
  ],
});

const FAQ = [
  FAQ_GENERAL[1],
  FAQ_GENERAL[2],
  FAQ_GENERAL[3],
  ["Is C4 Cleaning an affordable cleaning company in Lahore?", "C4 Cleaning uses fixed, transparent prices by property size, from PKR 70,000 for a full 10 Marla house deep clean, with no hidden charges."],
  FAQ_GENERAL[14],
  FAQ_GENERAL[11],
  FAQ_GENERAL[0],
];

export default function Page() {
  return (
    <LandingPage
      path="/best-cleaning-company-in-lahore"
      crumb="Best cleaning company in Lahore"
      eyebrow="[ Lahore cleaning guide ]"
      h1="Best Cleaning Company in Lahore: What to Look For"
      title={TITLE}
      description={DESC}
      quickAnswer="The best cleaning company in Lahore is one with trained staff, a thorough checklist, safe products, clear fixed pricing and on-time, 24/7 service. C4 Cleaning in DHA Phase 6 offers all of these, with house deep cleaning from PKR 70,000, plus commercial, window and post-construction cleaning."
      criteriaTitle="Six things the best cleaning companies in Lahore get right"
      criteria={[
        { title: "Trained, trusted staff", text: "Look for professionally trained cleaners with hands-on experience and background checks, since they will be inside your home or office." },
        { title: "A written checklist", text: "A good deep clean follows a checklist for kitchens, bathrooms, floors and glass, and is inspected with you at the end." },
        { title: "Fixed, transparent pricing", text: "You should know the price for your property size before work starts, with no hidden charges." },
        { title: "Safe, modern products", text: "Eco-friendly products and modern equipment protect families, staff and your surfaces." },
        { title: "On-time, flexible service", text: "The team should arrive on schedule, finish efficiently and offer time slots that suit you." },
        { title: "Proof of real work", text: "Ask for photos of finished projects and honest reviews from clients in your area." },
      ]}
      whyTitle="Why clients choose C4 Cleaning in Lahore"
      whyParagraphs={[
        "C4 Cleaning (Crystal Clear Cleaning Company) is based in DHA Phase 6, Lahore, and works for you 24/7. We clean homes, offices, glass and freshly built spaces with trained teams and a thorough checklist on every job.",
        "Our house deep cleaning prices are fixed by property size, so you know the cost up front: PKR 70,000 for 10 Marla, PKR 110,000 for 1 Kanal and PKR 160,000 for 1 Kanal with basement. See our gallery for real projects.",
      ]}
      faq={FAQ}
    />
  );
}
