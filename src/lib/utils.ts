import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeTrailingSlash(href: string) {
  const [path, query] = href.split("?", 2)
  const normalizedPath = path.replace(/\/+$/, "") || "/"
  const normalizedHref = query ? `${normalizedPath}?${query}` : normalizedPath

  return normalizedHref
}
