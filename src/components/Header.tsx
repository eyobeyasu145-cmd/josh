import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Bookmark, Sparkles, X } from 'lucide-react';
import { CATALOG_ITEMS } from '../data';
import { CatalogItem } from '../types';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeView: string;
  setActiveView: (view: 'home' | 'category' | 'detail' | 'bookmarks' | 'search', catSlug?: string, itemId?: string) => void;
  bookmarksCount: number;
}

export default function Header({
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  bookmarksCount,
}: HeaderProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<CatalogItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter dynamic search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = CATALOG_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Handle outside clicks for closing suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('search');
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (item: CatalogItem) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);
    setActiveView('detail', item.category, item.id);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Banner */}
        <div 
          onClick={() => {
            clearSearch();
            setActiveView('home');
          }}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-header-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-heading font-extrabold text-xl tracking-tight">J</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
              Josh <span className="text-blue-600 font-bold text-xs bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 rounded ml-1">SHOP</span>
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Electronics & Services
            </p>
          </div>
        </div>

        {/* Global Search Interface */}
        <div ref={searchRef} className="flex-1 max-w-lg relative hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search phones, repairs, editing systems..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-11 pr-10 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Autocomplete suggestions box */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-medium"><Sparkles className="w-3 h-3 text-amber-500" /> Instant Results</span>
                <span>Press Enter to list all</span>
              </div>
              <ul className="p-1">
                {suggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => selectSuggestion(item)}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 object-cover rounded-lg border border-slate-200/50 dark:border-slate-700/50"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {item.priceLabel || (item.price ? `${item.price} ETB` : 'Service')}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-2">
          {/* Favorites/Bookmarks Folder */}
          <button
            onClick={() => setActiveView('bookmarks')}
            className={`relative p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-1.5 ${
              activeView === 'bookmarks'
                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/80'
                : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            title="Bookmarked Items"
            id="bookmark-header-btn"
          >
            <Bookmark className={`w-5 h-5 ${bookmarksCount > 0 ? 'fill-current text-blue-600 dark:text-blue-400' : ''}`} />
            <span className="text-xs font-bold hidden sm:inline">Favorites</span>
            {bookmarksCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md transform scale-95 animate-pulse">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="theme-toggle-header"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile-only Search Sub-bar */}
      <div className="md:hidden border-t border-slate-100 dark:border-slate-800/60 p-3 bg-slate-50/80 dark:bg-slate-950/40">
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search phone catalog, repairs & prints..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Autocomplete suggestion for mobile */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50 overflow-hidden">
              <ul className="p-1">
                {suggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => selectSuggestion(item)}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg flex items-center gap-2.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {item.name}
                        </p>
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-300">
                        {item.priceLabel || (item.price ? `${item.price} ETB` : 'Service')}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
