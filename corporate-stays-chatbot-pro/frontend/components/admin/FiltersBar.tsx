import type { EnquiryStatus } from "@/lib/types";

const STATUS_OPTIONS: { label: string; value: EnquiryStatus | "" }[] = [
  { label: "All statuses", value: "" },
  { label: "New", value: "NEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "Quoted", value: "QUOTED" },
  { label: "Closed", value: "CLOSED" },
];

export default function FiltersBar({
  search,
  setSearch,
  status,
  setStatus,
  onSearch,
  onExport,
}: {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  onSearch: () => void;
  onExport: () => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Search by company, location, or contact…"
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            onSearch();
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          onClick={onSearch}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Search
        </button>
      </div>
      <button
        onClick={onExport}
        className="rounded-lg bg-gradient-to-r from-navy-800 to-navy-950 px-4 py-2 text-sm font-medium text-white shadow-card hover:opacity-90"
      >
        Export to CSV
      </button>
    </div>
  );
}
