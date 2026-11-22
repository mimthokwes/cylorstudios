import { useEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import * as THREE from 'three';

interface RobloxModelProps {
  objPath: string;
  mtlPath: string;
  targetSize?: number;
  wireframe?: boolean;
}

export function RobloxModel({
  objPath,
  mtlPath,
  targetSize = 4.2,
  wireframe = false,
}: RobloxModelProps) {
  // Encode URI to safely handle spaces in directory and file names
  const safeMtlPath = useMemo(() => encodeURI(mtlPath), [mtlPath]);
  const safeObjPath = useMemo(() => encodeURI(objPath), [objPath]);

  // 1. Muat file material (.mtl) dan arahkan resourcePath untuk tekstur PNG
  const materials = useLoader(MTLLoader, safeMtlPath, (loader) => {
    const lastSlash = safeMtlPath.lastIndexOf('/');
    if (lastSlash !== -1) {
      const resourceBase = safeMtlPath.substring(0, lastSlash + 1);
      loader.setResourcePath(resourceBase);
    }
  });

  // 2. Muat file geometri (.obj) dan pasang material
  const obj = useLoader(OBJLoader, safeObjPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // 3. Normalisasi & Auto-Center
  const normalizedScene = useMemo(() => {
    const cloned = obj.clone(true);

    // Hitung BoundingBox asli
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Hitung skala seragam agar pas di viewport
    const maxAxis = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxAxis > 0 ? targetSize / maxAxis : 1;
    cloned.scale.setScalar(scaleFactor);

    // Posisikan titik tengah di x=0, z=0, dan lantai di y=0
    cloned.position.set(
      -center.x * scaleFactor,
      -box.min.y * scaleFactor,
      -center.z * scaleFactor
    );

    // Cache material agar ratusan part yang berbagi material tidak digandakan berulang kali
    const materialCache = new Map<THREE.Material, THREE.Material>();

    const updateMaterial = (mat: THREE.Material) => {
      const cached = materialCache.get(mat);
      if (cached) return cached;

      const m = mat.clone();
      if ('wireframe' in m) {
        (m as THREE.MeshStandardMaterial).wireframe = wireframe;
      }
      // Gunakan FrontSide untuk part solid guna memangkas beban rasterisasi poligon hingga 50%
      // DoubleSide hanya jika material transparan (misal kaca/kanopi)
      m.side = m.transparent ? THREE.DoubleSide : THREE.FrontSide;
      const anyMat = m as any;
      if (anyMat.map) {
        anyMat.map.colorSpace = THREE.SRGBColorSpace;
      }
      materialCache.set(mat, m);
      return m;
    };

    // Aktifkan bayangan dan perbaiki material properties
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map(updateMaterial);
        } else if (mesh.material) {
          mesh.material = updateMaterial(mesh.material);
        }
      }
    });

    return cloned;
  }, [obj, targetSize, wireframe]);

  // 4. Bersihkan alokasi memori WebGL
  useEffect(() => {
    return () => {
      const disposedMaterials = new Set<THREE.Material>();
      normalizedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => {
              if (!disposedMaterials.has(m)) {
                m.dispose();
                disposedMaterials.add(m);
              }
            });
          } else if (mesh.material && !disposedMaterials.has(mesh.material)) {
            mesh.material.dispose();
            disposedMaterials.add(mesh.material);
          }
        }
      });
    };
  }, [normalizedScene]);

  return <primitive object={normalizedScene} />;
}
