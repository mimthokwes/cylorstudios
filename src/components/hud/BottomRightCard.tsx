import { useState } from 'react';
import {
  ArrowUpRight,
  ShoppingCart,
  MessageCircle,
  Check,
  Sparkles,
} from 'lucide-react';
import type { RobloxAsset, ServicePackage } from '../../types/portfolio.types';
import { STUDIO_CONFIG } from '../../config/studio.config';

interface BottomRightCardProps {
  activeMode: 'assets' | 'services';
  activeAsset: RobloxAsset;
  services: ServicePackage[];
}

export function BottomRightCard({
  activeMode,
  activeAsset,
  services,
}: BottomRightCardProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const activeService = services.find((s) => s.id === selectedServiceId) || services[0];

  return (
    <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-6 z-20 w-[92vw] sm:w-[350px] pointer-events-auto">
      {/* Outer Card with Deep C-Socket Notch */}
      <div className="relative pt-6 pb-6 px-6 sm:px-7 text-slate-900">
        
        {/* SVG Translucent Frosted Glass */}
        <svg
          className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0_20px_50px_rgba(2,132,199,0.22)]"
          viewBox="0 0 350 270"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            {/* Real Glass Frosted Gradient */}
            <linearGradient id="lunarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.44)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.28)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.16)" />
            </linearGradient>
          </defs>

          {/* Path that deeply wraps around the circle socket */}
          <path
            d="M 36,0 
               L 314,0 
               A 36,36 0 0 1 350,36 
               L 350,234 
               A 36,36 0 0 1 314,270 
               L 132,270 
               C 108,270 94,252 94,225 
               C 94,198 74,178 48,178 
               C 24,178 0,165 0,145 
               L 0,36 
               A 36,36 0 0 1 36,0 
               Z"
            fill="url(#lunarGlass)"
            className="backdrop-blur-3xl"
          />

          <path
            d="M 36,0 
               L 314,0 
               A 36,36 0 0 1 350,36 
               L 350,234 
               A 36,36 0 0 1 314,270 
               L 132,270 
               C 108,270 94,252 94,225 
               C 94,198 74,178 48,178 
               C 24,178 0,165 0,145 
               L 0,36 
               A 36,36 0 0 1 36,0 
               Z"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="1.5"
          />
        </svg>

        {activeMode === 'assets' ? (
          // MODE A: Ready-made Asset (BuiltByBit Store Circle)
          <div className="relative w-full max-w-[300px]">
            {/* Top Row: Category & Top-Right Round Button */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono tracking-wider uppercase text-sky-900 bg-white/60 px-2.5 py-0.5 rounded-full font-bold border border-white/60">
                  {activeAsset.category}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mt-1.5 truncate drop-shadow-sm">
                  {activeAsset.title}
                </h3>
              </div>

              {/* Round Arrow CTA Button (Top Right) */}
              <a
                href={activeAsset.externalLinks.builtByBitUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka BuiltByBit Store"
                className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-slate-900 hover:text-white text-slate-900 flex items-center justify-center flex-shrink-0 transition-colors group"
              >
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Description (Singkat & Rapi) */}
            <p className="mt-2 text-xs text-slate-700/90 font-medium leading-relaxed line-clamp-2">
              {activeAsset.description}
            </p>

            {/* Specs Line without price */}
            <div className="mt-3 flex items-center gap-2.5 text-[11px] text-slate-800 font-semibold pb-2 border-b border-white/40">
              <span>{activeAsset.stats.partsCount}</span>
              <span className="text-slate-400">•</span>
              <span>{activeAsset.stats.dimensions}</span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-sky-900 font-mono">{activeAsset.stats.fileFormat}</span>
            </div>

            {/* Bottom Row: Clickable BuiltByBit Circle + Actions */}
            <div className="mt-4 flex items-center justify-between">
              
              {/* Clickable BuiltByBit Store Circle Button */}
              <a
                href={activeAsset.externalLinks.builtByBitUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Beli di BuiltByBit Store ↗"
                className="group relative w-[76px] h-[76px] -ml-6 -mb-4 rounded-full bg-[#1b1c3e] hover:bg-[#252759] text-white flex flex-col items-center justify-center shadow-[0_14px_30px_rgba(27,28,62,0.45)] border-2 border-white/90 transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <span className="text-amber-400 font-black text-xl tracking-tighter leading-none">
                      BBB
                    </span>
                    <span className="absolute -top-1 -right-2 text-[9px] text-amber-300 font-bold">
                      ↗
                    </span>
                  </div>
                  <span className="text-[8px] font-mono tracking-wider uppercase text-sky-200/90 font-bold mt-0.5">
                    BuiltByBit
                  </span>
                </div>
              </a>

              {/* Action Buttons to the Right */}
              <div className="flex items-center gap-2 pl-3">
                <a
                  href={activeAsset.externalLinks.builtByBitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs transition-colors shadow-md"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Beli Aset</span>
                </a>

                <a
                  href={STUDIO_CONFIG.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Konsultasi WA"
                  className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-md flex-shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          // MODE B: Custom Jasa Building & Objek (Discord Fokus, Tanpa Button WA)
          <div className="relative w-full max-w-[300px]">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-indigo-900 bg-indigo-100/80 px-2.5 py-0.5 rounded-full border border-indigo-200 w-fit">
                  <Sparkles className="w-2.5 h-2.5 fill-indigo-500" />
                  Jasa Custom
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mt-1 truncate drop-shadow-sm">
                  {activeService.name}
                </h3>
              </div>

              <span className="text-xs font-bold text-indigo-900 font-mono mt-1 flex-shrink-0">
                {activeService.estimatedTime}
              </span>
            </div>

            {/* Service selector tabs (2 Pilihan: Bangunan & Prop/Objek) */}
            <div className="mt-2 grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-white/40 border border-white/50">
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => setSelectedServiceId(svc.id)}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all truncate text-center ${
                    activeService.id === svc.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {svc.tierLabel}
                </button>
              ))}
            </div>

            <p className="mt-1.5 text-xs text-slate-700 font-medium leading-snug line-clamp-1">
              {activeService.summary}
            </p>

            {/* Deliverables snippet (Singkat & Rapi) */}
            <div className="mt-1.5 space-y-1 pb-2 border-b border-white/40">
              {activeService.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-800">
                  <Check className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                  <span className="truncate font-semibold">{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row: Clickable Discord Circle Button (Clean & Minimal) */}
            <div className="mt-4 flex items-center">
              
              {/* Clickable Discord Circle Button */}
              <a
                href={STUDIO_CONFIG.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka Server Discord Cylor Studios ↗"
                className="group relative w-[76px] h-[76px] -ml-6 -mb-4 rounded-full bg-[#1c1d42] hover:bg-[#282a63] text-white flex flex-col items-center justify-center shadow-[0_14px_30px_rgba(28,29,66,0.45)] border-2 border-white/90 transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <svg className="w-7 h-7 fill-[#5865F2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span className="absolute -top-1 -right-2 text-[9px] text-indigo-300 font-bold">
                      ↗
                    </span>
                  </div>
                  <span className="text-[8px] font-mono tracking-wider uppercase text-indigo-200/90 font-bold mt-0.5">
                    Discord
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
