// All business content, sourced from https://c4cleanings.com/ (solar panel cleaning intentionally excluded).

export const BRAND = {
  name: "C4 Cleaning",
  wordmark: "C4 CLEANING",
  tagline: "Shining Standards, Spotless Results",
  phone: "+92 3296017412",
  phoneHref: "tel:+923296017412",
  whatsapp: "https://wa.me/923296017412",
  email: "Crystalclearcleaning.co@gmail.com",
  officialEmail: "info@c4cleanings.com",
  address: "DHA Phase 6 Lahore, Pakistan",
  instagram: "https://www.instagram.com/crystalclear.cleaningcompany",
  availability: "We work for you 24/7",
};

export type Service = { id: string; img: string; title: string; short: string; intro: string; bullets: string[] };

export const SERVICES: Service[] = [
  {
    id: "commercial",
    img: "/work/c4-project-23.webp",
    title: "Commercial Cleaning",
    short: "Offices and workplaces kept immaculate, so clients and staff notice.",
    intro: "A clean workplace boosts productivity and impresses clients and staff alike.",
    bullets: [
      "Disinfect workstations, desks, and high-touch office areas",
      "Clean floors: sweeping, mopping, and vacuuming all zones",
      "Empty trash bins and replace liners across the facility",
      "Wipe down glass doors, partitions, and reception surfaces",
      "Clean restrooms and refill essential supplies",
      "Sanitize meeting rooms and common areas",
      "Maintain a tidy, professional environment that impresses clients",
    ],
  },
  {
    id: "residential",
    img: "/work/c4-project-03.webp",
    title: "Residential Deep Cleaning",
    short: "Thorough top-to-bottom cleaning that refreshes your whole home.",
    intro: "A thorough, top-to-bottom clean that refreshes every room of your home.",
    bullets: [
      "Deep clean kitchens, including countertops, cabinets, and appliances",
      "Scrub and disinfect bathrooms from top to bottom",
      "Dust furniture, fans, vents, and hard-to-reach corners",
      "Vacuum carpets and sanitize floors throughout the home",
      "Remove grime, stains, and built-up dirt in all rooms",
      "Clean windows, mirrors, and interior glass surfaces",
      "Refresh bedrooms and living areas for a healthier home",
    ],
  },
  {
    id: "window",
    img: "/work/c4-project-11.webp",
    title: "Window & Facade Cleaning",
    short: "Streak-free glass and facades for a brighter, polished look.",
    intro: "Streak-free window and facade cleaning for a brighter, more polished property.",
    bullets: [
      "Clean glass surfaces inside and outside (accessible areas)",
      "Remove dust, watermarks, and tough stains",
      "Polish windows for a crystal-clear finish",
      "Clean frames, sills, and edges for a uniform shine",
      "Use safe, streak-free cleaning solutions",
      "Enhance overall curb appeal of your property",
    ],
  },
  {
    id: "post-construction",
    img: "/work/c4-project-31.webp",
    title: "Post-Construction Cleaning",
    short: "Debris, dust and fine particles gone, so the space is move-in ready.",
    intro: "After construction or renovation, we clear debris, dust and fine particles for a move-in-ready finish.",
    // NOTE: the live site shows solar-panel bullets under this heading (a content mix-up);
    // these are written from the service's own description instead.
    bullets: [
      "Remove construction debris and leftover materials",
      "Clear dust and fine particles from every surface",
      "Clean floors, windows, frames, and fixtures",
      "Scrub kitchens and bathrooms after fit-out",
      "Wipe down walls, doors, and built-in cabinetry",
      "Leave the space spotless and ready to move in",
    ],
  },
];

export const PROCESS = [
  { n: "01", title: "Book Your Service", text: "Call or message us on WhatsApp." },
  { n: "02", title: "Choose Time Slot", text: "Pick a time that suits your schedule." },
  { n: "03", title: "Thorough Cleaning", text: "Our trained team gets to work." },
  { n: "04", title: "Final Review & Satisfaction", text: "We check every corner with you." },
];

export const VALUES = [
  { title: "A Commitment to Quality", text: "Strict quality measures, with every corner inspected." },
  { title: "Experienced & Trusted Professionals", text: "Years of hands-on experience, professional training and background checks." },
  { title: "Modern Tools & Safe Techniques", text: "Advanced equipment and eco-friendly products that are safe for families, staff and the environment." },
  { title: "Customer-Centric Service", text: "Your comfort and satisfaction come first, with service adapted to your needs and schedule." },
  { title: "Transparent & Honest Work", text: "Clear communication, fair pricing and no hidden charges." },
  { title: "Dedicated to Continuous Improvement", text: "Our team regularly upgrades its skills, techniques and equipment." },
];

export const STATS = [
  { value: "350+", label: "Satisfied clients" },
  { value: "500+", label: "Spaces cleaned" },
  { value: "99%", label: "Customer satisfaction" },
  { value: "5+", label: "Years of expertise" },
];

export const PROMISES = [
  "Professionally trained team members",
  "Thorough checklists",
  "On-schedule arrival and efficient completion",
  "Modern tools and safe products",
  "No hidden charges, clear fair pricing",
  "Comfort, privacy and satisfaction",
];

export const TESTIMONIALS = [
  { name: "Ayesha Malik", city: "Lahore", quote: "Highly impressed with their service quality", text: "C4 transformed her home. The staff arrived on time, worked professionally and left everything sparkling clean." },
  { name: "Muhammad Farhan", city: "Lahore", quote: "Definitely recommended", text: "Hired for office commercial cleaning, the results were outstanding. The staff were polite, efficient and detail-oriented." },
  { name: "Sana Javed", city: "Lahore", quote: "Excellent experience", text: "Post-construction cleaning made her new house look picture-perfect, handled with care and precision." },
];

const PLAN_ITEMS = [
  "Kitchen and cabinets deep clean",
  "Bathrooms scrubbed and disinfected",
  "Dusting of furniture, fans and vents",
  "Floors vacuumed, mopped and sanitized",
  "Windows, mirrors and glass surfaces",
  "Bedrooms and living areas refreshed",
];

export const PLANS = [
  { name: "10 Marla", price: "70,000", note: "Home deep clean", items: PLAN_ITEMS },
  { name: "1 Kanal", price: "110,000", note: "Without basement", items: PLAN_ITEMS },
  { name: "1 Kanal + Basement", price: "160,000", note: "Basement included", items: [...PLAN_ITEMS, "Basement cleaned top to bottom"] },
];

// Real project photos from c4cleanings.com, stored locally in /public/work.
export const WORK = [
  // latest completed homes (newest first)
  ...Array.from({ length: 34 }, (_, i) => ({
    src: `/work/c4-project-${String(i + 1).padStart(2, "0")}.webp`,
    tag: "Residential",
    place: "Luxury home, full house clean",
  })),
  // earlier projects
  { src: "/work/w01.jpeg", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/c4-project-23.webp", tag: "Commercial", place: "Boardroom & offices" },
  { src: "/work/c4-project-31.webp", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/w04.jpeg", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/w05.jpeg", tag: "Commercial", place: "Offices" },
  { src: "/work/w06.jpeg", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/w07.jpeg", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/w08.jpeg", tag: "Commercial", place: "Offices" },
  { src: "/work/w09.jpeg", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/w10.jpeg", tag: "Commercial", place: "Offices" },
  { src: "/work/c4-project-03.webp", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/w12.jpeg", tag: "Residential", place: "Upper Mall Road" },
  { src: "/work/c4-project-11.webp", tag: "Commercial", place: "Offices" },
];
