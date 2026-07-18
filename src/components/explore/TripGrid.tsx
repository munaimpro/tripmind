import { Trip } from "@/data/exploreTrips";
import TripCard from "./TripCard";

interface TripGridProps {
  trips: Trip[];
}

export default function TripGrid({ trips }: TripGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {trips.map((trip, index) => (
        <div 
          key={trip.id} 
          className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TripCard trip={trip} />
        </div>
      ))}
    </div>
  );
}
