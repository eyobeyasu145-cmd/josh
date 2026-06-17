import { useState } from 'react';
import { 
  HelpCircle, Star, Calendar, MessageSquare, Wrench, 
  MapPin, Clock, Phone, Send, Facebook, ChevronDown, ChevronUp 
} from 'lucide-react';
import { FAQS, TESTIMONIALS } from '../data';

export default function FooterView() {
  const [openFAQId, setOpenFAQId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16">
      
      {/* 1. FAQs Accordion Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 rounded-full text-xs font-bold text-blue-400 border border-blue-500/20 mb-3 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Clear responses regarding pricing, repairs duration, and media downloads.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-slate-800 bg-slate-950/50 rounded-2xl border border-slate-800 p-2 sm:p-4">
          {FAQS.map((faq) => {
            const isOpen = openFAQId === faq.id;
            return (
              <div key={faq.id} className="py-3.5 last:pb-0 first:pt-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left py-2 px-3 hover:bg-slate-900/50 rounded-xl transition-all group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-extrabold text-[#F8FAFC] text-sm group-hover:text-blue-400 transition-colors">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-400 shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-3" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-2.5 px-6 pb-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-l-2 border-blue-600/60 ml-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Customer Testimonials Section */}
      <div className="bg-slate-950/40 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 bg-amber-500/10 rounded-full px-3 py-1 text-xs font-bold text-amber-500 border border-amber-500/20 mb-3 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>TESTIMONIALS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              What Our Customers Say
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Verified reviews from our local clients about phone repairs and custom flyer layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((review) => (
              <div 
                key={review.id} 
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Stars block */}
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm italic font-sans leading-relaxed mb-6">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-heading font-extrabold mb-0.5">{review.username}</span>
                    <span className="text-blue-500 text-[10px] flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      {review.serviceUsed}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded">
                    <Calendar className="w-3 h-3" />
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 3. Business Location Map, Hours, Socials Footer */}
      <div className="bg-slate-950/80 pt-16 pb-12" id="contact-address-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Logo & Info column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <span className="font-heading font-extrabold text-xl">J</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-heading font-extrabold text-lg text-white leading-tight">
                    Josh Electronics
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">Your trusted digital showroom partner</p>
                </div>
              </div>

              <p className="text-slate-430 text-xs leading-relaxed mb-6 font-sans">
                A premium digital hub providing reliable smartphones, button companion devices, certified repair procedures, document editing, and swift bank account copying services.
              </p>
            </div>

            {/* Quick Contacts */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Hot-line</span>
                  <a href="tel:0964140000" className="font-mono text-white hover:text-blue-400 font-bold">0964 14 00 00</a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Find Us</span>
                  <span className="text-white font-semibold">Mercato Electronic Strip, Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>

          </div>

          {/* Business Hours (Span 3) */}
          <div className="lg:col-span-3">
            <h5 className="font-heading font-extrabold text-[#F8FAFC] text-sm uppercase tracking-wider mb-6">
              Showroom Open Hours
            </h5>
            
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850/60 divide-y divide-slate-850/50">
              <div className="flex items-center justify-between pb-2.5 text-xs">
                <span className="text-slate-500 font-bold">Monday - Friday</span>
                <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> 8:30 AM - 7:30 PM
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 text-xs">
                <span className="text-slate-500 font-bold">Saturday</span>
                <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> 9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between pt-2.5 text-xs">
                <span className="text-slate-500 font-bold">Sunday</span>
                <span className="text-yellow-500 font-bold uppercase tracking-wider bg-yellow-500/15 border border-yellow-500/20 px-2 py-0.5 rounded text-[9px]">
                  Close
                </span>
              </div>
            </div>

            {/* Social channels */}
            <div className="mt-8">
              <h6 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-3">
                Connect Digitally
              </h6>
              <div className="flex gap-2">
                <a 
                  href="https://t.me/josh6414" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-600 hover:border-sky-500 transition-all shadow-md"
                  aria-label="Telegram josh6414"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-md"
                  aria-label="Facebook JOSH SHOP"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* 4. High Fidelity Locator map mockup (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <h5 className="font-heading font-extrabold text-[#F8FAFC] text-sm uppercase tracking-wider mb-6">
              Josh Map Coordinates
            </h5>
            
            {/* The beautiful architectural stylized map mockup layout */}
            <div className="relative h-48 w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-end p-4 group">
              {/* Overlay lines representation */}
              <div className="absolute inset-0 opacity-15 select-none pointer-events-none">
                {/* Lat/Long intersections */}
                <div className="absolute top-0 bottom-0 left-1/4 border-r border-slate-400 border-dashed" />
                <div className="absolute top-0 bottom-0 left-2/3 border-r border-slate-400 border-dashed" />
                <div className="absolute left-0 right-0 top-1/3 border-b border-slate-400 border-dashed" />
                <div className="absolute left-0 right-0 top-3/4 border-b border-slate-400 border-dashed" />
                
                {/* Diagonal roads layout shapes */}
                <div className="absolute top-1/4 left-0 right-0 h-8 bg-slate-500 transform -rotate-12" />
                <div className="absolute bottom-1/5 left-0 right-0 h-12 bg-slate-500 transform rotate-45" />
                <div className="absolute left-1/3 top-0 bottom-0 w-10 bg-slate-600" />
              </div>

              {/* Glowing anchor showing physical store location */}
              <div className="absolute left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border border-white"></span>
                </div>
                
                <div className="mt-1 bg-slate-950 text-white font-sans font-bold text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded border border-blue-500/40 shadow-xl flex items-center gap-1 shrink-0">
                  <MapPin className="w-2.5 h-2.5 text-blue-500 inline" />
                  Josh Store
                </div>
              </div>

              {/* Bottom tag inside container */}
              <div className="bg-slate-950/90 border border-slate-850/80 p-3 rounded-xl backdrop-blur-md z-10">
                <div className="flex justify-between items-center gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">Main Road Block</p>
                    <p className="text-white font-extrabold font-sans text-xs truncate">Mercato Electronic Strip, Central Block</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("Josh Electronics Store, Mercato Electronic Strip, Addis Ababa, Ethiopia");
                      alert("Directions Copied! Ready to paste into navigation app.");
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded-lg shrink-0 transition-colors"
                  >
                    Copy Address
                  </button>
                </div>
              </div>

            </div>

            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">
              Note: Contact us anytime to get live phone-call guidance!
            </p>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Josh Electronics. All rights registered.</p>
          
          <div className="flex gap-4">
            <span className="hover:text-slate-350 cursor-pointer">Security Policies</span>
            <span>•</span>
            <span className="hover:text-slate-350 cursor-pointer">Ethiopian Retail Standards</span>
            <span>•</span>
            <span className="hover:text-slate-350 cursor-pointer">Digital Showroom v1.5</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
