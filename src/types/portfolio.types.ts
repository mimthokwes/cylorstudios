export type BuildCategory = 'All' | 'Commercial' | 'Residential';

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
  thumbnailUrl: string;      // Path ke /thumbnails/...
  modelPaths: {
    obj: string;             // Path ke OBJ
    mtl: string;             // Path ke MTL
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
  estimatedTime: string;     // Contoh: "2 - 4 Hari"
}
