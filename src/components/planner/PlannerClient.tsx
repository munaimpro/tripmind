"use client";

import { useState } from "react";
import PlannerForm from "@/components/planner/PlannerForm";
import PlannerResult from "@/components/planner/PlannerResult";
import PlannerEmptyState from "@/components/planner/PlannerEmptyState";
import { PlannerFormData, AIPlanResult } from "@/types/planner";
import { generateTrip, optimizeBudget } from "@/lib/api";

export default function PlannerClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AIPlanResult | null>(null);
    const [lastData, setLastData] = useState<PlannerFormData | null>(null);

    const handleGenerate = async (data: PlannerFormData) => {
        setIsLoading(true);
        setLastData(data);
        try {
            const apiResult = await generateTrip(data);
            setResult({
                title: `Magical ${data.duration}-Day Trip to ${data.destination}`,
                destination: data.destination,
                summary: apiResult.summary || `A carefully curated ${data.travelStyle.toLowerCase()} journey tailored for a ${data.groupType.toLowerCase()} group. Experience the best of ${data.destination}'s ${data.interests.join(", ") || "culture and sights"}.`,
                duration: data.duration,
                totalEstimatedCost: apiResult.budget?.total || (1500 * data.duration),
                currency: apiResult.budget?.currency || "$",
                itinerary: apiResult.itinerary || [],
                accommodations: apiResult.hotels || [],
            });
        } catch (error) {
            console.error("Failed to generate trip:", error);
            alert("Failed to generate trip. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptimizeBudget = async () => {
        if (!result) return;
        setIsLoading(true);
        try {
            const optimized = await optimizeBudget("current-plan-id", "Budget-friendly ($)");
            setResult({
                ...result,
                itinerary: optimized.itinerary || result.itinerary,
                accommodations: optimized.hotels || result.accommodations,
                totalEstimatedCost: optimized.budget?.total || result.totalEstimatedCost,
            });
        } catch (error) {
            console.error("Failed to optimize budget:", error);
            alert("Failed to optimize budget. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveTrip = async () => {
        if (!result) {
            alert("No trip plan available to save!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-trip`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: result.title || "Untitled AI Trip",
                    country: result.destination ? result.destination.split(',').pop()?.trim() : "Global",
                    location: result.destination || "Various Locations",
                    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop",
                    description: result.summary || "No description provided.",
                    durationDays: Number(result.duration) || 3,
                    budget: Number(result.totalEstimatedCost) || 500,
                    rating: 4.8,
                    bestSeason: "All Year",
                    travelType: lastData?.travelStyle || "General",
                    difficulty: "Easy",
                    maxTravelers: lastData?.groupType === "Solo" ? 1 : lastData?.groupType === "Couple" ? 2 : 8,
                    isAIRecommended: true,
                    status: "Published"
                })
            });

            if (!response.ok) throw new Error("Failed to save trip");

            const resData = await response.json();
            if (resData.success) {
                alert("Trip saved successfully here!");
            } else {
                alert(resData.message || "Failed to save the trip.");
            }
        } catch (error) {
            console.error("Error saving trip:", error);
            alert("An error occurred while saving the trip.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateAgain = async () => {
        if (lastData) {
            await handleGenerate(lastData);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                        AI Travel Planner
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Design your perfect itinerary in seconds. Powered by advanced AI to match your unique travel style.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                    {/* Left: Form */}
                    <div className="w-full lg:w-[400px] xl:w-[480px] flex-shrink-0">
                        <PlannerForm onSubmit={handleGenerate} isLoading={isLoading} />
                    </div>

                    {/* Right: Result / Empty State */}
                    <div className="w-full flex-1">
                        {result ? (
                            <PlannerResult
                                plan={result}
                                onOptimizeBudget={handleOptimizeBudget}
                                onSaveTrip={handleSaveTrip}
                                onGenerateAgain={handleGenerateAgain}
                                isLoading={isLoading}
                            />
                        ) : (
                            <PlannerEmptyState />
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}