import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "C4 Cleaning | Crystal Clear Cleaning Company",
    short_name: "C4 Cleaning",
    description: "Professional house, office, window and post-construction cleaning in Lahore.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/c4logo.png", sizes: "any", type: "image/png" }],
  };
}
