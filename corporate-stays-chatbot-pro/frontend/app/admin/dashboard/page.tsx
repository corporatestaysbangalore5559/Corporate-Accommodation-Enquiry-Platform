"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchEnquiries, fetchStats, fetchCurrentAdmin, exportEnquiriesCsvUrl, ApiError } from "@/lib/api";
import { getToken, clearToken } from "@/lib/auth";
import type { AdminProfile, Enquiry, EnquiryStats } from "@/lib/types";
import StatCard from "@/components/admin/StatCard";
import FiltersBar from "@/components/admin/FiltersBar";
import EnquiriesTable from "@/components/admin/EnquiriesTable";
import EnquiryDrawer from "@/components/admin/EnquiryDrawer";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [stats, setStats] = useState<EnquiryStats | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  // ── Auth guard ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    fetchCurrentAdmin()
      .then(setAdmin)
      .catch(() => {
        clearToken();
        router.replace("/admin/login");
      })
      .finally(() => setCheckingAuth(false));
  }, [router]);

  // ── Data loading ─────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [statsData, enquiriesData] = await Promise.all([
        fetchStats(),
        fetchEnquiries({ search, status }),
      ]);
      setStats(statsData);
      setEnquiries(enquiriesData);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setError("Could not load enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, status, router]);

  useEffect(() => {
    if (!checkingAuth && admin) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingAuth, admin]);

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  function handleExport() {
    const token = getToken();
    fetch(exportEnquiriesCsvUrl(), { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "enquiries.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  function handleEnquiryUpdated(updated: Enquiry) {
    setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setSelected(updated);
    fetchStats().then(setStats).catch(() => {});
  }

  if (checkingAuth) {
    return <div className="flex min-h-screen items-center justify-center text-slate-400">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-navy-900">Enquiries Dashboard</h1>
            <p className="text-sm text-slate-500">Corporate Stays Bangalore</p>
          </div>
          <div className="flex items-center gap-4">
            {admin && <span className="text-sm text-slate-500">{admin.email}</span>}
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        {stats && (
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Total Enquiries" value={stats.total} accent="navy" />
            <StatCard label="New" value={stats.new} accent="amber" />
            <StatCard label="Contacted" value={stats.contacted} accent="blue" />
            <StatCard label="Quoted" value={stats.quoted} accent="emerald" />
          </div>
        )}

        <FiltersBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onSearch={loadData}
          onExport={handleExport}
        />

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <EnquiriesTable enquiries={enquiries} loading={loading} onView={setSelected} />
      </main>

      {selected && (
        <EnquiryDrawer
          enquiry={selected}
          onClose={() => setSelected(null)}
          onUpdated={handleEnquiryUpdated}
        />
      )}
    </div>
  );
}
