"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Co-founder", icon: "\ud83c\udf99\ufe0f" },
  { href: "/dashboard/projects", label: "Projects", icon: "\ud83d\udcc1" },
  { href: "/dashboard/settings", label: "Settings", icon: "\u2699\ufe0f" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-surface">
      <nav className="border-b border-white/5 bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">\ud83c\udf77</span>
              <span className="text-lg font-bold text-white">Winer</span>
            </Link>
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname?.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-surface-overlay text-white" : "text-gray-400 hover:text-gray-200 hover:bg-surface-raised")}>
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <span className="text-xs font-medium text-brand-300">A</span>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
