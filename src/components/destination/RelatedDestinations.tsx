import { exploreTrips } from "@/data/exploreTrips";
import TripCard from "@/components/explore/TripCard";

interface RelatedDestinationsProps {
  currentTripId: string;
}

export default function RelatedDestinations({ currentTripId }: RelatedDestinationsProps) {
  // Get 4 random trips that aren't the current one (or just the first 4 for simplicity)
  const relatedTrips = exploreTrips
    .filter(t => t.id !== currentTripId)
    .slice(0, 4);

  if (!relatedTrips || relatedTrips.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Related Destinations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
