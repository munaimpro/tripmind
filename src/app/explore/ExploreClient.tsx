"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/explore/PageHeader";
import SearchBar from "@/components/explore/SearchBar";
import FilterPanel, { Filters } from "@/components/explore/FilterPanel";
import SortDropdown from "@/components/explore/SortDropdown";
import TripGrid from "@/components/explore/TripGrid";
import EmptyState from "@/components/explore/EmptyState";
import Pagination from "@/components/explore/Pagination";
import { exploreTrips } from "@/data/exploreTrips";

const ITEMS_PER_PAGE = 12;

export default function ExploreClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    country: "All",
    budget: "All",
    duration: "All",
    travelType: "All",
    season: "All",
  });
  const [sortBy, setSortBy] = useState("most_popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique countries for filter
  const countries = useMemo(() => {
    const unique = new Set(exploreTrips.map(t => t.country));
    return Array.from(unique).sort();
  }, []);

  const clearFilters = () => {
    setFilters({
      country: "All",
      budget: "All",
      duration: "All",
      travelType: "All",
      season: "All",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset page on filter change
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  // Filter and Sort Logic
  const filteredAndSortedTrips = useMemo(() => {
    let result = [...exploreTrips];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.country.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q)
      );
    }

    // Country
    if (filters.country !== "All") {
      result = result.filter(t => t.country === filters.country);
    }

    // Travel Type
    if (filters.travelType !== "All") {
      result = result.filter(t => t.travelType === filters.travelType);
    }

    // Season
    if (filters.season !== "All") {
      result = result.filter(t => t.season === filters.season);
    }

    // Budget
    if (filters.budget !== "All") {
      if (filters.budget === 'Under $1500') {
        result = result.filter(t => t.budget < 1500);
      } else if (filters.budget === '$1500 - $3000') {
        result = result.filter(t => t.budget >= 1500 && t.budget <= 3000);
      } else if (filters.budget === '$3000+') {
        result = result.filter(t => t.budget > 3000);
      }
    }

    // Duration
    if (filters.duration !== "All") {
      if (filters.duration === '1-5 Days') {
        result = result.filter(t => t.durationDays >= 1 && t.durationDays <= 5);
      } else if (filters.duration === '6-10 Days') {
        result = result.filter(t => t.durationDays >= 6 && t.durationDays <= 10);
      } else if (filters.duration === '11+ Days') {
        result = result.filter(t => t.durationDays >= 11);
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
        // Since it's mock data without dates, we can reverse it as a proxy for "newest"
        result.reverse();
        break;
      case "most_popular":
      default:
        // Default order (or AI Recommended first)
        result.sort((a, b) => (b.isAIRecommended ? 1 : 0) - (a.isAIRecommended ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTrips.length / ITEMS_PER_PAGE);
  const currentTrips = filteredAndSortedTrips.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

            {/* Results */}
            <div className="mb-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <p>Showing {Math.min(filteredAndSortedTrips.length, 1 + (currentPage - 1) * ITEMS_PER_PAGE)} - {Math.min(filteredAndSortedTrips.length, currentPage * ITEMS_PER_PAGE)} of {filteredAndSortedTrips.length} trips</p>
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

          </div>
        </div>
      </div>
    </div>
  );
}
