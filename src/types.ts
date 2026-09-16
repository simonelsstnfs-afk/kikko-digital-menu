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
  allergens?: string[];
}

export type PromoType = 'dish' | 'promo_2x1' | 'discount' | 'special_event' | 'custom' | 'promo_new' | 'dish_suggestion' | 'event' | 'google_review' | 'booking';
export type PromoTargetType = 'dish' | 'category' | 'none' | 'google_review' | 'reservation';

export interface PromoPillConfig {
  active: boolean;
  tag: { es: string; en: string; it: string } | string;
  title: { es: string; en: string; it: string } | string;
  targetCategory?: string;
  // Campos extendidos para Dynamic Promotional Island:
  type?: PromoType;
  description?: { es: string; en: string; it: string } | string;
  price?: number | string;
  originalPrice?: number | string;
  targetType?: PromoTargetType;
  targetItemId?: string;
  image?: string;
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

