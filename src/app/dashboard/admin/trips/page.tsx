"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Map,
  Sparkles,
  BadgeCheck,
  DollarSign,
  Plus,
  Search,
  RotateCcw,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Star,
  X,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  XCircle,
  TrendingUp,
  SlidersHorizontal
} from "lucide-react";

// --- Types & Interfaces ---
export type DifficultyLevel = "Easy" | "Moderate" | "Hard";
export type TripStatus = "Published" | "Draft";

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
  bestSeason: string;
  travelType: string;
  difficulty: DifficultyLevel;
  maxTravelers: number;
  isAIRecommended: boolean;
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTripsPage() {
  // State management
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit" | "view">("add");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Trip>>({
    title: "",
    country: "Japan",
    location: "",
    image: "",
    description: "",
    durationDays: 7,
    budget: 1500,
    rating: 4.8,
    bestSeason: "Spring",
    travelType: "Cultural",
    difficulty: "Easy",
    maxTravelers: 10,
    isAIRecommended: true,
    status: "Published"
  });

  // --- API CALLS ---

  // 1. Fetch All Trips: GET /trips
  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trips`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Failed to fetch trips");

      const resData = await response.json();
      if (resData.success) {
        setTrips(resData.data || []);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // 2. Add New Trip: POST /add-trip
  const handleCreateTrip = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-trip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title || "Untitled Trip",
          country: formData.country || "Global",
          location: formData.location || "Various Locations",
          image: formData.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop",
          description: formData.description || "No description provided.",
          durationDays: Number(formData.durationDays) || 3,
          budget: Number(formData.budget) || 500,
          rating: Number(formData.rating) || 4.5,
          bestSeason: formData.bestSeason || "All Year",
          travelType: formData.travelType || "General",
          difficulty: (formData.difficulty as DifficultyLevel) || "Easy",
          maxTravelers: Number(formData.maxTravelers) || 8,
          isAIRecommended: Boolean(formData.isAIRecommended),
          status: (formData.status as TripStatus) || "Draft"
        })
      });

      if (!response.ok) throw new Error("Failed to create trip");

      const resData = await response.json();
      if (resData.success) {
        await fetchTrips();
        setIsFormModalOpen(false);
      } else {
        alert("Failed to save the trip");
      }
    } catch (err) {
      console.error("Error creating trip:", err);
      alert("An error occurred while creating the trip.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Update Existing Trip: PUT /trip/:id
  const handleUpdateTrip = async () => {
    if (!selectedTrip?._id) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trip/${selectedTrip._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          durationDays: Number(formData.durationDays),
          budget: Number(formData.budget),
          rating: Number(formData.rating),
          maxTravelers: Number(formData.maxTravelers)
        })
      });

      if (!response.ok) throw new Error("Failed to update trip");

      const resData = await response.json();
      if (resData.success) {
        await fetchTrips();
        setIsFormModalOpen(false);
      } else {
        alert("Failed to update the trip");
      }
    } catch (err) {
      console.error("Error updating trip:", err);
      alert("An error occurred while updating the trip.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Delete Trip: DELETE /delete-trip/:id
  const handleDeleteTrip = async () => {
    if (!tripToDelete?._id) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete-trip/${tripToDelete._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Failed to delete trip");

      const resData = await response.json();
      if (resData.success) {
        await fetchTrips();
        setIsDeleteModalOpen(false);
        setTripToDelete(null);
      } else {
        alert("Failed to delete trip");
      }
    } catch (err) {
      console.error("Error deleting trip:", err);
      alert("An error occurred while deleting the trip.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract unique countries and types for dropdown options
  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(trips.map((t) => t.country))).filter(Boolean).sort();
  }, [trips]);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(trips.map((t) => t.travelType))).filter(Boolean).sort();
  }, [trips]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    const total = trips.length;
    const aiGen = trips.filter((t) => t.isAIRecommended).length;
    const published = trips.filter((t) => t.status === "Published").length;
    const avgBudget = total > 0 ? Math.round(trips.reduce((acc, curr) => acc + (curr.budget || 0), 0) / total) : 0;

    return { total, aiGen, published, avgBudget };
  }, [trips]);

  // Filtering & Sorting Logic
  const filteredAndSortedTrips = useMemo(() => {
    return trips
      .filter((trip) => {
        const matchesSearch =
          (trip.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (trip.country || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (trip.location || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCountry = selectedCountry === "ALL" || trip.country === selectedCountry;
        const matchesType = selectedType === "ALL" || trip.travelType === selectedType;
        const matchesStatus = selectedStatus === "ALL" || trip.status === selectedStatus;

        return matchesSearch && matchesCountry && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        if (sortBy === "oldest") return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        if (sortBy === "rating-desc") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "rating-asc") return (a.rating || 0) - (b.rating || 0);
        if (sortBy === "budget-desc") return (b.budget || 0) - (a.budget || 0);
        if (sortBy === "budget-asc") return (a.budget || 0) - (b.budget || 0);
        return 0;
      });
  }, [trips, searchTerm, selectedCountry, selectedType, selectedStatus, sortBy]);

  // Paginated Data
  const totalPages = Math.ceil(filteredAndSortedTrips.length / itemsPerPage) || 1;
  const paginatedTrips = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTrips.slice(start, start + itemsPerPage);
  }, [filteredAndSortedTrips, currentPage]);

  // Handlers
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCountry("ALL");
    setSelectedType("ALL");
    setSelectedStatus("ALL");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleOpenAddModal = () => {
    setFormMode("add");
    setSelectedTrip(null);
    setFormData({
      title: "",
      country: "Japan",
      location: "",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
      description: "",
      durationDays: 5,
      budget: 1200,
      rating: 4.8,
      bestSeason: "Spring",
      travelType: "Cultural",
      difficulty: "Easy",
      maxTravelers: 10,
      isAIRecommended: true,
      status: "Published"
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (trip: Trip) => {
    setFormMode("edit");
    setSelectedTrip(trip);
    setFormData({ ...trip });
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = (trip: Trip) => {
    setFormMode("view");
    setSelectedTrip(trip);
    setFormData({ ...trip });
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (trip: Trip) => {
    setTripToDelete(trip);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (formMode === "view") return;

    if (formMode === "add") {
      handleCreateTrip();
    } else if (formMode === "edit") {
      handleUpdateTrip();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ─── PAGE HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Trips</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage global travel hotspots, configure specifications, and view AI recommendations.</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-sm shadow-indigo-500/10 group self-start sm:self-auto"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            Add Trip
          </button>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Stat 1: Total Trips */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Trips</p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Map className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5">
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +12%
              </span>
              <span>vs last month</span>
            </div>
          </div>

          {/* Stat 2: AI Generated Trips */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Generated</p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stats.aiGen}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5">
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                {stats.total > 0 ? Math.round((stats.aiGen / stats.total) * 100) : 0}%
              </span>
              <span>of total inventory</span>
            </div>
          </div>

          {/* Stat 3: Published Trips */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Published</p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stats.published}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <BadgeCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active & Visible</span>
            </div>
          </div>

          {/* Stat 4: Average Budget */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Budget</p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${stats.avgBudget}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <DollarSign className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5">
              <span>Per itinerary package</span>
            </div>
          </div>
        </div>

        {/* --- SEARCH & FILTERS SECTION --- */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              <span>Filter & Search</span>
            </div>
            {(searchTerm || selectedCountry !== "ALL" || selectedType !== "ALL" || selectedStatus !== "ALL" || sortBy !== "newest") && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Bar */}
            <div className="relative lg:col-span-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search trip, location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Filter Country */}
            <div>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="ALL">All Countries</option>
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Travel Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="ALL">All Travel Types</option>
                {uniqueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Status */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="ALL">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="rating-desc">Sort: Highest Rating</option>
                <option value="rating-asc">Sort: Lowest Rating</option>
                <option value="budget-desc">Sort: Highest Budget</option>
                <option value="budget-asc">Sort: Lowest Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        {isError ? (
          /* Error State Card */
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-red-200/80 dark:border-red-900/40 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-7 h-7 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Failed to load trips dataset</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                An error occurred while fetching trip itineraries from the server. Please check your network connection and try again.
              </p>
            </div>
            <button
              onClick={fetchTrips}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Request</span>
            </button>
          </div>
        ) : isLoading ? (
          /* Skeleton Loading View */
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 animate-pulse flex flex-col sm:flex-row items-center gap-4"
              >
                <div className="w-full sm:w-24 h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="flex-1 space-y-2 w-full">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                </div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-20" />
              </div>
            ))}
          </div>
        ) : filteredAndSortedTrips.length === 0 ? (
          /* Empty State */
          <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Map className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No trips found</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                No trip packages matched your current filter criteria. Try clearing search parameters or create a new trip.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
              >
                Add New Trip
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* --- DESKTOP TABLE VIEW --- */}
            <div className="hidden lg:block overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                      <th className="py-3.5 px-4">Trip Info</th>
                      <th className="py-3.5 px-4">Travel Type</th>
                      <th className="py-3.5 px-4">Duration</th>
                      <th className="py-3.5 px-4">Budget</th>
                      <th className="py-3.5 px-4">Rating</th>
                      <th className="py-3.5 px-4">AI Rec.</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Created Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {paginatedTrips.map((trip) => (
                      <tr
                        key={trip._id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                      >
                        {/* Trip Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={trip.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop"}
                              alt={trip.title}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200/80 dark:border-slate-800 shrink-0"
                            />
                            <div className="max-w-[220px]">
                              <p className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {trip.title}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{trip.location}, {trip.country}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Travel Type */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {trip.travelType}
                          </span>
                        </td>

                        {/* Duration */}
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock3 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{trip.durationDays} Days</span>
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                          ${(trip.budget || 0).toLocaleString()}
                        </td>

                        {/* Rating */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 font-medium text-slate-800 dark:text-slate-200">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{trip.rating}</span>
                          </div>
                        </td>

                        {/* AI Recommended */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {trip.isAIRecommended ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50">
                              <Sparkles className="w-3 h-3" /> AI
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {trip.status === "Published" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                              <CheckCircle2 className="w-3 h-3" /> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50">
                              <XCircle className="w-3 h-3" /> Draft
                            </span>
                          )}
                        </td>

                        {/* Created Date */}
                        <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }) : "N/A"}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenViewModal(trip)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(trip)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                              title="Edit Trip"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(trip)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                              title="Delete Trip"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- MOBILE CARDS VIEW --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
              {paginatedTrips.map((trip) => (
                <div
                  key={trip._id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={trip.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop"}
                      alt={trip.title}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200/80 dark:border-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">
                          {trip.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{trip.location}, {trip.country}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        {trip.status === "Published" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50">
                            Draft
                          </span>
                        )}

                        {trip.isAIRecommended && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50">
                            <Sparkles className="w-2.5 h-2.5" /> AI
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Budget</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">${trip.budget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Duration</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{trip.durationDays} Days</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Rating</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {trip.rating}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-[11px] text-slate-400">
                      Added: {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenViewModal(trip)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(trip)}
                        className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(trip)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- PAGINATION SECTION --- */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedTrips.length)}
                </span>{" "}
                of <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredAndSortedTrips.length}</span> trips
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all ${currentPage === pageNum
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

      </div>

      {/* --- ADD / EDIT / VIEW MODAL --- */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                  {formMode === "add" && "Add New Trip Package"}
                  {formMode === "edit" && "Edit Trip Package"}
                  {formMode === "view" && "Trip Details"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formMode === "view"
                    ? "Read-only view of trip details."
                    : "Fill out parameters to configure the trip package."}
                </p>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <form onSubmit={handleSaveTrip} className="p-6 overflow-y-auto space-y-4 flex-1">

              {/* Title & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Trip Title
                  </label>
                  <input
                    type="text"
                    disabled={formMode === "view" || isSubmitting}
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Kyoto Autumn Tour"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled={formMode === "view" || isSubmitting}
                    required
                    value={formData.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Japan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Location & Cover Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Location / Region
                  </label>
                  <input
                    type="text"
                    disabled={formMode === "view" || isSubmitting}
                    required
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kyoto, Kansai"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    disabled={formMode === "view" || isSubmitting}
                    required
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  disabled={formMode === "view" || isSubmitting}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed itinerary summary..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60 resize-none"
                />
              </div>

              {/* Grid 3: Duration, Budget, Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.durationDays || 1}
                    onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Estimated Budget ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.budget || 0}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={1}
                    max={5}
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Grid 4: Travel Type, Season, Max Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Travel Type
                  </label>
                  <input
                    type="text"
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.travelType || "Cultural"}
                    onChange={(e) => setFormData({ ...formData, travelType: e.target.value })}
                    placeholder="e.g. Adventure, Luxury"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Best Season
                  </label>
                  <input
                    type="text"
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.bestSeason || "Spring"}
                    onChange={(e) => setFormData({ ...formData, bestSeason: e.target.value })}
                    placeholder="e.g. Autumn (Oct - Nov)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Max Travelers
                  </label>
                  <input
                    type="number"
                    min={1}
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.maxTravelers || 10}
                    onChange={(e) => setFormData({ ...formData, maxTravelers: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Grid 5: Difficulty, Status & AI Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.difficulty || "Easy"}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DifficultyLevel })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    disabled={formMode === "view" || isSubmitting}
                    value={formData.status || "Published"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as TripStatus })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      disabled={formMode === "view" || isSubmitting}
                      checked={Boolean(formData.isAIRecommended)}
                      onChange={(e) => setFormData({ ...formData, isAIRecommended: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" /> AI Recommended
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons inside Form */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {formMode === "view" ? "Close" : "Cancel"}
                </button>
                {formMode !== "view" && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : formMode === "add" ? "Create Trip" : "Save Changes"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && tripToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-6 h-6 stroke-[1.75]" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Trip Package?</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">"{tripToDelete.title}"</span>? This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteTrip}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 shadow-md shadow-red-500/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Deleting..." : "Delete Trip"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}