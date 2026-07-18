"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the AI create my itinerary?",
    answer: "Our AI uses natural language processing to understand your preferences, budget, and travel style. It then queries a vast database of global travel data, filtering and routing destinations to create a seamless, realistic day-by-day plan."
  },
  {
    question: "Can I edit the AI-generated itinerary?",
    answer: "Absolutely! The AI provides a strong foundation, but you have full control. You can drag and drop activities, swap restaurants, or regenerate specific days if you want different options."
  },
  {
    question: "Is TripMind AI free to use?",
    answer: "We offer a generous free tier that allows you to generate up to 3 complete itineraries per month. For frequent travelers or those needing advanced features like real-time flight tracking, we offer premium subscriptions."
  },
  {
    question: "How accurate are the budget estimations?",
    answer: "Our budget estimations are highly accurate, drawing from real-time pricing data for flights, hotels, and average local costs. However, prices can fluctuate, so we recommend booking early to lock in the best rates."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Questions</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Got questions? We've got answers. If you need more help, feel free to contact our support team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === idx ? 'border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-slate-900 dark:text-white pr-8">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
