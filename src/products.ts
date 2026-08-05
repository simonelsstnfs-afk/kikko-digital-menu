import { Product, Review } from './types';

export const GOOGLE_MAPS_REVIEW_URL = 'https://maps.app.goo.gl/kikkoPizzeriaTenerife'; // Enlace directo a reseñas de Google My Business
export const PHONE_WHATSAPP = '34600000000'; // Número de WhatsApp oficial

export const STARTERS: Product[] = [
  {
    id: 's1',
    name: 'Pan de Ajo Supremo',
    description: {
      es: 'Pan artesanal horneado con mantequilla de ajo, hierbas aromáticas y mozzarella fundida.',
      en: 'Artisan bread baked with garlic butter, herbs, and melted mozzarella.',
      it: 'Pane artigianale al forno con burro all\'aglio, erbe e mozzarella fusa.'
    },
    price: 5.50,
    imageUrl: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=800',
    popular: true,
    vegetarian: true,
    category: 'starters'
  },
  {
    id: 's2',
    name: 'Provolone al Horno',
    description: {
      es: 'Queso provolone fundido en cazuela de barro con salsa de tomate y orégano.',
      en: 'Melted provolone cheese baked in clay pot with tomato sauce and oregano.',
      it: 'Provolone fuso in terracotta con salsa di pomodoro e origano.'
    },
    price: 7.90,
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    chefRecommended: true,
    vegetarian: true,
    category: 'starters'
  },
  {
    id: 's3',
    name: 'Focaccia della Casa',
    description: {
      es: 'Masa madre crujiente con romero, aceite de oliva virgen extra y sal marina.',
      en: 'Crispy sourdough focaccia with rosemary, EVOO, and sea salt.',
      it: 'Focaccia croccante con rosmarino, olio EVO e sale marino.'
    },
    price: 4.90,
    imageUrl: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&q=80&w=800',
    vegetarian: true,
    category: 'starters'
  }
];

export const PIZZAS: Product[] = [
  {
    id: 'p1',
    name: 'Pizza Margherita',
    description: {
      es: 'Tomate, mozzarella y albahaca fresca.',
      en: 'Tomato, mozzarella, and fresh basil.',
      it: 'Pomodoro, mozzarella e basilico fresco.'
    },
    price: 7.00,
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?auto=format&fit=crop&q=80&w=800',
    popular: true,
    vegetarian: true,
    category: 'pizza'
  },
  {
    id: 'p8',
    name: 'Pizza Diavola',
    description: {
      es: 'Tomate, mozzarella y salami picante italiano.',
      en: 'Tomato, mozzarella, and spicy Italian salami.',
      it: 'Pomodoro, mozzarella e salame piccante.'
    },
    price: 8.50,
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    popular: true,
    spicy: true,
    category: 'pizza'
  },
  {
    id: 'p9',
    name: 'Pizza Golden',
    description: {
      es: 'Tomate, rúcula fresca, jamón serrano, escamas de parmesano y mozzarella de búfala.',
      en: 'Tomato, fresh rocket, prosciutto, parmesan flakes, and buffalo mozzarella.',
      it: 'Pomodoro, rucola fresca, prosciutto crudo, scaglie di parmigiano e mozzarella di bufala.'
    },
    price: 12.00,
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
    chefRecommended: true,
    category: 'pizza'
  },
  {
    id: 'p10',
    name: 'Pizza Carbonara Tradizionale',
    description: {
      es: 'Mozzarella, guanciale crujiente, crema de yemas de huevo, parmesano y pimienta negra.',
      en: 'Mozzarella, crispy guanciale, egg yolk cream, parmesan, and black pepper.',
      it: 'Mozzarella, guanciale croccante, crema di tuorli, parmigiano e pepe nero.'
    },
    price: 12.00,
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800',
    popular: true,
    chefRecommended: true,
    category: 'pizza'
  },
  {
    id: 'p12',
    name: 'Pizza Quattro Formaggi',
    description: {
      es: 'Mozzarella, gorgonzola, queso ahumado provola y parmesano.',
      en: 'Mozzarella, gorgonzola, smoked provola, and parmesan.',
      it: 'Mozzarella, gorgonzola, provola affumicata e parmigiano.'
    },
    price: 11.00,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    vegetarian: true,
    category: 'pizza'
  }
];

