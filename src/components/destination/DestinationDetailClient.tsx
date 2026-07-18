"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

import type { ApiDestination, ApiHotel, ApiRestaurant, ApiActivity, ApiTrip } from "@/types/api";
import { getDestinationById, getHotels, getRestaurants, getActivities, getTrips } from "@/lib/api";

import DestinationDetailSkeleton from "@/components/destination/DestinationDetailSkeleton";
import Breadcrumb from "@/components/destination/Breadcrumb";
import DestinationHero from "@/components/destination/DestinationHero";
import ImageGallery from "@/components/destination/ImageGallery";
import AboutDestination from "@/components/destination/AboutDestination";
import InfoCards from "@/components/destination/InfoCards";
import AttractionsSection from "@/components/destination/AttractionsSection";
import ActivitiesSection from "@/components/destination/ActivitiesSection";
import HotelsPreview from "@/components/destination/HotelsPreview";
import RestaurantsPreview from "@/components/destination/RestaurantsPreview";
import ReviewsSection from "@/components/destination/ReviewsSection";
import MapPlaceholder from "@/components/destination/MapPlaceholder";
import CTASection from "@/components/destination/CTASection";
import RelatedDestinations from "@/components/destination/RelatedDestinations";

interface DestinationDetailClientProps {
  id: string;
}

interface PageData {
  destination: ApiDestination;
  hotels: ApiHotel[];
  restaurants: ApiRestaurant[];
  activityNames: string[];
  relatedTrips: ApiTrip[];
}

export default function DestinationDetailClient({ id }: DestinationDetailClientProps) {
  const [data, setData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all data sources in parallel
      const [destination, hotels, restaurants, activities, allTrips] =
        await Promise.all([
          getDestinationById(id),
          getHotels(),
          getRestaurants(),
          getActivities(),
          getTrips(),
        ]);

      // Extract activity names for the ActivitiesSection which expects string[]
      const activityNames = activities.map((a: ApiActivity) => a.name);

      // Related trips: up to 4 trips that aren't the current destination's id
      // We use trips since they're the browse-level items
      const relatedTrips = allTrips
        .filter((t: ApiTrip) => t._id !== id)
        .slice(0, 4);

      setData({ destination, hotels, restaurants, activityNames, relatedTrips });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load destination details.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Loading ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-6 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse mb-6" />
        <DestinationDetailSkeleton />
      </div>
    );
  }

  // ── Error / Not Found ────────────────────────────────────────
  if (error || !data) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Destination Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
          {error ?? "We couldn't find the destination you're looking for. It may have been moved or the ID is invalid."}
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Explore
        </Link>
      </div>
    );
  }

  const { destination, hotels, restaurants, activityNames, relatedTrips } = data;

  // Build gallery: use destination.gallery if present, otherwise fallback to main image
  const gallery: string[] =
    destination.gallery && destination.gallery.length > 0
      ? destination.gallery
      : [destination.image];

  // Build attractions from destination.attractions (optional field)
  const attractions = destination.attractions ?? [];

  // Build reviews from destination.reviews (optional field)
  const reviews = destination.reviews ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumb destinationName={destination.title} />

        <DestinationHero destination={destination} />

        <ImageGallery images={gallery} />

        <AboutDestination destination={destination} />

        <InfoCards destination={destination} />

        {attractions.length > 0 && (
          <AttractionsSection attractions={attractions} />
        )}

        {activityNames.length > 0 && (
          <ActivitiesSection activities={activityNames} />
        )}

        <HotelsPreview hotels={hotels.slice(0, 3)} />

        <RestaurantsPreview restaurants={restaurants.slice(0, 3)} />

        {reviews.length > 0 && (
          <ReviewsSection reviews={reviews} />
        )}

        <MapPlaceholder />

        <CTASection />

        <RelatedDestinations trips={relatedTrips} />
      </main>
    </div>
  );
}
