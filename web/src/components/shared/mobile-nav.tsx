\"use client\";

import Link from \"next/link\";
import { usePathname } from \"next/navigation\";
import { Home, Shield, Menu, X } from \"lucide-react\";
import { useState, useEffect } from \"react\";
import { QuickExitButton } from \"@/components/shared/quick-exit\";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden lg:block">
        <div
          className={`mx-auto max-w-7xl transition-all duration-300 ${
            scrolled
              ? "border-b border-ink-100/80 bg-white/95 backdrop-blur-xl shadow-sm"
              : "bg-white/90 backdrop-blur-md"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <Link
              href="/"
              className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 shadow-md shadow-brand-500/30">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-ink-900">
                DigiSafe AI
              </span>
            </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                pathname === "/"
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/quiz"
              className={`ml-1 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/40 hover:scale-105 ${
                pathname === "/quiz"
                  ? "ring-2 ring-brand-300 ring-offset-2"
                  : ""
              }`}
            >
              Start Safety Scan
            </Link>
            {/* Quick Exit button – subtle but always available on desktop */}
            <div className="ml-2 hidden lg:inline-flex">
              <QuickExitButton variant="nav" />
            </div>
          </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-3 left-3 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg ring-1 ring-ink-100 transition-all duration-300 hover:bg-brand-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-300 lg:hidden ${
          scrolled ? "shadow-md" : "shadow-lg"
        }`}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-ink-700" />
        ) : (
          <Menu className="h-5 w-5 text-ink-700" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <nav
        className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-ink-100 p-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 shadow-md">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-ink-900">
                DigiSafe AI
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 transition-colors hover:bg-ink-100 focus:outline-none focus:ring-2 focus:ring-brand-300"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-ink-600" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 p-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-200 ${
                pathname === "/"
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/quiz"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-200 ${
                pathname === "/quiz"
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              <Shield className="h-5 w-5" />
              <span>Start Safety Scan</span>
            </Link>
          </div>

          <div className="border-t border-ink-100 bg-gradient-to-br from-brand-50/50 to-white p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Need Help?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-600">
                  Contact local GBV hotlines or support services for immediate assistance.
                </p>
              </div>
              {/* Mobile quick exit inside the drawer */}
              <QuickExitButton variant="inline" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

