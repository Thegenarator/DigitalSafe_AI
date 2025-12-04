"use client";

import { cn } from "@/lib/utils";
import { Shield, Phone, Globe, Heart, MapPin } from "lucide-react";

const countryHelplines = [
  {
    country: "Kenya",
    flag: "🇰🇪",
    hotlines: [
      {
        name: "GBV Hotline",
        number: "1195",
        description: "24/7 free GBV support and counseling",
        available: "24/7",
      },
      {
        name: "Childline Kenya",
        number: "116",
        description: "Child protection and GBV support",
        available: "24/7",
      },
      {
        name: "Wangu Kanja Foundation",
        number: "+254 20 271 0292",
        description: "Survivor support and legal assistance",
        available: "Mon-Fri 9am-5pm",
      },
    ],
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    hotlines: [
      {
        name: "National GBV Hotline",
        number: "0800 333 3333",
        description: "Free 24/7 GBV support and crisis intervention",
        available: "24/7",
      },
      {
        name: "Women at Risk International",
        number: "+234 803 333 3333",
        description: "GBV counseling and emergency support",
        available: "24/7",
      },
      {
        name: "Project Alert",
        number: "+234 1 263 3265",
        description: "Legal aid and support services",
        available: "Mon-Fri 9am-5pm",
      },
    ],
  },
  {
    country: "Rwanda",
    flag: "🇷🇼",
    hotlines: [
      {
        name: "Isange One Stop Centre",
        number: "116",
        description: "Free 24/7 GBV support, medical, and legal services",
        available: "24/7",
      },
      {
        name: "Rwanda National Police",
        number: "112",
        description: "Emergency services and GBV reporting",
        available: "24/7",
      },
      {
        name: "Rwanda Women's Network",
        number: "+250 788 303 030",
        description: "Counseling and support services",
        available: "Mon-Fri 8am-5pm",
      },
    ],
  },
];

const generalResources = [
  {
    title: "Online Resources",
    description: "Access digital safety guides and reporting tools",
    icon: Globe,
    color: "bg-blue-50 border-blue-200 text-blue-800",
  },
];

export function GBVResources() {
  return (
    <div className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 via-white to-red-50/30 p-6 shadow-xl ring-1 ring-red-100/50 animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-2xl shadow-md">
          🆘
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">
            Need Immediate Help?
          </p>
          <p className="mt-0.5 text-base font-bold text-ink-900">
            GBV Support Resources
          </p>
        </div>
      </div>

      {/* Country-Specific Helplines */}
      <div className="mb-6 space-y-4">
        {countryHelplines.map((country, countryIdx) => (
          <div
            key={country.country}
            className="rounded-2xl border-2 border-ink-100 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-md"
            style={{ animationDelay: `${countryIdx * 0.1}s` }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">{country.flag}</span>
              <h3 className="font-display text-lg font-bold text-ink-900">
                {country.country}
              </h3>
            </div>
            <div className="space-y-3">
              {country.hotlines.map((hotline, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 rounded-xl border border-ink-100 bg-gradient-to-br from-ink-50/50 to-white p-4 transition-all duration-200 hover:border-brand-200 hover:bg-brand-50/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-brand-600" />
                        <p className="text-sm font-bold text-ink-900">
                          {hotline.name}
                        </p>
                      </div>
                      <p className="mt-1.5 text-xl font-bold text-brand-600">
                        {hotline.number}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-600">
                        {hotline.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-green-700">
                        {hotline.available}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* General Resources */}
      <div className="space-y-3">
        {generalResources.map((resource, idx) => {
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
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{resource.title}</p>
                <p className="mt-1 text-xs leading-relaxed opacity-90">
                  {resource.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border-2 border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-4 shadow-sm">
        <p className="text-xs font-semibold leading-relaxed text-ink-700">
          <strong className="text-brand-700">Remember:</strong> You are not alone. Help is available 24/7.
          Your safety is the top priority. All calls are confidential and free.
        </p>
      </div>
    </div>
  );
}

