/** Skeleton card that matches the dimensions of DestinationCard */
export default function DestinationCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="h-60 w-full bg-slate-200 dark:bg-slate-800 shrink-0" />
      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="flex justify-between items-start gap-4">
          <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg shrink-0" />
        </div>
        <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded-lg mt-auto" />
      </div>
    </div>
  );
}
