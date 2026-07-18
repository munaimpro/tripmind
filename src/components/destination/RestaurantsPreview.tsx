import { ArrowRight } from "lucide-react";
import RestaurantPreviewCard from "./RestaurantPreviewCard";

interface RestaurantsPreviewProps {
  restaurants: { name: string; cuisine: string; rating: number; image: string }[];
}

export default function RestaurantsPreview({ restaurants }: RestaurantsPreviewProps) {
  if (!restaurants || restaurants.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Local Dining</h3>
        <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 group">
          View All Restaurants
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.slice(0, 3).map((restaurant, index) => (
          <RestaurantPreviewCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
