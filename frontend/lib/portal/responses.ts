import {
  ACCOMMODATION_OPTIONS,
  DURATION_OPTIONS,
  EMPLOYEE_OPTIONS,
  FREQUENCY_OPTIONS,
  REQUIREMENT_OPTIONS,
  TIMELINE_OPTIONS,
} from "./options";
import type { PortalAnswers, QuestionId } from "./types";

const REQUIREMENT_LABELS = Object.fromEntries(
  REQUIREMENT_OPTIONS.map((o) => [o.id, o.title])
) as Record<string, string>;

export function getQuestionPrompt(id: QuestionId, answers: PortalAnswers): string {
  const name = answers.contactPerson.split(" ")[0];
  const greet = name ? `${name}, ` : "";

  switch (id) {
    case "requirementType":
      return "What best describes your accommodation requirement?";
    case "companyName":
      return "Which company is this requirement for?";
    case "contactPerson":
      return "Who is the primary contact for this requirement?";
    case "designation":
      return `${greet}what is your designation?`;
    case "email":
      return "What is your official work email?";
    case "phone":
      return "And the best phone number to reach you on?";
    case "location":
      return "Where should your team stay?";
    case "employees":
      return "How many employees require accommodation?";
    case "checkinDate":
      return "When is the preferred check-in date?";
    case "duration":
      return "What is the expected duration of stay?";
    case "budget":
      return "What is your target budget?";
    case "accommodationPreference":
      return "Do you have an accommodation preference?";
    case "specialRequirements":
      return "Any special requirements we should design around?";
    case "frequency":
      return "Is this requirement one-time or recurring?";
    case "proposalTimeline":
      return "When do you need the proposal?";
    case "additionalNotes":
      return "Anything else your consultant should know?";
  }
}

export function getConsultantResponse(id: QuestionId, answers: PortalAnswers): string | null {
  switch (id) {
    case "requirementType": {
      const label = REQUIREMENT_LABELS[answers.requirementType] || "your requirement";
      const tailored: Record<string, string> = {
        "business-travel":
          "Excellent. We'll design a business-travel stay strategy that balances proximity, flexibility, and corporate rates.",
        "long-term-stay":
          "Understood. For long-term stays, we'll prioritise value, space, and a home-like experience over nightly hotel rates.",
        "project-team":
          "Excellent. We'll focus on accommodation that best suits project teams while optimizing cost and convenience.",
        "employee-relocation":
          "Perfect. We'll design a relocation stay that supports a smooth landing—comfort, commute, and settlement in mind.",
        "dedicated-guest-house":
          "Great choice. We'll evaluate dedicated corporate guest house options as a strategic alternative to hotels.",
        "executive-visit":
          "Noted. We'll craft a discreet, premium arrangement suited to executive expectations and schedules.",
        "multiple-locations":
          "Understood. We'll coordinate a multi-location strategy so every hub stays consistent and well-managed.",
        "something-else":
          `Excellent. We'll treat ${label.toLowerCase()} as a custom brief and design the smartest accommodation strategy around it.`,
      };
      return tailored[answers.requirementType] || "Excellent. We'll design the smartest accommodation strategy for your brief.";
    }
    case "companyName":
      return `Thank you. We'll prepare a corporate proposal tailored for ${answers.companyName}.`;
    case "contactPerson":
      return `Pleasure to work with you, ${answers.contactPerson.split(" ")[0]}.`;
    case "designation":
      return "Noted — that helps us tailor the proposal to the right stakeholders.";
    case "email":
      return "Perfect. We'll send your customised proposal to this official email.";
    case "phone":
      return "Thank you. Your relationship manager can reach you here if anything needs clarification.";
    case "location":
      return "Perfect. We'll prioritise accommodation with convenient access to your office.";
    case "employees": {
      const label = EMPLOYEE_OPTIONS.find((o) => o.id === answers.employees)?.title;
      return `Understood — we'll design for ${label || "your team size"} while keeping operational simplicity front of mind.`;
    }
    case "checkinDate":
      return "Got it. We'll align availability and corporate rates around that check-in window.";
    case "duration": {
      const option = DURATION_OPTIONS.find((o) => o.id === answers.duration);
      if (option?.exceeds30Days) {
        return "Long-term stays often achieve better value through serviced apartments or dedicated corporate guest houses. We'll evaluate both options.";
      }
      return `Noted — a ${option?.title.toLowerCase() || "short"} stay. We'll optimise for flexibility and corporate rates.`;
    }
    case "budget":
      return "Thank you. Budget context helps us recommend the smartest solution—not just the nearest option.";
    case "accommodationPreference": {
      const option = ACCOMMODATION_OPTIONS.find((o) => o.id === answers.accommodationPreference);
      if (answers.accommodationPreference === "no-preference") {
        return "Perfect. With no preference locked in, we'll recommend the strongest strategy across all formats.";
      }
      return `Understood. We'll evaluate ${option?.title || "your preference"} against alternatives to confirm it's the smartest fit.`;
    }
    case "specialRequirements":
      return answers.specialRequirements.length
        ? "Noted. These preferences will shape the accommodation strategy we propose."
        : "No problem — we'll keep the strategy flexible and practical.";
    case "frequency": {
      const option = FREQUENCY_OPTIONS.find((o) => o.id === answers.frequency);
      if (answers.frequency === "one-time") {
        return "Understood. We'll prepare a focused one-time proposal.";
      }
      return `Excellent. For ${option?.title.toLowerCase() || "recurring"} needs, we'll design for consistency, rates, and long-term account management.`;
    }
    case "proposalTimeline": {
      const option = TIMELINE_OPTIONS.find((o) => o.id === answers.proposalTimeline);
      if (answers.proposalTimeline === "today" || answers.proposalTimeline === "within-24-hours") {
        return "We'll prioritise your requirement and aim to deliver within your timeline.";
      }
      return `Understood — ${option?.title.toLowerCase() || "flexible timing"}. We'll prepare a thoughtful strategy without rushing quality.`;
    }
    case "additionalNotes":
      return answers.additionalNotes.trim()
        ? "Thank you. Your notes will be included in the consultant brief."
        : null;
  }
}

