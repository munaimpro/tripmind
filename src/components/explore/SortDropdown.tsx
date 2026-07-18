import { ArrowUpDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "most_popular", label: "Most Popular" },
  { value: "highest_rated", label: "Highest Rated" },
  { value: "lowest_budget", label: "Lowest Budget" },
  { value: "highest_budget", label: "Highest Budget" },
  { value: "shortest_duration", label: "Shortest Duration" },
  { value: "longest_duration", label: "Longest Duration" },
  { value: "newest", label: "Newest" },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
        Sort by:
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm transition-all font-medium"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
          <ArrowUpDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
