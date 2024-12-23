import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  lang: Language;
}

export const HeroSection: React.FC<Props> = ({ lang }) => (
  <div className="relative bg-indigo-900 text-white">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80"
        alt="Anime background"
        className="w-full h-full object-cover opacity-20"
      />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          {lang === 'en' 
            ? 'Your Ultimate Anime Collection Starts Here'
            : 'あなたの究極のアニメコレクションが始まる場所'}
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-indigo-200">
          {lang === 'en'
            ? 'Discover exclusive merchandise from your favorite anime series'
            : 'お気に入りのアニメシリーズから限定グッズを見つけよう'}
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-indigo-900 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {lang === 'en' ? 'View New Arrivals' : '新着商品を見る'}
          </button>
        </div>
      </div>
    </div>
  </div>
);