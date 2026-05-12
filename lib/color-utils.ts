// Shared color helpers used by layout (server-side) and ThemePreviewListener
// (client-side). No React/Next imports — keep it portable to both contexts.

function srgbChannel(v: number): number {
  const c = v / 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

// WCAG 2.x relative luminance, 0..1
export function relativeLuminance(hex: string): number {
  const cleaned = hex.replace('#', '').slice(0, 6)
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return 0
  const r = parseInt(cleaned.slice(0, 2), 16)
  const g = parseInt(cleaned.slice(2, 4), 16)
  const b = parseInt(cleaned.slice(4, 6), 16)
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b)
}

// Pick a foreground color that hits at least ~AA contrast for body text against
// the given background. Returns a dark slate for light backgrounds, off-white
// for dark ones. The 0.5 luminance cutoff is the conventional split point —
// good enough for "is this background lighter or darker than mid-gray."
export function pickForeground(bgHex: string): string {
  return relativeLuminance(bgHex) > 0.5 ? '#1a1a1a' : '#ffffff'
}

export function hexToRgbTriplet(hex: string): string {
  const cleaned = hex.replace('#', '').slice(0, 6)
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return '0 0 0'
  const r = parseInt(cleaned.slice(0, 2), 16)
  const g = parseInt(cleaned.slice(2, 4), 16)
  const b = parseInt(cleaned.slice(4, 6), 16)
  return `${r} ${g} ${b}`
}
