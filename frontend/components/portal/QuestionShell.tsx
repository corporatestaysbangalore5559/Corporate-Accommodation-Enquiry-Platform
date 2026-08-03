"use client";

export function QuestionShell({
  prompt,
  helper,
  children,
  error,
}: {
  questionKey: string;
  prompt: string;
  helper?: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          Accommodation Consultant
        </p>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {prompt}
        </h1>
        {helper && <p className="mt-3 text-sm leading-relaxed text-slate-500">{helper}</p>}
      </div>
      {children}
      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ConsultantNote({ message }: { message: string }) {
  return (
    <div
      className="rounded-2xl border border-brand-100 bg-brand-50/70 px-5 py-4 text-base leading-relaxed text-brand-950 shadow-soft sm:text-lg"
      role="status"
    >
      {message}
    </div>
  );
}
