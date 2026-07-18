import { Wand2, Compass } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <div className="mt-20 bg-indigo-600 rounded-3xl p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Ready to make this trip a reality?
        </h2>
        <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mb-10">
          Let TripMind's AI craft the perfect, personalized itinerary for your journey based on your preferences, budget, and travel style.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/planner" className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 hover:bg-slate-50 font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
            <Wand2 className="w-5 h-5" />
            Plan My Trip with AI
          </Link>
          <Link href="/explore" className="w-full sm:w-auto px-8 py-4 bg-indigo-700/50 hover:bg-indigo-700 text-white border border-indigo-500 hover:border-indigo-400 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
            <Compass className="w-5 h-5" />
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
}
