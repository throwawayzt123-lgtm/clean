import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SITE_DESCRIPTION, SITE_KEYWORDS, pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "C4 Cleaning | Professional Cleaning Company in Lahore",
    description: SITE_DESCRIPTION,
    path: "/",
    keywords: SITE_KEYWORDS,
  }),
  // the home page uses the full title as-is (no "| C4 Cleaning" suffix)
  title: { absolute: "C4 Cleaning | Professional Cleaning Company in Lahore" },
};

export default function Home() {
  return <HomeClient />;
}
