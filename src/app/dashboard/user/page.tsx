import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Heart,
  Clock,
  Sparkles,
  ChevronRight,
  Plane,
  Globe,
} from "lucide-react";

export default async function DashboardUserPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  // Get user's first name for a friendly greeting
  const firstName = user.name?.split(" ")[0] ?? "Traveler";
  // Format account creation date
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const stats = [
    { label: "Total Trips", value: "3", icon: Plane, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Saved Trips", value: "12", icon: Heart, color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-100 dark:bg-pink-900/30" },
    { label: "AI Plans", value: "5", icon: Sparkles, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    { label: "Countries Visited", value: "4", icon: Globe, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  ];

  const quickLinks = [
    {
      href: "/dashboard/user/my-trips",
      icon: MapPin,
      label: "My Trips",
      description: "View and manage all your planned trips",
      color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    },
    {
      href: "/dashboard/user/saved",
      icon: Heart,
      label: "Saved Trips",
      description: "Explore your bookmarked destinations",
      color: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
    },
    {
      href: "/dashboard/user/history",
      icon: Clock,
      label: "Trip History",
      description: "Review your past adventures",
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    },
    {
      href: "/planner",
      icon: Sparkles,
      label: "AI Planner",
      description: "Plan a new trip with AI assistance",
      color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 shadow-lg shadow-indigo-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm sm:text-base font-medium mb-1">Welcome back,</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">{firstName} 👋</h1>
          <p className="text-indigo-200 text-sm">Member since {memberSince}</p>
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                <item.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{item.description}</p>
              </div>
              <ChevronRight
                size={18}
                className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
