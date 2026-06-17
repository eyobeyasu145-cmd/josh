import { 
  CreditCard, 
  Printer, 
  Smartphone, 
  Wrench, 
  Headphones, 
  Zap, 
  Film, 
  AppWindow,
  Hash
} from 'lucide-react';
import { CATEGORIES } from '../data';

interface CategoryQuickNavProps {
  activeCategorySlug?: string;
  onSelectCategory: (slug: string | undefined) => void;
  activeView: string;
}

// Safer icon rendering dictionary
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'CreditCard': return <CreditCard className="w-4.5 h-4.5" />;
    case 'Printer': return <Printer className="w-4.5 h-4.5" />;
    case 'Dialpad': return <Hash className="w-4.5 h-4.5" />; // Bulletproof fallback
    case 'Smartphone': return <Smartphone className="w-4.5 h-4.5" />;
    case 'Wrench': return <Wrench className="w-4.5 h-4.5" />;
    case 'Headphones': return <Headphones className="w-4.5 h-4.5" />;
    case 'Zap': return <Zap className="w-4.5 h-4.5" />;
    case 'Film': return <Film className="w-4.5 h-4.5" />;
    case 'AppWindow': return <AppWindow className="w-4.5 h-4.5" />;
    default: return <Smartphone className="w-4.5 h-4.5" />;
  }
};

export default function CategoryQuickNav({
  activeCategorySlug,
  onSelectCategory,
  activeView
}: CategoryQuickNavProps) {
  return (
    <div className="sticky top-18 z-30 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 scroll-smooth">
          
          {/* "All Categories" Toggle */}
          <button
            onClick={() => onSelectCategory(undefined)}
            className={`px-4.5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider shrink-0 border transition-all duration-200 ${
              !activeCategorySlug && activeView === 'category'
                ? 'bg-slate-900 border-slate-950 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-sm'
                : 'bg-white border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:bg-slate-800/80 dark:border-slate-750 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            All Items
          </button>

          {/* Map categories items */}
          {CATEGORIES.map((cat) => {
            const isActive = activeCategorySlug === cat.slug && activeView === 'category';
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-4.5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wide shrink-0 border transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border-slate-200/80 text-slate-700 hover:text-blue-600 hover:border-blue-300 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:text-blue-400'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                  {getIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
          
        </div>
      </div>
    </div>
  );
}
