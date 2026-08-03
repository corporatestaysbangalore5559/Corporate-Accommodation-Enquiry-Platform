export type RequirementType =
  | "business-travel"
  | "long-term-stay"
  | "project-team"
  | "employee-relocation"
  | "dedicated-guest-house"
  | "executive-visit"
  | "multiple-locations"
  | "something-else";

export type EmployeeCount = "just-me" | "2-5" | "6-20" | "21-50" | "50-plus";

export type StayDuration =
  | "1-night"
  | "2-7-days"
  | "1-4-weeks"
  | "1-3-months"
  | "3-6-months"
  | "6-plus-months";

export type BudgetPeriod = "night" | "week" | "month";

export type AccommodationPreference =
  | "hotel"
  | "serviced-apartment"
  | "corporate-guest-house"
  | "villa"
  | "no-preference";

export type RequirementFrequency = "one-time" | "monthly" | "quarterly" | "ongoing";

export type ProposalTimeline = "today" | "within-24-hours" | "this-week" | "just-exploring";

export type SpecialRequirement =
  | "Business"
  | "Meeting Room"
  | "Near Office"
  | "WiFi"
  | "Executive Stay"
  | "Comfort"
  | "Kitchen"
  | "Laundry"
  | "Daily Housekeeping"
  | "Gym"
  | "Transport"
  | "Airport Pickup"
  | "Parking"
  | "Safety"
  | "24x7 Check-in"
  | "Other";

export interface PortalAnswers {
  requirementType: RequirementType | "";
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  location: string;
  employees: EmployeeCount | "";
  checkinDate: string;
  duration: StayDuration | "";
  budgetAmount: string;
  budgetPeriod: BudgetPeriod;
  accommodationPreference: AccommodationPreference | "";
  specialRequirements: SpecialRequirement[];
  specialOther: string;
  frequency: RequirementFrequency | "";
  proposalTimeline: ProposalTimeline | "";
  additionalNotes: string;
}

export type PortalPhase = "asking" | "summary" | "submitting" | "success";

export type QuestionId =
  | "requirementType"
  | "companyName"
  | "contactPerson"
  | "designation"
  | "email"
  | "phone"
  | "location"
  | "employees"
  | "checkinDate"
  | "duration"
  | "budget"
  | "accommodationPreference"
  | "specialRequirements"
  | "frequency"
  | "proposalTimeline"
  | "additionalNotes";

export const INITIAL_ANSWERS: PortalAnswers = {
  requirementType: "",
  companyName: "",
  contactPerson: "",
  designation: "",
  email: "",
  phone: "",
  location: "",
  employees: "",
  checkinDate: "",
  duration: "",
  budgetAmount: "",
  budgetPeriod: "month",
  accommodationPreference: "",
  specialRequirements: [],
  specialOther: "",
  frequency: "",
  proposalTimeline: "",
  additionalNotes: "",
};

export const QUESTION_ORDER: QuestionId[] = [
  "requirementType",
  "companyName",
  "contactPerson",
  "designation",
  "email",
  "phone",
  "location",
  "employees",
  "checkinDate",
  "duration",
  "budget",
  "accommodationPreference",
  "specialRequirements",
  "frequency",
  "proposalTimeline",
  "additionalNotes",
];
