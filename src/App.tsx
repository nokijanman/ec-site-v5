import React, { useState } from 'react';
import { Header } from './components/header/Header';
import { LoginForm } from './components/auth/LoginForm';
import { HeroSection } from './components/home/HeroSection';
import { CategorySection } from './components/home/CategorySection';
import { FeaturedAnime } from './components/home/FeaturedAnime';
import { NewsSection } from './components/home/NewsSection';
import ProductList from './components/ProductList';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onLoginClick={() => setShowLogin(true)}
      />

      {showLogin && (
        <LoginForm
          lang={lang}
          onClose={() => setShowLogin(false)}
        />
      )}

      <HeroSection lang={lang} />
      <CategorySection lang={lang} />
      <FeaturedAnime lang={lang} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">
          {lang === 'en' ? 'Featured Products' : '注目商品'}
        </h2>
        <ProductList lang={lang} />
      </main>

      <NewsSection lang={lang} />

      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'en' ? 'About Us' : '会社概要'}
              </h3>
              <p className="text-gray-400">
                {lang === 'en'
                  ? 'Your premier destination for authentic anime merchandise.'
                  : '正規アニメグッズの premier ショップ'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'en' ? 'Customer Service' : 'カスタマーサービス'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>{lang === 'en' ? 'Shipping Info' : '配送について'}</li>
                <li>{lang === 'en' ? 'Returns' : '返品・交換'}</li>
                <li>{lang === 'en' ? 'Contact Us' : 'お問い合わせ'}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'en' ? 'Follow Us' : 'フォローする'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>Instagram</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
