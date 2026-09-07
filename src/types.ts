export interface MenuItem {
  id: string;
  name: string | { es: string; en: string; it: string };
  description: {
    es: string;
    en: string;
    it: string;
  };
  price: number;
  subcategory?: string;
  available?: boolean;
}

export interface PromoPillConfig {
  active: boolean;
  tag: { es: string; en: string; it: string } | string;
  title: { es: string; en: string; it: string } | string;
  targetCategory: string;
}

export interface MenuCategory {
  id: string;
  titleKey: string;
  categoryImage?: string;
  items: MenuItem[];
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  time: string;
  profilePhotoUrl: string;
}

