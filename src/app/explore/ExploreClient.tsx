"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import PageHeader from "@/components/explore/PageHeader";
import SearchBar from "@/components/explore/SearchBar";
import FilterPanel, { Filters } from "@/components/explore/FilterPanel";
import SortDropdown from "@/components/explore/SortDropdown";
import TripGrid from "@/components/explore/TripGrid";
import TripCardSkeleton from "@/components/explore/TripCardSkeleton";
import EmptyState from "@/components/explore/EmptyState";
import Pagination from "@/components/explore/Pagination";
import { getTrips } from "@/lib/api";
import type { ApiTrip } from "@/types/api";

const ITEMS_PER_PAGE = 12;

const DEFAULT_FILTERS: Filters = {
  country: "All",
  budget: "All",
  duration: "All",
  travelType: "All",
  season: "All",
};

export default function ExploreClient() {
  // ── API state ────────────────────────────────────────────────
  const [allTrips, setAllTrips] = useState<ApiTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ── UI state ─────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("most_popular");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Fetch trips once on mount ────────────────────────────────
  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const trips = await getTrips();
      setAllTrips(trips);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load trips.";
      setFetchError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // ── Derived country list for filter ─────────────────────────
  const countries = useMemo(() => {
    const unique = new Set(allTrips.map((t) => t.country));
    return Array.from(unique).sort();
  }, [allTrips]);

  // ── Handlers ─────────────────────────────────────────────────
  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  // ── Filter + Sort logic (operates on API data) ────────────────
  const filteredAndSortedTrips = useMemo(() => {
    let result = [...allTrips];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.country.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q)
      );
    }

    // Country
    if (filters.country !== "All") {
      result = result.filter((t) => t.country === filters.country);
    }

    // Travel Type
    if (filters.travelType !== "All") {
      result = result.filter((t) => t.travelType === filters.travelType);
    }

    // Season
    if (filters.season !== "All") {
      result = result.filter((t) => t.season === filters.season);
    }

    // Budget
    if (filters.budget !== "All") {
      if (filters.budget === "Under $1500") {
        result = result.filter((t) => t.budget < 1500);
      } else if (filters.budget === "$1500 - $3000") {
        result = result.filter((t) => t.budget >= 1500 && t.budget <= 3000);
      } else if (filters.budget === "$3000+") {
        result = result.filter((t) => t.budget > 3000);
      }
    }

    // Duration
    if (filters.duration !== "All") {
      if (filters.duration === "1-5 Days") {
        result = result.filter((t) => t.durationDays >= 1 && t.durationDays <= 5);
      } else if (filters.duration === "6-10 Days") {
        result = result.filter((t) => t.durationDays >= 6 && t.durationDays <= 10);
      } else if (filters.duration === "11+ Days") {
        result = result.filter((t) => t.durationDays >= 11);
      }
    }

    // Sort
    switch (sortBy) {
      case "highest_rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest_budget":
        result.sort((a, b) => a.budget - b.budget);
        break;
      case "highest_budget":
        result.sort((a, b) => b.budget - a.budget);
        break;
      case "shortest_duration":
        result.sort((a, b) => a.durationDays - b.durationDays);
        break;
      case "longest_duration":
        result.sort((a, b) => b.durationDays - a.durationDays);
        break;
      case "newest":
        result.reverse();
        break;
      case "most_popular":
      default:
        result.sort(
          (a, b) => (b.isAIRecommended ? 1 : 0) - (a.isAIRecommended ? 1 : 0)
        );
        break;
    }

    return result;
  }, [allTrips, searchQuery, filters, sortBy]);

  // ── Pagination ───────────────────────────────────────────────
  const totalPages = Math.ceil(filteredAndSortedTrips.length / ITEMS_PER_PAGE);
  const currentTrips = filteredAndSortedTrips.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                setFilters={handleFilterChange}
                clearFilters={clearFilters}
                countries={countries}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Search & Sort Header */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between mb-8">
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
              <div className="shrink-0 w-full sm:w-auto flex justify-end">
                <SortDropdown value={sortBy} onChange={handleSortChange} />
              </div>
            </div>

            {/* Loading skeletons */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <TripCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error state */}
            {!isLoading && fetchError && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Failed to load trips
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{fetchError}</p>
                <button
                  onClick={fetchTrips}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Loaded results */}
            {!isLoading && !fetchError && (
              <>
                {/* Results count */}
                <div className="mb-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <p>
                    Showing{" "}
                    {Math.min(filteredAndSortedTrips.length, 1 + (currentPage - 1) * ITEMS_PER_PAGE)}{" "}
                    –{" "}
                    {Math.min(filteredAndSortedTrips.length, currentPage * ITEMS_PER_PAGE)} of{" "}
                    {filteredAndSortedTrips.length} trips
                  </p>
                </div>

                {currentTrips.length > 0 ? (
                  <>
                    <TripGrid trips={currentTrips} />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </>
                ) : (
                  <EmptyState onReset={clearFilters} />
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
