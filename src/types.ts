export interface MenuItem {
  id: string;
  name: string;
  description: {
    es: string;
    en: string;
    it: string;
  };
  price: number;
}

export interface MenuCategory {
  id: string;
  titleKey: string;
  categoryImage?: string;
  items: MenuItem[];
}
