import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Printer, Smartphone, Wrench, Headphones, Zap, Film, AppWindow,
  Search, ShieldCheck, Heart, BookmarkCheck, ArrowRight, Star, SlidersHorizontal,
  BookmarkX, Timer, Info, Eye, Phone, MapPin, Hash, Sparkles, Copy, Check
} from 'lucide-react';

import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import CategoryQuickNav from './components/CategoryQuickNav';
import AccountCard from './components/AccountCard';
import ProductServiceCard from './components/ProductServiceCard';
import DetailView from './components/DetailView';
import FooterView from './components/FooterView';
import FloatingActions from './components/FloatingActions';

import { CATEGORIES, BANK_ACCOUNTS, CATALOG_ITEMS } from './data';
import { CatalogItem, ProductItem, ActiveViewState } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('wow_josh_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeState, setActiveState] = useState<ActiveViewState>({
    view: 'home',
    categorySlug: undefined,
    itemId: undefined
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Bookmarks (Favorites) local-storage synchronization
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('wow_josh_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Recently Viewed tracker (Last 4 items preview)
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('wow_josh_recently');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter criteria states (For products & services catalog pages)
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sync theme to root class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('wow_josh_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('wow_josh_theme', 'light');
    }
  }, [darkMode]);

  // Sync bookmarks changes
  useEffect(() => {
    localStorage.setItem('wow_josh_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Sync and update recently viewed stacking
  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const updated = [id, ...filtered].slice(0, 4);
      localStorage.setItem('wow_josh_recently', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => 
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // Custom multi-view navigation routing modifier
  const navigateTo = (
    view: 'home' | 'category' | 'detail' | 'bookmarks' | 'search', 
    categorySlug?: string, 
    itemId?: string
  ) => {
    setActiveState({ view, categorySlug, itemId });
    if (itemId) {
      addToRecentlyViewed(itemId);
    }
    // Smooth reset scroll position
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe category icon extraction
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-blue-500" />;
      case 'Printer': return <Printer className="w-5 h-5 text-emerald-500" />;
      case 'Dialpad': return <Hash className="w-5 h-5 text-amber-500" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-indigo-500" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-rose-500" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-orange-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'Film': return <Film className="w-5 h-5 text-pink-500" />;
      case 'AppWindow': return <AppWindow className="w-5 h-5 text-teal-500" />;
      default: return <Smartphone className="w-5 h-5 text-blue-500" />;
    }
  };

  // Derive counts for featured homepage tiles
  const getCategoryCountLabel = (slug: string) => {
    if (slug === 'payment-accounts') {
      return `${BANK_ACCOUNTS.length} Bank Accounts`;
    }
    const count = CATALOG_ITEMS.filter((c) => c.category === slug).length;
    return `${count} Showroom Elements`;
  };

  // 1. FILTERING LOGIC for Products Catalog View
  const getFilteredItems = () => {
    let items = CATALOG_ITEMS;

    // Filter by active category slug if in category view
    if (activeState.view === 'category' && activeState.categorySlug) {
      items = items.filter((c) => c.category === activeState.categorySlug);
    }

    // Filter by Brand (Only applicable to brands we declare)
    if (selectedBrand !== 'all') {
      items = items.filter((c) => {
        if ('brand' in c) {
          return c.brand.toLowerCase() === selectedBrand.toLowerCase();
        }
        return false;
      });
    }

    // Filter by Price range limits
    if (selectedPriceRange !== 'all') {
      items = items.filter((c) => {
        if (!c.price) return false;
        if (selectedPriceRange === 'low') return c.price < 2000;
        if (selectedPriceRange === 'mid') return c.price >= 2000 && c.price <= 8000;
        if (selectedPriceRange === 'high') return c.price > 8000;
        return true;
      });
    }

    return items;
  };

  // 2. SEARCH INTERFACE RETRIEVAL
  const getSearchItems = () => {
    if (!searchQuery.trim()) return [];
    return CATALOG_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  };

  // 3. BOOKMARKS LISTING
  const getBookmarkedItems = () => {
    return CATALOG_ITEMS.filter((item) => bookmarks.includes(item.id));
  };

  // Available brands derived dynamically for filter panels
  const uniqueBrands = ['Tecno', 'Samsung', 'Infinix', 'Itel', 'Bontel', 'JS', 'X-Oda', 'Samhe', 'Guava'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300">
      
      {/* Dynamic Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeState.view}
        setActiveView={navigateTo}
        bookmarksCount={bookmarks.length}
      />

      {/* Sticky Pill-based Category ribbon */}
      <CategoryQuickNav
        activeCategorySlug={activeState.categorySlug}
        onSelectCategory={(slug) => {
          if (slug) {
            navigateTo('category', slug);
          } else {
            navigateTo('category', undefined);
          }
        }}
        activeView={activeState.view}
      />

      {/* Main Container Stage */}
      <main className="flex-grow pb-16">

        {/* ----------------- VIEW 1: HOME SCREEN ----------------- */}
        {activeState.view === 'home' && (
          <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            
            {/* Animated Hero Carousel Slider */}
            <BannerSlider onNavigate={(view, catSlug) => navigateTo(view, catSlug)} />

            {/* Master Bento Grid Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="wow-josh-bento-grid">
              
              {/* Card 1: Fast Repairs Hub (cols: 12, md: 4) */}
              <div 
                id="bento-card-repairs"
                onClick={() => navigateTo('category', 'repair-services')}
                className="col-span-12 md:col-span-4 bento-card cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/40 p-2 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full border border-emerald-200/40 dark:border-emerald-800/45 animate-pulse">
                      Express Service
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white leading-tight mb-2">
                    Fast Phone Repairs
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    Premium hardware fixes and software troubleshooting while you wait. Certified shop procedures.
                  </p>
                </div>
                
                <div className="mt-5 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Charging Port Fit</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded">150 ETB</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Screen Glass Upgrade</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded">3000 ETB</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Software Reset & Tune</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded">300 ETB</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Payment Gateways (cols: 12, md: 4) */}
              <div 
                id="bento-card-payments"
                className="col-span-12 md:col-span-4 bento-card border-dashed border-2 border-blue-200/60 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl text-amber-500 dark:text-amber-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-slate-700 dark:text-slate-350 font-heading">
                      Payment Accounts
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mb-4 leading-relaxed">
                    Click accounts below to copy bank details instantly. Send screenshots to Telegram support!
                  </p>
                </div>

                <div className="space-y-2.5 max-h-48 overflow-y-auto no-scrollbar pr-0.5">
                  {[
                    { bank: 'Abyssinia Bank', acc: '206540648', holder: 'Yishak Eyasu Tesema' },
                    { bank: 'Commercial Bank', acc: '1000536182601', holder: 'Yishak Eyasu Tesema' },
                    { bank: 'Telebirr Wallet', acc: '0964140000', holder: 'Instant transfer' }
                  ].map((account) => {
                    const isCopied = copiedText === account.acc;
                    return (
                      <div 
                        key={account.acc} 
                        onClick={() => handleCopyText(account.acc)}
                        className="bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:border-blue-300 dark:hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="min-w-0">
                          <p className="text-[9px] uppercase font-bold text-slate-400">{account.bank}</p>
                          <p className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 truncate">{account.acc}</p>
                          <p className="text-[9px] text-blue-500 dark:text-blue-400 font-medium truncate">{account.holder}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyText(account.acc);
                          }}
                          className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shrink-0 ml-2"
                          title="Copy account number"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 3: Digital Printing and custom Writing (cols: 12, md: 4) */}
              <div 
                id="bento-card-services"
                onClick={() => navigateTo('category', 'printing-services')}
                className="col-span-12 md:col-span-4 bento-card cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="bg-indigo-50 dark:bg-indigo-950/40 w-10 h-10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-1.5 uppercase tracking-wide">
                    Digital Print & Design Hub
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    Professional, speed-calibrated printing and custom typography writing services.
                  </p>
                </div>
                
                <ul className="text-xs space-y-2 font-sans text-slate-600 dark:text-slate-400 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span>Crisp Laser B/W & Color Print</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span>Birthday & Invitation Cards</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span>Document Laminating & CV design</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: Accessories & Electrical raw materials (cols: 12, md: 7) */}
              <div 
                id="bento-card-accessories"
                onClick={() => navigateTo('category', 'electronics-accessories')}
                className="col-span-12 md:col-span-7 bento-card cursor-pointer flex flex-col sm:flex-row gap-5 items-center group"
              >
                <div className="w-full sm:w-28 h-28 bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden shrink-0 border border-slate-200/40 dark:border-slate-800">
                  <img 
                    src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300&auto=format&fit=crop" 
                    alt="Premium Wearables"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="amber-pill mb-1.5 inline-flex">Accessories & Materials</span>
                  <h4 className="font-heading font-extrabold text-sm text-[#0F172A] dark:text-white">
                    Showroom Premium Gear
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pb-2 leading-relaxed">
                    Find original adapters, fast-chargers, earbuds, and top-tier multi-threaded copper electrical wires (1.5mm - 4mm).
                  </p>
                  <button className="text-blue-500 hover:text-blue-400 font-bold text-xs flex items-center justify-center sm:justify-start gap-1 font-heading pointer-events-none">
                    <span>View Materials Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 5: Amharic Translated Movies block (cols: 12, md: 5) */}
              <div 
                id="bento-card-movies"
                onClick={() => navigateTo('category', 'movies-entertainment')}
                className="col-span-12 md:col-span-5 bento-card bg-[#0F172A] dark:bg-slate-900 text-white flex flex-col items-center justify-center text-center p-6 cursor-pointer relative overflow-hidden group border border-slate-800"
              >
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all pointer-events-none" />
                <div className="absolute left-0 top-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                
                <Film className="w-8 h-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-sm font-heading font-extrabold text-white uppercase tracking-wider">
                  Translated Movies & HD Media
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs font-sans leading-relaxed">
                  English Season packs with high-fidelity Amharic voice translation. Quick flash transfer setup!
                </p>
              </div>

              {/* Card 6: Shop coordinates and Open hours info (cols: 12, md: 12) */}
              <div 
                id="bento-card-hours"
                className="col-span-12 bento-card flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/55"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <h5 className="font-heading font-extrabold text-[#0F172A] dark:text-white text-xs uppercase tracking-wider">
                      Showroom Active Open Hours
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                      Monday - Saturday: 8:30 AM - 7:35 PM (Standby support on Telegram 24/7)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0 font-medium bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Mercato Electronic Strip, Central Block Shop #12</span>
                </div>
              </div>

            </div>

            {/* Featured category directories list */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                    Showroom Product & Service Categories
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Interact with our diverse hardware modules, design writing services, and entertainment drives.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('category', undefined)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group hover:-translate-y-0.5 transition-all self-end sm:self-auto"
                >
                  <span>Explore full showroom</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.slug}
                    onClick={() => navigateTo('category', cat.slug)}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-250/20 dark:border-slate-800/80 rounded-2xl hover:border-blue-400 dark:hover:border-blue-700/80 hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                      {getCategoryIcon(cat.icon)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-extrabold text-sm text-[#0F172A] dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs truncate mb-3">
                        {cat.description}
                      </p>
                      <span className="text-[10px] bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest">
                        {getCategoryCountLabel(cat.slug)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Section Preview on Homepage */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-blue-400 border border-white/5 mb-4 uppercase tracking-wider">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Transfer details</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight mb-3">
                  Direct Bank Payments & Transfers
                </h3>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  We accept Abyssinia, Awash, Dashen, Commercial Bank of Ethiopia (CBE), and Telebirr direct deposits or mobile transfers. View our verified account numbers, copy details effortlessly, or scan simulated QR envelopes.
                </p>

                <button
                  onClick={() => navigateTo('category', 'payment-accounts')}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/20"
                >
                  Browse Payment Accounts
                </button>
              </div>
            </div>

            {/* Dynamically tracked Recently Viewed segment (Show only if count > 0) */}
            {recentlyViewed.length > 0 && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-6 text-slate-600 dark:text-slate-400">
                  <Eye className="w-5 h-5" />
                  <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-350">
                    Recently Viewed Showroom Items
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CATALOG_ITEMS.filter((item) => recentlyViewed.includes(item.id))
                    .slice(0, 4)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => navigateTo('detail', item.category, item.id)}
                        className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-xl hover:border-blue-400 transition-all cursor-pointer flex gap-3 h-20 items-center justify-between"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200/30 shrink-0" 
                        />
                        <div className="min-w-0 flex-grow">
                          <h5 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                            {item.name}
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-bold truncate">
                            {item.priceLabel || (item.price ? `${item.price} ETB` : 'Service')}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ----------------- VIEW 2: CATEGORY DISPLAY BOARD ----------------- */}
        {activeState.view === 'category' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header info based on active category slug */}
            <div className="mb-8 border-b border-slate-200/40 dark:border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
                  {activeState.categorySlug 
                    ? CATEGORIES.find((c) => c.slug === activeState.categorySlug)?.name 
                    : 'Universal Electronic Showroom'
                  }
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {activeState.categorySlug 
                    ? CATEGORIES.find((c) => c.slug === activeState.categorySlug)?.description 
                    : 'Discover mobile phone catalogs, accessories lists, expert repairs, wiring items, and translated movies.'
                  }
                </p>
              </div>

              {/* Status / count indication */}
              <div className="text-right shrink-0 text-xs font-bold text-slate-400">
                Found {getFilteredItems().length} item{getFilteredItems().length === 1 ? '' : 's'}
              </div>
            </div>

            {/* If Category is payment accounts, render Accounts grid */}
            {activeState.categorySlug === 'payment-accounts' ? (
              <div>
                <div className="mb-6 p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/45 text-blue-800 dark:text-blue-300 rounded-xl text-xs flex items-start gap-2.5 max-w-2xl font-medium">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <span className="font-extrabold uppercase tracking-wide block mb-0.5">Payment Instructions</span>
                    When settling invoice tokens or custom system deposits, please copy the appropriate account number below. Send confirmations/screenshots directly to our Telegram support block to clear pick-up!
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BANK_ACCOUNTS.map((account) => (
                    <AccountCard key={account.id} account={account} />
                  ))}
                </div>
              </div>
            ) : (
              
              /* Else render Product Catalog lists with responsive product filtering triggers */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Product Filters Sidebar (Span 3) */}
                <aside className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-6">
                  
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 text-[#0F172A] dark:text-white">
                    <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-heading font-extrabold uppercase tracking-wider">
                      Catalog Filters
                    </span>
                  </div>

                  {/* Brand Filter (Only visible/meaningful on smartphone and button phone views primarily, but enabled on catalog list) */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-450 uppercase tracking-wider font-extrabold block">
                      Filter by Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                    >
                      <option value="all">All Brands</option>
                      {uniqueBrands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Comparison Filter */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-450 uppercase tracking-wider font-extrabold block">
                      Price Threshold
                    </label>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { label: 'All prices', value: 'all' },
                        { label: 'Budget (< 2000 ETB)', value: 'low' },
                        { label: 'Midrange (2k - 8k)', value: 'mid' },
                        { label: 'Premium (> 8000 ETB)', value: 'high' }
                      ].map((p) => (
                        <button
                          key={p.value}
                          onClick={() => setSelectedPriceRange(p.value)}
                          className={`w-full text-left font-sans text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
                            selectedPriceRange === p.value
                              ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/35 dark:border-blue-800/80 dark:text-blue-400'
                              : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950/40 hover:text-slate-700'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Filters button */}
                  <button
                    onClick={() => {
                      setSelectedBrand('all');
                      setSelectedPriceRange('all');
                    }}
                    className="w-full text-center py-2.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-heading font-extrabold text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-350 border border-slate-200/50 dark:border-slate-800"
                  >
                    Clear active filters
                  </button>

                </aside>

                {/* Products Cards Stage (Span 9) */}
                <div className="lg:col-span-9 col-span-1">
                  {getFilteredItems().length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 text-center p-12 rounded-2xl border border-slate-200/50 dark:border-slate-800 select-none">
                      <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-800 dark:text-white font-heading font-extrabold text-sm mb-1">
                        No matches found
                      </p>
                      <p className="text-slate-500 text-xs">
                        Adjust your brand or price selectors to see available configurations.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getFilteredItems().map((item) => (
                        <ProductServiceCard
                          key={item.id}
                          item={item}
                          isBookmarked={bookmarks.includes(item.id)}
                          onToggleBookmark={() => handleToggleBookmark(item.id)}
                          onViewDetails={() => navigateTo('detail', item.category, item.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ----------------- VIEW 3: DYNAMIC DETAILS SHEET ----------------- */}
        {activeState.view === 'detail' && activeState.itemId && (
          <DetailView
            itemId={activeState.itemId}
            onBack={() => navigateTo('category', activeState.categorySlug)}
            isBookmarked={bookmarks.includes(activeState.itemId)}
            onToggleBookmark={() => handleToggleBookmark(activeState.itemId!)}
            onNavigateToItem={(id, category) => navigateTo('detail', category, id)}
          />
        )}

        {/* ----------------- VIEW 4: BOOKMARKED FAVORITES VIEW ----------------- */}
        {activeState.view === 'bookmarks' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="border-b border-slate-200/60 dark:border-slate-850 pb-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight flex items-center gap-2">
                <Heart className="w-7 h-7 text-rose-500 fill-current" />
                <span>My Bookmarked Favorites</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Local bookmark system caching. Save interesting smartphone modules, repairs checklists, or design folders to check during shop visits.
              </p>
            </div>

            {getBookmarkedItems().length === 0 ? (
              <div className="max-w-md mx-auto text-center p-12 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl space-y-4">
                <BookmarkX className="w-16 h-16 text-rose-400 mx-auto opacity-80" />
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white">
                    Folder is empty
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-sans">
                    You have not bookmarked any electronics accessories, wire limits, or repairs yet.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('home')}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold tracking-wide uppercase transition-all"
                >
                  Browse Electronics Showroom
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getBookmarkedItems().map((item) => (
                  <ProductServiceCard
                    key={item.id}
                    item={item}
                    isBookmarked={true}
                    onToggleBookmark={() => handleToggleBookmark(item.id)}
                    onViewDetails={() => navigateTo('detail', item.category, item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ----------------- VIEW 5: SEARCH OUTCOMES VIEW ----------------- */}
        {activeState.view === 'search' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="border-b border-slate-200/60 dark:border-slate-800 pb-5 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading">
                Search Outcome
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Showing matching results for the search string: <span className="text-blue-600 dark:text-blue-400 font-extrabold">"{searchQuery}"</span>
              </p>
            </div>

            {getSearchItems().length === 0 ? (
              <div className="max-w-md mx-auto text-center p-12 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white">
                  No matching elements found
                </h4>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Verify your spellings or type standard tags like 'screen', 'Tecno', 'CBE' or 'wire'.
                </p>
                <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => { setSearchQuery('Tecno'); }} 
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs px-2.5 py-1 rounded"
                  >
                    Tecno
                  </button>
                  <button 
                    onClick={() => { setSearchQuery('Repair'); }} 
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs px-2.5 py-1 rounded"
                  >
                    Repair
                  </button>
                  <button 
                    onClick={() => { setSearchQuery('Wire'); }} 
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs px-2.5 py-1 rounded"
                  >
                    Wire
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getSearchItems().map((item) => (
                  <ProductServiceCard
                    key={item.id}
                    item={item}
                    isBookmarked={bookmarks.includes(item.id)}
                    onToggleBookmark={() => handleToggleBookmark(item.id)}
                    onViewDetails={() => navigateTo('detail', item.category, item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Structured Footer */}
      <FooterView />

      {/* Floating interactive call utility triggers */}
      <FloatingActions />

    </div>
  );
}
