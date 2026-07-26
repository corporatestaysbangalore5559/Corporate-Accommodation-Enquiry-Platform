export type EnquiryStatus = "NEW" | "CONTACTED" | "QUOTED" | "CLOSED";

export interface CreateEnquiryInput {
  companyName: string;
  officeLocation: string;
  numEmployees: string;
  duration: string;
  budget: string;
  checkinDate: string;
  specialRequirements?: string;
  contactPersonName: string;
  companyEmail: string;
  mobileNumber: string;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
}
