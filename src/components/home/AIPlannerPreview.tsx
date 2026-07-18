import { Bot, User, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

export default function AIPlannerPreview() {
  return (
    <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Experience the power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">conversational planning</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Our AI doesn't just give you a generic list of places. It understands context, preferences, and logistics to build a detailed, feasible, and exciting itinerary.
            </p>
            
            <ul className="space-y-4 mb-10">
              {["Real-time weather & seasonal awareness", "Budget optimization & tracking", "Dietary restriction filtering", "Dynamic pacing based on travel style"].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat UI Mockup */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">TripMind Assistant</h4>
                  <p className="text-xs text-indigo-400 flex items-center gap-1">
                    <Sparkles size={12} /> AI Active
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              {/* User Message */}
              <div className="flex gap-4 justify-end">
                <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-sm max-w-[85%] text-sm leading-relaxed shadow-md">
                  I want to take my partner to Italy for our 5th anniversary. We love food, wine, and history, but hate overcrowded tourist traps. 10 days, mid-September. Budget is $5,000.
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
                  <User size={16} className="text-slate-300" />
                </div>
              </div>

              {/* AI Message */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-slate-700/50 text-slate-200 p-4 rounded-2xl rounded-tl-sm max-w-[90%] text-sm leading-relaxed border border-slate-600/50 shadow-md">
                  <p className="mb-4">Happy early anniversary! Italy in mid-September is gorgeous. I've designed a 10-day itinerary avoiding the biggest crowds, focusing on culinary and historical gems in Piedmont and Umbria.</p>
                  
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-600/50 mb-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
                      <MapPin size={14} /> Piedmont (Days 1-4)
                    </div>
                    <p className="text-xs text-slate-400">Truffle hunting, Barolo wine tasting, and exploring the castles of the Langhe region.</p>
                  </div>
                  
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-600/50">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
                      <MapPin size={14} /> Umbria (Days 5-10)
                    </div>
                    <p className="text-xs text-slate-400">The "Green Heart" of Italy. Staying in a restored farmhouse, private cooking classes, and exploring Orvieto's underground city.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type your response..." 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-full h-12 pl-4 pr-12 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                disabled
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white" disabled>
                <Sparkles size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
