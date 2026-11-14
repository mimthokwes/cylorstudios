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
  // 1. Muat file material (.mtl)
  const materials = useLoader(MTLLoader, mtlPath);

  // 2. Muat file geometri (.obj) dan pasang material
  const obj = useLoader(OBJLoader, objPath, (loader) => {
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

    // Aktifkan bayangan dan perbaiki material properties
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const updateMaterial = (mat: THREE.Material) => {
          const m = mat.clone();
          if ('wireframe' in m) {
            (m as THREE.MeshStandardMaterial).wireframe = wireframe;
          }
          m.side = THREE.DoubleSide;
          return m;
        };

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
      normalizedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });
    };
  }, [normalizedScene]);

  return <primitive object={normalizedScene} />;
}
