import type { AdminProfile, Enquiry, EnquiryStats } from "./types";
import { getToken, clearToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}, auth = false): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401 && auth) {
    clearToken();
  }

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore — use default message
    }
    throw new ApiError(message, res.status);
  }

  return res.json();
}

// ── Public ───────────────────────────────────────────────────────────────
export function submitEnquiry(payload: {
  companyName: string;
  officeLocation: string;
  numEmployees: string;
  duration: string;
  budget: string;
  checkinDate: string;
  specialRequirements: string;
  contactPersonName: string;
  companyEmail: string;
  mobileNumber: string;
}): Promise<{ success: boolean; id: string }> {
  return request("/api/enquiries", { method: "POST", body: JSON.stringify(payload) });
}

// ── Auth ─────────────────────────────────────────────────────────────────
export function loginAdmin(email: string, password: string): Promise<{ token: string; admin: AdminProfile }> {
  return request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export function fetchCurrentAdmin(): Promise<AdminProfile> {
  return request("/api/auth/me", {}, true);
}

// ── Admin: enquiries ─────────────────────────────────────────────────────
export function fetchEnquiries(params: { search?: string; status?: string } = {}): Promise<Enquiry[]> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return request(`/api/enquiries${suffix}`, {}, true);
}

export function fetchStats(): Promise<EnquiryStats> {
  return request("/api/enquiries/stats", {}, true);
}

export function updateEnquiryStatus(id: string, status: string): Promise<Enquiry> {
  return request(`/api/enquiries/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }, true);
}

export function exportEnquiriesCsvUrl(): string {
  return `${API_URL}/api/enquiries/export`;
}

export { API_URL, ApiError };
