"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, ApiError } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await loginAdmin(email.trim(), password);
      setToken(token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 bg-grid px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-floating"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-navy-800 to-navy-950 text-sm font-semibold text-gold-400">
            CS
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-900">Corporate Stays Bangalore</p>
            <p className="text-xs text-slate-500">Admin Dashboard</p>
          </div>
        </div>

        <h1 className="mb-1 text-lg font-semibold text-navy-900">Sign in</h1>
        <p className="mb-5 text-sm text-slate-500">Enter your admin credentials to continue.</p>

        <label className="mb-1.5 block text-xs font-medium text-slate-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          placeholder="you@corporatestaysbangalore.com"
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
        />

        <label className="mb-1.5 block text-xs font-medium text-slate-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
        />

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full rounded-lg bg-gradient-to-r from-navy-800 to-navy-950 px-4 py-2.5 text-sm font-medium text-white shadow-card transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
