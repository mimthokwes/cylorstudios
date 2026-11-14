import { ArrowUpRight } from 'lucide-react';
import type { RobloxAsset } from '../../types/portfolio.types';
import { STUDIO_CONFIG } from '../../config/studio.config';

interface BottomLeftDockProps {
  assets: RobloxAsset[];
  selectedAssetId: string;
  onSelectAsset: (asset: RobloxAsset) => void;
}

export function BottomLeftDock({
  assets,
  selectedAssetId,
  onSelectAsset,
}: BottomLeftDockProps) {
  return (
    <div className="absolute left-0 bottom-0 z-20 w-[350px] sm:w-[380px] pointer-events-auto">
      {/* Container with Upward-Pointing Architectural Fin on the Left */}
      <div className="relative pt-6 pb-4 pl-6 pr-8 text-slate-900">
        {/* SVG Fluid Cutout Shape: Lancip ke Atas di sisi kiri */}
        <svg
          className="absolute inset-0 w-full h-full -z-10 drop-shadow-2xl"
          viewBox="0 0 380 195"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 0,0 
               C 0,16 16,28 42,28 
               L 310,28 
               A 30,30 0 0 1 340,58 
               L 340,148 
               C 340,178 356,195 380,195 
               L 0,195 
               Z"
            fill="#ffffff"
          />
          <path
            d="M 0,0 
               C 0,16 16,28 42,28 
               L 310,28 
               A 30,30 0 0 1 340,58 
               L 340,148 
               C 340,178 356,195 380,195"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 max-w-[310px] pt-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              Cylor Studios
            </h2>
            <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
              {STUDIO_CONFIG.stats.projectsCompleted} Builds
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug line-clamp-1 mb-2.5">
            Roblox 3D architecture & ready-to-use map assets.
          </p>

          {/* Model Switcher Thumbnails */}
          <div className="flex items-center gap-2">
            {assets.map((asset) => {
              const isSelected = asset.id === selectedAssetId;

              return (
                <button
                  key={asset.id}
                  onClick={() => onSelectAsset(asset)}
                  className={`group flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl transition-all text-left flex-1 min-w-0 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md ring-2 ring-sky-500/40'
                      : 'bg-slate-100/90 hover:bg-slate-200/90 text-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold truncate leading-tight">
                      {asset.title}
                    </p>
                    <span
                      className={`text-[9px] font-semibold block leading-tight ${
                        isSelected ? 'text-sky-300' : 'text-slate-500'
                      }`}
                    >
                      {asset.category}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Quick Link Round Action Button */}
            <a
              href={STUDIO_CONFIG.socials.builtByBit}
              target="_blank"
              rel="noopener noreferrer"
              title="Katalog Lengkap"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-900 hover:text-white text-slate-900 flex items-center justify-center flex-shrink-0 transition-colors group"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
