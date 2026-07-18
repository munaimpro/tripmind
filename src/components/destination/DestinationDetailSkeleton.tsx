/** Full-page skeleton for the Destination Detail page */
export default function DestinationDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 h-[500px] w-full" />

      {/* Gallery skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="md:col-span-2 md:row-span-2 h-64 md:h-[416px] rounded-3xl bg-slate-200 dark:bg-slate-800" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 md:h-[200px] rounded-3xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>

      {/* About section skeleton */}
      <div className="flex flex-col lg:flex-row gap-12 mt-16">
        <div className="flex-1 space-y-4">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
          <div className="h-4 w-4/5 bg-slate-100 dark:bg-slate-700 rounded-lg" />
          <div className="mt-8 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="h-36 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-36 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>

      {/* Info cards skeleton */}
      <div className="mt-16">
        <div className="h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Attractions skeleton */}
      <div className="mt-20">
        <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          ))}
        </div>
      </div>

      {/* Hotels skeleton */}
      <div className="mt-20">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          ))}
        </div>
      </div>

      {/* Restaurants skeleton */}
      <div className="mt-20">
        <div className="h-8 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