export function getDisplayLabel(id: QuestionId, answers: PortalAnswers): string {
  switch (id) {
    case "requirementType":
      return REQUIREMENT_OPTIONS.find((o) => o.id === answers.requirementType)?.title || "—";
    case "companyName":
      return answers.companyName || "—";
    case "contactPerson":
      return answers.contactPerson || "—";
    case "designation":
      return answers.designation || "—";
    case "email":
      return answers.email || "—";
    case "phone":
      return answers.phone || "—";
    case "location":
      return answers.location || "—";
    case "employees":
      return EMPLOYEE_OPTIONS.find((o) => o.id === answers.employees)?.title || "—";
    case "checkinDate":
      return answers.checkinDate
        ? new Date(answers.checkinDate + "T00:00:00").toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "—";
    case "duration":
      return DURATION_OPTIONS.find((o) => o.id === answers.duration)?.title || "—";
    case "budget": {
      if (!answers.budgetAmount) return "—";
      const period =
        answers.budgetPeriod === "night"
          ? "per night"
          : answers.budgetPeriod === "week"
            ? "per week"
            : "per month";
      return `₹${Number(answers.budgetAmount.replace(/[^\d]/g, "") || 0).toLocaleString("en-IN")} ${period}`;
    }
    case "accommodationPreference":
      return (
        ACCOMMODATION_OPTIONS.find((o) => o.id === answers.accommodationPreference)?.title || "—"
      );
    case "specialRequirements": {
      const chips: string[] = answers.specialRequirements.filter((s) => s !== "Other");
      if (answers.specialRequirements.includes("Other") && answers.specialOther.trim()) {
        chips.push(answers.specialOther.trim());
      }
      return chips.length ? chips.join(", ") : "None specified";
    }
    case "frequency":
      return FREQUENCY_OPTIONS.find((o) => o.id === answers.frequency)?.title || "—";
    case "proposalTimeline":
      return TIMELINE_OPTIONS.find((o) => o.id === answers.proposalTimeline)?.title || "—";
    case "additionalNotes":
      return answers.additionalNotes.trim() || "None";
  }
}
