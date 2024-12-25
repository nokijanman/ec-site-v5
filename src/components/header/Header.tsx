import React from 'react';
import { ShoppingBag, Search, UserCircle } from 'lucide-react';
import { LanguageSwitch } from '../LanguageSwitch';
import { Language } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onLoginClick: () => void;
}

export const Header: React.FC<Props> = ({ lang, onLanguageChange, onLoginClick }) => {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        console.error('Google login error:', error.message);
        // TODO: Display error message to user
      }
    } catch (error: any) {
      console.error('Unexpected error during Google login:', error.message);
      // TODO: Display error message to user
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              {lang === 'en' ? 'Anime Store' : 'アニメストア'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search products...' : '商品を検索...'}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <LanguageSwitch currentLang={lang} onLanguageChange={onLanguageChange} />
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <UserCircle className="w-6 h-6" />
              <span>{lang === 'en' ? 'Login' : 'ログイン'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
