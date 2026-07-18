import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHeader() {
  return (
    <div className="pt-24 pb-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4">
          <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 dark:text-white font-medium">Explore</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Explore Destinations
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Discover breathtaking locations, hand-picked itineraries, and personalized travel experiences curated just for you.
          </p>
        </div>
      </div>
    </div>
  );
}
