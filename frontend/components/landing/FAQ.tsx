"use client";

import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/portal/options";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-slate-100 bg-slate-50/50 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Clear answers for corporate decision-makers"
          description="Everything you need to know before starting your accommodation request."
        />
        <div className="mt-10">
          <Accordion items={FAQ_ITEMS} />
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/request">Start Your Accommodation Request</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
