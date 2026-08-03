"use client";

import { motion } from "framer-motion";
import { CLIENT_LOGOS, STATS } from "@/lib/portal/options";
import { SectionHeading } from "@/components/ui/section-heading";

export function SocialProof() {
  return (
    <section id="proof" className="scroll-mt-24 border-y border-slate-100 bg-slate-50/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trusted by corporate teams"
          title="Enterprise accommodation, delivered with precision"
          description="Travel managers, HR, and facilities leaders rely on us to design stay strategies—not sell rooms."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Teams we support across Bangalore
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo}
                className="flex h-16 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold tracking-wide text-slate-400"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
