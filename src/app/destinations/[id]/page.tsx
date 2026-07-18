import { Metadata } from "next";
import DestinationDetailClient from "@/components/destination/DestinationDetailClient";

interface DestinationDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Destination Details | TripMind AI",
  description: "Explore detailed information, hotels, restaurants, and activities for your chosen destination.",
};

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { id } = await params;
  return <DestinationDetailClient id={id} />;
}
