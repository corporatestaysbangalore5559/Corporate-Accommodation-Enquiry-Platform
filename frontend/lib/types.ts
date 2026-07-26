export type EnquiryStatus = "NEW" | "CONTACTED" | "QUOTED" | "CLOSED";

export interface Enquiry {
  id: string;
  companyName: string;
  officeLocation: string;
  numEmployees: string;
  duration: string;
  budget: string;
  checkinDate: string;
  specialRequirements: string | null;
  contactPersonName: string;
  companyEmail: string;
  mobileNumber: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryStats {
  total: number;
  new: number;
  contacted: number;
  quoted: number;
}

export interface AdminProfile {
  id: string;
  email: string;
  name: string | null;
}
