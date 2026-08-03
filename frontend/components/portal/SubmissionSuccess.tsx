"use client";

import { motion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OUR_PROMISE, PROCESS_TIMELINE, RM_PROMISES } from "@/lib/portal/options";

export function SubmissionSuccess({ referenceId }: { referenceId: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          Requirement received
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Your accommodation strategy is now in motion.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          A CorporateStaysBangalore relationship manager will analyse your brief and prepare
          one customised proposal—never a generic hotel list.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/80 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            Reference ID
          </span>
          <span className="font-mono text-sm font-semibold text-slate-900">{referenceId}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
      >
        <h2 className="text-lg font-semibold text-slate-900">What happens next</h2>
        <ol className="mt-6 space-y-0">
          {PROCESS_TIMELINE.map((step, index) => (
            <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
              {index < PROCESS_TIMELINE.length - 1 && (
                <span className="absolute left-[15px] top-8 h-[calc(100%-20px)] w-px bg-slate-200" />
              )}
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div className="pt-1">
                <p className="text-sm font-semibold text-slate-900">{step}</p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
        >
          <h3 className="text-base font-semibold text-slate-900">
            Your Relationship Manager will
          </h3>
          <ul className="mt-4 space-y-3">
            {RM_PROMISES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-soft"
        >
          <h3 className="text-base font-semibold">Our Promise</h3>
          <ul className="mt-4 space-y-3">
            {OUR_PROMISE.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-50">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Return Home</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <a href="mailto:jashwanth@corporatestaysbangalore.com">
            Talk to an Accommodation Expert
          </a>
        </Button>
      </div>
    </div>
  );
}
