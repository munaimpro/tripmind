"use client";

import { Sparkles, Map, Compass } from "lucide-react";

export default function PlannerEmptyState() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center relative z-10 border border-slate-100 dark:border-slate-700">
                    <Compass className="text-indigo-600 dark:text-indigo-400 w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center z-20 animate-bounce shadow-sm">
                    <Sparkles className="text-violet-600 dark:text-violet-400 w-4 h-4" />
                </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Your Next Adventure Awaits
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Fill out the form on the left with your destination, budget, and travel preferences. Our AI will craft a personalized, day-by-day itinerary just for you.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm w-full">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Map size={16} />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Smart Routing</span>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Sparkles size={16} />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">AI Optimized</span>
                </div>
            </div>
        </div>
    );
}
