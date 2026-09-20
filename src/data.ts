import { MenuCategory } from './types';
import { STARTERS, PIZZAS, PASTAS, RISOTTOS, SECONDI, BURGERS, DESSERTS, DRINKS } from './products';
import { detectAllergensFromText } from './allergens';

export const menuData: MenuCategory[] = [
  {
    id: 'entrantes',
    titleKey: 'tabStarters',
    categoryImage: '/entrantes_1785956033574.webp',
    items: STARTERS.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'entrantes')
    }))
  },
  {
    id: 'pizzas',
    titleKey: 'tabPizzas',
    categoryImage: '/pizzas_1785956040596.webp',
    items: PIZZAS.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'pizzas')
    }))
  },
  {
    id: 'pastas',
    titleKey: 'tabPastas',
    categoryImage: '/pastas_1785956047802.webp',
    items: PASTAS.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'pastas')
    }))
  },
  {
    id: 'risottos',
    titleKey: 'tabRisottos',
    categoryImage: '/risottos_1785956058315.webp',
    items: RISOTTOS.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'risottos')
    }))
  },
  {
    id: 'segundos',
    titleKey: 'tabSecondi',
    categoryImage: '/segundos_1785956066731.webp',
    items: SECONDI.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'segundos')
    }))
  },
  {
    id: 'hamburguesas',
    titleKey: 'tabBurgers',
    categoryImage: '/hamburguesas_1785956074332.webp',
    items: BURGERS.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'hamburguesas')
    }))
  },
  {
    id: 'postres',
    titleKey: 'tabDesserts',
    categoryImage: '/postres_1785956082582.webp',
    items: DESSERTS.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'postres')
    }))
  },
  {
    id: 'bebidas',
    titleKey: 'tabDrinks',
    categoryImage: '/bebidas_1785956091901.webp',
    items: DRINKS.map(item => ({
      ...item,
      allergens: item.allergens ?? detectAllergensFromText(item.name, item.description, 'bebidas')
    }))
  }
];
