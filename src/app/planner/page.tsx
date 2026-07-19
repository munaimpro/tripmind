import { Metadata } from "next";
import PlannerClient from "@/components/planner/PlannerClient";

export const metadata: Metadata = {
  title: "AI Travel Planner | TripMind AI",
  description: "Design your perfect itinerary in seconds. Powered by advanced AI to match your unique travel style.",
};

export default function PlannerPage() {
  return <PlannerClient />;
}
