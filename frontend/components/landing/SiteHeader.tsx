"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-soft">
            CS
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-slate-900">
              CorporateStaysBangalore
            </span>
            <span className="block text-[11px] text-slate-500">
              Corporate Accommodation Solutions
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#why-us" className="transition hover:text-brand-700">
            Why Us
          </a>
          <a href="#proof" className="transition hover:text-brand-700">
            Impact
          </a>
          <a href="#faq" className="transition hover:text-brand-700">
            FAQ
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="secondary" size="sm">
            <a href="mailto:jashwanth@corporatestaysbangalore.com">Talk to an Expert</a>
          </Button>
          <Button asChild size="sm">
            <Link href="/request">Start Request</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <a href="#why-us" onClick={() => setOpen(false)}>
              Why Us
            </a>
            <a href="#proof" onClick={() => setOpen(false)}>
              Impact
            </a>
            <a href="#faq" onClick={() => setOpen(false)}>
              FAQ
            </a>
            <Button asChild className="mt-2 w-full">
              <Link href="/request">Start Your Accommodation Request</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
