"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  Headphones,
  Compass,
  Briefcase,
  ChevronDown,
  Check,
  MessageSquare,
  ArrowRight,
  Quote,
} from "lucide-react";

// --- DATA STRUCTURES ---

const contactOverview = [
  {
    title: "Email",
    value: "support@tripmind.ai",
    subtext: "Our team typically responds in 2 hours",
    icon: Mail,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Phone",
    value: "+880 1234-567890",
    subtext: "Toll-free customer support line",
    icon: Phone,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Office",
    value: "Dhaka, Bangladesh",
    subtext: "Gulshan-2, Executive Hub",
    icon: MapPin,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Working Hours",
    value: "Mon – Fri",
    subtext: "9:00 AM – 6:00 PM (GMT+6)",
    icon: Clock,
    color: "from-amber-500 to-orange-500",
  },
];

const whyContactUs = [
  { title: "AI Travel Planning Support", desc: "Get help generating or customizing your itinerary." },
  { title: "Destination Recommendations", desc: "Expert tips on hidden travel gems globally." },
  { title: "Partnership Opportunities", desc: "Collaborate with TripMind AI as a travel agency or creator." },
  { title: "Technical Assistance", desc: "Report bugs, account issues, or export glitches." },
  { title: "Business Inquiries", desc: "Enterprise API access and custom integrations." },
];

const supportCards = [
  {
    title: "General Support",
    desc: "Have questions about account management, trip saving, or platform features?",
    action: "Ask General Questions",
    icon: HelpCircle,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Technical Support",
    desc: "Experiencing slow response times, app bugs, or itinerary sync errors?",
    action: "Report Technical Issue",
    icon: Headphones,
    color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "Travel Assistance",
    desc: "Need real-time advice on entry requirements, budgets, or transit tips?",
    action: "Get Travel Guidance",
    icon: Compass,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Business Partnership",
    desc: "Interested in integrating our travel AI engine into your existing business?",
    action: "Partner With Us",
    icon: Briefcase,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

const faqs = [
  {
    q: "How do I generate an AI itinerary?",
    a: "Simply head over to our 'Plan with AI' tool, type in your desired destination, trip duration, budget preference, and interests. Our Gemini AI engine will generate a full day-by-day plan in under 10 seconds.",
  },
  {
    q: "Can I modify AI recommendations?",
    a: "Yes! Every activity, restaurant, and hotel suggested by TripMind AI is completely interactive. You can swap activities, drag-and-drop days, or tweak budget parameters anytime.",
  },
  {
    q: "How long does trip generation take?",
    a: "Itinerary generation typically takes between 3 to 8 seconds depending on the complexity of your custom constraints and real-time destination data lookup.",
  },
  {
    q: "Can I save multiple trips?",
    a: "Yes. All logged-in users can save an unlimited number of drafts and finalized trips to their personal dashboard for offline viewing or PDF exports.",
  },
  {
    q: "How can I report a problem?",
    a: "You can submit a ticket using the contact form on this page or email technical support directly at support@tripmind.ai. Our team investigates bug reports within 24 hours.",
  },
];

const Icons = {
  Github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z" />
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  ),
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" />
    </svg>
  ),
  TwitterX: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/tripmindai",
    tooltip: "GitHub",
    icon: Icons.Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/tripmindai",
    tooltip: "LinkedIn",
    icon: Icons.Linkedin,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/tripmindai",
    tooltip: "Facebook",
    icon: Icons.Facebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/tripmindai",
    tooltip: "Instagram",
    icon: Icons.Instagram,
  },
  {
    name: "X",
    href: "https://x.com/tripmindai",
    tooltip: "X",
    icon: Icons.TwitterX,
  },
];



