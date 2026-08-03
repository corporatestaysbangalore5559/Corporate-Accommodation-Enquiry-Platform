"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const analysisPoints = [
  "Office Location",
  "Team Size",
  "Budget",
  "Duration",
  "Employee Experience",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-grid-fade opacity-70" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-sky-100/80 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-5 text-sm font-semibold tracking-wide text-brand-700">
            CorporateStaysBangalore
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Corporate accommodation designed around your business—not around hotel
            availability.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
            Tell us your requirement in under 2 minutes. We&apos;ll analyse your
            requirement and design the smartest accommodation strategy based on:
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {analysisPoints.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.06, duration: 0.4 }}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                {point}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/request">
                Start Your Accommodation Request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="xl" className="w-full sm:w-auto">
              <a href="mailto:jashwanth@corporatestaysbangalore.com">
                Talk to an Accommodation Expert
              </a>
            </Button>
          </motion.div>

          <p className="mt-8 text-sm text-slate-500">
            We don&apos;t book rooms. We solve corporate accommodation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-floating">
            <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="ml-3 text-xs font-medium text-slate-500">
                  Accommodation Strategy Console
                </span>
              </div>
            </div>
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                  Consultant brief
                </p>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Project team near Manyata · 12 employees · 3 months
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Strategy focus: commute efficiency, corporate rate leverage, and
                  long-stay value through serviced apartments vs dedicated guest house.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Format mix", "Serviced Apt + Guest House"],
                    ["Priority", "Near office · Kitchen · WiFi"],
                    ["Budget lens", "₹45,000 / month"],
                    ["Proposal", "Within 24 hours"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                    >
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-100 bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white sm:p-8 md:border-l md:border-t-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
                  Outcome
                </p>
                <h4 className="mt-3 text-xl font-semibold">One partner. One proposal.</h4>
                <ul className="mt-6 space-y-3 text-sm text-brand-50">
                  {[
                    "No hotel listings or OTA browsing",
                    "Smartest stay format recommended",
                    "Corporate rates negotiated for you",
                    "Dedicated relationship manager",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
