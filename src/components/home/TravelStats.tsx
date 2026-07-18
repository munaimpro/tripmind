export default function TravelStats() {
  const stats = [
    { value: "50K+", label: "Trips Planned" },
    { value: "120+", label: "Countries Covered" },
    { value: "98%", label: "User Satisfaction" },
    { value: "2M+", label: "Hours Saved" },
  ];

  return (
    <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-slate-800">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4">
              <span className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                {stat.value}
              </span>
              <span className="text-sm lg:text-base font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
