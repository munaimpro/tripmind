import { Compass } from "lucide-react";

interface ActivityCardProps {
  activity: string;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
        <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
      </div>
      <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {activity}
      </h4>
    </div>
  );
}
