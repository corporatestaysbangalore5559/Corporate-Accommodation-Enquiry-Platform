export default function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "navy" | "amber" | "blue" | "emerald";
}) {
  const accentClasses: Record<string, string> = {
    navy: "from-navy-800 to-navy-950",
    amber: "from-amber-500 to-amber-600",
    blue: "from-sky-500 to-sky-600",
    emerald: "from-emerald-500 to-emerald-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${accentClasses[accent]}`} />
      </div>
      <p className="mt-2 text-3xl font-semibold text-navy-900">{value}</p>
    </div>
  );
}
