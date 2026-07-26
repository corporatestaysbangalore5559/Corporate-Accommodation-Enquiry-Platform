"use client";

import { useState } from "react";
import type { Enquiry, EnquiryStatus } from "@/lib/types";
import { updateEnquiryStatus } from "@/lib/api";

const STATUS_OPTIONS: EnquiryStatus[] = ["NEW", "CONTACTED", "QUOTED", "CLOSED"];

export default function EnquiryDrawer({
  enquiry,
  onClose,
  onUpdated,
}: {
  enquiry: Enquiry;
  onClose: () => void;
  onUpdated: (e: Enquiry) => void;
}) {
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const rows: [string, string][] = [
    ["Company Name", enquiry.companyName],
    ["Office Location", enquiry.officeLocation],
    ["Number of Employees", enquiry.numEmployees],
    ["Duration", enquiry.duration],
    ["Budget", enquiry.budget],
    ["Check-in Date", enquiry.checkinDate],
    ["Special Requirements", enquiry.specialRequirements || "None"],
    ["Contact Person", enquiry.contactPersonName],
    ["Company Email", enquiry.companyEmail],
    ["Mobile Number", enquiry.mobileNumber],
    ["Submitted On", new Date(enquiry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ];

  async function handleStatusChange(next: EnquiryStatus) {
    setStatus(next);
    setSaving(true);
    setError("");
    try {
      const updated = await updateEnquiryStatus(enquiry.id, next);
      onUpdated(updated);
    } catch {
      setError("Couldn't update status. Please try again.");
      setStatus(enquiry.status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black/30" onClick={onClose}>
      <div
        className="h-full w-full max-w-sm overflow-y-auto bg-white p-6 shadow-floating"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy-900">Enquiry Details</h2>
          <button onClick={onClose} className="text-sm text-slate-500 hover:text-slate-800">
            Close
          </button>
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-slate-400">Status</label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as EnquiryStatus)}
            disabled={saving}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-1 focus:ring-navy-700 disabled:opacity-60"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
        </div>

        <dl className="space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="border-b border-slate-100 pb-2">
              <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
              <dd className="mt-0.5 text-sm font-medium text-slate-800">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
