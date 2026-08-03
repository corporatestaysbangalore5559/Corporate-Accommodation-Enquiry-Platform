import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-900">CorporateStaysBangalore</p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            We don&apos;t just book accommodation—we design the smartest stay solution for
            your business.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <a
            href="mailto:jashwanth@corporatestaysbangalore.com"
            className="transition hover:text-brand-700"
          >
            Talk to an Expert
          </a>
          <Link href="/request" className="transition hover:text-brand-700">
            Start Request
          </Link>
          <Link href="/admin" className="transition hover:text-brand-700">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
