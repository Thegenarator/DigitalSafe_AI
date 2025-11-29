"use client";

import { cn } from "@/lib/utils";
import { Shield, Phone, Globe, Heart } from "lucide-react";

const resources = [
  {
    title: "Emergency Hotline",
    number: "116",
    description: "Free 24/7 GBV helpline (available in many African countries)",
    icon: Phone,
    color: "bg-red-50 border-red-200 text-red-800",
  },
  {
    title: "Local Support",
    description: "Contact your nearest women's shelter or support center",
    icon: Heart,
    color: "bg-pink-50 border-pink-200 text-pink-800",
  },
  {
    title: "Online Resources",
    description: "Access digital safety guides and reporting tools",
    icon: Globe,
    color: "bg-blue-50 border-blue-200 text-blue-800",
  },
];

export function GBVResources() {
  return (
    <div className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white p-6 shadow-lg animate-fade-in">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-2xl">
          🆘
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-red-600">
            Need Immediate Help?
          </p>
          <p className="mt-0.5 text-sm font-medium text-ink-700">
            GBV Support Resources
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {resources.map((resource, idx) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.title}
              className={cn(
                "flex items-start gap-3 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
                resource.color
              )}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{resource.title}</p>
                {resource.number && (
                  <p className="mt-1 text-lg font-bold">{resource.number}</p>
                )}
                <p className="mt-1 text-xs leading-relaxed opacity-90">
                  {resource.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-ink-200 bg-white/80 p-4">
        <p className="text-xs font-medium text-ink-600">
          <strong>Remember:</strong> You are not alone. Help is available 24/7.
          Your safety is the top priority.
        </p>
      </div>
    </div>
  );
}

