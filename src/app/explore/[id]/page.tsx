import { notFound } from "next/navigation";
import { getDestinationById } from "@/data/destinationDetails";
import PageHeader from "@/components/explore/PageHeader";
import Breadcrumb from "@/components/destination/Breadcrumb";
import DestinationHero from "@/components/destination/DestinationHero";
import ImageGallery from "@/components/destination/ImageGallery";
import AboutDestination from "@/components/destination/AboutDestination";
import InfoCards from "@/components/destination/InfoCards";
import AttractionsSection from "@/components/destination/AttractionsSection";
import ActivitiesSection from "@/components/destination/ActivitiesSection";
import HotelsPreview from "@/components/destination/HotelsPreview";
import RestaurantsPreview from "@/components/destination/RestaurantsPreview";
import MapPlaceholder from "@/components/destination/MapPlaceholder";
import ReviewsSection from "@/components/destination/ReviewsSection";
import RelatedDestinations from "@/components/destination/RelatedDestinations";
import CTASection from "@/components/destination/CTASection";

interface DestinationPageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const resolvedParams = await params;
  const destination = getDestinationById(resolvedParams.id);

  if (!destination) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Breadcrumb destinationName={destination.title} />
        
        <div className="mt-4 mb-12">
          <DestinationHero destination={destination} />
          <ImageGallery images={destination.gallery} />
          <AboutDestination destination={destination} />
          <InfoCards destination={destination} />
          <AttractionsSection attractions={destination.attractions} />
          <ActivitiesSection activities={destination.activities} />
          <HotelsPreview hotels={destination.hotels} />
          <RestaurantsPreview restaurants={destination.restaurants} />
          <MapPlaceholder />
          <ReviewsSection reviews={destination.reviews} />
          <RelatedDestinations currentTripId={destination.id} />
          <CTASection />
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: DestinationPageProps) {
  const resolvedParams = await params;
  const destination = getDestinationById(resolvedParams.id);
  
  if (!destination) {
    return {
      title: 'Destination Not Found | TripMind AI',
    };
  }

  return {
    title: `${destination.title} | TripMind AI`,
    description: destination.description,
  };
}
