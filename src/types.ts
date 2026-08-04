export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  categoryImage: string;
  items: MenuItem[];
}
