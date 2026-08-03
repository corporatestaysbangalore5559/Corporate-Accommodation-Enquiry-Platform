"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { estimateSecondsRemaining, formatDuration } from "@/lib/utils";
import { QUESTION_ORDER } from "@/lib/portal/types";

export function ProgressHeader({
  stepIndex,
  phase,
}: {
  stepIndex: number;
  phase: "asking" | "summary" | "submitting" | "success";
}) {
  const total = QUESTION_ORDER.length;
  const completed =
    phase === "success"
      ? total
      : phase === "summary" || phase === "submitting"
        ? total
        : stepIndex;
  const percent =
    phase === "success"
      ? 100
      : Math.min(99, Math.round((completed / total) * 100));
  const remaining = estimateSecondsRemaining(
    phase === "asking" ? stepIndex : total,
    total
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Corporate Accommodation Request
            </p>
            <p className="text-xs text-slate-500">Guided by your accommodation consultant</p>
          </div>
        </div>
        {phase !== "success" && (
          <div className="text-right">
            <p className="text-sm font-semibold text-brand-700">{percent}% Complete</p>
            <p className="text-xs text-slate-500">
              Est. {formatDuration(remaining)} remaining
            </p>
          </div>
        )}
      </div>
      {phase !== "success" && (
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-1 bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500 ease-out"
            style={{ width: `${Math.max(percent, 4)}%` }}
          />
        </div>
      )}
    </header>
  );
}
