/** Formats a rupee amount with Indian digit grouping, e.g. 5999 → "₹5,999". */
export function formatINR(amount: number): string {
  return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)}`
}
