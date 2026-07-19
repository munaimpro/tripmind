import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  MapPin,
  Plane,
  Sparkles,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  Shield,
  Calendar,
  Layers,
  BarChart3,
} from "lucide-react";

export default async function DashboardAdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Current formatted date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 1. Statistics Cards Data
  const stats = [
    { label: "Total Users", value: "14,280", trend: "+12.5%", description: "vs last month", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Destinations", value: "348", trend: "+4.2%", description: "8 added this week", icon: MapPin, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { label: "Total Trips", value: "8,924", trend: "+18.7%", description: "Active bookings", icon: Plane, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    { label: "AI Plans Generated", value: "42,105", trend: "+32.4%", description: "High demand", icon: Sparkles, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
    { label: "Total Reviews", value: "3,120", trend: "+8.9%", description: "Avg rating 4.8", icon: MessageSquare, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { label: "Monthly Revenue", value: "$12,450", trend: "+15.3%", description: "Premium tier", icon: DollarSign, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/30" },
  ];

  // 2. Quick Actions Data
  const quickActions = [
    { href: "/dashboard/admin/destinations/new", label: "Add Destination", description: "Launch new location", icon: Plus, color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" },
    { href: "/dashboard/admin/trips", label: "Manage Trips", description: "Review and edit itineraries", icon: Layers, color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
    { href: "/dashboard/admin/users", label: "Manage Users", description: "Control user roles & access", icon: Users, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
    { href: "/dashboard/admin/analytics", label: "View Analytics", description: "Deep dive insights", icon: BarChart3, color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" },
    { href: "/dashboard/admin/reviews", label: "View Reviews", description: "Moderate user feedback", icon: MessageSquare, color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="space-y-8 pb-12">

      {/* ─── PAGE HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome Back, Admin</h1>
            <Shield size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Calendar size={14} /> {currentDate} — System overview and controls.
          </p>
        </div>
        <Link
          href="/dashboard/admin/destinations/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-sm shadow-indigo-500/10 group self-start sm:self-auto"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          Add Destination
        </Link>
      </div>

      {/* ─── STATISTICS CARDS ─── */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Platform Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5 tracking-tight">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
              <div className="flex items-center gap-1 mt-4 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp size={12} />
                <span>{stat.trend}</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal ml-0.5">{stat.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ANALYTICS CHART PLACEHOLDERS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Monthly AI Trip Generation</h3>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Year 2026</span>
          </div>
          {/* Custom Visual Mock Bar Chart */}
          <div className="h-48 flex items-end gap-3 pt-4 border-b border-slate-100 dark:border-slate-800/50">
            {[35, 45, 60, 50, 75, 90, 100, 85, 95, 110, 130, 150].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div
                  style={{ height: `${(height / 150) * 100}%` }}
                  className="w-full bg-gradient-to-t from-indigo-500 to-violet-500 rounded-t-md group-hover:from-indigo-600 group-hover:to-violet-600 transition-all cursor-pointer relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    {height}k
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-400 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Popular Destinations</h3>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">Top Hits</span>
          </div>
          {/* Custom Visual Mock Horizontal Chart */}
          <div className="space-y-4">
            {[
              { name: "Santorini, Greece", count: "4,250 plans", width: "w-[95%]" },
              { name: "Kyoto, Japan", count: "3,890 plans", width: "w-[85%]" },
              { name: "Bali, Indonesia", count: "3,120 plans", width: "w-[70%]" },
              { name: "Swiss Alps, Switzerland", count: "2,840 plans", width: "w-[62%]" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="text-slate-400 dark:text-slate-500">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full ${item.width}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── QUICK ACTIONS GRID ─── */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Operational Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mb-4 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <p className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mt-4 transition-colors">
                <span>Execute</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}