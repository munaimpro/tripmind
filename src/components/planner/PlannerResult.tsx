"use client";

import { AIPlanResult } from "@/types/planner";
import {
    MapPin,
    Clock,
    Wallet,
    Calendar,
    Building2,
    Map,
    Sparkles,
    Save,
    RefreshCcw,
    CircleDollarSign
} from "lucide-react";

interface PlannerResultProps {
    plan: AIPlanResult;
    onOptimizeBudget: () => void;
    onSaveTrip: () => void;
    onGenerateAgain: () => void;
    isLoading: boolean;
}

export default function PlannerResult({ plan, onOptimizeBudget, onSaveTrip, onGenerateAgain, isLoading }: PlannerResultProps) {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">

            {/* Header Banner */}
            <div className="bg-gradient-to-br from-indigo-900 to-violet-900 p-8 relative overflow-hidden">
                {/* Abstract background shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-4">
                        <Sparkles size={14} />
                        AI Generated Plan
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{plan.title}</h2>
                    <div className="flex items-center gap-2 text-indigo-100/80">
                        <MapPin size={18} />
                        <span>{plan.destination}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">

                {/* Summary Card */}
                <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-100">
                    <p className="leading-relaxed">
                        {plan.summary}
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm text-indigo-600 dark:text-indigo-400">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Duration</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{plan.duration} Days</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm text-emerald-600 dark:text-emerald-400">
                            <Wallet size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Est. Budget</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{plan.currency}{plan.totalEstimatedCost.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Itinerary Timeline */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Map className="text-indigo-600 dark:text-indigo-400" size={24} />
                        Day-by-Day Itinerary
                    </h3>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[2.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-600 before:via-violet-600 before:to-transparent">
                        {plan.itinerary.map((day, dayIdx) => (
                            <div key={dayIdx} className="relative pl-12 md:pl-20">
                                <div className="absolute left-0 md:left-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/30 border-4 border-white dark:border-slate-900 z-10">
                                    {day.dayNumber}
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    <div className="px-5 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">Day {day.dayNumber}</h4>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        {day.activities.map((activity, actIdx) => (
                                            <div key={actIdx} className="flex gap-4">
                                                <div className="w-16 flex-shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 text-right">
                                                    {activity.time}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-slate-800 dark:text-slate-200 font-medium mb-1">{activity.description}</p>
                                                    <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                                        <CircleDollarSign size={14} />
                                                        {plan.currency}{activity.estimatedCost}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accommodations */}
                {plan.accommodations && plan.accommodations.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Building2 className="text-indigo-600 dark:text-indigo-400" size={24} />
                            Recommended Stays
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {plan.accommodations.map((acc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-300 transition-colors">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{acc.hotelName}</h4>
                                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                            {acc.type}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">Est. Per Night</p>
                                        <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{plan.currency}{acc.estimatedCostPerNight}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Bottom Actions */}
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
                <button disabled={isLoading} onClick={onOptimizeBudget} className="flex-1 min-w-[140px] py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-900 dark:border-t-white rounded-full animate-spin" /> : <Sparkles size={18} />}
                    Optimize Budget
                </button>
                <button disabled={isLoading} onClick={onSaveTrip} className="flex-1 min-w-[140px] py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <Save size={18} />
                    Save Trip
                </button>
                <button disabled={isLoading} onClick={onGenerateAgain} className="flex-1 min-w-[140px] py-3 px-4 bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <RefreshCcw size={18} />}
                    Generate Again
                </button>
            </div>

        </div>
    );
}
