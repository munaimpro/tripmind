"use client";

import { MessageSquareText, Wand2, PlaneTakeoff } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageSquareText,
      title: "Set Your Preferences",
      description:
        "Fill out a simple form with your destination, travel dates, budget, and favorite activities.",
      color: "from-indigo-500 to-indigo-600",
      badgeBg: "bg-indigo-600",
    },
    {
      number: "02",
      icon: Wand2,
      title: "AI Magic Happens",
      description:
        "Our advanced AI algorithm crafts a custom itinerary, optimizing routes, stays, and activities instantly.",
      color: "from-sky-500 to-indigo-600",
      badgeBg: "bg-sky-500",
    },
    {
      number: "03",
      icon: PlaneTakeoff,
      title: "Customize & Explore",
      description:
        "Review your personalized plan, make tweaks if needed, and set off on your dream adventure with confidence.",
      color: "from-indigo-600 to-purple-600",
      badgeBg: "bg-purple-600",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Background Decor Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <span className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50 mb-4 inline-block">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Three simple steps to your perfect getaway. No more endless research or stressful planning.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop Horizontal Line (Aligned with Icon Centers at top-10) */}
          <div className="hidden lg:block absolute top-10 left-[18%] right-[18%] h-[2px] bg-gradient-to-r from-indigo-200 via-sky-300 to-purple-200 dark:from-indigo-900/40 dark:via-sky-800/40 dark:to-purple-900/40 z-0">
            <div className="w-full h-full border-t-2 border-dashed border-indigo-400/50 dark:border-indigo-500/40"></div>
          </div>

          {/* Mobile Vertical Line */}
          <div className="block lg:hidden absolute top-10 bottom-10 left-[2.25rem] w-[2px] border-l-2 border-dashed border-indigo-200 dark:border-indigo-900 z-0"></div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col items-start lg:items-center text-left lg:text-center p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Step Icon Box */}
                  <div className="relative mb-6 sm:mb-8 flex-shrink-0">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-9 h-9" />
                    </div>

                    {/* Step Number Badge */}
                    <div
                      className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${step.badgeBg} text-white font-bold text-xs flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-md`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}