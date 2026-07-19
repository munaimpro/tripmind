"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Heart,
  User,
  Sparkles,
  Home,
  LogOut,
  History
} from "lucide-react";

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

export default function DashboardSidebar({ isSidebarOpen, setIsSidebarOpen, handleLogout }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard/user", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/dashboard/user/my-trips", label: "My Trips", icon: MapPin, exact: false },
    { href: "/dashboard/user/history", label: "Trip History", icon: History, exact: false },
    { href: "/planner", label: "AI Planner", icon: Sparkles, exact: false },
    { href: "/dashboard/user/profile", label: "Profile", icon: User, exact: false },
    { href: "/", label: "Home", icon: Home, exact: true },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== '/';
  };

  return (
    <aside className={`fixed top-20 bottom-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 md:translate-x-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="mb-6 px-4">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Main Menu</p>
        </div>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                active
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <item.icon size={20} className={active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"} />
              {item.label}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
