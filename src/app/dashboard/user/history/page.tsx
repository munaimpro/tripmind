import Link from "next/link";
import { History, MapPin, Calendar, CheckCircle2, ChevronRight } from "lucide-react";

export default function DashboardUserHistoryPage() {
  const history = [
    {
      id: "hist-1",
      title: "Autumn in New York",
      destination: "New York, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
      date: "Oct 2023",
      duration: "5 Days",
      status: "Completed",
      rating: "5.0",
    },
    {
      id: "hist-2",
      title: "Paris Getaway",
      destination: "Paris, France",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop",
      date: "May 2023",
      duration: "7 Days",
      status: "Completed",
      rating: "4.8",
    },
    {
      id: "hist-3",
      title: "London Exploration",
      destination: "London, UK",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
      date: "Dec 2022",
      duration: "6 Days",
      status: "Completed",
      rating: "4.9",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trip History</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review your past adventures and cherished memories.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <History size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Completed Trips</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {history.map((trip) => (
            <div key={trip.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                  <span className="text-xs font-semibold text-white">⭐ {trip.rating}</span>
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {trip.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800/30">
                    <CheckCircle2 size={12} />
                    {trip.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    <span>{trip.destination}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={15} />
                    <span>{trip.date} • {trip.duration}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <Link
                  href={`/dashboard/user/history/${trip.id}`}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-all shadow-sm group-hover:shadow-md"
                >
                  View Itinerary
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
