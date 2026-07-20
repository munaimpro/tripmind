export interface Trip {
  _id: string;
  title: string;
  country: string;
  location: string;
  image: string;
  description: string;
  durationDays: number;
  budget: number;
  rating: number;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Year-round';
  travelType: 'Adventure' | 'Beach' | 'Family' | 'Nature' | 'Luxury' | 'Cultural';
  isAIRecommended?: boolean;
}

export const exploreTrips: Trip[] = [
  {
    id: "trip-1",
    title: "Kyoto Heritage Tour",
    country: "Japan",
    location: "Kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    description: "Experience the timeless beauty of ancient temples, bamboo forests, and traditional tea ceremonies.",
    durationDays: 7,
    budget: 2400,
    rating: 4.9,
    season: 'Spring',
    travelType: 'Cultural',
    isAIRecommended: true
  },
  {
    id: "trip-2",
    title: "Swiss Alps Adventure",
    country: "Switzerland",
    location: "Zermatt",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
    description: "Skiing, hiking, and breathtaking views of the Matterhorn in a luxury alpine setting.",
    durationDays: 5,
    budget: 3500,
    rating: 4.8,
    season: 'Winter',
    travelType: 'Adventure'
  },
  {
    id: "trip-3",
    title: "Maldives Island Escape",
    country: "Maldives",
    location: "Male Atoll",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop",
    description: "Overwater bungalows, crystal clear waters, and ultimate relaxation in a tropical paradise.",
    durationDays: 10,
    budget: 5200,
    rating: 5.0,
    season: 'Year-round',
    travelType: 'Luxury',
    isAIRecommended: true
  },
  {
    id: "trip-4",
    title: "Santorini Sunset Gateway",
    country: "Greece",
    location: "Oia",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop",
    description: "White-washed houses, blue domes, and the most spectacular sunsets over the Aegean Sea.",
    durationDays: 6,
    budget: 2100,
    rating: 4.7,
    season: 'Summer',
    travelType: 'Cultural'
  },
  {
    id: "trip-5",
    title: "Banff National Park Discovery",
    country: "Canada",
    location: "Alberta",
    image: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?q=80&w=800&auto=format&fit=crop",
    description: "Turquoise lakes, majestic glaciers, and abundant wildlife in the heart of the Rockies.",
    durationDays: 8,
    budget: 1800,
    rating: 4.9,
    season: 'Summer',
    travelType: 'Nature'
  },
  {
    id: "trip-6",
    title: "Bali Surf & Yoga Retreat",
    country: "Indonesia",
    location: "Ubud & Canggu",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    description: "Find inner peace and ride perfect waves in the spiritual heart of the Indonesian archipelago.",
    durationDays: 14,
    budget: 1500,
    rating: 4.6,
    season: 'Year-round',
    travelType: 'Beach',
    isAIRecommended: true
  },
  {
    id: "trip-7",
    title: "Machu Picchu Trek",
    country: "Peru",
    location: "Cusco",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop",
    description: "Hike the historic Inca Trail and witness the awe-inspiring ruins hidden in the Andes clouds.",
    durationDays: 9,
    budget: 2800,
    rating: 4.9,
    season: 'Autumn',
    travelType: 'Adventure'
  },
  {
    id: "trip-8",
    title: "Amalfi Coast Drive",
    country: "Italy",
    location: "Positano",
    image: "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800&auto=format&fit=crop",
    description: "Drive along dramatic cliffs, explore pastel-colored villages, and enjoy authentic Italian cuisine.",
    durationDays: 7,
    budget: 3200,
    rating: 4.8,
    season: 'Summer',
    travelType: 'Luxury'
  },
  {
    id: "trip-9",
    title: "Costa Rica Rainforest",
    country: "Costa Rica",
    location: "Monteverde",
    image: "https://images.unsplash.com/photo-1518182170546-076616fd61fd?q=80&w=800&auto=format&fit=crop",
    description: "Zip-line through the cloud forest and spot sloths in this biodiversity hotspot.",
    durationDays: 10,
    budget: 1950,
    rating: 4.7,
    season: 'Spring',
    travelType: 'Nature',
    isAIRecommended: true
  },
  {
    id: "trip-10",
    title: "Tokyo Tech & Culture",
    country: "Japan",
    location: "Tokyo",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop",
    description: "Dive into a neon-lit metropolis where ancient shrines meet cutting-edge technology.",
    durationDays: 6,
    budget: 2600,
    rating: 4.8,
    season: 'Autumn',
    travelType: 'Cultural'
  },
  {
    id: "trip-11",
    title: "Bora Bora Honeymoon",
    country: "French Polynesia",
    location: "Bora Bora",
    image: "https://images.unsplash.com/photo-1580196962294-0d70f907604b?q=80&w=800&auto=format&fit=crop",
    description: "The ultimate romantic getaway with private overwater villas and vibrant coral reefs.",
    durationDays: 8,
    budget: 6500,
    rating: 5.0,
    season: 'Year-round',
    travelType: 'Luxury'
  },
  {
    id: "trip-12",
    title: "New Zealand South Island",
    country: "New Zealand",
    location: "Queenstown",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
    description: "Bungee jumping, fjord cruises, and Lord of the Rings landscapes in the adventure capital.",
    durationDays: 12,
    budget: 3800,
    rating: 4.9,
    season: 'Summer',
    travelType: 'Adventure',
    isAIRecommended: true
  },
  {
    id: "trip-13",
    title: "Paris Family Holiday",
    country: "France",
    location: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    description: "Create unforgettable family memories exploring Disneyland, the Eiffel Tower, and charming cafes.",
    durationDays: 7,
    budget: 4100,
    rating: 4.6,
    season: 'Spring',
    travelType: 'Family'
  },
  {
    id: "trip-14",
    title: "Serengeti Safari",
    country: "Tanzania",
    location: "Serengeti",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    description: "Witness the Great Migration and experience the wild majesty of the African savanna.",
    durationDays: 10,
    budget: 5800,
    rating: 4.9,
    season: 'Summer',
    travelType: 'Nature'
  },
  {
    id: "trip-15",
    title: "Disney World Adventure",
    country: "USA",
    location: "Orlando",
    image: "https://images.unsplash.com/photo-1590483864506-c67b93dc377e?q=80&w=800&auto=format&fit=crop",
    description: "Magic and wonder await in the world's most famous theme parks for the whole family.",
    durationDays: 5,
    budget: 3000,
    rating: 4.7,
    season: 'Winter',
    travelType: 'Family'
  },
  {
    id: "trip-16",
    title: "Iceland Northern Lights",
    country: "Iceland",
    location: "Reykjavik",
    image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?q=80&w=800&auto=format&fit=crop",
    description: "Chase the aurora borealis, soak in geothermal pools, and explore ice caves.",
    durationDays: 6,
    budget: 2700,
    rating: 4.8,
    season: 'Winter',
    travelType: 'Adventure',
    isAIRecommended: true
  }
];
