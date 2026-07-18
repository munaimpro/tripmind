import type { ApiDestination } from "@/types/api";
import { Banknote, Languages, Bus, ShieldCheck, Wifi } from "lucide-react";

interface InfoCardsProps {
  destination: ApiDestination;
}

export default function InfoCards({ destination }: InfoCardsProps) {
  const infoItems = [
    { icon: <Banknote className="w-6 h-6 text-emerald-500" />, label: "Currency", value: destination.currency },
    { icon: <Languages className="w-6 h-6 text-purple-500" />, label: "Language", value: destination.language },
    { icon: <Bus className="w-6 h-6 text-orange-500" />, label: "Transportation", value: destination.transportation },
    { icon: <ShieldCheck className="w-6 h-6 text-green-500" />, label: "Safety", value: destination.safety },
    { icon: <Wifi className="w-6 h-6 text-blue-500" />, label: "Internet", value: destination.internet },
  ].filter((item): item is { icon: React.ReactElement; label: string; value: string } =>
    typeof item.value === 'string' && item.value.length > 0
  );

  if (infoItems.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Key Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{item.label}</p>
            <p className="text-slate-900 dark:text-white font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
