import { PLANS } from "./content";

const prices = PLANS.map((p) => `${p.name} PKR ${p.price}`).join(", ");

/** Question-and-answer content written as direct, self-contained answers (for featured snippets and AI answers). */
export const FAQ_GENERAL: string[][] = [
  ["What is C4 Cleaning?", "C4 Cleaning (Crystal Clear Cleaning Company) is a professional cleaning company in DHA Phase 6, Lahore, Pakistan. It provides house deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning, and works for you 24/7."],
  ["Which is the best cleaning company in Lahore?", "The best cleaning company is the one that combines trained staff, a thorough checklist, safe products, clear fixed pricing and on-time service. C4 Cleaning is built around exactly these points, with 350+ satisfied clients and fixed prices by property size. Compare any provider on those criteria before booking."],
  ["How do I choose the best deep cleaning service in Lahore?", "Check that the company states exactly what a deep clean includes, gives a fixed price for your property size, uses safe products, and inspects the finished work with you. Ask for photos of previous projects. C4 Cleaning publishes its checklists, prices and project gallery."],
  ["How much does house deep cleaning cost in Lahore?", `C4 Cleaning charges fixed prices by property size: ${prices}. Each price covers the full house cleaned: kitchens, bathrooms, floors, windows and living areas.`],
  ["How much does it cost to deep clean a 10 marla house in Lahore?", "A 10 Marla home deep clean with C4 Cleaning is PKR 70,000 for the full house."],
  ["How much does it cost to deep clean a 1 kanal house in Lahore?", "A 1 Kanal house without a basement is PKR 110,000, and a 1 Kanal house with a basement is PKR 160,000 with C4 Cleaning."],
  ["What does a deep cleaning service include?", "A deep clean goes beyond routine cleaning: kitchens and cabinets, scrubbed and disinfected bathrooms, dusting of furniture, fans and vents, vacuumed, mopped and sanitized floors, and cleaned windows, mirrors and glass. C4 Cleaning also refreshes bedrooms and living areas."],
  ["Do you clean basements?", "Yes. The 1 Kanal with basement package includes the basement cleaned top to bottom."],
  ["What commercial and office cleaning do you offer in Lahore?", "C4 Cleaning disinfects workstations and high-touch areas, cleans all floors, empties bins, wipes glass doors and partitions, cleans restrooms and sanitizes meeting rooms and common areas."],
  ["Do you do post-construction cleaning?", "Yes. After construction or renovation we remove debris and leftover materials, clear dust and fine particles from every surface, clean floors, windows, frames and fixtures, and scrub kitchens and bathrooms so the space is move-in ready."],
  ["Do you clean windows and building facades?", "Yes. We clean glass inside and outside (accessible areas), remove dust, watermarks and tough stains, polish for a streak-free finish and clean frames, sills and edges using safe solutions."],
  ["Which areas of Lahore do you serve?", "C4 Cleaning is based in DHA Phase 6 and serves homes and offices across Lahore. Message us to confirm your area."],
  ["Do you offer cleaning services in other cities of Pakistan?", "We are based in Lahore and focus on Lahore. If you have a project elsewhere in Pakistan, message us and we will tell you whether we can help."],
  ["Are your cleaning products safe?", "We use modern equipment and eco-friendly products that are safe for families, staff and the environment."],
  ["Are your cleaners trained and trusted?", "Our team members are professionally trained, with hands-on experience, professional training and background checks."],
  ["Can I book a cleaning at any time?", "Yes. We work for you 24/7, so you can choose a time slot that suits your schedule."],
  ["How do I book C4 Cleaning?", "Call +92 329 6017412, message us on WhatsApp, or send the contact form. We reply with a quote, usually the same day. Then pick a time slot and our team gets to work."],
  ["Do you charge hidden fees?", "No. We offer clear communication, fair pricing and no hidden charges."],
  ["How can I contact C4 Cleaning?", "Phone and WhatsApp +92 329 6017412, email info@c4cleanings.com, or visit us at DHA Phase 6, Lahore."],
];
