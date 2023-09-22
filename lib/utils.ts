import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isPublished = (published: string | null) => {
  if (!published) {
    return true;
  }
  return JSON.parse(published.toLocaleLowerCase());
};

export const formatDateTime = (date: Date) => {
  return dayjs(date).format("YYYY/MM/DD h:mm");
};

export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
