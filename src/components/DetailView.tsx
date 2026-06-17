import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, Phone, MessageSquare, 
  ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, 
  ShoppingBag, HelpCircle, ZoomIn, X, Info
} from 'lucide-react';
import { CatalogItem, ProductItem, ServiceItem } from '../types';
import { CATALOG_ITEMS } from '../data';

interface DetailViewProps {
  itemId: string;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onNavigateToItem: (id: string, category: string) => void;
}

export default function DetailView({
  itemId,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onNavigateToItem
}: DetailViewProps) {
  const [item, setItem] = useState<CatalogItem | undefined>(undefined);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const found = CATALOG_ITEMS.find((c) => c.id === itemId);
    if (found) {
      setItem(found);
      setActiveImageIdx(0);
      setIsZoomed(false);
    }
    // Auto scroll to top of details page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 dark:text-slate-400">Loading catalog sheet details...</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
          Go Back
        </button>
      </div>
    );
  }

  const isProduct = item.type === 'product';
  const prodItem = item as ProductItem;
  const servItem = item as ServiceItem;

  // Derive images list
  const images = item.images && item.images.length > 0 ? item.images : [item.image];

  // Retrieve Related Items in same category (exclude current item)
  const relatedItems = CATALOG_ITEMS.filter(
    (c) => c.category === item.category && c.id !== item.id
  ).slice(0, 3);

  const handleShare = () => {
    const shareMessage = `Check out this electronic catalog item from Josh Electronics:
👉 *${item.name}*
Price: ${item.priceLabel || (item.price ? `${item.price} ETB` : 'Get Quotation')}
Details: ${item.description}
Browse our live digital showroom here!`;
    navigator.clipboard.writeText(shareMessage);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(`Hello Josh Electronics, I am interested in inquiring about "${item.name}" listed at ${item.priceLabel || (item.price ? `${item.price} ETB` : 'Quotation')} in your digital catalog.`);
    window.open(`https://wa.me/251964140000?text=${text}`, '_blank');
  };

  const handleTelegramInquiry = () => {
    const text = encodeURIComponent(`Inquiry for Josh Electronics: I would like to get more details or book standard appointment for "${item.name}". Thank you!`);
    window.open(`https://t.me/josh6414?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Back button and navigation utilities */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800/60 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-850 text-xs font-bold transition-all"
          id="detail-back-navigation-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Trigger */}
          <button
            onClick={onToggleBookmark}
            className={`p-2.5 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          >
            <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-slate-700 dark:text-slate-300'}`} />
          </button>

          {/* Share Trigger */}
          <button
            onClick={handleShare}
            className={`px-3.5 py-2.5 rounded-xl border transition-all text-xs font-bold flex items-center gap-1.5 ${
              copiedShare
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedShare ? 'Copied Details!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main product specification sheet grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-16">
        
        {/* Left Column: Image Carousel / Zoom Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          <div className="relative aspect-square rounded-3xl bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 overflow-hidden flex items-center justify-center group/images">
            
            <img
              src={images[activeImageIdx]}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none"
            />

            {/* Click to Magnifier utility trigger */}
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute bottom-4 right-4 p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white hover:scale-110 active:scale-95 transition-all shadow-lg cursor-zoom-in"
              title="Zoom Image"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Left/Right carousel triggers */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 backdrop-blur-sm text-white hover:bg-slate-900/70 hover:scale-105 transition-all outline-none"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 backdrop-blur-sm text-white hover:bg-slate-900/70 hover:scale-105 transition-all outline-none"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

          </div>

          {/* Thumbnails grid */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-square rounded-xl bg-slate-50 dark:bg-slate-950 border overflow-hidden transition-all duration-200 ${
                    activeImageIdx === idx
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt={`${item.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Spec Sheets, features, ordering quotes */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          
          <div>
            {/* Tag or Brand Line */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-heading font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100/50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                {isProduct ? prodItem.brand : 'Premium Service Catalog'}
              </span>

              {isProduct && (
                <span className={`text-xs font-bold ${
                  prodItem.availability === 'In Stock'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : prodItem.availability === 'Pre-order'
                    ? 'text-amber-500'
                    : 'text-rose-500'
                }`}>
                  ● {prodItem.availability}
                </span>
              )}
            </div>

            {/* Core Item Name */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4 font-heading">
              {item.name}
            </h2>

            {/* Pricing Section */}
            <div className="bg-slate-50/80 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-50 tracking-widest uppercase font-bold">
                  Catalog Price (ETB)
                </p>
                <p className="text-2xl font-extrabold text-blue-600 dark:text-emerald-400 font-sans tracking-tight">
                  {item.priceLabel || (item.price ? `${item.price.toLocaleString()} ETB` : 'Quotation Required')}
                </p>
              </div>
              
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-extrabold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 px-2.5 py-1.5 rounded-lg border border-blue-200/50">
                  Fixed Price
                </span>
              </div>
            </div>

            {/* Narrative description */}
            <div className="mb-6">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2">
                Showroom Description & Scope
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            {/* Specifications Lists (for Smartphones, button phones, accessories or custom wire) */}
            {isProduct && prodItem.specsList && prodItem.specsList.length > 0 && (
              <div className="mb-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4.5 py-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-150 dark:border-slate-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Technical Specifications
                  </span>
                </div>
                
                <table className="w-full text-xs font-sans text-left border-collapse">
                  <tbody>
                    {prodItem.specsList.map((spec, sidx) => (
                      <tr 
                        key={sidx} 
                        className="border-b border-slate-100 dark:border-slate-850/60 last:border-none hover:bg-slate-50/50 dark:hover:bg-slate-950/20"
                      >
                        <td className="px-4.5 py-3 text-slate-400 dark:text-slate-505 font-bold w-1/3 border-r border-slate-100 dark:border-slate-850/60">
                          {spec.label}
                        </td>
                        <td className="px-4.5 py-3 text-slate-700 dark:text-slate-300 font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                    {prodItem.specs && (
                      <>
                        {prodItem.specs.battery && (
                          <tr className="border-b border-slate-100 dark:border-slate-850/30">
                            <td className="px-4.5 py-3 text-slate-400 font-bold border-r border-slate-100 dark:border-slate-850/60">Battery Power</td>
                            <td className="px-4.5 py-3 text-slate-700 dark:text-slate-300 font-semibold">{prodItem.specs.battery}</td>
                          </tr>
                        )}
                        {prodItem.specs.camera && (
                          <tr className="border-b border-slate-100 dark:border-slate-850/30">
                            <td className="px-4.5 py-3 text-slate-400 font-bold border-r border-slate-100 dark:border-slate-850/60">Camera Spec</td>
                            <td className="px-4.5 py-3 text-slate-700 dark:text-slate-300 font-semibold">{prodItem.specs.camera}</td>
                          </tr>
                        )}
                        {prodItem.specs.colors && (
                          <tr>
                            <td className="px-4.5 py-3 text-slate-400 font-bold border-r border-slate-100 dark:border-slate-850/60">Available Colors</td>
                            <td className="px-4.5 py-3 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 flex-wrap">
                              {prodItem.specs.colors.map((col) => (
                                <span key={col} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200/50 dark:border-slate-750">
                                  {col}
                                </span>
                              ))}
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Service Features checklist (for Repairs, printing or social custom setup) */}
            {!isProduct && servItem.features && servItem.features.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">
                  Service Inclusions & Guarantees
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {servItem.features.map((feat, fidx) => (
                    <li key={fidx} className="flex gap-2.5 items-start text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Service Estimate Time */}
            {!isProduct && servItem.estimatedTime && (
              <div className="mb-8 flex items-center gap-2 text-xs bg-amber-50 border border-amber-200/60 text-amber-800 dark:bg-amber-950/20 dark:border-amber-900/60 dark:text-amber-400 p-3 rounded-xl w-fit font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Completion Forecast: <strong className="font-extrabold">{servItem.estimatedTime}</strong> standard turnaround</span>
              </div>
            )}

          </div>

          {/* Secure Interactive Offline Contact Call Actions */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-850/80">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-4">
              Place Voucher / Inquiry Offline
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <button
                onClick={handleTelegramInquiry}
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-sky-600/10 hover:shadow-sky-600/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
                aria-label="Ask about this item on Telegram"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span>Contact Telegram</span>
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
                aria-label="Ask about this item on WhatsApp"
              >
                <Phone className="w-4.5 h-4.5" />
                <span>Instant Call / Inquiry</span>
              </button>

            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-350" />
              <span>Catalog Only • No Online Cart Required</span>
            </div>
          </div>

        </div>

      </div>

      {/* Recommended similar/related products section */}
      {relatedItems.length > 0 && (
        <div className="border-t border-slate-100 dark:border-slate-800/60 pt-12 mt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading">
              Related Showroom Options
            </h3>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest">
              Same Category Comparison
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <div 
                key={rel.id}
                onClick={() => onNavigateToItem(rel.id, rel.category)}
                className="p-4 border border-slate-150 dark:border-slate-850/80 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 hover:scale-[1.01] hover:border-blue-400 transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <img
                  src={rel.image}
                  alt={rel.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl border border-slate-200/50"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-extrabold text-slate-800 dark:text-slate-150 text-sm truncate">
                    {rel.name}
                  </h4>
                  <p className="text-slate-400 text-xs font-extrabold mt-0.5">
                    {rel.priceLabel || (rel.price ? `${rel.price.toLocaleString()} ETB` : 'Get Quotation')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image expanded modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col justify-center items-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-white/10 text-white hover:bg-slate-850 transition-all"
            id="close-deep-zoom-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={images[activeImageIdx]}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl select-none"
          />

          <p className="text-slate-300 font-heading font-extrabold text-sm sm:text-base mt-4 text-center">
            {item.name}
          </p>
          <p className="text-slate-500 font-sans text-xs mt-1 text-center">
            Showroom High-Resolution Photo Zoom
          </p>
        </div>
      )}

    </div>
  );
}
