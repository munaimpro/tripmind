"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Calendar, MapPin, Compass } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-sky-400/20 dark:bg-sky-500/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Side: Text & Primary CTA */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                AI-Powered Travel Planning
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Design Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                Dream Journey
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl">
              Tell our smart AI assistant about your travel preferences and budget through a simple guided form. We&apos;ll generate a complete custom itinerary in seconds.
            </p>

            {/* CTA Button (Replacing the Input bar) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <Link
                href="/planner"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5" />
                Plan Trip with AI
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-800 rounded-2xl transition-all"
              >
                <Compass className="w-5 h-5 text-indigo-600" />
                Explore Trips
              </Link>
            </div>

            {/* Popular Topics/Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-sm font-medium text-slate-500 mr-1">
                Popular Destinations:
              </span>
              {["Kyoto, Japan", "Amalfi Coast", "Bali, Indonesia"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side: Rich Visual Preview instead of Dummy Skeletons */}
          <div className="relative w-full aspect-[4/3] lg:aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-sky-400 rounded-3xl transform rotate-2 opacity-20 dark:opacity-40"></div>

            <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
              {/* Window Header Mockup */}
              <div className="h-11 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50/80 dark:bg-slate-900/80">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                <span className="text-xs text-slate-400 font-mono ml-2">ai-itinerary-preview.app</span>
              </div>

              {/* Main Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between relative bg-slate-50/50 dark:bg-slate-950/30">

                {/* Visual Header Image Card */}
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop"
                    alt="Kyoto Japan"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 bg-indigo-600/90 text-[10px] font-semibold tracking-wide uppercase rounded-md mb-1.5 backdrop-blur-sm">
                      AI Generated
                    </span>
                    <h3 className="text-xl font-bold">7 Days Spring Trip in Kyoto</h3>
                    <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> Japan • 4 Destinations Included
                    </p>
                  </div>
                </div>

                {/* Simulated Generated Items */}
                <div className="space-y-3 mt-4">
                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        D1
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Arashiyama Bamboo Grove</p>
                        <p className="text-xs text-slate-500">Morning Walk & Photography</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                      09:00 AM
                    </span>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center font-bold text-xs">
                        D2
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Fushimi Inari Shrine</p>
                        <p className="text-xs text-slate-500">Torii Gates & Local Food Tour</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                      02:30 PM
                    </span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-2 -right-2 sm:-right-4 p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium">Optimization</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      100% Custom Itinerary
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}