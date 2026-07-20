"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Sparkles,
  Globe,
  Star,
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Info
} from "lucide-react";

const travelTypes = ["All", "Beach", "Cultural", "Adventure", "Nature", "Luxury"];

export default function AdminDestinationsPage() {
  // States
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Modals States
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [modalType, setModalType] = useState<"add" | "edit" | "view">("add");

  // Fetch all destinations from backend
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`);
      if (!res.ok) throw new Error("Failed to load destinations.");
      const response = await res.json();
      if (!response.success) {
        throw new Error(response.message || "Failed to load destinations");
      }
      setDestinations(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Compute dynamic list of countries from current database data
  const countries = ["All", ...Array.from(new Set(destinations.map((d: any) => d.country)))].filter(Boolean);

  // Reset Filters
  const handleResetFilters = () => {
    setSearch("");
    setSelectedCountry("All");
    setSelectedType("All");
    setSortBy("default");
  };

  // Filter & Sort Logic
  const filteredDestinations = destinations
    .filter((d) => {
      const nameMatch = d.title?.toLowerCase().includes(search.toLowerCase()) || false;
      const countryMatch = d.country?.toLowerCase().includes(search.toLowerCase()) || false;
      const matchesSearch = nameMatch || countryMatch;
      const matchesCountry = selectedCountry === "All" || d.country === selectedCountry;
      const matchesType = selectedType === "All" || d.travelType === selectedType;
      return matchesSearch && matchesCountry && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "rating-high") return b.rating - a.rating;
      if (sortBy === "rating-low") return a.rating - b.rating;
      return 0;
    });

  // Open Add Modal
  const openAddModal = () => {
    setModalType("add");
    setSelectedDestination({
      title: "", country: "", location: "", image: "", description: "",
      duration: "", budget: "", rating: 4.5, bestSeason: "", travelType: "Beach", isAIRecommended: false
    });
    setIsUpsertModalOpen(true);
  };

  // Open Edit/View Modal
  const openUpsertModal = (type: "edit" | "view", destination: any) => {
    setModalType(type);
    setSelectedDestination({ ...destination });
    setIsUpsertModalOpen(true);
  };

  // Open Delete Confirmation
  const openDeleteModal = (destination: any) => {
    setSelectedDestination(destination);
    setIsDeleteModalOpen(true);
  };

  // Async Save handlers
  const handleSaveChanges = async () => {
    try {
      if (modalType === "add") {
        const payload = {
          ...selectedDestination,
          status: "Published",
          image: selectedDestination.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&q=80",
          gallery: []
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-destination`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create destination.");
      } else if (modalType === "edit") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${selectedDestination._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedDestination),
        });
        console.log(await res.json());
        console.log(selectedDestination);
        if (!res.ok) throw new Error("Failed to update destination.");
      }
      setIsUpsertModalOpen(false);
      fetchDestinations(); // Refresh table data
    } catch (err: any) {
      alert(err.message);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete-destination/${selectedDestination._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete destination.");
      setIsDeleteModalOpen(false);
      fetchDestinations(); // Refresh table data
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Calculate Average Rating safely
  const averageRating = destinations.length
    ? (destinations.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / destinations.length).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6 pb-12">

      {/* ─── PAGE HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Destinations</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage global travel hotspots, configure specifications, and view AI recommendations.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-sm shadow-indigo-500/10 group self-start sm:self-auto"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          Add Destination
        </button>
      </div>

      {/* ─── STATISTICS CARDS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Destinations", value: destinations.length, icon: MapPin, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
          { label: "AI Recommended", value: destinations.filter(d => d.isAIRecommended).length, icon: Sparkles, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
          { label: "Countries Covered", value: new Set(destinations.map(d => d.country).filter(Boolean)).size, icon: Globe, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
          { label: "Average Rating", value: averageRating, icon: Star, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" }
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.bg} ${card.color}`}>
              <card.icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{card.value}</p>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── SEARCH & FILTER SECTION ─── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <SlidersHorizontal size={16} className="text-indigo-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Search Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Inputs */}
          <div className="relative lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition-colors"
            />
          </div>
          {/* Filter by Country */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition-colors cursor-pointer"
          >
            {countries.map(c => <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>)}
          </select>
          {/* Filter by Travel Type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition-colors cursor-pointer"
          >
            {travelTypes.map(t => <option key={t} value={t}>{t === "All" ? "All Travel Types" : t}</option>)}
          </select>
          {/* Sort by Rating */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition-colors cursor-pointer"
          >
            <option value="default">Sort Options</option>
            <option value="rating-high">Rating: High to Low</option>
            <option value="rating-low">Rating: Low to High</option>
          </select>
          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="w-full py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700/70 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* ─── DATA GRID / TABLE ─── */}
      <div>
        {loading ? (
          <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            Loading destination records...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-sm text-rose-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            {error}
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No matching destinations found.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/70 dark:bg-slate-900/50">
                      <th className="py-3.5 px-6">Destination</th>
                      <th className="py-3.5 px-6">Travel Type</th>
                      <th className="py-3.5 px-6">Rating</th>
                      <th className="py-3.5 px-6">Est. Budget</th>
                      <th className="py-3.5 px-6">Duration</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                    {filteredDestinations.map((dest) => (
                      <tr key={dest._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="py-3.5 px-6 flex items-center gap-3">
                          <img src={dest.image} alt={dest.title} className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-800" />
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              {dest.title}
                              {dest.isAIRecommended && <Sparkles size={12} className="text-violet-500" name="AI Recommended" />}
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{dest.country}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-slate-600 dark:text-slate-400 font-medium">{dest.travelType}</td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                            <Star size={14} fill="currentColor" className="text-amber-500" />
                            {dest.rating}
                          </div>
                        </td>
                        <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">${dest.budget}</td>
                        <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400">`${dest.durationDays}` Days</td>
                        <td className="py-3.5 px-6">
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${dest.status === 'Published' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                            {dest.status || "Published"}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openUpsertModal("view", dest)} className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="View Details"><Eye size={16} /></button>
                            <button onClick={() => openUpsertModal("edit", dest)} className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Edit"><Edit2 size={16} /></button>
                            <button onClick={() => openDeleteModal(dest)} className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" title="Delete"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Responsive Cards View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredDestinations.map((dest) => (
                <div key={dest._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={dest.image} alt={dest.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{dest.title}</h4>
                        {dest.isAIRecommended && <Sparkles size={12} className="text-violet-500 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{dest.country}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                      <Star size={12} fill="currentColor" className="text-amber-500" />
                      {dest.rating}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <p className="text-slate-400 dark:text-slate-500">Budget</p>
                      <p className="font-bold text-slate-900 dark:text-white">${dest.budget}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 dark:text-slate-500">Type</p>
                      <p className="font-medium text-slate-700 dark:text-slate-300">{dest.travelType}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 dark:text-slate-500">Status</p>
                      <span className={`inline-block mt-0.5 text-[10px] font-medium px-1.5 py-0.2 rounded-full ${dest.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                        {dest.status || "Published"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button onClick={() => openUpsertModal("view", dest)} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"><Eye size={14} /> View</button>
                    <button onClick={() => openUpsertModal("edit", dest)} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"><Edit2 size={14} /> Edit</button>
                    <button onClick={() => openDeleteModal(dest)} className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"><Trash2 size={14} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ─── RESPONSIVE PAGINATION ─── */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-sm">
        <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Showing <b>1-{filteredDestinations.length}</b> of <b>{filteredDestinations.length}</b></span>
        <div className="flex items-center gap-2">
          <button disabled className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-400 border border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-60"><ChevronLeft size={16} /></button>
          <button className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm">1</button>
          <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* ─── ADD / EDIT / VIEW MODAL ─── */}
      {isUpsertModalOpen && selectedDestination && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white capitalize">
                {modalType === "view" ? "Destination Specifications" : modalType === "edit" ? "Modify Destination" : "Create New Destination"}
              </h3>
              <button onClick={() => setIsUpsertModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={18} /></button>
            </div>
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Destination Name</label>
                  <input type="text" disabled={modalType === "view"} value={selectedDestination.title} onChange={(e) => setSelectedDestination({ ...selectedDestination, title: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Country</label>
                  <input type="text" disabled={modalType === "view"} value={selectedDestination.country} onChange={(e) => setSelectedDestination({ ...selectedDestination, country: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Location / Region</label>
                  <input type="text" disabled={modalType === "view"} value={selectedDestination.location} onChange={(e) => setSelectedDestination({ ...selectedDestination, location: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Cover Image URL</label>
                  <input type="text" disabled={modalType === "view"} value={selectedDestination.image} onChange={(e) => setSelectedDestination({ ...selectedDestination, image: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Duration</label>
                  <input type="number" placeholder="e.g. 5 Days" disabled={modalType === "view"} value={selectedDestination.duration} onChange={(e) => setSelectedDestination({ ...selectedDestination, duration: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Estimated Budget ($)</label>
                  <input type="number" disabled={modalType === "view"} value={selectedDestination.budget} onChange={(e) => setSelectedDestination({ ...selectedDestination, budget: Number(e.target.value) })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Rating</label>
                  <input type="number" step="0.1" max="5" disabled={modalType === "view"} value={selectedDestination.rating} onChange={(e) => setSelectedDestination({ ...selectedDestination, rating: Number(e.target.value) })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Best Season</label>
                  <input type="text" disabled={modalType === "view"} value={selectedDestination.bestSeason} onChange={(e) => setSelectedDestination({ ...selectedDestination, bestSeason: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Travel Type</label>
                  <select disabled={modalType === "view"} value={selectedDestination.travelType} onChange={(e) => setSelectedDestination({ ...selectedDestination, travelType: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" >
                    {travelTypes.filter(t => t !== "All").map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
                  <textarea rows={3} disabled={modalType === "view"} value={selectedDestination.description} onChange={(e) => setSelectedDestination({ ...selectedDestination, description: e.target.value })} className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-75" />
                </div>
              </div>

              {/* AI Switch Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl">
                <div className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-white">AI Engine Recommendation</h5>
                    <p className="text-xs text-slate-400">Mark this destination to feature in custom AI itineraries.</p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={modalType === "view"}
                  onClick={() => setSelectedDestination({ ...selectedDestination, isAIRecommended: !selectedDestination.isAIRecommended })}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${selectedDestination.isAIRecommended ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'} disabled:opacity-60`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${selectedDestination.isAIRecommended ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-3xl">
              <button onClick={() => setIsUpsertModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
              {modalType !== "view" && (
                <button
                  onClick={handleSaveChanges}
                  className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION DIALOG ─── */}
      {isDeleteModalOpen && selectedDestination && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-xl p-6 animate-in fade-in zoom-in-95 duration-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Destination?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Are you sure you want to remove <b>{selectedDestination.title}</b>? This asset action cannot be reversed.</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}