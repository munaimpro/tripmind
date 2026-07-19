"use client";
import Link from "next/link";
import { Plane, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const dashboardHref = session?.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Trips" },
    { href: "/planner", label: "AI Planner" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  if (session) {
    navLinks.push({ href: dashboardHref, label: "Dashboard" });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Plane size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              TripMind<span className="text-indigo-600">.AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-20 h-8 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full"></div>
            ) : session ? (
              <>
                <Link href={dashboardHref} className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-600 ${pathname.startsWith("/dashboard") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300"}`}>
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center overflow-hidden">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="User Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="hidden lg:block">{session.user?.name?.split(' ')[0] || 'User'}</span>
                </Link>
                <button onClick={handleLogout} className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`text-sm font-medium transition-colors hover:text-indigo-600 ${pathname === '/login' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300"}`}>Login</Link>
                <Link href="/signup" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-base font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                    : "text-slate-600 dark:text-slate-300"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              {isPending ? (
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-xl"></div>
              ) : session ? (
                <button onClick={handleLogout} className="block px-3 py-3 text-base font-medium text-center text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700">
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`block px-3 py-2 text-base font-medium text-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 ${pathname === "/login" ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20" : "text-slate-600 dark:text-slate-300"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}