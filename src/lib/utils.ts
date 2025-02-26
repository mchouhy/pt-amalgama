import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateInitials = (email: string, max = 2) =>
  email
    ?.split("")
    .map((n) => n[0].toUpperCase())
    .slice(0, max)
    .join("");
