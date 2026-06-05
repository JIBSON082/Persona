import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Tailwind class merger ──────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Cloudinary image URL builder ──────────────────────────────────────────
export function cloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  const { width = "auto", height, quality = "auto" } = options;
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const transforms = [
    `w_${width}`,
    height ? `h_${height}` : null,
    `q_${quality}`,
    "f_auto",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
}

// ── Date formatter ─────────────────────────────────────────────────────────
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

// ── Relative time (e.g. "2 hours ago") ────────────────────────────────────
export function timeAgo(date: string | Date): string {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count !== 1 ? "s" : ""} ago`;
  }
  return "just now";
}

// ── Truncate text ─────────────────────────────────────────────────────────
export function truncate(text: string, length: number): string {
  return text.length <= length ? text : text.slice(0, length).trimEnd() + "…";
}

// ── Tone label map ────────────────────────────────────────────────────────
export const TONE_LABELS: Record<string, string> = {
  professional: "Professional",
  casual: "Casual",
  storyteller: "Storyteller",
  bold: "Bold",
};

export const TONE_EMOJIS: Record<string, string> = {
  professional: "💼",
  casual: "✌️",
  storyteller: "📖",
  bold: "⚡",
};

