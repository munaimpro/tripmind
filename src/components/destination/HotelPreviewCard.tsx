import Image from "next/image";
import { Star } from "lucide-react";

interface HotelPreviewCardProps {
  hotel: {
    name: string;
    rating: number;
    price: number;
    image: string;
  };
}

export default function HotelPreviewCard({ hotel }: HotelPreviewCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-40 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <Image 
          src={hotel.image} 
          alt={hotel.name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-slate-900 dark:text-white">{hotel.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {hotel.name}
        </h4>
        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          ${hotel.price} <span className="text-slate-500 dark:text-slate-400 font-normal">/ night</span>
        </div>
      </div>
    </div>
  );
}
