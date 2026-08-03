import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyINR(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("en-IN").format(Number(digits));
}

export function generateReferenceId(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 900000) + 100000);
  return `CSB-${y}${m}${d}-${seq}`;
}

export function estimateSecondsRemaining(completed: number, total: number, secondsPerStep = 8): number {
  const remaining = Math.max(total - completed, 0);
  return remaining * secondsPerStep;
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes <= 0) return `${seconds} seconds`;
  if (seconds === 0) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  return `${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} seconds`;
}
