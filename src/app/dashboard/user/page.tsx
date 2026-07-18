import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Heart,
  Clock,
  Sparkles,
  User,
  Settings,
  ChevronRight,
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 shadow-lg shadow-indigo-500/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white overflow-hidden flex-shrink-0">
              {user.image ? (
                <img src={user.image} alt={user.name ?? "User"} className="w-full h-full object-cover" />
              ) : (
                <User size={32} />
              )}
            </div>
            <div>
              <p className="text-indigo-200 text-sm font-medium">Welcome back,</p>
              <h1 className="text-white text-3xl font-bold">{firstName} 👋</h1>
              <p className="text-indigo-200 text-sm mt-1">Member since {memberSince}</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Account Details</h2>
            <Link
              href="/dashboard/user/profile"
              className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Settings size={14} />
              Edit Profile
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">Full Name</p>
              <p className="font-medium text-zinc-900 dark:text-white">{user.name ?? "—"}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">Email</p>
              <p className="font-medium text-zinc-900 dark:text-white truncate">{user.email}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">Account Role</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 capitalize">
                {(user as { role?: string }).role ?? "user"}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">Email Verified</p>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                user.emailVerified
                  ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
              }`}>
                {user.emailVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-5 flex items-center gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-zinc-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{item.description}</p>
                </div>
                <ChevronRight
                  size={18}
                  className="text-zinc-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
