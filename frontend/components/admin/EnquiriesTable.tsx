import type { Enquiry } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-800",
  CONTACTED: "bg-sky-100 text-sky-800",
  QUOTED: "bg-emerald-100 text-emerald-800",
  CLOSED: "bg-slate-200 text-slate-700",
};

export default function EnquiriesTable({
  enquiries,
  loading,
  onView,
}: {
  enquiries: Enquiry[];
  loading: boolean;
  onView: (e: Enquiry) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
      <table className="w-full min-w-[1000px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Company Name</th>
            <th className="px-4 py-3">Office Location</th>
            <th className="px-4 py-3">Employees</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Budget</th>
            <th className="px-4 py-3">Check-in Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date Submitted</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={9} className="px-4 py-10 text-center text-slate-400">
                Loading…
              </td>
            </tr>
          )}
          {!loading && enquiries.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-10 text-center text-slate-400">
                No enquiries found.
              </td>
            </tr>
          )}
          {!loading &&
            enquiries.map((e) => (
              <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{e.companyName}</td>
                <td className="px-4 py-3 text-slate-600">{e.officeLocation}</td>
                <td className="px-4 py-3 text-slate-600">{e.numEmployees}</td>
                <td className="px-4 py-3 text-slate-600">{e.duration}</td>
                <td className="px-4 py-3 text-slate-600">{e.budget}</td>
                <td className="px-4 py-3 text-slate-600">{e.checkinDate}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[e.status] || "bg-slate-100 text-slate-700"}`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(e.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => onView(e)} className="text-sm font-medium text-navy-800 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
