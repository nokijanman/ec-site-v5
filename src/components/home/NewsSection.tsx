import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  lang: Language;
}

export const NewsSection: React.FC<Props> = ({ lang }) => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {lang === 'en' ? 'Latest News' : '最新ニュース'}
        </h2>
        <button className="text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-2">
          {lang === 'en' ? 'View All' : 'すべて見る'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <article key={i} className="group">
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img
                src={`https://images.unsplash.com/photo-161248752${i}850-d2338264c821?auto=format&fit=crop&q=80&w=400`}
                alt="News thumbnail"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 bg-indigo-600 text-white px-3 py-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">2024.03.{i}</span>
              </div>
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
              {lang === 'en' 
                ? `Latest anime merchandise announcement ${i}`
                : `最新アニメグッズの発表 ${i}`}
            </h3>
            <p className="text-gray-600 text-sm">
              {lang === 'en'
                ? 'Check out our latest collection of exclusive anime merchandise...'
                : '限定アニメグッズの最新コレクションをチェック...'}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);