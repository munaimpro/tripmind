// ============================================================
// API Response Types — TripMind Backend
// ============================================================

/** Envelope returned by every backend endpoint */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ── Trips ────────────────────────────────────────────────────

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Year-round';
export type TravelType =
  | 'Adventure'
  | 'Beach'
  | 'Family'
  | 'Nature'
  | 'Luxury'
  | 'Cultural';

export interface ApiTrip {
  _id: string;
  title: string;
  country: string;
  location: string;
  image: string;
  description: string;
  durationDays: number;
  budget: number;
  rating: number;
  bestSeason: Season;
  travelType: TravelType;
  isAIRecommended?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ── Destinations ─────────────────────────────────────────────

export interface ApiAttraction {
  name: string;
  description: string;
  image: string;
}

export interface ApiReview {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ApiDestination {
  _id: string;
  title: string;
  country: string;
  location: string;
  image: string;
  description: string;
  durationDays: number;
  budget: number;
  rating: number;
  season: Season;
  travelType: TravelType;
  isAIRecommended?: boolean;
  // Extended detail fields
  gallery?: string[];
  highlights?: string[];
  bestTime?: string;
  climate?: string;
  currency?: string;
  language?: string;
  transportation?: string;
  safety?: string;
  internet?: string;
  attractions?: ApiAttraction[];
  activities?: string[];
  reviews?: ApiReview[];
  createdAt?: string;
  updatedAt?: string;
}

// ── Hotels ───────────────────────────────────────────────────

export interface ApiHotel {
  _id: string;
  name: string;
  rating: number;
  price: number;
  image: string;
  location?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ── Restaurants ──────────────────────────────────────────────

export interface ApiRestaurant {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  location?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ── Activities ───────────────────────────────────────────────

export interface ApiActivity {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}
