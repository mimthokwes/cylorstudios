export type BuildCategory = 'All' | 'Low-Poly' | 'Realistic' | 'Sci-Fi' | 'Traditional';

export interface RobloxAsset {
  id: string;
  title: string;
  category: Exclude<BuildCategory, 'All'>;
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
    fastworkUrl?: string;
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
