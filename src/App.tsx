import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import { Header } from './components/header/Header';
import { HeroSection } from './components/home/HeroSection';
import { CategorySection } from './components/home/CategorySection';
import { FeaturedAnime } from './components/home/FeaturedAnime';
import { NewsSection } from './components/home/NewsSection';
import ProductDetail from './components/ProductDetail';
import { LoginForm } from './components/auth/LoginForm';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { Language, Product } from './types';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Router>
      <Header lang={lang} onLanguageChange={setLang} onLoginClick={handleLoginClick} />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection lang={lang} />
            <CategorySection lang={lang} />
            <FeaturedAnime lang={lang} />
            <ProductList lang={lang} />
            <NewsSection lang={lang} />
          </>
        } />
        <Route path="/products/:id" element={<ProductDetailWrapper lang={lang} />} />
      </Routes>
      {isLoginModalOpen && <LoginForm lang={lang} onClose={handleCloseLoginModal} />}
    </Router>
  );
}

function ProductDetailWrapper({ lang }: { lang: Language }) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Could not fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductDetail product={product} lang={lang} />;
}

export default App;
