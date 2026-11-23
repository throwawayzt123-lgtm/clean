/** Target search phrases, grouped by intent. Used in metadata, llms.txt and page copy. */
export const KEYWORD_GROUPS: Record<string, string[]> = {
  "Lahore: best / general": [
    "best cleaning company in Lahore",
    "best cleaning services in Lahore",
    "top cleaning company in Lahore",
    "professional cleaning services Lahore",
    "cleaning company near me Lahore",
    "affordable cleaning services Lahore",
    "reliable cleaning company Lahore",
    "cleaning services in DHA Lahore",
  ],
  "Pakistan": [
    "best cleaning company in Pakistan",
    "cleaning services in Pakistan",
    "professional cleaning company Pakistan",
    "deep cleaning services Pakistan",
    "best deep cleaning services in Pakistan",
    "post construction cleaning Pakistan",
    "building facade cleaning Pakistan",
  ],
  "Deep cleaning / home": [
    "best deep cleaning services in Lahore",
    "deep cleaning services in Lahore",
    "house deep cleaning Lahore",
    "home cleaning services Lahore",
    "house cleaning service Lahore price",
    "deep cleaning price Lahore",
    "kanal house cleaning Lahore",
    "10 marla house cleaning Lahore",
    "villa cleaning Lahore",
    "kitchen deep cleaning Lahore",
    "bathroom deep cleaning Lahore",
    "basement cleaning Lahore",
  ],
  "Commercial": [
    "commercial cleaning Lahore",
    "office cleaning services Lahore",
    "corporate cleaning company Lahore",
    "janitorial services Lahore",
  ],
  "Window & facade": ["window cleaning Lahore", "glass and facade cleaning Lahore"],
  "Post-construction": ["post construction cleaning Lahore", "after renovation cleaning Lahore", "builders cleaning Lahore"],
  "Qualities & brand": [
    "cleaning company 24/7 Lahore",
    "eco-friendly cleaning services Lahore",
    "C4 Cleaning Lahore",
    "Crystal Clear Cleaning Company Lahore",
  ],
};

export const ALL_KEYWORDS = Object.values(KEYWORD_GROUPS).flat();

/** Neighbourhoods named on the site (confirm these match where you actually work). */
export const AREAS = ["DHA", "Gulberg", "Johar Town", "Bahria Town", "Model Town", "Lahore Cantt", "Wapda Town", "Valencia Town", "Askari", "Garden Town"];
