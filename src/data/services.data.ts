import type { ServicePackage } from '../types/portfolio.types';

export const SERVICES_DATA: ServicePackage[] = [
  {
    id: 'single-building',
    name: 'Custom Building / Landmark',
    tierLabel: 'Building',
    summary: 'Bangunan spesifik detail tinggi (Lobby, Rumah, Toko, Arena, dll).',
    deliverables: [
      'Eksterior & interior lengkap',
      'Format .obj teroptimasi',
    ],
    estimatedTime: '2 - 4 Hari',
  },
  {
    id: 'prop-bundle',
    name: 'Custom Prop & Objek 3D',
    tierLabel: 'Object/Prop',
    summary: 'Desain benda tematik (furnitur, ornamen, dekorasi map).',
    deliverables: [
      'Koleksi objek/benda custom',
      'Ringan & ramah performa Roblox',
    ],
    estimatedTime: '1 - 3 Hari',
  },
];
