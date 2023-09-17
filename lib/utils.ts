import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isPublished = (published: string | null) => {
  if (!published) {
    return true;
  }
  return JSON.parse(published.toLocaleLowerCase());
};
