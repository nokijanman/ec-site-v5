import React from 'react';
import { Play } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  lang: Language;
}

export const FeaturedAnime: React.FC<Props> = ({ lang }) => (
  <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8">
        {lang === 'en' ? 'Featured Anime Series' : '注目アニメシリーズ'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1612487528505-d2338264c821?auto=format&fit=crop&q=80&w=800"
            alt="Anime series"
            className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-bold mb-2">
              {lang === 'en' ? 'Spirit Chronicles' : 'スピリットクロニクル'}
            </h3>
            <p className="text-gray-200 mb-4">
              {lang === 'en' 
                ? 'Exclusive merchandise from the latest season'
                : '最新シーズンの限定グッズ'}
            </p>
            <button className="bg-white/90 hover:bg-white text-indigo-900 px-4 py-2 rounded-full inline-flex items-center gap-2 w-fit">
              <Play className="w-4 h-4" />
              {lang === 'en' ? 'Watch Trailer' : 'トレーラーを見る'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-161248752850${i}-d2338264c821?auto=format&fit=crop&q=80&w=400`}
                alt="Anime thumbnail"
                className="w-full h-[140px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-medium text-sm">
                  {lang === 'en' ? `Series ${i}` : `シリーズ ${i}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);