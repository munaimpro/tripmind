import Image from "next/image";
import { Star, MapPin } from "lucide-react";

interface DestinationCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  price: string;
}

export default function DestinationCard({ id, title, location, image, rating, price }: DestinationCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col">
      <div className="relative h-60 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{rating}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{price}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-auto">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>
      </div>
    </div>
  );
}
