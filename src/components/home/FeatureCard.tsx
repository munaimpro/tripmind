import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
}

export default function FeatureCard({ title, description, icon: Icon, colorClass, bgClass }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${bgClass} ${colorClass}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
