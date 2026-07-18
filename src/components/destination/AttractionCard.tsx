import Image from "next/image";
import { MapPin } from "lucide-react";

interface AttractionCardProps {
  attraction: {
    name: string;
    description: string;
    image: string;
  };
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <Image 
          src={attraction.image} 
          alt={attraction.name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {attraction.name}
        </h4>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
          {attraction.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
          <MapPin className="w-4 h-4" />
          View on map
        </div>
      </div>
    </div>
  );
}
