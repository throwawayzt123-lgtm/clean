import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { FAQ_GENERAL } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";

const TITLE = "Cleaning Services in Pakistan: Deep & Commercial";
const DESC =
  "Professional cleaning services in Pakistan from a Lahore-based company: house deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning. Get a quote from C4 Cleaning.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/cleaning-services-pakistan",
  image: "/opengraph-image",
  keywords: [
    "best cleaning company in Pakistan",
    "cleaning services in Pakistan",
    "professional cleaning company Pakistan",
    "deep cleaning services Pakistan",
    "best deep cleaning services in Pakistan",
    "post construction cleaning Pakistan",
    "building facade cleaning Pakistan",
  ],
});

const FAQ = [
  ["Which is the best cleaning company in Pakistan?", "Judge a cleaning company in Pakistan by its trained staff, written checklists, safe products, fixed pricing and proof of finished work. C4 Cleaning, based in Lahore, publishes its prices, checklists and project gallery so you can compare it against any other provider."],
  ["Where is C4 Cleaning based?", "C4 Cleaning (Crystal Clear Cleaning Company) is based in DHA Phase 6, Lahore, Punjab, Pakistan."],
  FAQ_GENERAL[12],
  FAQ_GENERAL[2],
  FAQ_GENERAL[3],
  FAQ_GENERAL[9],
  FAQ_GENERAL[10],
];

export default function Page() {
  return (
    <LandingPage
      path="/cleaning-services-pakistan"
      crumb="Cleaning services in Pakistan"
      eyebrow="[ Cleaning services · Pakistan ]"
      h1="Professional Cleaning Services in Pakistan"
      title={TITLE}
      description={DESC}
      quickAnswer="C4 Cleaning is a professional cleaning company in Pakistan, based in DHA Phase 6, Lahore. It provides house deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning, with fixed prices from PKR 70,000 and 24/7 service."
      criteriaTitle="What good cleaning services in Pakistan should include"
      criteria={[
        { title: "Deep cleaning that is actually deep", text: "Kitchens and cabinets, disinfected bathrooms, dusted fans and vents, sanitized floors and polished glass, not just a surface wipe." },
        { title: "Commercial cleaning that protects your image", text: "Clean workstations, restrooms, glass partitions and common areas keep clients and staff comfortable." },
        { title: "Post-construction clean-up", text: "Debris, fine dust and leftover materials removed so a new build or renovation is move-in ready." },
        { title: "Window and facade care", text: "Streak-free glass, frames and sills that lift the look of a property." },
        { title: "Clear communication", text: "A direct quote, a booked time slot and a final walkthrough, with no surprises." },
        { title: "Trained teams and safe products", text: "Professional training, modern tools and eco-friendly products on every job." },
      ]}
      whyTitle="C4 Cleaning: Lahore-based, Pakistan-wide standards"
      whyParagraphs={[
        "We are a Lahore company, and Lahore is where we work every day. Our standards are simple: trained people, a thorough checklist, safe products and fair, fixed pricing.",
        "Have a project outside Lahore? Message us with the city and the scope and we will tell you honestly whether we can help.",
      ]}
      faq={FAQ}
    />
  );
}
