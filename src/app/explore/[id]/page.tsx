import { Metadata } from "next";
import { getDestinationById } from "@/lib/api";
import DestinationDetailClient from "@/components/destination/DestinationDetailClient";

interface DestinationPageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const resolvedParams = await params;
  return <DestinationDetailClient id={resolvedParams.id} />;
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
