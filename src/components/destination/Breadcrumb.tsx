import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  destinationName: string;
}

export default function Breadcrumb({ destinationName }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 py-6">
      <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/explore" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        Explore Trips
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
        {destinationName}
      </span>
    </nav>
  );
}
