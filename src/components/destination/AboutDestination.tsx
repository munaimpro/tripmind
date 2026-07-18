import { DestinationDetail } from "@/data/destinationDetails";
import { CheckCircle2, Sun, CloudSun } from "lucide-react";

interface AboutDestinationProps {
  destination: DestinationDetail;
}

export default function AboutDestination({ destination }: AboutDestinationProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-12 mt-16">
      
      {/* Description and Highlights */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About {destination.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
          {destination.description}
        </p>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Highlights</h3>
        <ul className="space-y-4">
          {destination.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
              <span className="text-lg">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Info */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Best Time To Visit</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{destination.bestTime}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CloudSun className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Climate</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{destination.climate}</p>
        </div>
      </div>

    </div>
  );
}
