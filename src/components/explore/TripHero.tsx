import Image from "next/image";
import { Star, MapPin, Calendar, Wallet, Heart, Sparkles, Wand2 } from "lucide-react";
import type { ApiTrip } from "@/types/api";

interface TripHeroProps {
  trip: ApiTrip;
}

export default function TripHero({ trip }: TripHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover opacity-60 mix-blend-overlay z-10"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-30 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-8 h-full min-h-[500px]">
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {trip.rating.toFixed(1)}
            </span>
            <span className="bg-indigo-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm">
              {trip.travelType}
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm">
              {trip.bestSeason}
            </span>
            {trip.isAIRecommended && (
              <span className="bg-fuchsia-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                AI Recommended
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            {trip.title}
          </h1>

          <div className="flex items-center gap-2 text-slate-200 text-lg mb-6">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span>{trip.location}, {trip.country}</span>
          </div>

          <p className="text-slate-300 text-lg max-w-2xl line-clamp-2 md:line-clamp-none">
            {trip.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 shrink-0 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs font-medium uppercase tracking-wider">Est. Budget</p>
                  <p className="text-white font-bold text-xl">${trip.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs font-medium uppercase tracking-wider">Avg. Duration</p>
                  <p className="text-white font-bold text-xl">{trip.durationDays} Days</p>
                </div>
              </div>
            </div>

            
          </div>
        </div>

      </div>
    </div>
  );
}
