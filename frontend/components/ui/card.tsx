import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}

export function OptionCard({
  selected,
  onClick,
  title,
  description,
  icon,
  className,
}: {
  selected?: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-start gap-3 rounded-2xl border bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        selected
          ? "border-brand-500 bg-brand-50/70 ring-2 ring-brand-100"
          : "border-slate-200 hover:border-brand-200",
        className
      )}
    >
      {icon && (
        <span
          className={cn(
            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
            selected ? "bg-brand-600 text-white" : "bg-slate-100 text-brand-700 group-hover:bg-brand-50"
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold text-slate-900">{title}</span>
        {description && (
          <span className="mt-1 block text-sm leading-relaxed text-slate-500">{description}</span>
        )}
      </span>
    </button>
  );
}

export function Chip({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        selected
          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/50"
      )}
    >
      {children}
    </button>
  );
}
