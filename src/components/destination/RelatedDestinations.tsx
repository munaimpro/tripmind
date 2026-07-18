import type { ApiTrip } from "@/types/api";
import TripCard from "@/components/explore/TripCard";

interface RelatedDestinationsProps {
  trips: ApiTrip[];
}

export default function RelatedDestinations({ trips }: RelatedDestinationsProps) {
  if (!trips || trips.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Related Destinations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