export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    // Simulate frontend submit feedback
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", email: "", subject: "", phone: "", message: "" });
      setAgreedToTerms(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">

      {/* ─── PAGE BANNER WITH BREADCRUMB ─── */}
      <section className="relative h-[360px] sm:h-[380px] flex items-center justify-center overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
          alt="TripMind AI Contact Banner"
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
            <span className="text-indigo-300 font-semibold">Contact</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Contact <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">TripMind AI</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 dark:text-slate-300 font-normal leading-relaxed">
            Have questions, need travel assistance, or want to collaborate? We'd love to hear from you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/20 active:scale-95"
            >
              <Sparkles size={16} />
              Plan Your Trip
            </Link>
            <Link
              href="/destinations"
              className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all active:scale-95"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 py-16 sm:py-24">

        {/* ─── CONTACT OVERVIEW CARDS ─── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactOverview.map((card, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="space-y-3 relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={22} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.title}</span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">{card.value}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{card.subtext}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ─── CONTACT FORM + INFORMATION ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Side: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Get In Touch</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Send Us a Message</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Fill out the form below and our team will get back to you shortly.</p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-2 text-center py-10">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check size={24} />
                </div>
                <h4 className="text-lg font-bold">Message Sent Successfully!</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">Thank you for reaching out. A TripMind AI support specialist will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="e.g. Partnership Opportunity"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="privacy" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                    I agree to the <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 underline">privacy policy</Link> and terms of communication.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!agreedToTerms}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Image + Why Contact Us */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-[260px] sm:h-[300px] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="TripMind AI Support Team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 text-white">
                <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Human + AI Support</p>
                <p className="text-xs font-medium mt-0.5">Empowering travelers with smart responses and dedicated care.</p>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-500" />
                Why Contact Us?
              </h3>
              <div className="space-y-3">
                {whyContactUs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-indigo-500/10 text-indigo-500 shrink-0">
                      <Check size={12} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── QUICK SUPPORT SECTION ─── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Dedicated Channels</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Quick Support</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Choose a specialized track for faster resolution of your needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCards.map((card, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
                </div>

                <button className="pt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>{card.action}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FREQUENTLY ASKED QUESTIONS ─── */}
        <section className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Help Center</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Quick answers to common questions about contacting and using TripMind AI.</p>
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

        {/* ─── OFFICE LOCATION ─── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Global Hub</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Visit Our HQ</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Located in the heart of Dhaka's tech and financial district.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Large Map Placeholder */}
            <div className="lg:col-span-8 relative min-h-[320px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop"
                alt="Dhaka Office Location Map Visual"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.8]"
              />
              <div className="absolute inset-0 bg-slate-950/30 dark:bg-slate-950/50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-indigo-600 text-white shadow-2xl animate-bounce">
                <MapPin size={28} />
              </div>
              <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-800 dark:text-slate-200">
                🗺️ TripMind AI HQ — Gulshan-2, Dhaka
              </div>
            </div>

            {/* Information Card Beside Map */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-center space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Headquarters</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Office Address</span>
                    <p className="text-slate-500 dark:text-slate-400">Level 8, Innovation Tower, Gulshan-2, Dhaka-1212, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Email Address</span>
                    <p className="text-slate-500 dark:text-slate-400">contact@tripmind.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Phone Line</span>
                    <p className="text-slate-500 dark:text-slate-400">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Business Hours</span>
                    <p className="text-slate-500 dark:text-slate-400">Monday – Friday: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOCIAL MEDIA ─── */}
        <section className="text-center space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Connect</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Follow Us Online</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Join our social community for daily trip ideas and feature releases.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.tooltip}
                className="group relative p-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10" />
                <social.icon size={20} className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* ─── FINAL CALL TO ACTION ─── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 text-white p-8 sm:p-14 shadow-2xl text-center space-y-6">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Let's Build Your Next Adventure Together
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Whether you're planning your dream vacation or need travel guidance, TripMind AI is here to help.
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
            "Every great journey begins with a single step."
          </p>
        </footer>

      </div>
    </div>
  );
}