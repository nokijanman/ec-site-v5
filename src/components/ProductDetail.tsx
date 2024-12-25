import React from 'react';
import { ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { Product, Language } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
  lang: Language;
}

export const ProductDetail: React.FC<Props> = ({ product, lang }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        {lang === 'en' ? 'Back to Products' : '商品一覧に戻る'}
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 画像セクション */}
          <div className="relative overflow-hidden h-[500px] group">
            <img
              src={product.image}
              alt={product.name[lang]}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
              <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* 商品情報セクション */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name[lang]}
            </h1>
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-4xl font-bold mb-6">
              ¥{product.price.toLocaleString()}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description[lang]}
            </p>

            {/* 商品詳細情報 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold min-w-[120px]">
                  {lang === 'en' ? 'Category:' : 'カテゴリー：'}
                </span>
                <span>{product.category[lang]}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold min-w-[120px]">
                  {lang === 'en' ? 'Stock:' : '在庫：'}
                </span>
                <span className="text-green-600">
                  {lang === 'en' ? 'In Stock' : '在庫あり'}
                </span>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                <ShoppingCart className="w-5 h-5" />
                {lang === 'en' ? 'Add to Cart' : 'カートに追加'}
              </button>
              <button className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                {lang === 'en' ? 'Buy Now' : '今すぐ購入'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
