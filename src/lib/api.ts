/**
 * TripMind API Service Layer
 *
 * All backend communication goes through this file.
 * Uses the native Fetch API — no third-party dependencies.
 * Every function throws on non-OK responses so callers can
 * handle errors uniformly with try/catch.
 */

import type {
  ApiResponse,
  ApiDestination,
  ApiTrip,
  ApiHotel,
  ApiRestaurant,
  ApiActivity,
} from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:8000';

// ── Internal helper ──────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    // Disable Next.js default caching so pages always get fresh data
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} — ${path}`
    );
  }

  const json: ApiResponse<T> = await response.json();

  if (!json.success) {
    throw new Error(json.message ?? `API returned success=false for ${path}`);
  }

  return json.data;
}

async function apiPost<T>(path: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} — ${path}`
    );
  }

  const json: ApiResponse<T> = await response.json();

  if (!json.success) {
    throw new Error(json.message ?? `API returned success=false for ${path}`);
  }

  return json.data;
}

// ── Destinations ─────────────────────────────────────────────

/**
 * Fetch all destinations.
 * Used on the Home page (Featured Destinations section).
 */
export async function getDestinations(): Promise<ApiDestination[]> {
  return apiFetch<ApiDestination[]>('/destinations');
}

/**
 * Fetch a single destination by its MongoDB ObjectId string.
 * Used on the Destination Detail page.
 */
export async function getDestinationById(id: string): Promise<ApiDestination> {
  return apiFetch<ApiDestination>(`/destinations/${id}`);
}

// ── Trips ────────────────────────────────────────────────────

/**
 * Fetch all trips.
 * Used on the Explore Trips page.
 */
export async function getTrips(): Promise<ApiTrip[]> {
  return apiFetch<ApiTrip[]>('/trips');
}

// ── Hotels ───────────────────────────────────────────────────

/**
 * Fetch all hotels.
 * Used on the Destination Detail page (first 3 shown).
 */
export async function getHotels(): Promise<ApiHotel[]> {
  return apiFetch<ApiHotel[]>('/hotels');
}

// ── Restaurants ──────────────────────────────────────────────

/**
 * Fetch all restaurants.
 * Used on the Destination Detail page (first 3 shown).
 */
export async function getRestaurants(): Promise<ApiRestaurant[]> {
  return apiFetch<ApiRestaurant[]>('/restaurants');
}

// ── Activities ───────────────────────────────────────────────

/**
 * Fetch all activities.
 * Used on the Destination Detail page (all shown).
 */
export async function getActivities(): Promise<ApiActivity[]> {
  return apiFetch<ApiActivity[]>('/activities');
}

// ── AI Planner ───────────────────────────────────────────────

export async function generateTrip(data: any): Promise<any> {
  return apiPost<any>('/ai/generate-trip', data);
}

export async function optimizeBudget(aiPlanId: string, newBudget: string): Promise<any> {
  return apiPost<any>('/ai/optimize-budget', { aiPlanId, newBudget });
}
