import type { RobloxAsset } from '../types/portfolio.types';

export const ASSETS_DATA: RobloxAsset[] = [
  {
    id: 'scifi-lobby',
    title: 'Neo-Vanguard Sci-Fi Lobby',
    category: 'Sci-Fi',
    description: 'Central hub futuristik untuk RPG cyberpunk & simulator Roblox. Part teroptimasi.',
    stats: {
      partsCount: '1,240 Parts',
      dimensions: '160x160 Studs',
      fileFormat: '.rbxm / .obj',
    },
    priceLabel: '$14.99 (Rp 185.000)',
    thumbnailUrl: '/thumbnails/scifi-lobby.svg',
    modelPaths: {
      obj: '/models/scifi-lobby/model.obj',
      mtl: '/models/scifi-lobby/model.mtl',
    },
    externalLinks: {
      builtByBitUrl: 'https://builtbybit.com/resources/roblox',
      fastworkUrl: 'https://fastwork.id/user/cylorstudios',
    },
  },
  {
    id: 'medieval-tavern',
    title: 'The Oak & Flagon Tavern',
    category: 'Traditional',
    description: 'Tavern medieval fantasy dengan timber frame, cerobong batu, & interior modular.',
    stats: {
      partsCount: '860 Parts',
      dimensions: '85x95 Studs',
      fileFormat: '.rbxm / .obj',
    },
    priceLabel: '$9.99 (Rp 120.000)',
    thumbnailUrl: '/thumbnails/medieval-tavern.svg',
    modelPaths: {
      obj: '/models/medieval-tavern/model.obj',
      mtl: '/models/medieval-tavern/model.mtl',
    },
    externalLinks: {
      builtByBitUrl: 'https://builtbybit.com/resources/roblox',
      fastworkUrl: 'https://fastwork.id/user/cylorstudios',
    },
  },
];
