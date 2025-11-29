import Link from "next/link";
import { Home } from "lucide-react";

export function NavLink() {
  return (
    <Link
      href="/"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-all duration-300 hover:bg-brand-700 hover:scale-110 hover:shadow-xl hover:shadow-brand-600/40 focus:outline-none focus:ring-4 focus:ring-brand-300"
      aria-label="Return to homepage"
    >
      <Home className="h-6 w-6 transition-transform group-hover:scale-110" />
    </Link>
  );
}

