"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  MapPin,
  ChevronRight,
  Target,
  Eye,
  BrainCircuit,
  UserCheck,
  ShieldCheck,
  Globe2,
  Leaf,
  Mountain,
  Calculator,
  Search,
  CheckCircle2,
  Sliders,
  Zap,
  ArrowRight,
  Star,
  ChevronDown,
  Layers,
  Code2,
  Palette,
  Server,
  Database,
  Lock,
  Bot,
  RefreshCw,
  Award,
  Users,
  Smile,
  Quote,
  Plane,
  HeartHandshake,
} from "lucide-react";

// --- DATA STRUCTURES ---

const stats = [
  { label: "Countries Covered", value: "50+", icon: Globe2, color: "from-blue-500 to-cyan-500" },
  { label: "AI Recommendations", value: "100K+", icon: BrainCircuit, color: "from-violet-500 to-purple-500" },
  { label: "Travel Experiences", value: "25K+", icon: Mountain, color: "from-emerald-500 to-teal-500" },
  { label: "User Satisfaction", value: "98%", icon: Smile, color: "from-amber-500 to-orange-500" },
];

const coreValues = [
  {
    title: "Innovation",
    desc: "Leveraging cutting-edge AI models to rethink how human travel itineraries are conceived.",
    icon: BrainCircuit,
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "Personalization",
    desc: "Every recommendation adapts dynamically to your pace, preferences, and dietary needs.",
    icon: UserCheck,
    color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "Trust",
    desc: "Verified local spots, transparent budget estimations, and zero hidden sponsor placements.",
    icon: ShieldCheck,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Accessibility",
    desc: "Intuitive planning for everyone—from luxury jetsetters to budget solo backpackers.",
    icon: Globe2,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Sustainability",
    desc: "Promoting eco-conscious destinations and off-peak travel to reduce overtourism.",
    icon: Leaf,
    color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
  {
    title: "Adventure",
    desc: "Unlocking hidden gems and authentic local cultures beyond standard tourist traps.",
    icon: Mountain,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

const timelineFeatures = [
  {
    title: "AI Smart Planner",
    description: "Generates day-by-day itineraries tailored to your specific travel persona in seconds.",
    icon: Sparkles,
  },
  {
    title: "Budget Optimization",
    description: "Algorithmic cost breakdown ensuring maximum experience per dollar spent.",
    icon: Calculator,
  },
  {
    title: "Destination Discovery",
    description: "Matches your mood and style with curated worldwide travel hotspots.",
    icon: Search,
  },
  {
    title: "Travel Recommendations",
    description: "Contextual advice covering best local dining, weather windows, and transit.",
    icon: CheckCircle2,
  },
  {
    title: "Personalized Itineraries",
    description: "Fully interactive drag-and-drop schedules with live route optimization.",
    icon: Sliders,
  },
  {
    title: "Fast & Easy Experience",
    description: "Zero complex forms—just natural conversation with intelligent outputs.",
    icon: Zap,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Choose Destination",
    desc: "Select where you want to go or let our AI suggest a spot based on your current vibe.",
  },
  {
    step: "02",
    title: "Set Budget & Duration",
    desc: "Define your stay duration, spending limits, and preferred travel pace.",
  },
  {
    step: "03",
    title: "AI Generates Itinerary",
    desc: "Our engine crafts a complete, optimized itinerary packed with activities and options.",
  },
  {
    step: "04",
    title: "Enjoy Your Trip",
    desc: "Export your plan, follow live updates, and experience a stress-free journey.",
  },
];

const techStack = [
  { name: "Next.js", category: "Framework", icon: Layers },
  { name: "TypeScript", category: "Language", icon: Code2 },
  { name: "Tailwind CSS", category: "Styling", icon: Palette },
  { name: "Node.js", category: "Runtime", icon: Server },
  { name: "Express.js", category: "API Server", icon: Server },
  { name: "MongoDB", category: "Database", icon: Database },
  { name: "Better Auth", category: "Security", icon: Lock },
  { name: "Gemini AI", category: "AI Engine", icon: Bot },
  { name: "TanStack Query", category: "State Sync", icon: RefreshCw },
];

const achievements = [
  { value: "100+", label: "Destinations Covered", icon: MapPin },
  { value: "10K+", label: "Travel Plans Generated", icon: Sparkles },
  { value: "95%", label: "AI Recommendation Accuracy", icon: Target },
  { value: "50+", label: "Countries Supported", icon: Globe2 },
];

const testimonials = [
  {
    name: "Sophia Martinez",
    role: "Solo Traveler",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "TripMind AI built a 7-day Kyoto trip in 10 seconds that felt like it was crafted by a local guide who knew my exact budget. Incredible experience!",
  },
  {
    name: "Liam Chen",
    role: "Product Designer",
    location: "Vancouver, Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "The budget optimization feature saved us around $400 on our Swiss Alps tour without sacrificing quality. The UI is sleek and super responsive.",
  },
  {
    name: "Emma Watson",
    role: "Digital Nomad",
    location: "Bali, Indonesia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "As someone who travels constantly, this tool eliminated my planning fatigue. The Gemini AI integration produces spot-on food recommendations.",
  },
];

const faqs = [
  {
    q: "What is TripMind AI?",
    a: "TripMind AI is an intelligent travel planning assistant that uses advanced machine learning models to generate bespoke, budget-aware travel itineraries in seconds.",
  },
  {
    q: "Is the AI itinerary customizable?",
    a: "Absolutely! Every generated itinerary is fully interactive. You can tweak activities, swap out hotels, adjust daily times, or regenerate specific days with one click.",
  },
  {
    q: "Can I save my trips?",
    a: "Yes. Once you generate or edit a trip plan, you can save it to your account dashboard, export it to PDF, or share it via a live link with travel buddies.",
  },
  {
    q: "How does budget optimization work?",
    a: "Our system analyzes live pricing patterns across flights, stays, and activities to distribute your budget efficiently, avoiding overspending while maximizing high-value experiences.",
  },
  {
    q: "Is it free to use?",
    a: "TripMind AI offers a generous free plan that includes full access to core itinerary creation and destination discovery features.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">

      {/* ─── PAGE BANNER WITH BREADCRUMB ─── */}
      <section className="relative h-[360px] sm:h-[380px] flex items-center justify-center overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop"
          alt="TripMind AI Travel Banner"
          fill
          priority
          className="object-cover object-center filter brightness-[0.45] dark:brightness-[0.35] transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-950/40 to-slate-950/80 dark:from-slate-950 dark:via-slate-950/60 dark:to-slate-950/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 text-xs font-medium text-slate-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-indigo-300 font-semibold">About</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            About <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">TripMind AI</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 dark:text-slate-300 font-normal leading-relaxed">
            Discover how TripMind AI is transforming travel planning with Artificial Intelligence, personalized recommendations, and smart budget optimization.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/destinations"
              className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Explore Destinations
            </Link>
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/20 active:scale-95"
            >
              <Sparkles size={16} />
              Plan with AI
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 py-16 sm:py-24">

        {/* ─── OUR STORY ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1200&auto=format&fit=crop"
                alt="Traveler exploring scenic nature"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 text-white">
                <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Our Origin</p>
                <p className="text-sm font-medium mt-0.5">Crafted for modern explorers demanding effortless, tailored trips.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Compass size={14} /> Our Story
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Reimagining How the World Explores
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              TripMind AI was created to remove the complexity of travel planning. Instead of spending hours comparing destinations, budgets, hotels, and activities, users simply describe their preferences and our AI generates personalized travel plans instantly.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              We combine real-time algorithmic search, natural language understanding, and dynamic routing to make intelligent exploration accessible to everyone.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-sm`}>
                      <stat.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MISSION & VISION ─── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Driven by Purpose</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Our guiding principles shaping the future of autonomous travel discovery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/5 via-white to-indigo-500/5 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-900/20 border border-indigo-200/50 dark:border-indigo-800/40 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Help everyone travel smarter using AI. We break down financial, logistical, and technical barriers so that tailored travel experiences are accessible to anyone, anywhere.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-sky-900/5 via-white to-sky-500/5 dark:from-sky-950/40 dark:via-slate-900 dark:to-sky-900/20 border border-sky-200/50 dark:border-sky-800/40 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-sky-500/10 blur-2xl group-hover:bg-sky-500/20 transition-all" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
                  <Eye size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Become the world's most intelligent AI travel companion—a seamlessly integrated co-pilot that anticipates needs, solves disruptions live, and curates lifetime memories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CORE VALUES ─── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Foundation</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Core Values</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">The core standards that power our product architecture and user experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${value.color} group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{value.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── WHY CHOOSE TRIPMIND AI ─── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">The Advantage</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Why Choose TripMind AI</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">How we outperform manual travel planning at every turn.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Central Vertical Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-sky-500 to-emerald-500/20" />

            <div className="space-y-8 sm:space-y-12">
              {timelineFeatures.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                    {/* Content Box */}
                    <div className="w-full md:w-1/2 md:px-8">
                      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-2">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="my-4 md:my-0 flex items-center justify-center z-10">
                      <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md">
                        <span className="text-xs font-black">{idx + 1}</span>
                      </div>
                    </div>

                    {/* Empty Opposite Side */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Seamless Flow</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Four quick steps from prompt to perfect itinerary.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-indigo-500/30 dark:text-indigo-400/20 group-hover:text-indigo-500 transition-colors">
                    {step.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Plane size={16} />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── MEET THE TECHNOLOGY ─── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Tech Stack</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Powered by Enterprise Architecture</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Built using state-of-the-art web frameworks and artificial intelligence tools.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <tech.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{tech.name}</h4>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{tech.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── OUR ACHIEVEMENTS ─── */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Track Record</h2>
            <p className="text-xs sm:text-sm text-slate-300">Milestones achieved by our platform worldwide.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {achievements.map((item, idx) => (
              <div key={idx} className="space-y-1 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="inline-flex p-2 rounded-xl bg-indigo-500/20 text-indigo-300 mb-1">
                  <item.icon size={20} />
                </div>
                <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">{item.value}</div>
                <p className="text-xs text-slate-300 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Reviews</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Loved by Global Travelers</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Read what our community has to say about their AI-planned adventures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">{item.role} • {item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FREQUENTLY ASKED QUESTIONS ─── */}
        <section className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Everything you need to know about TripMind AI.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-500" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── CALL TO ACTION ─── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 text-white p-8 sm:p-14 shadow-2xl text-center space-y-6">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Start Planning Your Dream Journey Today
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Experience the power of intelligent itinerary generation. Free to get started, no credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/planner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-indigo-600 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95"
              >
                <Sparkles size={16} />
                Generate AI Trip
              </Link>
              <Link
                href="/destinations"
                className="px-6 py-3 rounded-2xl bg-indigo-800/40 hover:bg-indigo-800/60 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-all active:scale-95"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FOOTER QUOTE CTA ─── */}
        <footer className="text-center pt-4 pb-8 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60">
          <Quote size={20} className="mx-auto text-indigo-400 opacity-60" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic">
            "The world is too beautiful to stay in one place."
          </p>
        </footer>

      </div>
    </div>
  );
}