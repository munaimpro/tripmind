import { Filter, X } from "lucide-react";

export type Filters = {
  country: string;
  budget: string;
  duration: string;
  travelType: string;
  season: string;
};

interface FilterPanelProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  countries: string[];
}

const BUDGET_OPTIONS = ['All', 'Under $1500', '$1500 - $3000', '$3000+'];
const DURATION_OPTIONS = ['All', '1-5 Days', '6-10 Days', '11+ Days'];
const TYPE_OPTIONS = ['All', 'Adventure', 'Beach', 'Family', 'Nature', 'Luxury', 'Cultural'];
const SEASON_OPTIONS = ['All', 'Spring', 'Summer', 'Autumn', 'Winter', 'Year-round'];

export default function FilterPanel({ filters, setFilters, clearFilters, countries }: FilterPanelProps) {
  const handleChange = (key: keyof Filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== 'All');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Country</label>
          <select
            value={filters.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
          >
            <option value="All">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Budget Range</label>
          <div className="flex flex-col gap-2">
            {BUDGET_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.budget === opt ? 'border-indigo-600 dark:border-indigo-400' : 'border-slate-300 dark:border-slate-700 group-hover:border-indigo-400 transition-colors'}`}>
                  {filters.budget === opt && <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />}
                </div>
                <span className={`text-sm ${filters.budget === opt ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`}>
                  {opt}
                </span>
                <input type="radio" className="hidden" checked={filters.budget === opt} onChange={() => handleChange('budget', opt)} />
              </label>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Trip Duration</label>
          <div className="flex flex-col gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded border ${filters.duration === opt ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500' : 'bg-transparent border-slate-300 dark:border-slate-700 group-hover:border-indigo-400 transition-colors'}`}>
                  {filters.duration === opt && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-sm ${filters.duration === opt ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`}>
                  {opt}
                </span>
                <input type="radio" className="hidden" checked={filters.duration === opt} onChange={() => handleChange('duration', opt)} />
              </label>
            ))}
          </div>
        </div>

        {/* Travel Type Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Travel Type</label>
          <div className="flex flex-wrap gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChange('travelType', opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filters.travelType === opt
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                    : 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Season Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Best Season</label>
          <select
            value={filters.season}
            onChange={(e) => handleChange('season', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
          >
            {SEASON_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
