# CylorStudios — Technical Blueprint & Architecture Specification

Dokumen ini berisi cetak biru arsitektur, pemilihan *tech stack* yang terkendali, struktur direktori yang *scalable*, bedah tata letak berdasarkan referensi visual (`ref-page.jpeg`), serta metode teknis rendering model 3D Roblox (`.obj` + `.mtl`) di lingkungan web berbasis **React + TypeScript + Vite**.

---

## 1. Analisis Referensi Desain (`ref-page.jpeg`) ke Konteks CylorStudios

Referensi desain mengusung gaya **Modern Bento-Glassmorphism Single-Screen Viewport (`100vw × 100vh`)** dengan sudut membulat besar (*rounded viewport frame*) dan panel informasi mengambang (*floating HUD*) di atas latar visual utama yang interaktif.

### Pemetaan Elemen UI (Referensi -> CylorStudios)

| Posisi di Referensi | Elemen Asli di Referensi | Adaptasi untuk CylorStudios (Roblox Portfolio) |
| :--- | :--- | :--- |
| **Viewport Utama** | Gambar bangunan arsitektur layar penuh | **Interactive 3D Canvas (`100%`)** merender model bangunan `.obj` Roblox yang bisa diputar (*orbit*) & di-*zoom*. |
| **Top-Left Pill** | Tombol `"Buy"` | **Mode Switcher 1: `"Ready Assets"`** (Menampilkan katalog bangunan siap beli di BuiltByBit). |
| **Top-Center Notch** | Filter (`Location`, `Property Type`, `Max Price`) | **Quick Filter / Selector**: `Category` (Low-Poly, Realistic, Sci-Fi), `Asset Switcher` (Pilih Bangunan), `Scale` (Prop / Building / Map). |
| **Top-Right Pill** | Tombol `"Rent"` | **Mode Switcher 2: `"Custom Jasa"`** (Membuka panel layanan jasa *building* via Discord/WhatsApp/Fastwork). |
| **Left Vertical Rail** | Navigasi ikon vertikal + toggle tema | **Viewport Controls & Social Rail**: Reset Kamera, Auto-Rotate Toggle, Wireframe/Grid Toggle, serta ikon akses cepat ke Discord, WhatsApp, Fastwork, & BuiltByBit. |
| **Hero Typography** | Teks besar semi-transparan di belakang objek | **Studio Watermark Headline**: `"CYLOR STUDIOS"` atau nama bangunan aktif dengan opasitas halus di belakang objek 3D (*pointer-events: none* agar tidak menghalangi interaksi mouse ke 3D). |
| **Bottom-Left Cutout Card** | Kartu putih `"Find The Perfect Place"` + avatar stack `10K+` | **Studio Highlight & Asset Dock**: Ringkasan profil CylorStudios, statistik proyek selesai, dan **Thumbnail Switcher** untuk mengganti model 3D yang sedang tampil di layar. |
| **Bottom-Right Glass Card** | Kartu *frosted glass* `"Lunar Oasis Villa"` + tombol panah | **Active Model / Service Inspector**: Menampilkan nama bangunan aktif, jumlah *parts/triangles*, estimasi harga, dan tombol CTA bulat (`↗`) yang langsung mengarah ke halaman produk **BuiltByBit** (atau formulir/chat jasa). |

---

## 2. Tech Stack & Dependency Governance

Untuk menjaga ukuran *bundle* tetap ringan, menghindari konflik versi, dan memastikan kemudahan *maintenance*, berikut adalah daftar paket yang **wajib** dan **dilarang** diinstal tanpa alasan teknis yang jelas.

### Core Stack (Sudah Terpasang)
* **React 18+ & TypeScript**: Fondasi UI berbasis komponen dengan *strict type-checking*.
* **Vite**: *Build tool* dan *dev server* cepat.

