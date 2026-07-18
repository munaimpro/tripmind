import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-indigo-600 via-indigo-700 to-sky-600 rounded-[2.5rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl"></div>
        
        <Plane className="absolute -top-12 -right-12 w-64 h-64 text-white/5 -rotate-45" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Ready to plan your next great adventure?
            </h2>
            <p className="text-lg text-indigo-100 mb-0">
              Join thousands of travelers who are using TripMind AI to design perfect, personalized itineraries in seconds. Stop stressing and start exploring.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link href="/planner" className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              Start Planning Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/explore" className="px-8 py-4 bg-indigo-500/30 text-white font-bold rounded-xl border border-indigo-400/30 hover:bg-indigo-500/40 transition-all duration-300">
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
