"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/portal/options";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why companies choose us"
          title="We don't recommend hotels. We recommend strategy."
          description="Every corporate accommodation requirement deserves the right solution—not just the nearest hotel."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {WHY_CHOOSE.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
