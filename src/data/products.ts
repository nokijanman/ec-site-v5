import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: {
      en: 'Limited Edition Figure - Sakura',
      ja: '限定版フィギュア - サクラ'
    },
    description: {
      en: 'Hand-crafted premium figure with exceptional detail',
      ja: '丁寧に作り込まれた premium フィギュア'
    },
    price: 12000,
    image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&q=80&w=400',
    category: 'figures'
  },
  {
    id: '2',
    name: {
      en: 'Collector\'s Edition Manga Box Set',
      ja: 'コレクターズエディション マンガボックスセット'
    },
    description: {
      en: 'Complete series with exclusive artwork',
      ja: '限定アートワーク付き完全版'
    },
    price: 8500,
    image: 'https://images.unsplash.com/photo-1614107151491-6876eecbff89?auto=format&fit=crop&q=80&w=400',
    category: 'manga'
  },
  {
    id: '3',
    name: {
      en: 'Anime Character Plush',
      ja: 'アニメキャラクターぬいぐるみ'
    },
    description: {
      en: 'Super soft premium plush toy',
      ja: '超やわらかプレミアムぬいぐるみ'
    },
    price: 3500,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400',
    category: 'plush'
  }
];