import { Metadata } from "next";
import ExploreClient from "./ExploreClient";

export const metadata: Metadata = {
  title: "Explore Destinations | TripMind AI",
  description: "Discover breathtaking locations, hand-picked itineraries, and personalized travel experiences curated just for you.",
};

export default function ExplorePage() {
  return (
    <ExploreClient />
  );
}
