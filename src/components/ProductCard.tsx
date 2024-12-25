import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product, Language } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
  lang: Language;
  style?: React.CSSProperties;
}

export const ProductCard: React.FC<Props> = ({ product, lang, style }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // カード全体のクリックイベントを停止
    // カートに追加する処理
  };

  return (
    <div 
      onClick={handleClick}
      className="relative bg-gray-50 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] border border-gray-100 cursor-pointer animate-fade-in"
      style={style}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name[lang]}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">{product.name[lang]}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{product.description[lang]}</p>
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-colors duration-300">
            ¥{product.price.toLocaleString()}
          </span>
          <button 
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group/btn"
          >
            <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
            {lang === 'en' ? 'Add to Cart' : 'カートに追加'}
          </button>
        </div>
      </div>
    </div>
  );
};
