import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getPercent = (value: number, maxValue: number) => {
  const percent = Math.round(100 * value / maxValue)
  return Math.max(0, Math.min(100, percent))
}