export const RISOTTOS: Product[] = [
  {
    id: 'r1',
    name: 'Risotto ai Funghi Porcini',
    description: {
      es: 'Arroz Carnaroli cremoso con setas Porcini silvestres, mantequilla de trufa y parmesano mantecado.',
      en: 'Creamy Carnaroli rice with wild Porcini mushrooms, truffle butter, and parmesan.',
      it: 'Riso Carnaroli mantecato con funghi porcini, burro al tartufo e parmigiano.'
    },
    price: 13.50,
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=800',
    chefRecommended: true,
    vegetarian: true,
    category: 'risottos'
  },
  {
    id: 'r2',
    name: 'Risotto ai Frutti di Mare',
    description: {
      es: 'Risotto marinero con gambas, calamares, mejillones y toque de vino blanco italiano.',
      en: 'Seafood risotto with prawns, squid, mussels, and a touch of white wine.',
      it: 'Risotto alla marinara con gamberi, calamari, cozze e sfumatura di vino bianco.'
    },
    price: 14.90,
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800',
    popular: true,
    category: 'risottos'
  },
  {
    id: 'r3',
    name: 'Risotto Quattro Formaggi & Noci',
    description: {
      es: 'Risotto suave de cuatro quesos seleccionados con nueces tostadas crujientes.',
      en: 'Smooth four-cheese risotto served with crunchy toasted walnuts.',
      it: 'Risotto cremoso ai quattro formaggi con noci tostate croccanti.'
    },
    price: 12.90,
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=800',
    vegetarian: true,
    category: 'risottos'
  }
];

export const SECONDI: Product[] = [
  {
    id: 'sec1',
    name: 'Scaloppine al Limone',
    description: {
      es: 'Finísimos filetes de ternera tierna en suave salsa reducida de limón fresco y perejil.',
      en: 'Tender veal escalopes in a smooth reduced fresh lemon and parsley sauce.',
      it: 'Sottili fettine di vitello in salsa ristretta al limone fresco e prezzemolo.'
    },
    price: 14.50,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    chefRecommended: true,
    category: 'secondi'
  },
  {
    id: 'sec2',
    name: 'Pollo alla Cacciatora',
    description: {
      es: 'Pechuga de pollo al estilo cazador con tomate, pimientos, olivas negras y romero.',
      en: 'Hunter style chicken breast with tomatoes, peppers, black olives, and rosemary.',
      it: 'Petto di pollo alla cacciatrice con pomodoro, peperoni, olive nere e rosmarino.'
    },
    price: 13.00,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800',
    popular: true,
    category: 'secondi'
  },
  {
    id: 'sec3',
    name: 'Tagliata de Ternera con Rúcula y Parmesano',
    description: {
      es: 'Lomo de ternera a la parrilla trinchado con rúcula fresca, tomate cherry y escamas de queso.',
      en: 'Sliced grilled beef sirloin served over fresh rocket, cherry tomatoes, and parmesan flakes.',
      it: 'Tagliata di controfiletto alla griglia su letto di rucola, pomodorini e scaglie.'
    },
    price: 16.90,
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
    chefRecommended: true,
    category: 'secondi'
  }
];

export const BURGERS: Product[] = [
  {
    id: 'b1',
    name: 'Burger Kikko Gourmet',
    description: {
      es: '200g de ternera 100%, provolone fundido, guanciale crujiente, rúcula y salsa especial.',
      en: '200g 100% beef, melted provolone, crispy guanciale, rocket, and house sauce.',
      it: '200g di manzo, provolone fuso, guanciale croccante, rucola e salsa della casa.'
    },
    price: 11.50,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    popular: true,
    chefRecommended: true,
    category: 'burgers'
  },
  {
    id: 'b2',
    name: 'Burger Chicken Crispy',
    description: {
      es: 'Pollo frito crujiente estilo italiano, lechuga, tomate cherry y mahonesa de miel y mostaza.',
      en: 'Crispy Italian style fried chicken, lettuce, cherry tomatoes, and honey mustard mayo.',
      it: 'Pollo fritto croccante, lattuga, pomodorini e maionese al miele e senape.'
    },
    price: 10.50,
    imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800',
    category: 'burgers'
  }
];

