"use client";
import Link from "next/link";
import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/" className="text-sm font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            <Link href="/explore" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Explore Trips</Link>
            <Link href="/planner" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AI Planner</Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
          </div>

          {/* Auth & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">Login</Link>
            <Link href="/signup" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
              Get Started
            </Link>
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
            <Link href="/" className="block px-3 py-2 text-base font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Home</Link>
            <Link href="/explore" className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Explore Trips</Link>
            <Link href="/planner" className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">AI Planner</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">About</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Contact</Link>
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <Link href="/login" className="block px-3 py-2 text-base font-medium text-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Login</Link>
              <Link href="/signup" className="block px-3 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-xl hover:bg-indigo-700">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}