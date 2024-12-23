import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitch: React.FC<Props> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5" />
      <select
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-transparent border-none outline-none cursor-pointer"
      >
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
};