### Paket Tambahan yang Diizinkan (Minimalist & Essential)
1. **`three` & `@types/three`**: Engine WebGL utama untuk memuat file `.obj` dan `.mtl`.
2. **`@react-three/fiber`**: *Renderer* React deklaratif untuk Three.js (memudahkan manajemen *lifecycle* memori 3D saat berganti model).
3. **`@react-three/drei`**: Kumpulan *helper* esensial (`OrbitControls`, `Center`, `Environment`, `ContactShadows`, `Html` loader).
4. **`lucide-react`**: Pustaka ikon ringan (*tree-shakeable*) untuk ikon pada *floating rail* dan tombol aksi.
5. **`tailwindcss` (Opsional / Direkomendasikan jika belum ada)**: Untuk membangun *glassmorphism* (`backdrop-blur-md`), *rounded cutout*, dan tata letak `h-screen w-screen overflow-hidden` dengan cepat. *(Jika tidak memakai Tailwind, gunakan CSS Modules standar di `src/styles/`)*.

> **Aturan Ketat Stack:** Jangan menginstal pustaka state management berat (Redux/Zustand) karena state aplikasi ini cukup dikelola oleh React `useState` / `useContext`. Jangan menginstal pustaka animasi tambahan jika transisi CSS standar sudah mencukupi.

---

## 3. Struktur Folder Scalable

Struktur ini memisahkan **data portofolio**, **logika 3D engine**, dan **komponen antarmuka (HUD)** sehingga penambahan aset Roblox baru di masa depan tidak perlu menyentuh kode komponen.

```text
CylorStudios-roblox/
├── public/
│   ├── models/                      # Folder khusus aset ekspor Roblox Studio
│   │   ├── medieval-tavern/
│   │   │   ├── model.obj            # File geometri utama
│   │   │   ├── model.mtl            # File material & warna Roblox
│   │   │   └── texture.png          # (Opsional) Tekstur jika ada
│   │   └── scifi-lobby/
│   │       ├── model.obj
│   │       └── model.mtl
│   └── thumbnails/                  # Screenshot/render ringan untuk tombol switcher bawah
│       ├── medieval-tavern.webp
│       └── scifi-lobby.webp
├── src/
│   ├── config/
│   │   └── studio.config.ts         # Link global (Discord, WA, Fastwork, BuiltByBit)
│   ├── data/
│   │   ├── assets.data.ts           # Daftar portofolio bangunan 3D (metadata & path .obj)
│   │   └── services.data.ts         # Daftar varian layanan jasa custom building
│   ├── types/
│   │   └── portfolio.types.ts       # Definisi TypeScript interface (AssetItem, ServicePackage)
│   ├── components/
│   │   ├── canvas/                  # Semua logika WebGL / Three.js
│   │   │   ├── StudioCanvas.tsx     # Wrapper <Canvas>, pencahayaan, dan kamera
│   │   │   ├── RobloxModel.tsx      # Loader .obj + .mtl dengan Auto-Center & Auto-Scale
│   │   │   └── CanvasLoader.tsx     # Indikator loading saat mengunduh file .obj
│   │   └── hud/                     # Komponen UI mengambang (mengikuti ref-page.jpeg)
│   │       ├── TopNavbar.tsx        # Pill "Ready Assets" / "Custom Jasa" & Filter Tengah
│   │       ├── LeftControlRail.tsx  # Rail kontrol kamera (Reset, Rotate) & ikon sosmed
│   │       ├── BottomLeftDock.tsx   # Kartu putih kiri bawah + switcher pilihan model
│   │       └── BottomRightCard.tsx  # Kartu glassmorphism detail aset / paket jasa
│   ├── App.tsx                      # State utama (activeMode, selectedAssetId, cameraControls)
│   ├── main.tsx
│   └── index.css                    # Styling global (overflow: hidden, glassmorphism utilities)
└── package.json
```

---

## 4. Metode Menampilkan & Mengoptimalkan Model `.obj` Roblox

