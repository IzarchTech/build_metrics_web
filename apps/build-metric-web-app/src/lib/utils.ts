import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: Date) {
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      second: "2-digit",
    })
    .replace(/\//g, "-");
}

export function formatNumber(data: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "standard",
    useGrouping: true,
  }).format(data);
}

export function parseParams<T>(data: string) {
  return JSON.parse(data) as T;
}
