import AttractionCard from "./AttractionCard";

interface AttractionsSectionProps {
  attractions: { name: string; description: string; image: string }[];
}

export default function AttractionsSection({ attractions }: AttractionsSectionProps) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Top Attractions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction, index) => (
          <AttractionCard key={index} attraction={attraction} />
        ))}
      </div>
    </div>
  );
}