Mengekspor bangunan dari Roblox Studio (`Export Selection...` -> `.obj`) memiliki karakteristik khusus: koordinat dunia Roblox sering kali jauh dari titik `(0,0,0)` dan skalanya sangat besar untuk kamera WebGL standar.

### Pipeline Rendering 3D

```text
[File .mtl] ──► MTLLoader ──► Preload Material
                                    │
                                    ▼
[File .obj] ──► OBJLoader (setMaterials) ──► Mesh Group
                                                 │
                                                 ▼
                                    [Auto-Center & Auto-Scale]
                                    (Menghitung BoundingBox agar
                                     ukuran selalu pas di layar)
                                                 │
                                                 ▼
                                    [Render di <StudioCanvas />]
```

### Implementasi Komponen `RobloxModel.tsx` (Konsep Skalabel)

Komponen ini memastikan setiap bangunan `.obj` yang Anda tambahkan otomatis berada di tengah, memiliki skala yang seragam, dan membersihkan memori GPU saat berganti model.

```tsx
import { useEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import * as THREE from 'three';

interface RobloxModelProps {
  objPath: string;
  mtlPath: string;
  targetSize?: number; // Ukuran standar maksimal di layar (default: 4 unit)
}

export function RobloxModel({ objPath, mtlPath, targetSize = 4 }: RobloxModelProps) {
  // 1. Muat file material (.mtl) terlebih dahulu
  const materials = useLoader(MTLLoader, mtlPath);

  // 2. Muat file geometri (.obj) dan terapkan materialnya
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // 3. Clone & Normalisasi Ukuran (Auto-Center & Auto-Scale)
  const normalizedScene = useMemo(() => {
    const cloned = obj.clone();

    // Hitung kotak pembatas (Bounding Box) asli dari Roblox Studio
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Hitung faktor skala agar sisi terpanjang bangunan sama dengan targetSize
    const maxAxis = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxAxis > 0 ? targetSize / maxAxis : 1;

    cloned.scale.setScalar(scaleFactor);

    // Geser posisi agar titik tengah model tepat berada di (0, 0, 0)
    cloned.position.set(
      -center.x * scaleFactor,
      -box.min.y * scaleFactor, // Letakkan bagian bawah bangunan tepat di lantai (y = 0)
      -center.z * scaleFactor
    );

    // Aktifkan bayangan untuk setiap mesh bagian bangunan
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return cloned;
  }, [obj, targetSize]);

  // 4. Bersihkan memori WebGL saat model diganti
  useEffect(() => {
    return () => {
      normalizedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.geometry.dispose();
        }
      });
    };
  }, [normalizedScene]);

  return <primitive object={normalizedScene} />;
}
```

### Tips Ekspor dari Roblox Studio agar Optimal di Web
1. **Posisikan Dekat Origin:** Sebelum klik *Export Selection*, pindahkan grup bangunan mendekati koordinat `(0, 0, 0)` di Roblox Studio untuk mencegah masalah presisi *floating-point*.
2. **Hapus Part Tersembunyi:** Hapus bagian dalam yang tidak terlihat kamera untuk menekan ukuran file `.obj` (usahakan di bawah **5 MB** per model agar cepat dimuat pengunjung).
3. **Nama File Konsisten:** Hindari spasi pada nama file (gunakan `medieval-tavern.obj`, bukan `Medieval Tavern Final.obj`).

---

## 5. Desain Skema Data (`src/types/portfolio.types.ts` & `src/data/`)

Agar website mudah dikembangkan tanpa mengubah struktur UI, gunakan kontrak data berikut:

