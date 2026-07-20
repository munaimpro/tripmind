import { Trip } from "./exploreTrips";
import { exploreTrips } from "./exploreTrips";

export interface DestinationDetail extends Trip {
  gallery: string[];
  highlights: string[];
  bestTime: string;
  climate: string;
  currency: string;
  language: string;
  transportation: string;
  safety: string;
  internet: string;
  attractions: { name: string; description: string; image: string }[];
  activities: string[];
  hotels: { name: string; rating: number; price: number; image: string }[];
  restaurants: { name: string; cuisine: string; rating: number; image: string }[];
  reviews: { name: string; avatar: string; rating: number; comment: string; date: string }[];
}

export const getDestinationById = (id: string): DestinationDetail | undefined => {
  const baseTrip = exploreTrips.find(t => t._id === id);
  if (!baseTrip) return undefined;

  // We map the base trip to full details. 
  // In a real app, this would be an API fetch. Here we just augment the static data.
  return {
    ...baseTrip,
    gallery: [
      baseTrip.image,
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop"
    ],
    highlights: [
      "Stunning panoramic views of the entire landscape",
      "Rich cultural heritage and historic landmarks",
      "World-class local cuisine and street food",
      "Unforgettable guided tours and adventure sports"
    ],
    bestTime: baseTrip.season === 'Year-round' ? 'Any time of the year' : `Best visited during ${baseTrip.season}`,
    climate: "Moderate to tropical depending on the specific region. Expect pleasant evenings and warm days.",
    currency: "USD ($) / Local Currency",
    language: "English / Local Dialect",
    transportation: "Public Transit, Taxis, and Ride-sharing available",
    safety: "High - Generally safe for tourists. Standard precautions apply.",
    internet: "High-speed Wi-Fi available in most hotels and cafes.",
    attractions: [
      {
        name: "Historic Old Town",
        description: "Wander through centuries-old architecture and vibrant markets.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "National Museum",
        description: "Discover artifacts that tell the story of the ancient civilization.",
        image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Central Park & Gardens",
        description: "A lush, serene escape in the middle of the bustling city.",
        image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Sunset Point",
        description: "The best panoramic view of the landscape during golden hour.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Artisan Market",
        description: "Shop for handcrafted souvenirs and local art pieces.",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "The Grand Palace",
        description: "An architectural marvel that serves as the cultural centerpiece.",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=600&auto=format&fit=crop"
      }
    ],
    activities: ["Hiking", "Boat Tour", "Photography", "Local Food Tasting", "Museum Hopping", "Biking"],
    hotels: [
      {
        name: "The Grand Resort & Spa",
        rating: 4.9,
        price: 350,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Boutique Heritage Hotel",
        rating: 4.7,
        price: 180,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Eco Lodge Retreat",
        rating: 4.8,
        price: 120,
        image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop"
      }
    ],
    restaurants: [
      {
        name: "The Rustic Hearth",
        cuisine: "Authentic Local",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Oceanview Dining",
        cuisine: "Seafood & Grill",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Café Botanica",
        cuisine: "Vegan & Organic",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        name: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "October 2025",
        comment: "Absolutely breathtaking! The scenery was unmatched and the local culture was so welcoming. TripMind's itinerary was perfect."
      },
      {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        rating: 4,
        date: "August 2025",
        comment: "A fantastic destination for families. The activities kept everyone entertained, though booking ahead is a must for the popular attractions."
      },
      {
        name: "Emma Watson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "April 2025",
        comment: "The highlight of my year. Incredible food, beautiful landscapes, and a seamless travel experience."
      }
    ]
  };
};
