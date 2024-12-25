import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product, Language } from '../types';

interface Props {
  product: Product;
  lang: Language;
}

export const ProductCard: React.FC<Props> = ({ product, lang }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name[lang]}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name[lang]}</h3>
        <p className="text-gray-600 mb-3">{product.description[lang]}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">¥{product.price.toLocaleString()}</span>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md">
            <ShoppingCart className="w-4 h-4" />
            {lang === 'en' ? 'Add to Cart' : 'カートに追加'}
          </button>
        </div>
      </div>
    </div>
  );
};
