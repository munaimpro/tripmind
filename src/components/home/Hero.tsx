"use client";
import Link from "next/link";
import { Sparkles, MapPin, Calendar, ArrowRight } from "lucide-react";

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
          
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">AI-Powered Travel Planning</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Design Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                Dream Journey
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
              Describe your ideal vacation in plain English, and our advanced AI will instantly generate a personalized itinerary, complete with destinations, activities, and dining.
            </p>

            {/* AI Prompt Input (Mockup) */}
            <div className="p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 dark:border-slate-800 mb-8 flex items-center">
              <div className="flex-1 flex items-center px-4 gap-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="E.g., A 7-day romantic trip to Kyoto in Spring..." 
                  className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 h-12"
                />
              </div>
              <button className="h-12 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Plan Trip <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-slate-500">Popular right now:</span>
              <button className="text-sm px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Japan</button>
              <button className="text-sm px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Amalfi Coast</button>
              <button className="text-sm px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Bali</button>
            </div>
          </div>

          {/* Premium Illustration / Mockup Image */}
          <div className="relative w-full aspect-[4/3] lg:aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-sky-400 rounded-3xl transform rotate-3 opacity-20 dark:opacity-40"></div>
            <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-transform hover:-translate-y-2 duration-500">
               {/* Using a placeholder styled to look like an app UI since no real images are provided. */}
               <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <div className="p-6 h-full flex flex-col relative">
                  {/* Decorative skeleton UI for the "app" */}
                  <div className="w-1/3 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6"></div>
                  <div className="flex gap-4 mb-8">
                     <div className="w-24 h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl flex-shrink-0 animate-pulse"></div>
                     <div className="w-24 h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl flex-shrink-0 animate-pulse delay-75"></div>
                     <div className="w-24 h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl flex-shrink-0 animate-pulse delay-150"></div>
                  </div>
                  <div className="space-y-4">
                     <div className="w-full h-16 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl"></div>
                     <div className="w-full h-16 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl"></div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute top-1/3 -right-6 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 hidden sm:flex">
                     <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <Calendar size={20} />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 font-medium">Itinerary Ready</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">7 Days in Japan</p>
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
