export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export const formatScore = (value: number) => `${Math.round(value)} / 100`;

export const riskPalette = {
  low: {
    label: "Low risk",
    color: "text-safety-low",
    bg: "bg-safety-low/10",
    hex: "#10b981",
  },
  moderate: {
    label: "Moderate risk",
    color: "text-safety-moderate",
    bg: "bg-safety-moderate/10",
    hex: "#f59e0b",
  },
  high: {
    label: "High risk",
    color: "text-safety-high",
    bg: "bg-safety-high/10",
    hex: "#ef4444",
  },
} as const;

export const timestamp = () => new Date().toISOString();

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

