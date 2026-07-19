import Link from "next/link";
import { Calendar, MapPin, DollarSign, Clock, ChevronRight } from "lucide-react";

export default function DashboardUserMyTripsPage() {
  const trips = [
    {
      id: "trip-1",
      title: "Summer in Kyoto",
      destination: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
      startDate: "2024-06-15",
      endDate: "2024-06-25",
      duration: "10 Days",
      budget: "$2,500",
      status: "Upcoming",
      statusColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    },
    {
      id: "trip-2",
      title: "Alpine Adventure",
      destination: "Swiss Alps, Switzerland",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
      startDate: "2023-12-10",
      endDate: "2023-12-18",
      duration: "8 Days",
      budget: "$3,200",
      status: "Completed",
      statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    {
      id: "trip-3",
      title: "Bali Retreat",
      destination: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
      startDate: "2024-09-05",
      endDate: "2024-09-19",
      duration: "14 Days",
      budget: "$1,800",
      status: "Planning",
      statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Trips</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and view your planned itineraries.</p>
        </div>
        <Link
          href="/planner"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Plan New Trip
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-64 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-md ${trip.statusColor}`}>
                  {trip.status}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {trip.title}
                  </h3>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm gap-1">
                    <MapPin size={14} />
                    <span>{trip.destination}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <Calendar size={15} className="text-indigo-500" />
                  <span className="font-medium">{trip.startDate}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <Clock size={15} className="text-amber-500" />
                  <span className="font-medium">{trip.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <DollarSign size={15} className="text-emerald-500" />
                  <span className="font-medium">{trip.budget}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end border-t border-slate-100 dark:border-slate-800 pt-4">
                <Link
                  href={`/dashboard/user/my-trips/${trip.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  View Details
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
