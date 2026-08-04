import { MenuCategory } from './types';

export const menuData: MenuCategory[] = [
  {
    id: 'entradas',
    title: 'Entradas',
    categoryImage: 'https://images.unsplash.com/photo-1599321955726-e048426594af?auto=format&fit=crop&q=80&w=1200&h=800',
    items: [
      {
        id: 'e1',
        name: 'Bruschetta Clásica',
        description: 'Pan rústico tostado, tomates cherry frescos, albahaca, ajo y aceite de oliva virgen extra.',
        price: 8.50
      },
      {
        id: 'e2',
        name: 'Provolone Fundido',
        description: 'Queso provolone fundido al horno de leña con orégano y un toque de peperoncino.',
        price: 11.00
      },
      {
        id: 'e3',
        name: 'Focaccia al Romero',
        description: 'Pan focaccia recién horneado con romero fresco y sal marina.',
        price: 6.00
      }
    ]
  },
  {
    id: 'pizzas',
    title: 'Pizzas',
    categoryImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=1200&h=800',
    items: [
      {
        id: 'pz1',
        name: 'Margherita DOC',
        description: 'Salsa de tomate San Marzano, mozzarella de búfala fresca, albahaca y aceite de oliva.',
        price: 14.00
      },
      {
        id: 'pz2',
        name: 'Diavola',
        description: 'Salsa de tomate, mozzarella fior di latte, salami picante italiano y aceitunas negras.',
        price: 15.50
      },
      {
        id: 'pz3',
        name: 'Quattro Formaggi',
        description: 'Mozzarella, gorgonzola, parmesano, provolone, sin salsa de tomate (pizza blanca).',
        price: 16.00
      },
      {
        id: 'pz4',
        name: 'Prosciutto e Funghi',
        description: 'Salsa de tomate, mozzarella, champiñones frescos y jamón cocido.',
        price: 15.00
      }
    ]
  },
  {
    id: 'pastas',
    title: 'Pastas',
    items: [
      {
        id: 'pt1',
        name: 'Spaghetti Carbonara',
        description: 'Auténtica carbonara romana con guanciale, yema de huevo, queso pecorino y pimienta negra.',
        price: 15.50
      },
      {
        id: 'pt2',
        name: 'Pappardelle al Ragù',
        description: 'Cinta de pasta ancha con salsa boloñesa de cocción lenta y parmesano rallado.',
        price: 16.50
      },
      {
        id: 'pt3',
        name: 'Ravioli de Ricotta y Espinacas',
        description: 'Pasta rellena servida con salsa de mantequilla y salvia fresca.',
        price: 17.00
      }
    ]
  },
  {
    id: 'postres',
    title: 'Postres',
    categoryImage: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=1200&h=800',
    items: [
      {
        id: 'po1',
        name: 'Tiramisú Clásico',
        description: 'Capas de bizcocho empapado en café espresso, crema de mascarpone y cacao en polvo.',
        price: 7.50
      },
      {
        id: 'po2',
        name: 'Panna Cotta',
        description: 'Suave flan de nata con coulis de frutos rojos y crujiente de almendras.',
        price: 6.50
      },
      {
        id: 'po3',
        name: 'Cannoli Siciliani',
        description: 'Tubos crujientes rellenos de crema de ricotta dulce con chispas de chocolate.',
        price: 7.00
      }
    ]
  }
];