export const DESSERTS: Product[] = [
  {
    id: 'd1',
    name: 'Tiramisú Tradizionale',
    description: {
      es: 'Receta familiar casera con bizcocho savoiardi, café expreso y crema de mascarpone.',
      en: 'Homemade family recipe with savoiardi biscuits, espresso, and mascarpone cream.',
      it: 'Ricetta di famiglia con savoiardi, caffè espresso e crema al mascarpone.'
    },
    price: 4.80,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    popular: true,
    chefRecommended: true,
    vegetarian: true,
    category: 'desserts'
  },
  {
    id: 'd2',
    name: 'Cannoli Siciliani (2 ud)',
    description: {
      es: 'Masa crujiente rellena de ricotta dulce de oveja, chips de chocolate y pistacho.',
      en: 'Crispy pastry shells filled with sweet sheep ricotta, chocolate chips, and pistachio.',
      it: 'Cialda croccante ripiena di ricotta dolce, gocce di cioccolato e granella di pistacchio.'
    },
    price: 4.50,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    vegetarian: true,
    category: 'desserts'
  }
];

export const DRINKS: Product[] = [
  {
    id: 'dr1',
    name: 'Birra Peroni / Nastro Azzurro (33cl)',
    description: {
      es: 'Cerveza rubia italiana refrescante y equilibrada.',
      en: 'Refreshing and balanced Italian lager beer.',
      it: 'Birra chiara italiana rinfrescante e bilanciata.'
    },
    price: 2.80,
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'dr2',
    name: 'Agua Mineral con Gas San Pellegrino (50cl)',
    description: {
      es: 'Agua mineral con gas de los Alpes italianos.',
      en: 'Sparkling mineral water from the Italian Alps.',
      it: 'Acqua minerale frizzante delle Alpi italiane.'
    },
    price: 2.50,
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  }
];

export const COMBOS: Product[] = [
  {
    id: 'c1',
    name: 'Combo Pareja Italiana',
    description: {
      es: '1 Pizza Mediana + 1 Entrante a elegir + 2 Bebidas.',
      en: '1 Medium Pizza + 1 Starter of choice + 2 Drinks.',
      it: '1 Pizza Media + 1 Antipasto a scelta + 2 Bevande.'
    },
    price: 22.99,
    imageUrl: 'https://images.unsplash.com/photo-1627485937980-221c88ce04ea?auto=format&fit=crop&q=80&w=800',
    category: 'combos'
  },
  {
    id: 'c2',
    name: 'Combo Festa Familiar',
    description: {
      es: '2 Pizzas Familiares + 1 Risotto o Pasta + 4 Bebidas + 2 Tiramisú.',
      en: '2 Family Pizzas + 1 Risotto or Pasta + 4 Drinks + 2 Tiramisu.',
      it: '2 Pizze Familiari + 1 Risotto o Pasta + 4 Bevande + 2 Tiramisù.'
    },
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800',
    popular: true,
    chefRecommended: true,
    category: 'combos'
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...STARTERS,
  ...PIZZAS,
  ...RISOTTOS,
  ...SECONDI,
  ...BURGERS,
  ...DESSERTS,
  ...DRINKS,
  ...COMBOS
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    authorName: "Lina Oliveira",
    rating: 5,
    text: "¡Todo excelente! Muy recomendable. Buena pizza, buena hamburguesa, y lo mejor el trato excelente, Francesco un trabajador muy amable. El mejor sitio en el que hemos estado en la zona de Puerto Santiago.",
    time: "Hace 2 meses",
    profilePhotoUrl: "https://ui-avatars.com/api/?name=Lina+Oliveira&background=3F6212&color=fff"
  },
  {
    id: "r2",
    authorName: "Angela Aranega",
    rating: 5,
    text: "¡Si quieres comer una auténtica pizza italiana, tienes que probarla! Masa fina, buenos ingredientes y ellos muy amables en el trato.",
    time: "Hace 2 meses",
    profilePhotoUrl: "https://ui-avatars.com/api/?name=Angela+Aranega&background=C2410C&color=fff"
  },
  {
    id: "r3",
    authorName: "NSR 75cc",
    rating: 5,
    text: "La masa de pizza increíblemente buena, el tomate riquísimo, la carbonara espectacular con su huevo y su guanchale, todos los ingredientes súper frescos y de calidad. El personal muy agradable. Muy bien de precio.",
    time: "Hace 9 meses",
    profilePhotoUrl: "https://ui-avatars.com/api/?name=NSR+75cc&background=3F6212&color=fff"
  },
  {
    id: "r4",
    authorName: "Enza Bari",
    rating: 5,
    text: "¡Una pizza casera riquísima! Ingredientes frescos, y la masa una delicia. El servicio óptimo y súper rápido. Es de recomendación absoluta hasta por los precios. ¡Le doy un 10! 😍",
    time: "Hace 2 años",
    profilePhotoUrl: "https://ui-avatars.com/api/?name=Enza+Bari&background=C2410C&color=fff"
  }
];

