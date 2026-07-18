import Image from "next/image";
import { Star } from "lucide-react";

interface ReviewCardProps {
  review: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image 
            src={review.avatar} 
            alt={review.name} 
            fill 
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{review.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}`} 
          />
        ))}
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
        "{review.comment}"
      </p>
    </div>
  );
}
