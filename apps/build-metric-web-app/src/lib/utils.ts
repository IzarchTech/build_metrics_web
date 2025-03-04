import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Date object into a string with the format 'MM-DD-YYYY, HH:MM:SS AM/PM'.
 *
 * @param date - The Date object to format.
 * @returns A formatted date-time string.
 */
export function formatDateTime(date: Date): string {
  // Convert the date object to a localized string with specific formatting options
  return (
    date
      .toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        second: "2-digit",
      })
      // Replace all slashes with dashes for the date part
      .replace(/\//g, "-")
  );
}

/**
 * Formats a number into a string with the correct separators and
 * notation for the user's locale.
 *
 * @param data - The number to format.
 * @returns A formatted string.
 */
export function formatNumber(data: number): string {
  return new Intl.NumberFormat(undefined, {
    notation: "standard",
    useGrouping: true,
  }).format(data);
}

/**
 * Parses a JSON string and returns the resulting object, typed as T.
 *
 * @template T - The type to which the parsed object will be cast.
 * @param data - The JSON string to parse.
 * @returns The parsed object, typed as T.
 * @throws Will throw an error if the string cannot be parsed as JSON.
 */
export function parseParams<T>(data: string): T {
  return JSON.parse(data) as T;
}
