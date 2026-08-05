import { MenuCategory } from './types';
import { STARTERS, PIZZAS, RISOTTOS, SECONDI, BURGERS, DESSERTS, DRINKS, COMBOS } from './products';

export const menuData: MenuCategory[] = [
  {
    id: 'entrantes',
    titleKey: 'tabStarters',
    categoryImage: 'https://images.unsplash.com/photo-1599321955726-e048426594af?auto=format&fit=crop&q=80&w=1200&h=800',
    items: STARTERS.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  },
  {
    id: 'pizzas',
    titleKey: 'tabPizzas',
    categoryImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=1200&h=800',
    items: PIZZAS.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  },
  {
    id: 'risottos',
    titleKey: 'tabRisottos',
    items: RISOTTOS.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  },
  {
    id: 'segundos',
    titleKey: 'tabSecondi',
    items: SECONDI.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  },
  {
    id: 'hamburguesas',
    titleKey: 'tabBurgers',
    items: BURGERS.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  },
  {
    id: 'postres',
    titleKey: 'tabDesserts',
    categoryImage: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=1200&h=800',
    items: DESSERTS.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  },
  {
    id: 'bebidas',
    titleKey: 'tabDrinks',
    items: DRINKS.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  },
  {
    id: 'combos',
    titleKey: 'tabCombos',
    items: COMBOS.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }))
  }
];
