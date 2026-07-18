import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No trips found</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
        We couldn't find any destinations matching your current filters. Try adjusting your search criteria or explore other options.
      </p>
      <button 
        onClick={onReset}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        Clear All Filters
      </button>
    </div>
  );
}
