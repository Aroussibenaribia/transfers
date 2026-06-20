/**
 * Generates a unique booking reference like "TRF-A3F9K2"
 */
export function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TRF-${result}`;
}
