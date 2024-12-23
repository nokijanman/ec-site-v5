export type Language = 'en' | 'ja';

export interface Product {
  id: string;
  name: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  price: number;
  image: string;
  category: string;
}