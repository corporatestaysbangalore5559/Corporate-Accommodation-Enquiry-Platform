import type {
  AccommodationPreference,
  EmployeeCount,
  ProposalTimeline,
  RequirementFrequency,
  RequirementType,
  SpecialRequirement,
  StayDuration,
} from "./types";

export const REQUIREMENT_OPTIONS: {
  id: RequirementType;
  title: string;
  description: string;
}[] = [
  {
    id: "business-travel",
    title: "Business Travel",
    description: "Short stays for meetings, conferences, or client visits.",
  },
  {
    id: "long-term-stay",
    title: "Long-Term Stay",
    description: "Extended accommodation with home-like comfort and value.",
  },
  {
    id: "project-team",
    title: "Project Team",
    description: "Coordinated stays for delivery teams near project sites.",
  },
  {
    id: "employee-relocation",
    title: "Employee Relocation",
    description: "Smooth onboarding stays while employees settle in Bangalore.",
  },
  {
    id: "dedicated-guest-house",
    title: "Dedicated Corporate Guest House",
    description: "Exclusive property managed as your company's guest house.",
  },
  {
    id: "executive-visit",
    title: "Executive Visit",
    description: "Premium arrangements for leadership and VIP travellers.",
  },
  {
    id: "multiple-locations",
    title: "Multiple Locations",
    description: "Coordinated accommodation across several Bangalore hubs.",
  },
  {
    id: "something-else",
    title: "Something Else",
    description: "A unique requirement — we'll design a custom strategy.",
  },
];

export const EMPLOYEE_OPTIONS: {
  id: EmployeeCount;
  title: string;
  description: string;
  icon: "user" | "users" | "building" | "hotel" | "city";
}[] = [
  { id: "just-me", title: "Just Me", description: "Single traveller", icon: "user" },
  { id: "2-5", title: "2–5", description: "Small team", icon: "users" },
  { id: "6-20", title: "6–20", description: "Department group", icon: "building" },
  { id: "21-50", title: "21–50", description: "Large cohort", icon: "hotel" },
  { id: "50-plus", title: "50+", description: "Enterprise scale", icon: "city" },
];

export const DURATION_OPTIONS: {
  id: StayDuration;
  title: string;
  exceeds30Days: boolean;
}[] = [
  { id: "1-night", title: "1 Night", exceeds30Days: false },
  { id: "2-7-days", title: "2–7 Days", exceeds30Days: false },
  { id: "1-4-weeks", title: "1–4 Weeks", exceeds30Days: false },
  { id: "1-3-months", title: "1–3 Months", exceeds30Days: true },
  { id: "3-6-months", title: "3–6 Months", exceeds30Days: true },
  { id: "6-plus-months", title: "6+ Months", exceeds30Days: true },
];

export const ACCOMMODATION_OPTIONS: {
  id: AccommodationPreference;
  title: string;
  description: string;
  icon: "hotel" | "apartment" | "house" | "villa" | "sparkles";
}[] = [
  {
    id: "hotel",
    title: "Hotel",
    description: "Flexible nightly stays with full services",
    icon: "hotel",
  },
  {
    id: "serviced-apartment",
    title: "Serviced Apartment",
    description: "Space, kitchen, and longer-stay value",
    icon: "apartment",
  },
  {
    id: "corporate-guest-house",
    title: "Corporate Guest House",
    description: "Dedicated property for recurring needs",
    icon: "house",
  },
  {
    id: "villa",
    title: "Villa",
    description: "Private residences for teams or executives",
    icon: "villa",
  },
  {
    id: "no-preference",
    title: "No Preference",
    description: "We'll recommend the smartest option",
    icon: "sparkles",
  },
];

export const SPECIAL_REQUIREMENT_OPTIONS: SpecialRequirement[] = [
  "Business",
  "Meeting Room",
  "Near Office",
  "WiFi",
  "Executive Stay",
  "Comfort",
  "Kitchen",
  "Laundry",
  "Daily Housekeeping",
  "Gym",
  "Transport",
  "Airport Pickup",
  "Parking",
  "Safety",
  "24x7 Check-in",
  "Other",
];

