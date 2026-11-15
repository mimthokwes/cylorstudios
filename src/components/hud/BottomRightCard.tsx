import { useState } from 'react';
import {
  ArrowUpRight,
  Check,
} from 'lucide-react';
import type { RobloxAsset, ServicePackage } from '../../types/portfolio.types';
import { STUDIO_CONFIG } from '../../config/studio.config';

interface BottomRightCardProps {
  activeMode: 'assets' | 'services';
  activeAsset: RobloxAsset;
  services: ServicePackage[];
  assets?: RobloxAsset[];
  onSelectAsset?: (asset: RobloxAsset) => void;
}

export function BottomRightCard({
  activeMode,
  activeAsset,
  services,
  assets,
  onSelectAsset,
}: BottomRightCardProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const activeService = services.find((s) => s.id === selectedServiceId) || services[0];

  return (
    <div className="absolute right-3 sm:right-8 bottom-3 sm:bottom-6 z-20 w-[335px] sm:w-[350px] pointer-events-auto flex flex-col items-end">
      {/* Model Switcher Pills di Layar Mobile (Muncul Tepat di Atas Card) */}
      {activeMode === 'assets' && assets && assets.length > 0 && (
        <div className="flex md:hidden items-center justify-center gap-1.5 mb-2 w-full">
          {assets.map((asset) => {
            const isSelected = asset.id === activeAsset.id;
            const shortTitle =
              asset.id === 'alfamart'
                ? 'Alfamart'
                : asset.id === 'rumah-1'
                ? 'Rumah 1'
                : 'Kopdes';

            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => onSelectAsset?.(asset)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md transition-all shadow-sm ${
                  isSelected
                    ? 'bg-slate-900 text-white ring-1 ring-sky-400 shadow-md scale-105'
                    : 'bg-white/80 hover:bg-white text-slate-800 border border-white/80'
                }`}
              >
                <img
                  src={asset.thumbnailUrl}
                  alt=""
                  className="w-3.5 h-3.5 rounded object-cover flex-shrink-0"
                />
                <span>{shortTitle}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Root Card Container: Ukuran pasti 350x270 tanpa padding pembungkus agar koordinat absolut lingkaran & SVG 100% selaras */}
      <div className="relative w-full h-[270px] text-slate-900 select-none">
        
        {/* SVG Translucent Frosted Glass Shape Asli dengan Lekukan Socket Konsentris */}
        <svg
          className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0_20px_50px_rgba(2,132,199,0.22)]"
          viewBox="0 0 350 270"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="lunarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.44)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.28)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.16)" />
            </linearGradient>
          </defs>

          {/* Path lekukan konsentris presisi berpusat di (48, 222) dengan radius 50 */}
          <path
            d="M 32,0 L 318,0 A 32,32 0 0,1 350,32 L 350,238 A 32,32 0 0,1 318,270 L 112.2,270 A 20,20 0 0,1 93.8,242.0 A 50,50 0 0,0 28.0,176.2 A 20,20 0 0,1 0,157.8 L 0,32 A 32,32 0 0,1 32,0 Z"
            fill="url(#lunarGlass)"
            className="backdrop-blur-3xl"
          />

          <path
            d="M 32,0 L 318,0 A 32,32 0 0,1 350,32 L 350,238 A 32,32 0 0,1 318,270 L 112.2,270 A 20,20 0 0,1 93.8,242.0 A 50,50 0 0,0 28.0,176.2 A 20,20 0 0,1 0,157.8 L 0,32 A 32,32 0 0,1 32,0 Z"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="1.5"
          />
        </svg>

        {activeMode === 'assets' ? (
          // ====================================================
          // MODE A: Ready-made Asset (Tanpa Teks Harga)
          // ====================================================
          <div className="w-full h-full">
            {/* Konten Atas Card */}
            <div className="pt-5 px-6">
              {/* Baris Atas: Kategori & Tombol Aksi Kanan Atas */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-sky-900 bg-white/60 px-2.5 py-0.5 rounded-full font-bold border border-white/60">
                    {activeAsset.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mt-1.5 truncate drop-shadow-sm">
                    {activeAsset.title}
                  </h3>
                </div>

                {/* Tombol Panah Buka BuiltByBit */}
                <a
                  href={activeAsset.externalLinks.builtByBitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Buka BuiltByBit Store"
                  className="w-9 h-9 rounded-full bg-white shadow-md hover:bg-slate-900 hover:text-white text-slate-900 flex items-center justify-center flex-shrink-0 transition-colors group"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Deskripsi Singkat */}
              <p className="mt-1.5 text-xs text-slate-700/90 font-medium leading-relaxed line-clamp-2">
                {activeAsset.description}
              </p>

              {/* Garis Spesifikasi (Parts & Dimensi, Bebas Harga) */}
              <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-800 font-semibold pb-2 border-b border-white/40">
                <span>{activeAsset.stats.partsCount}</span>
                <span className="text-slate-400">•</span>
                <span>{activeAsset.stats.dimensions}</span>
                <span className="text-slate-400">•</span>
                <span className="font-bold text-sky-900 font-mono">{activeAsset.stats.fileFormat}</span>
              </div>
            </div>

            {/* Tombol Lingkaran BuiltByBit: Berada Tepat di Pusat Lekukan (Center cx=48, cy=222) Tanpa Terkena Garis */}
            <a
              href={activeAsset.externalLinks.builtByBitUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Beli di BuiltByBit Store ↗"
              className="group absolute left-[11px] bottom-[11px] w-[74px] h-[74px] rounded-full bg-[#1b1c3e] hover:bg-[#252759] text-white flex flex-col items-center justify-center shadow-[0_12px_28px_rgba(27,28,62,0.45)] border-2 border-white/90 transition-transform hover:scale-105 active:scale-95 z-10"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <span className="text-amber-400 font-black text-lg tracking-tighter leading-none">
                    BBB
                  </span>
                  <span className="absolute -top-1 -right-2 text-[8px] text-amber-300 font-bold">
                    ↗
                  </span>
                </div>
                <span className="text-[7.5px] font-mono tracking-wider uppercase text-sky-200/90 font-bold mt-0.5">
                  BuiltByBit
                </span>
              </div>
            </a>
          </div>
        ) : (
          // ====================================================
          // MODE B: Custom Jasa Building & Objek (Tanpa Teks Harga)
          // ====================================================
          <div className="w-full h-full">
            {/* Konten Atas Card */}
            <div className="pt-5 px-6">
              {/* Header: Label Jasa & Estimasi */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-900 bg-indigo-100/80 px-2.5 py-0.5 rounded-full border border-indigo-200 w-fit">
                    Jasa Custom
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mt-1 truncate drop-shadow-sm">
                    {activeService.name}
                  </h3>
                </div>

                <span className="text-xs font-bold text-indigo-900 font-mono mt-1 flex-shrink-0 bg-white/60 px-2 py-0.5 rounded-md border border-white/60">
                  {activeService.estimatedTime}
                </span>
              </div>

              {/* Selector Tabs: Bangunan / Prop */}
              <div className="mt-2 grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-white/40 border border-white/50">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedServiceId(svc.id)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all truncate text-center ${
                      activeService.id === svc.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    {svc.id === 'single-building' ? 'Bangunan' : 'Prop / Objek'}
                  </button>
                ))}
              </div>

              {/* Ringkasan */}
              <p className="mt-2 text-xs text-slate-700 leading-snug line-clamp-2">
                {activeService.summary}
              </p>

              {/* Checklist Fitur: Digeser ke Kanan (pl-12) agar Bersih & Bebas dari Garis Lengkungan Kiri */}
              <div className="mt-2.5 space-y-1 pl-12">
                {activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-800 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Lingkaran Discord di Socket Kiri Bawah: Berada Tepat di Pusat Lekukan Tanpa Berimpit */}
            <a
              href={STUDIO_CONFIG.socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              title="Komunitas Discord Cylor Studios ↗"
              className="group absolute left-[11px] bottom-[11px] w-[74px] h-[74px] rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white flex flex-col items-center justify-center shadow-[0_12px_28px_rgba(88,101,242,0.45)] border-2 border-white/90 transition-transform hover:scale-105 active:scale-95 z-10"
            >
              <div className="flex flex-col items-center">
                <svg className="w-6 h-6 fill-white transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span className="text-[7.5px] font-mono tracking-wider uppercase text-indigo-100 font-bold mt-0.5">
                  Discord
                </span>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
