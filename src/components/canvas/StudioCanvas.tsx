import { Suspense, forwardRef, useImperativeHandle, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { RobloxModel } from './RobloxModel';
import { CanvasLoader } from './CanvasLoader';
import type { RobloxAsset } from '../../types/portfolio.types';

export interface StudioCanvasHandle {
  resetCamera: () => void;
}

interface StudioCanvasProps {
  activeAsset: RobloxAsset;
  autoRotate: boolean;
  showGrid: boolean;
  wireframe: boolean;
}

export const StudioCanvas = forwardRef<StudioCanvasHandle, StudioCanvasProps>(
  function StudioCanvas({ activeAsset, autoRotate, showGrid, wireframe }, ref) {
    const controlsRef = useRef<OrbitControlsImpl>(null);

    useImperativeHandle(ref, () => ({
      resetCamera: () => {
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
      },
    }));

    return (
      <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [5.6, 4.2, 7.2], fov: 38 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        >
          {/* Daylight Sky Lighting */}
          <ambientLight intensity={1.3} color="#f0f9ff" />
          
          {/* Main Key Sunlight */}
          <directionalLight
            position={[9, 14, 7]}
            intensity={2.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={32}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-bias={-0.0001}
            color="#ffffff"
          />

          {/* Ambient Sky Fill Light */}
          <directionalLight position={[-8, 6, -4]} intensity={0.9} color="#bae6fd" />
          {/* Rim light */}
          <pointLight position={[0, 9, -7]} intensity={1.5} color="#e0f2fe" />

          {/* Grid Helper if enabled */}
          {showGrid && (
            <gridHelper
              args={[24, 24, '#ffffff', 'rgba(255,255,255,0.2)']}
              position={[0, -0.01, 0]}
            />
          )}

          {/* Soft Ground Shadow on Sky Floor */}
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.45}
            scale={12}
            blur={2.4}
            far={4}
            resolution={512}
            color="#0c4a6e"
          />

          {/* 3D Model with Suspense */}
          <Suspense fallback={<CanvasLoader />}>
            <RobloxModel
              key={activeAsset.id + (wireframe ? '-wf' : '')}
              objPath={activeAsset.modelPaths.obj}
              mtlPath={activeAsset.modelPaths.mtl}
              wireframe={wireframe}
              targetSize={3.2}
            />
            <Environment preset="city" environmentIntensity={0.5} />
          </Suspense>

          {/* Smooth Controls */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.06}
            autoRotate={autoRotate}
            autoRotateSpeed={1.0}
            maxPolarAngle={Math.PI / 2 + 0.02}
            minDistance={2.5}
            maxDistance={14}
          />
        </Canvas>
      </div>
    );
  }
);
