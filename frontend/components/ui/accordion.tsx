"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="w-full space-y-3">
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.question}
          value={item.question}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-slate-900 transition hover:bg-slate-50",
                "[&[data-state=open]>svg]:rotate-180"
              )}
            >
              {item.question}
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.answer}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
