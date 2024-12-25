import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { ProductCard } from './ProductCard';
import { Language, Product } from '../types';

interface ProductListProps {
  lang: Language;
}

const ProductList: React.FC<ProductListProps> = ({ lang }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');
        if (error) {
          setError(error.message);
        } else {
          setProducts(data || []);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>{lang === 'en' ? 'Loading products...' : '商品読み込み中...'}</p>;
  }

  if (error) {
    return <p>{lang === 'en' ? `Error: ${error}` : `エラー: ${error}`}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} lang={lang} style={{ animationDelay: `${index * 100}ms` }} />
      ))}
    </div>
  );
};

export default ProductList;
