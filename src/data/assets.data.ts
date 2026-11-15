import type { RobloxAsset } from '../types/portfolio.types';

export const ASSETS_DATA: RobloxAsset[] = [
  {
    id: 'alfamart',
    title: 'Minimarket Alfamart',
    category: 'Commercial',
    description: 'Bangunan Alfamart modern lengkap dengan fasad merah-kuning ikonik, kanopi kaca, rak etalase belanja, dan tekstur part realistis.',
    stats: {
      partsCount: '1,850+ Parts',
      dimensions: '90x65 Studs',
      fileFormat: '.obj & Tekstur',
    },
    thumbnailUrl: '/thumbnails/alfamart.svg',
    modelPaths: {
      obj: '/model building roblos/alfamart/.obj/alfamart.obj',
      mtl: '/model building roblos/alfamart/.obj/alfamart.mtl',
    },
    externalLinks: {
      builtByBitUrl: 'https://builtbybit.com/resources/roblox',
      fastworkUrl: 'https://fastwork.id/user/cylorstudios',
    },
  },
  {
    id: 'rumah-1',
    title: 'Rumah Modern Minimalis 1',
    category: 'Residential',
    description: 'Hunian modern minimalis tropis 1 lantai beraksen kayu elegan, dilengkapi carport luas, teras depan, dan jendela kaca panoramik.',
    stats: {
      partsCount: '1,650+ Parts',
      dimensions: '80x70 Studs',
      fileFormat: '.obj & Tekstur',
    },
    thumbnailUrl: '/thumbnails/rumah-1.svg',
    modelPaths: {
      obj: '/model building roblos/rumah 1/.obj/r1.obj',
      mtl: '/model building roblos/rumah 1/.obj/r1.mtl',
    },
    externalLinks: {
      builtByBitUrl: 'https://builtbybit.com/resources/roblox',
      fastworkUrl: 'https://fastwork.id/user/cylorstudios',
    },
  },
  {
    id: 'kopdes',
    title: 'Koperasi Desa (Kopdes)',
    category: 'Commercial',
    description: 'Bangunan toko koperasi unit desa bernuansa hijau dengan rolling door besi, kanopi teras, dan etalase komersial serba guna warga desa.',
    stats: {
      partsCount: '1,150+ Parts',
      dimensions: '75x60 Studs',
      fileFormat: '.obj & Tekstur',
    },
    thumbnailUrl: '/thumbnails/kopdes.svg',
    modelPaths: {
      obj: '/model building roblos/kopdes/.obj/kopdes.obj',
      mtl: '/model building roblos/kopdes/.obj/kopdes.mtl',
    },
    externalLinks: {
      builtByBitUrl: 'https://builtbybit.com/resources/roblox',
      fastworkUrl: 'https://fastwork.id/user/cylorstudios',
    },
  },
];
