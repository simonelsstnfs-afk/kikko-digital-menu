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
