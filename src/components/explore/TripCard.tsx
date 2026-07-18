import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Calendar, Wallet, Sparkles, ArrowRight } from "lucide-react";
import type { ApiTrip } from "@/types/api";

interface TripCardProps {
  trip: ApiTrip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full relative">
      
      {trip.isAIRecommended && (
        <div className="absolute top-4 left-4 z-20 bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-bold tracking-wide">AI Recommended</span>
        </div>
      )}

      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <Image 
          src={trip.image} 
          alt={trip.title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{trip.rating.toFixed(1)}</span>
        </div>
        <div className="absolute bottom-4 left-4 z-20 flex gap-2">
           <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm">
             {trip.travelType}
           </span>
           <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm">
             {trip.season}
           </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 mb-2">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium">{trip.location}, {trip.country}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {trip.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {trip.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium">{trip.durationDays} Days</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Wallet className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium">${trip.budget}</span>
          </div>
        </div>

        <Link href={`/destinations/${trip._id}`} className="w-full">
          <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-indigo-600 dark:text-indigo-400 font-semibold text-sm flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}