export const FREQUENCY_OPTIONS: {
  id: RequirementFrequency;
  title: string;
  description: string;
}[] = [
  { id: "one-time", title: "One-time", description: "A single stay requirement" },
  { id: "monthly", title: "Monthly", description: "Recurring each month" },
  { id: "quarterly", title: "Quarterly", description: "Seasonal or project-based cycles" },
  { id: "ongoing", title: "Ongoing", description: "Continuous corporate programme" },
];

export const TIMELINE_OPTIONS: {
  id: ProposalTimeline;
  title: string;
  description: string;
}[] = [
  { id: "today", title: "Today", description: "Urgent — need a proposal immediately" },
  { id: "within-24-hours", title: "Within 24 Hours", description: "Standard priority response" },
  { id: "this-week", title: "This Week", description: "Planning ahead for the week" },
  { id: "just-exploring", title: "Just Exploring", description: "Gathering options for later" },
];

export const BANGALORE_LOCATIONS = [
  "Manyata Tech Park",
  "Whitefield",
  "Electronic City",
  "Airport Road",
  "Hebbal",
  "Koramangala",
  "Outer Ring Road",
  "Indiranagar",
  "MG Road",
  "Bellandur",
  "Sarjapur Road",
  "Yelahanka",
  "Marathahalli",
  "HSR Layout",
  "Bannerghatta Road",
  "Peenya",
  "Bommanahalli",
  "KR Puram",
];

export const CLIENT_LOGOS = [
  "TechNova",
  "Aether Labs",
  "Vertex Global",
  "Nimbus Soft",
  "Pinnacle HR",
  "Orbit Systems",
  "Lumen Corp",
  "Cascade AI",
];

export const STATS = [
  { value: "109+", label: "Corporate Clients" },
  { value: "36,000+", label: "Guests Hosted" },
  { value: "25+", label: "Years of Hospitality" },
  { value: "250+", label: "Accommodation Keys" },
];

export const WHY_CHOOSE = [
  {
    title: "We don't recommend hotels by default.",
    description: "Every brief starts with your business need—not a property inventory.",
  },
  {
    title: "We recommend the smartest accommodation solution.",
    description: "Strategy first: cost, commute, experience, and operational simplicity.",
  },
  {
    title: "Hotels, Serviced Apartments, Guest Houses & Villas.",
    description: "The full Bangalore corporate stay spectrum under one partner.",
  },
  {
    title: "One Partner. One Proposal. Zero Hassle.",
    description: "A single relationship manager owns analysis through delivery.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How long does it take?",
    answer:
      "Most proposals are delivered within 24 hours. Urgent requirements flagged for today are prioritised by your relationship manager.",
  },
  {
    question: "Can you support multiple locations?",
    answer:
      "Yes. We design coordinated strategies across Bangalore hubs—and can align stays when teams move between offices or project sites.",
  },
  {
    question: "Do you arrange dedicated guest houses?",
    answer:
      "Absolutely. For recurring programmes, we evaluate and set up dedicated corporate guest houses as a cost-efficient alternative to hotels.",
  },
  {
    question: "Do you support international employees?",
    answer:
      "Yes. We tailor stays for relocating and visiting international employees, including comfort, safety, and proximity preferences.",
  },
  {
    question: "Can you manage recurring accommodation?",
    answer:
      "Yes. Monthly, quarterly, and ongoing programmes are a core strength—complete with corporate rate negotiation and account management.",
  },
];

export const PROCESS_TIMELINE = [
  "Requirement Received",
  "Accommodation Analysis",
  "Corporate Rate Negotiation",
  "Accommodation Strategy",
  "Proposal Preparation",
  "Proposal Delivered",
  "Booking Support",
];

export const RM_PROMISES = [
  "Analyse nearby accommodation",
  "Compare Hotels vs Serviced Apartments",
  "Evaluate Dedicated Guest Houses",
  "Negotiate Corporate Rates",
  "Prepare one customised proposal",
];

export const OUR_PROMISE = [
  "Response within 24 Hours",
  "Dedicated Account Manager",
  "Best Corporate Rates",
  "Tailored Accommodation Strategy",
];
