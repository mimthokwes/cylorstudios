import { Html, useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

export function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-900/80 px-6 py-4 backdrop-blur-md border border-white/10 text-white shadow-2xl">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-2" />
        <p className="text-xs font-semibold tracking-wider uppercase text-slate-300">
          Loading Roblox Asset...
        </p>
        <span className="text-xs text-cyan-400 font-mono mt-1">
          {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}
