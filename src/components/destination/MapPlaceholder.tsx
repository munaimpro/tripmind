import { Map } from "lucide-react";

export default function MapPlaceholder() {
  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Location</h3>
      <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 shadow-inner">
        <Map className="w-16 h-16 mb-4 opacity-50" />
        <p className="font-medium text-lg">Interactive Map Coming Soon</p>
        <p className="text-sm mt-2 max-w-sm text-center">
          Explore the exact locations of attractions, hotels, and restaurants in our upcoming update.
        </p>
      </div>
    </div>
  );
}
