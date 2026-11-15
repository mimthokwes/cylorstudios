import {
  RotateCcw,
  Play,
  Pause,
  Grid,
  Box,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/studio.config';

interface LeftControlRailProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  onResetCamera: () => void;
}

export function LeftControlRail({
  autoRotate,
  onToggleAutoRotate,
  showGrid,
  onToggleGrid,
  wireframe,
  onToggleWireframe,
  onResetCamera,
}: LeftControlRailProps) {
  return (
    // Diposisikan rapi di sisi kiri atas dengan gaya Frosted Glass Transparan
    <aside className="absolute left-3 sm:left-6 top-24 sm:top-24 z-20 flex flex-col gap-2.5 pointer-events-auto">
      {/* 3D Viewport Controls Vertical Pill */}
      <div className="flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-full bg-white/55 backdrop-blur-3xl border border-white/70 shadow-[0_12px_30px_rgba(2,132,199,0.18)] text-slate-800">
        {/* Reset Camera */}
        <button
          onClick={onResetCamera}
          title="Reset Sudut Kamera"
          className="group relative p-2 sm:p-2.5 rounded-full hover:bg-white/60 hover:text-slate-950 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-rotate-45" />
          <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Reset Kamera
          </span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={onToggleAutoRotate}
          title={autoRotate ? 'Jeda Putaran' : 'Putar Otomatis'}
          className={`group relative p-2 sm:p-2.5 rounded-full transition-colors ${
            autoRotate
              ? 'bg-slate-900 text-white shadow-sm'
              : 'hover:bg-white/60 hover:text-slate-950'
          }`}
        >
          {autoRotate ? (
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
          <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            {autoRotate ? 'Jeda Putaran' : 'Putar 360°'}
          </span>
        </button>

        {/* Ground Grid Toggle */}
        <button
          onClick={onToggleGrid}
          title="Tampilkan Garis Grid"
          className={`group relative p-2 sm:p-2.5 rounded-full transition-colors ${
            showGrid
              ? 'bg-slate-900 text-white shadow-sm'
              : 'hover:bg-white/60 hover:text-slate-950'
          }`}
        >
          <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Toggle Grid
          </span>
        </button>

        {/* Wireframe Toggle */}
        <button
          onClick={onToggleWireframe}
          title="Tampilkan Wireframe Mesh"
          className={`group relative p-2 sm:p-2.5 rounded-full transition-colors ${
            wireframe
              ? 'bg-amber-500 text-white shadow-sm'
              : 'hover:bg-white/60 hover:text-slate-950'
          }`}
        >
          <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Roblox Wireframe
          </span>
        </button>
      </div>

      {/* External Platforms Vertical Pill (Desktop Only) */}
      <div className="hidden sm:flex flex-col items-center gap-2 p-2 rounded-full bg-white/45 backdrop-blur-3xl border border-white/60 shadow-[0_15px_35px_rgba(2,132,199,0.18)] text-slate-800">
        {/* WhatsApp */}
        <a
          href={STUDIO_CONFIG.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat WhatsApp"
          className="group relative p-2.5 rounded-full text-emerald-700 hover:bg-white/60 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            WhatsApp
          </span>
        </a>

        {/* Discord */}
        <a
          href={STUDIO_CONFIG.socials.discord}
          target="_blank"
          rel="noopener noreferrer"
          title="Discord Server"
          className="group relative p-2.5 rounded-full text-indigo-700 hover:bg-white/60 transition-colors"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Discord
          </span>
        </a>

        {/* BuiltByBit */}
        <a
          href={STUDIO_CONFIG.socials.builtByBit}
          target="_blank"
          rel="noopener noreferrer"
          title="BuiltByBit Resources"
          className="group relative p-2.5 rounded-full text-amber-700 hover:bg-white/60 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            BuiltByBit
          </span>
        </a>
      </div>
    </aside>
  );
}
