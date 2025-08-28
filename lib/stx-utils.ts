// Utility to abbreviate a Stacks address for display (e.g., SP2...XYZ)
export function abbreviateAddress(address?: string): string {
  if (!address) return "";
  return address.length > 10
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : address;
}
