import React from 'react';
import { Bookmark, BookmarkCheck, LayoutGrid, Sparkles, AlertCircle, Wrench, Film } from 'lucide-react';
import { CatalogItem } from '../types';

interface ProductServiceCardProps {
  item: CatalogItem;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onViewDetails: () => void;
  key?: string | number;
}

export default function ProductServiceCard({
  item,
  isBookmarked,
  onToggleBookmark,
  onViewDetails
}: ProductServiceCardProps) {
  const isProduct = item.type === 'product';

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark();
  };

  return (
    <div 
      onClick={onViewDetails}
      className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer h-full relative hover:-translate-y-1"
    >
      
      {/* Absolute Badges Block */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        
        {/* Availability Badge */}
        {isProduct && (
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border shadow-sm shrink-0 ${
            (item as any).availability === 'In Stock'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900/60'
              : (item as any).availability === 'Pre-order'
              ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900/60'
              : 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900/60'
          }`}>
            {(item as any).availability}
          </span>
        )}

        {/* Specialized badges for categories (like Movies HD indicator or Service icon) */}
        {item.category === 'movies-entertainment' && (
          <span className="bg-slate-900/80 border border-white/10 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
            <Film className="w-3 h-3 text-red-500" />
            <span>HD AUDIO</span>
          </span>
        )}

        {!isProduct && (
          <span className="bg-blue-600 border border-blue-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-sm">
            <Wrench className="w-2.5 h-2.5" />
            <span>Service</span>
          </span>
        )}
      </div>

      {/* Bookmark Action Bubble */}
      <button
        onClick={handleBookmarkClick}
        className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/30 backdrop-blur-md text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:scale-110 active:scale-95 transition-all shadow-sm"
        title={isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
        aria-label="Add/Remove favorite"
      >
        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-slate-700 dark:text-slate-300'}`} />
      </button>

      {/* Media Cover Showcase */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Subtle hover gradient curtain */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Narrative Section */}
      <div className="p-5 flex flex-col justify-between flex-1">
        
        <div>
          {/* Tag & Brand label */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {isProduct ? (item as any).brand : 'WOW JOSH SERVICE'}
            </span>
            {item.tags && item.tags.length > 0 && (
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold max-w-24 truncate">
                #{item.tags[0]}
              </span>
            )}
          </div>

          {/* Item title */}
          <h3 className="font-heading font-extrabold text-[#0F172A] dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
            {item.name}
          </h3>

          {/* Item Description representation */}
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
            {item.description}
          </p>

          {/* Core Specs summary for Phones (Storage/Ram) */}
          {isProduct && (item as any).specs && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {((item as any).specs.storage) && (
                <span className="bg-slate-50 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                  { (item as any).specs.storage }
                </span>
              )}
              {((item as any).specs.ram) && (
                <span className="bg-slate-50 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                  RAM: { (item as any).specs.ram.split(' ')[0] }
                </span>
              )}
              {((item as any).specs.battery) && (
                <span className="bg-slate-50 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700 max-w-24 truncate">
                  { (item as any).specs.battery.split(' ')[0]}mAh
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer actions of single card */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-850 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Price
            </span>
            <span className="font-sans font-extrabold text-slate-900 dark:text-emerald-400 text-sm">
              {item.priceLabel || (item.price ? `${item.price.toLocaleString()} ETB` : 'Get Quote')}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="px-4 py-2.5 bg-slate-5 w-fit rounded-xl border border-slate-200/80 hover:border-blue-400 group-hover:bg-blue-600 group-hover:text-white hover:text-white dark:bg-slate-800 dark:border-slate-700/80 dark:hover:bg-blue-600 dark:hover:border-blue-600 font-sans font-extrabold text-[11px] tracking-wider uppercase transition-all shrink-0"
          >
            View Specs
          </button>
        </div>

      </div>

    </div>
  );
}
