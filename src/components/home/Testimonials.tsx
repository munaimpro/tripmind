import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Solo Traveler",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    content: "I've always found travel planning overwhelming. TripMind AI took my vague ideas about a 'relaxing beach vacation with good seafood' and built a flawless 10-day itinerary in Portugal. It even recommended hidden gems I'd never heard of.",
    rating: 5,
  },
  {
    name: "David & Emily Chen",
    role: "Honeymooners",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=256&auto=format&fit=crop",
    content: "Planning a honeymoon while planning a wedding is incredibly stressful. We gave the AI our budget and timeline, and it generated a magical trip to Bali that perfectly balanced adventure and relaxation. Worth every penny.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Digital Nomad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
    content: "As someone who travels constantly for work, I use TripMind to instantly generate weekend itineraries in whatever new city I'm in. The restaurant recommendations are always spot-on, and the routing saves me so much time.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">thousands of travelers</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Don't just take our word for it. Here's what our community has to say about their AI-planned adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <Quote className="absolute top-8 right-8 text-indigo-100 dark:text-slate-800 w-12 h-12" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200 dark:fill-slate-800 dark:text-slate-800"}`} 
                  />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-8 relative z-10 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white dark:border-slate-800 shadow-sm">
                  <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
