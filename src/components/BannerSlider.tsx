import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Smartphone, ShieldCheck, Printer, CreditCard } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  tagline: string;
  badge: string;
  icon: React.ReactNode;
  image: string;
  buttonText: string;
  targetCategory: string;
}

export default function BannerSlider({
  onNavigate,
}: {
  onNavigate: (view: 'home' | 'category' | 'detail' | 'bookmarks' | 'search', catSlug?: string) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'Ultimate Premium Smartphones Store',
      tagline: 'Discover the latest Android series from Tecno Spark 30 Pro, Samsung Galaxy A16, and Infinix Note. Original products with official warranty.',
      badge: 'LATEST ARRIVALS',
      icon: <Smartphone className="w-4 h-4 text-amber-400" />,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      buttonText: 'Browse Smartphones',
      targetCategory: 'smartphones',
    },
    {
      id: 2,
      title: 'Professional Phone Care & Repairs',
      tagline: 'Is your screen cracked or battery weak? Fast, high-grade mic, speaker, and IC repair packages starting from 100 ETB with original fits.',
      badge: 'EXPERT REPAIR CENTER',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=1200&auto=format&fit=crop',
      buttonText: 'View Repair Services',
      targetCategory: 'repair-services',
    },
    {
      id: 3,
      title: 'Creative Design & Fast Printing',
      tagline: 'Fast black & white printing, vibrant color catalogs, flyer designs, invitation cards, business cards, and custom document editing.',
      badge: 'HIGH QUALITY PRINTING',
      icon: <Printer className="w-4 h-4 text-blue-400" />,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1200&auto=format&fit=crop',
      buttonText: 'View Design Services',
      targetCategory: 'printing-services',
    },
    {
      id: 4,
      title: 'Seamless Digital Bank Transfers',
      tagline: 'Convenient payment transfers with Abyssinia, Awash, CBE, Dashen, and Telebirr. Copy accounts helper for worry-free direct settlements.',
      badge: 'VERIFIED ACCOUNTS',
      icon: <CreditCard className="w-4 h-4 text-indigo-400" />,
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
      buttonText: 'View Pay Details',
      targetCategory: 'payment-accounts',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[480px] md:h-[500px] w-full overflow-hidden rounded-3xl bg-slate-950 shadow-xl group">
      
      {/* Slides wrapper */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
          }`}
        >
          {/* Dark overlay with background image */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center absolute inset-0 filter brightness-95"
          />

          {/* Slide copy layout */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-2xl text-left">
            
            {/* Slide Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold text-blue-400 border border-white/10 w-fit mb-4 tracking-wider uppercase">
              {slide.icon}
              {slide.badge}
            </div>

            {/* Slide Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 font-heading drop-shadow-sm">
              {slide.title}
            </h2>

            {/* Slide Tagline */}
            <p className="text-slate-200 text-sm sm:text-base mb-8 leading-relaxed font-normal opacity-90 drop-shadow-sm">
              {slide.tagline}
            </p>

            {/* CTA button */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('category', slide.targetCategory)}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 font-sans text-xs tracking-wider uppercase transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {slide.buttonText}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('contact-address-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold rounded-xl text-xs tracking-wider uppercase transition-all backdrop-blur-md"
              >
                Contact Now
              </button>
            </div>

          </div>
        </div>
      ))}

      {/* Slide Navigation Triggers (Left / Right) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 dark:bg-slate-950/60 text-white border border-white/15 hover:bg-slate-900 dark:hover:bg-slate-950 hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 dark:bg-slate-950/60 text-white border border-white/15 hover:bg-slate-900 dark:hover:bg-slate-950 hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
