import FeatureCard from "./FeatureCard";
import { BrainCircuit, Clock, Sparkles, Map } from "lucide-react";

const features = [
  {
    title: "AI-Powered Precision",
    description: "Our advanced algorithms analyze thousands of variables to craft the perfect itinerary tailored exclusively to your preferences.",
    icon: BrainCircuit,
    colorClass: "text-indigo-600",
    bgClass: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    title: "Instant Generation",
    description: "Say goodbye to weeks of planning. Get a complete, day-by-day travel plan in seconds just by describing your dream trip.",
    icon: Clock,
    colorClass: "text-sky-600",
    bgClass: "bg-sky-50 dark:bg-sky-900/20",
  },
  {
    title: "Hyper-Personalized",
    description: "From dietary restrictions to pacing preferences, the AI understands your unique needs to ensure a flawless experience.",
    icon: Sparkles,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    title: "Smart Routing",
    description: "Optimize your travel time with intelligent geographic routing, ensuring you spend more time exploring and less time commuting.",
    icon: Map,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50 dark:bg-emerald-900/20",
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Why travelers choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">TripMind AI</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We've revolutionized the way people plan their journeys. Experience the future of travel planning today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
