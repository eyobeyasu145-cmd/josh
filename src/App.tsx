import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Printer, Smartphone, Wrench, Headphones, Zap, Film, AppWindow,
  Search, ShieldCheck, Heart, BookmarkCheck, ArrowRight, Star, SlidersHorizontal,
  BookmarkX, Timer, Info, Eye, Phone, MapPin, Hash, Sparkles, Copy, Check, Home
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
      <main className="flex-grow pb-24 md:pb-16">

        {/* ----------------- VIEW 1: HOME SCREEN ----------------- */}
        {activeState.view === 'home' && (
          <div className="space-y-6 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            
            {/* Compact Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-800/65 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
                  Josh Electronics Showroom
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Select a category below to explore original smartphones, reliable button phones, certified repair systems, print designs and translated movies.
                </p>
              </div>

              {/* Quick Actions / Custom Chips Selection */}
              <div className="flex flex-wrap gap-1.5 pt-1 md:pt-0 shrink-0">
                <span 
                  onClick={() => navigateTo('category', 'smartphones')}
                  className="cursor-pointer text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-150/40 dark:border-blue-900/50 transition-all flex items-center gap-1 hover:scale-105"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>New</span>
                </span>
                <span 
                  onClick={() => navigateTo('category', 'repair-services')}
                  className="cursor-pointer text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-955/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-450 border border-rose-150/40 dark:border-rose-900/50 transition-all flex items-center gap-1 hover:scale-105"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-550"></span>
                  <span>Popular</span>
                </span>
                <span 
                  onClick={() => navigateTo('category', 'electronics-accessories')}
                  className="cursor-pointer text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-955/40 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-150/40 dark:border-emerald-900/50 transition-all flex items-center gap-1 hover:scale-105"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Best Seller</span>
                </span>
                <span 
                  onClick={() => navigateTo('category', 'printing-services')}
                  className="cursor-pointer text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-955/40 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 border border-indigo-150/40 dark:border-indigo-900/50 transition-all flex items-center gap-1 hover:scale-105"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>Service</span>
                </span>
              </div>
            </div>

            {/* Two-Column responsive Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  onClick={() => navigateTo('category', cat.slug)}
                  className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850/80 rounded-2xl hover:border-blue-450 dark:hover:border-blue-700/80 hover:shadow-md transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer group hover:scale-[1.03]"
                  style={{ borderRadius: '16px' }}
                >
                  <div>
                    {/* Visual Card Image / Icon Area */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 group-hover:scale-105 transition-transform duration-300 w-fit mb-3">
                      {getCategoryIcon(cat.icon)}
                    </div>

                    {/* Category Title Links */}
                    <h3 
                      className="font-heading font-extrabold text-xs sm:text-sm text-[#0F172A] dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {cat.name}
                    </h3>
                    
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Tiny status indicator */}
                  <div className="mt-2 pt-2 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between">
                    <span className="text-[9px] bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest truncate">
                      {getCategoryCountLabel(cat.slug)}
                    </span>
                    <span className="text-blue-500 group-hover:translate-x-0.5 transition-transform text-[10px] font-bold hidden sm:inline-flex items-center">
                      ➡️
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamically tracked Recently Viewed segment (Show only if count > 0) */}
            {recentlyViewed.length > 0 && (
              <div className="animate-in fade-in duration-300 border-t border-slate-100 dark:border-slate-800/60 pt-6">
                <div className="flex items-center gap-2 mb-4 text-slate-600 dark:text-slate-400">
                  <Eye className="w-4 h-4 text-slate-405" />
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-350">
                    Recently Viewed Showroom Items
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {CATALOG_ITEMS.filter((item) => recentlyViewed.includes(item.id))
                    .slice(0, 4)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => navigateTo('detail', item.category, item.id)}
                        className="p-2 sm:p-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-xl hover:border-blue-400/80 transition-all cursor-pointer flex gap-2.5 items-center justify-between"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-lg border border-slate-200/30 shrink-0" 
                        />
                        <div className="min-w-0 flex-grow">
                          <h5 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white truncate">
                            {item.name}
                          </h5>
                          <p className="text-[9px] sm:text-[10px] text-slate-450 mt-0.5 font-bold truncate">
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

      {/* Mobile Bottom Navigation Bar (Fixed screen bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 py-2.5 px-6 flex items-center justify-between shadow-lg">
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
            activeState.view === 'home'
              ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 font-semibold'
          }`}
          style={{ width: '20%' }}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        <button
          onClick={() => navigateTo('category', 'smartphones')}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
            (activeState.view === 'category' || activeState.view === 'detail') && 
            (activeState.categorySlug === 'smartphones' || activeState.categorySlug === 'button-phones')
              ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 font-semibold'
          }`}
          style={{ width: '20%' }}
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Phones</span>
        </button>

        <button
          onClick={() => navigateTo('category', 'repair-services')}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
            (activeState.view === 'category' || activeState.view === 'detail') && 
            (activeState.categorySlug === 'repair-services' || activeState.categorySlug === 'printing-services' || activeState.categorySlug === 'mobile-app-services')
              ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 font-semibold'
          }`}
          style={{ width: '20%' }}
        >
          <Wrench className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Services</span>
        </button>

        <button
          onClick={() => navigateTo('category', 'movies-entertainment')}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
            (activeState.view === 'category' || activeState.view === 'detail') && 
            activeState.categorySlug === 'movies-entertainment'
              ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 font-semibold'
          }`}
          style={{ width: '20%' }}
        >
          <Film className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Movies</span>
        </button>

        <button
          onClick={() => navigateTo('bookmarks')}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
            activeState.view === 'bookmarks'
              ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 font-semibold'
          }`}
          style={{ width: '20%' }}
        >
          <Star className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Favorites</span>
        </button>
      </div>

    </div>
  );
}
