import { ShoppingBag, Wrench, Sparkles, Filter } from 'lucide-react';
import type { BuildCategory } from '../../types/portfolio.types';

interface TopNavbarProps {
  activeMode: 'assets' | 'services';
  setActiveMode: (mode: 'assets' | 'services') => void;
  selectedCategory: BuildCategory;
  setSelectedCategory: (cat: BuildCategory) => void;
  totalAssetsCount: number;
}

export function TopNavbar({
  activeMode,
  setActiveMode,
  selectedCategory,
  setSelectedCategory,
  totalAssetsCount,
}: TopNavbarProps) {
  const categories: BuildCategory[] = ['All', 'Sci-Fi', 'Traditional', 'Realistic', 'Low-Poly'];

  return (
    <header className="relative z-20 flex items-start justify-between w-full px-4 sm:px-8 pt-0 pointer-events-auto">
      {/* Left Pill: Mode Ready Assets */}
      <div className="pt-4 sm:pt-5">
        <button
          onClick={() => setActiveMode('assets')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md ${
            activeMode === 'assets'
              ? 'bg-white text-slate-900 ring-2 ring-white/60 shadow-white/20'
              : 'bg-white/25 hover:bg-white/40 text-slate-900 border border-white/40 backdrop-blur-xl'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-sky-600" />
          <span>Ready Assets</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeMode === 'assets'
                ? 'bg-slate-900 text-white'
                : 'bg-white/60 text-slate-900'
            }`}
          >
            {totalAssetsCount}
          </span>
        </button>
      </div>

      {/* Center Notch: Smooth Inverted Fillet Curve (Mirip Persis ref-page Image 1) */}
      <div className="relative hidden md:flex items-center justify-center pt-0">
        {/* SVG Fluid Bridge Container */}
        <div className="relative flex items-center justify-center px-8 pb-3 pt-2">
          {/* SVG Shape with smooth concave S-curves on left & right */}
          <svg
            className="absolute top-0 inset-x-0 w-full h-full -z-10 drop-shadow-md"
            viewBox="0 0 460 52"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 0,0 
                 C 26,0 28,50 56,50 
                 L 404,50 
                 C 432,50 434,0 460,0 
                 Z"
              fill="rgba(255, 255, 255, 0.88)"
              className="backdrop-blur-2xl"
            />
            <path
              d="M 0,0 
                 C 26,0 28,50 56,50 
                 L 404,50 
                 C 432,50 434,0 460,0"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Notch Content */}
          <div className="flex items-center gap-2 pt-1 text-slate-800">
            <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold pr-2 border-r border-slate-300">
              <Filter className="w-3 h-3 text-sky-600" />
              <span>Category:</span>
            </div>

            <div className="flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (activeMode !== 'assets') setActiveMode('assets');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Pill: Mode Custom Jasa */}
      <div className="pt-4 sm:pt-5">
        <button
          onClick={() => setActiveMode('services')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md ${
            activeMode === 'services'
              ? 'bg-white text-slate-900 ring-2 ring-white/60 shadow-white/20'
              : 'bg-white/25 hover:bg-white/40 text-slate-900 border border-white/40 backdrop-blur-xl'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-sky-600" />
          <span>Custom Jasa</span>
          <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
        </button>
      </div>
    </header>
  );
}
