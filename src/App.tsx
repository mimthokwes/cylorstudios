import { useState, useRef, useMemo } from 'react';
import { StudioCanvas, type StudioCanvasHandle } from './components/canvas/StudioCanvas';
import { TopNavbar } from './components/hud/TopNavbar';
import { LeftControlRail } from './components/hud/LeftControlRail';
import { BottomLeftDock } from './components/hud/BottomLeftDock';
import { BottomRightCard } from './components/hud/BottomRightCard';
import { ASSETS_DATA } from './data/assets.data';
import { SERVICES_DATA } from './data/services.data';
import type { BuildCategory, RobloxAsset } from './types/portfolio.types';

export default function App() {
  const [activeMode, setActiveMode] = useState<'assets' | 'services'>('assets');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(ASSETS_DATA[0].id);
  const [selectedCategory, setSelectedCategory] = useState<BuildCategory>('All');

  // 3D Canvas Controls
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);

  const canvasRef = useRef<StudioCanvasHandle>(null);

  // Filtered Assets based on Category
  const filteredAssets = useMemo(() => {
    if (selectedCategory === 'All') return ASSETS_DATA;
    return ASSETS_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Active Asset for 3D Viewport
  const activeAsset: RobloxAsset = useMemo(() => {
    const found = ASSETS_DATA.find((item) => item.id === selectedAssetId);
    return found || ASSETS_DATA[0];
  }, [selectedAssetId]);

  const handleSelectAsset = (asset: RobloxAsset) => {
    setSelectedAssetId(asset.id);
  };

  const handleResetCamera = () => {
    canvasRef.current?.resetCamera();
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc] flex items-center justify-center p-2 pt-6 sm:p-5 select-none">
      {/* Radiant Atmospheric Sky Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-white/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-sky-300/30 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Curved Viewport Frame */}
      <div className="relative w-full h-full max-w-[1560px] max-h-[920px] rounded-[24px] sm:rounded-[44px] overflow-hidden border-2 border-white/80 shadow-[0_25px_90px_rgba(2,132,199,0.28)] flex flex-col justify-between bg-gradient-to-b from-[#dbeafe] via-[#bae6fd] to-[#38bdf8]">
        
        {/* Sky Daylight Atmosphere & Cloud Highlights */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/60 blur-[130px] rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-sky-400/30 to-transparent" />
        </div>

        {/* Studio Typography Watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <span className="text-[14vw] sm:text-[10vw] font-black tracking-widest text-white/40 uppercase leading-none select-none drop-shadow-sm">
            CYLOR
          </span>
          <span className="text-[10px] sm:text-sm font-bold tracking-[0.22em] sm:tracking-[0.35em] uppercase text-sky-900/40 mt-1 text-center px-4">
            Roblox World Building & Asset Store
          </span>
        </div>

        {/* 3D Interactive Canvas Viewport */}
        <StudioCanvas
          ref={canvasRef}
          activeAsset={activeAsset}
          autoRotate={autoRotate}
          showGrid={showGrid}
          wireframe={wireframe}
        />

        {/* Floating Top Navbar */}
        <TopNavbar
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalAssetsCount={ASSETS_DATA.length}
        />

        {/* Floating Left Control & Social Rail */}
        <LeftControlRail
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid((prev) => !prev)}
          wireframe={wireframe}
          onToggleWireframe={() => setWireframe((prev) => !prev)}
          onResetCamera={handleResetCamera}
        />

        {/* Floating Bottom Left Studio Dock (Desktop Only) */}
        <BottomLeftDock
          assets={filteredAssets.length > 0 ? filteredAssets : ASSETS_DATA}
          selectedAssetId={activeAsset.id}
          onSelectAsset={handleSelectAsset}
        />

        {/* Floating Bottom Right Asset Card */}
        <BottomRightCard
          activeMode={activeMode}
          activeAsset={activeAsset}
          services={SERVICES_DATA}
          assets={filteredAssets.length > 0 ? filteredAssets : ASSETS_DATA}
          onSelectAsset={handleSelectAsset}
        />

        {/* Interactive Mouse Hint (Center Bottom) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[11px] font-semibold text-slate-700 shadow-md">
          <span>Putar 360° dengan mouse • Scroll untuk zoom</span>
        </div>
      </div>
    </main>
  );
}
