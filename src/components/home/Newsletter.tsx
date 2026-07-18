import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Get Travel Inspiration Weekly
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Subscribe to our newsletter for curated destinations, AI travel hacks, and exclusive deals straight to your inbox.
        </p>
        
        <form className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
          <div className="relative flex-1 w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
            Subscribe
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4">
          We care about your data. Read our <a href="#" className="underline hover:text-slate-700 dark:hover:text-slate-300">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}
