"use client";

import { useEffect, useState } from "react";

type VaultEntry = {
  id: string;
  createdAt: string;
  title: string;
  notes: string;
};

const VAULT_STORAGE_KEY = "digisafe-evidence-vault-v1";

function loadInitialEntries(): VaultEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(VAULT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VaultEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function persistEntries(entries: VaultEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // If storage is unavailable, silently ignore – the UI will still work for this session
  }
}

export function EvidenceVault() {
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setEntries(loadInitialEntries());
  }, []);

  const handleAdd = () => {
    if (!notes.trim()) return;

    const now = new Date();
    const entry: VaultEntry = {
      id: crypto.randomUUID(),
      createdAt: now.toISOString(),
      title: title.trim() || "Incident note",
      notes: notes.trim(),
    };

    setEntries((prev) => {
      const next = [entry, ...prev].slice(0, 50);
      persistEntries(next);
      return next;
    });

    setTitle("");
    setNotes("");
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      persistEntries(next);
      return next;
    });
  };

  const handleClearAll = () => {
    setEntries([]);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(VAULT_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  return (
    <section className="space-y-4 rounded-3xl border border-ink-100 bg-white/90 p-6 shadow-card/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">
            Secure Evidence Vault
          </p>
          <h3 className="mt-2 text-lg font-semibold text-ink-900">
            Private notes about incidents – stored only on this device
          </h3>
          <p className="mt-1 text-xs text-ink-500">
            Use this space to log what happened, dates, usernames, or links. You can wipe
            everything at any time, and nothing is sent to a server.
          </p>
        </div>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Clear all entries
          </button>
        )}
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short label (optional) – for example: Instagram harassment, WhatsApp threats"
          className="w-full rounded-2xl border border-ink-100 bg-ink-50/40 px-3 py-2 text-sm text-ink-800 outline-none transition-colors focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-200"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Write what happened in your own words. Include dates, usernames, links, or screenshots you saved elsewhere."
          className="w-full resize-none rounded-2xl border border-ink-100 bg-ink-50/40 px-3 py-2 text-sm text-ink-800 outline-none transition-colors focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-200"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!notes.trim()}
            className="rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand-600/30 transition-all duration-200 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/40 hover:scale-105 disabled:cursor-not-allowed disabled:bg-ink-200 disabled:shadow-none disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            Save private note
          </button>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="mt-2 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Saved notes ({entries.length})
          </p>
          <ul className="space-y-2.5">
            {entries.map((entry) => {
              const created = new Date(entry.createdAt);
              const label = isNaN(created.getTime())
                ? ""
                : created.toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

              return (
                <li
                  key={entry.id}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-ink-100 bg-ink-50/40 px-3 py-2.5 text-xs text-ink-700"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-ink-900">
                      {entry.title || "Incident note"}
                    </p>
                    {label && (
                      <p className="text-[11px] uppercase tracking-wide text-ink-400">
                        {label}
                      </p>
                    )}
                    <p className="text-[11px] leading-relaxed whitespace-pre-wrap">
                      {entry.notes}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    className="mt-0.5 rounded-full px-2 py-1 text-[11px] font-semibold text-ink-400 opacity-0 transition-all duration-150 hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-300"
                    aria-label="Delete this note"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}


