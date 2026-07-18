import { MessageSquareText, Wand2, PlaneTakeoff } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-sky-400/10 dark:bg-sky-500/10 blur-[100px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Three simple steps to your perfect getaway. No more endless research or stressful planning.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200 dark:from-slate-800 dark:via-indigo-800 dark:to-slate-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center mb-8 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm border-4 border-white dark:border-slate-950">1</div>
                <MessageSquareText size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Describe Your Dream</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Tell us where you want to go, who you're traveling with, and what kind of experiences you love. Just use natural language.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center mt-0 lg:mt-12">
              <div className="w-20 h-20 rounded-3xl bg-indigo-600 border-2 border-indigo-500 shadow-xl shadow-indigo-500/20 flex items-center justify-center mb-8 relative transform transition-transform hover:scale-110 duration-300">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-sm border-4 border-white dark:border-slate-950">2</div>
                <Wand2 size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">AI Magic Happens</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our advanced AI instantly crafts a meticulously planned itinerary, optimizing routes, activities, and dining options.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center mb-8 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm border-4 border-white dark:border-slate-950">3</div>
                <PlaneTakeoff size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Pack & Go</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Review your personalized plan, make any tweaks, book your stays directly, and you're ready for the adventure of a lifetime.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
