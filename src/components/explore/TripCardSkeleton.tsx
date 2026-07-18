/** Skeleton card that matches the dimensions of TripCard on the Explore page */
export default function TripCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full animate-pulse">
      {/* Image */}
      <div className="h-56 w-full bg-slate-200 dark:bg-slate-800 shrink-0" />
      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {/* Location */}
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        {/* Title */}
        <div className="h-5 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        {/* Description lines */}
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-lg" />
        <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800 rounded-lg" />
        {/* Divider + meta */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
        {/* Button */}
        <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl mt-1" />
      </div>
    </div>
  );
}
