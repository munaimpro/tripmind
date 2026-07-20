import { Metadata } from "next";
import { getDestinationById } from "@/lib/api";
import TripDetailClient from "@/components/explore/TripDetailClient";

interface DestinationPageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const resolvedParams = await params;
  return <TripDetailClient id={resolvedParams.id} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const destination = await getDestinationById(resolvedParams.id);
    return {
      title: `${destination.title} | TripMind AI`,
      description: destination.description,
    };
  } catch (error) {
    return {
      title: 'Destination Not Found | TripMind AI',
    };
  }
}
