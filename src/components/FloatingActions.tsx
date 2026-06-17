import { Phone, Send, ChevronUp } from 'lucide-react';

export default function FloatingActions() {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      
      {/* Scroll to Top Trigger */}
      <button
        onClick={handleScrollToTop}
        className="p-3 bg-white hover:bg-slate-50 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all text-xs"
        title="Scroll back to Top"
        aria-label="Scroll to Top"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Floating Telegram Communication Trigger */}
      <a
        href="https://t.me/josh6414"
        target="_blank"
        rel="noreferrer"
        className="relative group p-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center shrink-0"
        title="Chat on Telegram"
        aria-label="Telegram Instant Chat"
      >
        {/* Pulsating back ring for visual rhythm */}
        <span className="absolute inset-0 rounded-full bg-sky-500/30 animate-ping" />
        <Send className="w-5 h-5 relative" />
        
        {/* Hover tag overlay */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-950 text-white font-sans font-bold text-[10px] uppercase rounded-lg border border-slate-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none tracking-widest hidden sm:inline">
          Inquire Telegram
        </span>
      </a>

      {/* Floating Immediate Dial Hotline Trigger */}
      <a
        href="tel:0964140000"
        className="relative group p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center shrink-0"
        title="Call Hotline"
        aria-label="Call Josh Hotline"
      >
        <span className="absolute inset-0 rounded-full bg-blue-600/30 animate-pulse" />
        <Phone className="w-5 h-5 relative" />
        
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-950 text-white font-sans font-bold text-[10px] uppercase rounded-lg border border-slate-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none tracking-widest hidden sm:inline">
          Call 0964140000
        </span>
      </a>

    </div>
  );
}
