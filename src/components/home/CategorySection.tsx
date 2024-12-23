import React from 'react';
import { Language } from '../../types';

interface Category {
  id: string;
  name: {
    en: string;
    ja: string;
  };
  image: string;
}

const categories: Category[] = [
  {
    id: 'figures',
    name: {
      en: 'Figures & Statues',
      ja: 'フィギュア・スタチュー'
    },
    image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'manga',
    name: {
      en: 'Manga & Books',
      ja: 'マンガ・書籍'
    },
    image: 'https://images.unsplash.com/photo-1614107151491-6876eecbff89?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'apparel',
    name: {
      en: 'Apparel',
      ja: 'アパレル'
    },
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400'
  }
];

interface Props {
  lang: Language;
}

export const CategorySection: React.FC<Props> = ({ lang }) => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8">
        {lang === 'en' ? 'Shop by Category' : 'カテゴリーから探す'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={category.image}
                alt={category.name[lang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-white text-xl font-semibold p-6 w-full">
                {category.name[lang]}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);