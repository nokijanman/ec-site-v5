import React from 'react';
import { Product, Language } from '../types';

interface Props {
  product: Product;
  lang: Language;
}

const ProductDetail: React.FC<Props> = ({ product, lang }) => {
  return (
    <div>
      <h3>{product.name[lang]}</h3>
      <p className="text-gray-600 mb-4">{product.description[lang]}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">¥{product.price}</span>
      </div>
    </div>
  );
};

export default ProductDetail;
