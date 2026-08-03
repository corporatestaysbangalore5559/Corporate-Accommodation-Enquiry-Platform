import type { PortalAnswers, QuestionId } from "./types";

export function validateQuestion(id: QuestionId, answers: PortalAnswers): string | null {
  switch (id) {
    case "requirementType":
      return answers.requirementType ? null : "Please select the option that best describes your requirement.";
    case "companyName":
      return answers.companyName.trim().length >= 2
        ? null
        : "Please enter your company name.";
    case "contactPerson":
      return answers.contactPerson.trim().length >= 2
        ? null
        : "Please enter the contact person's name.";
    case "designation":
      return answers.designation.trim().length >= 2
        ? null
        : "Please enter your designation.";
    case "email": {
      const email = answers.email.trim();
      if (!email) return "Please enter your official email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid work email.";
      return null;
    }
    case "phone": {
      const digits = answers.phone.replace(/[^\d]/g, "");
      if (digits.length < 7 || digits.length > 15) return "Please enter a valid phone number.";
      return null;
    }
    case "location":
      return answers.location.trim().length >= 2
        ? null
        : "Please tell us where your team should stay.";
    case "employees":
      return answers.employees ? null : "Please select how many employees need accommodation.";
    case "checkinDate":
      return answers.checkinDate ? null : "Please select a preferred check-in date.";
    case "duration":
      return answers.duration ? null : "Please select the expected duration.";
    case "budget": {
      const amount = answers.budgetAmount.replace(/[^\d]/g, "");
      if (!amount || Number(amount) <= 0) return "Please enter a target budget amount.";
      return null;
    }
    case "accommodationPreference":
      return answers.accommodationPreference
        ? null
        : "Please select an accommodation preference.";
    case "specialRequirements":
      if (answers.specialRequirements.includes("Other") && !answers.specialOther.trim()) {
        return "Please briefly describe your other requirement.";
      }
      return null;
    case "frequency":
      return answers.frequency ? null : "Please select how often this requirement occurs.";
    case "proposalTimeline":
      return answers.proposalTimeline ? null : "Please select when you need the proposal.";
    case "additionalNotes":
      return null;
  }
}

export function buildSpecialRequirementsPayload(answers: PortalAnswers, referenceId: string): string {
  const prefs: string[] = answers.specialRequirements.filter((s) => s !== "Other");
  if (answers.specialRequirements.includes("Other") && answers.specialOther.trim()) {
    prefs.push(`Other: ${answers.specialOther.trim()}`);
  }

  const lines = [
    `Reference ID: ${referenceId}`,
    `Requirement Type: ${answers.requirementType}`,
    `Designation: ${answers.designation}`,
    `Accommodation Preference: ${answers.accommodationPreference}`,
    `Requirement Frequency: ${answers.frequency}`,
    `Proposal Timeline: ${answers.proposalTimeline}`,
    `Special Requirements: ${prefs.length ? prefs.join(", ") : "None"}`,
    answers.additionalNotes.trim()
      ? `Additional Notes: ${answers.additionalNotes.trim()}`
      : "Additional Notes: None",
  ];

  return lines.join("\n");
}

export function toEnquiryPayload(answers: PortalAnswers, referenceId: string) {
  const periodLabel =
    answers.budgetPeriod === "night"
      ? "per night"
      : answers.budgetPeriod === "week"
        ? "per week"
        : "per month";
  const amount = answers.budgetAmount.replace(/[^\d]/g, "");

  return {
    companyName: answers.companyName.trim(),
    officeLocation: answers.location.trim(),
    numEmployees: answers.employees,
    duration: answers.duration,
    budget: `₹${Number(amount).toLocaleString("en-IN")} ${periodLabel}`,
    checkinDate: answers.checkinDate,
    specialRequirements: buildSpecialRequirementsPayload(answers, referenceId),
    contactPersonName: answers.contactPerson.trim(),
    companyEmail: answers.email.trim(),
    mobileNumber: answers.phone.trim(),
  };
}
