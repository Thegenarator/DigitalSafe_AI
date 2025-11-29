"use client";

import { Download, Printer } from "lucide-react";

type Props = {
  onDownload: () => void;
};

export function PlanDownload({ onDownload }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onDownload}
        className="group flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-300 touch-manipulation"
        aria-label="Download or print safety plan"
      >
        <Printer className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span>Download/Print Plan</span>
      </button>
    </div>
  );
}
