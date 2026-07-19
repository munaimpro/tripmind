"use client";

import { useState } from "react";
import { PlannerFormData } from "@/types/planner";
import { MapPin, Wallet, CalendarDays, Compass, Users, Sparkles, Check } from "lucide-react";

interface PlannerFormProps {
    onSubmit: (data: PlannerFormData) => void;
    isLoading: boolean;
}

const INTERESTS = [
    "Culture & History",
    "Food & Culinary",
    "Nature & Outdoors",
    "Relaxation & Wellness",
    "Adventure & Sports",
    "Shopping",
    "Nightlife",
    "Art & Museums"
];

const TRAVEL_STYLES = [
    "Fast-paced",
    "Balanced",
    "Relaxed",
    "Luxury"
];

const GROUP_TYPES = [
    "Solo",
    "Couple",
    "Family",
    "Friends",
    "Business"
];

const BUDGETS = [
    "Budget-friendly ($)",
    "Moderate ($$)",
    "Premium ($$$)",
    "Luxury ($$$$)"
];

export default function PlannerForm({ onSubmit, isLoading }: PlannerFormProps) {
    const [formData, setFormData] = useState<PlannerFormData>({
        destination: "",
        budget: BUDGETS[1],
        duration: 3,
        travelStyle: TRAVEL_STYLES[1],
        groupType: GROUP_TYPES[1],
        interests: [],
    });

    const handleInterestToggle = (interest: string) => {
        setFormData((prev) => {
            const interests = prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 h-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Sparkles className="text-indigo-600 dark:text-indigo-400" size={24} />
                    Plan Your Trip
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Tell our AI about your dream trip, and we'll craft the perfect itinerary.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Destination */}
                <div>
                    <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        Where do you want to go?
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="text-slate-400" size={20} />
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                            placeholder="e.g. Tokyo, Paris, Bali..."
                        />
                    </div>
                </div>

                {/* Duration and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            Duration (Days)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <CalendarDays className="text-slate-400" size={20} />
                            </div>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                required
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            Budget Level
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Wallet className="text-slate-400" size={20} />
                            </div>
                            <select
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white appearance-none"
                            >
                                {BUDGETS.map((b) => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Travel Style and Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            Travel Style
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Compass className="text-slate-400" size={20} />
                            </div>
                            <select
                                value={formData.travelStyle}
                                onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white appearance-none"
                            >
                                {TRAVEL_STYLES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            Group Type
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Users className="text-slate-400" size={20} />
                            </div>
                            <select
                                value={formData.groupType}
                                onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white appearance-none"
                            >
                                {GROUP_TYPES.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Interests */}
                <div>
                    <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Interests & Activities (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((interest) => {
                            const isSelected = formData.interests.includes(interest);
                            return (
                                <button
                                    key={interest}
                                    type="button"
                                    onClick={() => handleInterestToggle(interest)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 border ${isSelected
                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700"
                                        }`}
                                >
                                    {isSelected && <Check size={14} />}
                                    {interest}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading || !formData.destination.trim()}
                        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Crafting Your Itinerary...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                <span>Generate AI Trip</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
