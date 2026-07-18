import ActivityCard from "./ActivityCard";

interface ActivitiesSectionProps {
  activities: string[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Recommended Activities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}
