import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Language } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {
  lang: Language;
  onClose: () => void;
}

export const LoginForm: React.FC<Props> = ({ lang, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Login error:', error.message);
        // TODO: Display error message to user
      } else {
        console.log('Login successful');
        // TODO: Redirect user or update UI
      }
    } catch (error: any) {
      console.error('Unexpected error during login:', error.message);
      // TODO: Display error message to user
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {lang === 'en' ? 'Login' : 'ログイン'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'en' ? 'Email' : 'メールアドレス'}
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={lang === 'en' ? 'Enter your email' : 'メールアドレスを入力'}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'en' ? 'Password' : 'パスワード'}
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={lang === 'en' ? 'Enter your password' : 'パスワードを入力'}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {lang === 'en' ? 'Login' : 'ログイン'}
          </button>
          
          <div className="text-sm text-center space-y-2">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 block">
              {lang === 'en' ? 'Forgot password?' : 'パスワードをお忘れですか？'}
            </a>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              {lang === 'en' ? 'New to Anime Store?' : 'アニメストアは初めてですか？'}
            </h3>
            <p className="text-sm text-gray-600">
              {lang === 'en' 
                ? 'Sign up now to get access to exclusive anime merchandise and special offers!'
                : '新規会員登録で限定アニメグッズや特別オファーにアクセス！'}
            </p>
            <button
              type="button"
              className="w-full bg-white text-indigo-600 border-2 border-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
              onClick={() => {/* Handle sign up navigation */}}
            >
              {lang === 'en' ? 'Create Account' : '新規会員登録'}
            </button>
            <p className="text-xs text-gray-500">
              {lang === 'en'
                ? 'By signing up, you agree to our Terms of Service and Privacy Policy'
                : '会員登録により、利用規約とプライバシーポリシーに同意したものとみなされます'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