```typescript
// src/types/portfolio.types.ts
export type BuildCategory = 'Low-Poly' | 'Realistic' | 'Sci-Fi' | 'Traditional';

export interface RobloxAsset {
  id: string;
  title: string;
  category: BuildCategory;
  description: string;
  stats: {
    partsCount: string;      // Contoh: "1,450 Parts"
    dimensions: string;      // Contoh: "120x120 Studs"
    fileFormat: string;      // Contoh: ".rbxm / .obj"
  };
  priceLabel: string;        // Contoh: "$12.00" atau "Rp 150.000"
  thumbnailUrl: string;      // Path ke /thumbnails/...
  modelPaths: {
    obj: string;             // Path ke /models/.../model.obj
    mtl: string;             // Path ke /models/.../model.mtl
  };
  externalLinks: {
    builtByBitUrl: string;   // Link langsung ke halaman produk BuiltByBit
  };
}

export interface ServicePackage {
  id: string;
  name: string;              // Contoh: "Single Landmark Building"
  tierLabel: string;         // Contoh: "Popular"
  summary: string;
  deliverables: string[];    // Poin fitur yang didapat klien
  startingPrice: string;     // Contoh: "Mulai Rp 100.000"
  estimatedTime: string;     // Contoh: "2 - 4 Hari"
}
```

---

## 6. Alur Interaksi Pengguna (User Flow)

1. **First Load (`0 - 2 detik`)**:
   * Layar penuh menampilkan bingkai utama dengan sudut membulat (`rounded-[32px]`).
   * Model 3D unggulan pertama langsung dimuat dan berputar perlahan (*auto-rotate*).
   * Pengunjung bisa langsung mengklik dan menyeret layar untuk memutar bangunan 360 derajat.
2. **Eksplorasi Katalog Aset (Mode `"Ready Assets"`)**:
   * Pengunjung mengklik *thumbnail* bangunan lain pada kartu putih di **pojok kiri bawah** (`BottomLeftDock`).
   * Canvas 3D mengganti model secara instan; kartu *glassmorphism* di **pojok kanan bawah** (`BottomRightCard`) memperbarui nama, spesifikasi *parts*, harga, dan tautan beli.
   * Klik tombol panah (`↗`) pada kartu kanan bawah akan membuka tab baru menuju toko **BuiltByBit** milik CylorStudios.
3. **Eksplorasi Layanan Jasa (Mode `"Custom Jasa"`)**:
   * Pengunjung mengklik tombol pill `"Custom Jasa"` di **pojok kanan atas** (`TopNavbar`).
   * Kartu *glassmorphism* kanan bawah berubah menampilkan paket jasa *custom building* (Prop Pack, Single Building, Full Map).
   * Pengunjung mengklik tombol **"Konsultasi via Discord"** atau **"Chat WhatsApp / Fastwork"** untuk mulai berdiskusi spesifikasi map yang diinginkan.

---

## 7. Checklist Eksekusi Pengembangan

- [ ] **Tahap 1 — Setup Dependensi:** Instal `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, dan `lucide-react`.
- [ ] **Tahap 2 — Persiapan Aset:** Masukkan minimal 2 sampel bangunan Roblox (`.obj` + `.mtl` + gambar *thumbnail*) ke dalam `public/models/` dan `public/thumbnails/`.
- [ ] **Tahap 3 — Konfigurasi Data:** Isi `src/config/studio.config.ts` (link Discord, WA, Fastwork, BuiltByBit) dan `src/data/assets.data.ts`.
- [ ] **Tahap 4 — Implementasi 3D Viewport:** Bangun `StudioCanvas.tsx` dan `RobloxModel.tsx`, lalu pastikan *auto-center* dan pencahayaan membuat tekstur Roblox terlihat tajam.
- [ ] **Tahap 5 — Implementasi Bento-Glass HUD:** Bangun `TopNavbar`, `LeftControlRail`, `BottomLeftDock`, dan `BottomRightCard` di atas kanvas 3D dengan kunci layar `h-screen w-screen overflow-hidden`.
- [ ] **Tahap 6 — Uji Responsivitas:** Pastikan pada layar mobile/tablet, panel kartu bawah tidak menutupi seluruh objek 3D (gunakan mode ringkas/collapsible pada layar kecil).