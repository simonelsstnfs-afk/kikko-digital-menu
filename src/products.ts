import { MenuItem, Review } from './types';

export const GOOGLE_MAPS_REVIEW_URL = 'https://maps.app.goo.gl/kikkoPizzeriaTenerife'; // Enlace directo a reseñas de Google My Business
export const PHONE_WHATSAPP = '34600000000'; // Número de WhatsApp oficial

export const STARTERS: MenuItem[] = [
  { id: 's1', name: 'Croquetas Mixtas Pollo y Jamón (6 unidades)', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's2', name: 'Aros de Cebolla (8 unidades)', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's3', name: 'Papas Fritas', description: { es: '', en: '', it: '' }, price: 4.00 },
  { id: 's4', name: 'Bruschetta con Tomate', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's5', name: 'Bruschetta con Ajo y Orégano', description: { es: '', en: '', it: '' }, price: 5.00 },
  { id: 's6', name: 'Pollo Frito', description: { es: '', en: '', it: '' }, price: 8.00 },
  { id: 's7', name: 'Alitas de Pollo BBQ (6 unidades)', description: { es: '', en: '', it: '' }, price: 9.00 },
  { id: 's8', name: '8 Nuggets con Papas Fritas', description: { es: '', en: '', it: '' }, price: 10.00 },
  { id: 's9', name: 'Jalapeños (8 unidades)', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's10', name: 'Chilli Cheese Bites (8 unidades)', description: { es: '', en: '', it: '' }, price: 6.00 },
];

export const PIZZAS: MenuItem[] = [
  { id: 'pi1', name: 'Focaccia', description: { es: '', en: '', it: '' }, price: 4.50 },
  { id: 'pi2', name: 'Pizza Margherita', description: { es: 'Tomate, mozzarella y albahaca', en: 'Tomate, mozzarella y albahaca', it: 'Tomate, mozzarella y albahaca' }, price: 7.00 },
  { id: 'pi3', name: 'Pizza York', description: { es: 'Tomate, mozzarella, york', en: 'Tomate, mozzarella, york', it: 'Tomate, mozzarella, york' }, price: 9.00 },
  { id: 'pi4', name: 'Pizza Marinara', description: { es: 'Tomate, ajo y orégano', en: 'Tomate, ajo y orégano', it: 'Tomate, ajo y orégano' }, price: 6.00 },
  { id: 'pi5', name: 'Pizza Jamón y Setas', description: { es: 'Tomate, mozzarella, jamón y mixto de setas', en: 'Tomate, mozzarella, jamón y mixto de setas', it: 'Tomate, mozzarella, jamón y mixto de setas' }, price: 10.00 },
  { id: 'pi6', name: 'Pizza Wurstel y Papas Fritas', description: { es: 'Tomate, mozzarella, frankfurt y papas fritas', en: 'Tomate, mozzarella, frankfurt y papas fritas', it: 'Tomate, mozzarella, frankfurt y papas fritas' }, price: 11.00 },
  { id: 'pi7', name: 'Pizza Hawai', description: { es: 'Tomate, mozzarella, york y piña', en: 'Tomate, mozzarella, york y piña', it: 'Tomate, mozzarella, york y piña' }, price: 10.00 },
  { id: 'pi8', name: 'Pizza Atún y Cebolla', description: { es: 'Tomate, mozzarella, atún y cebolla', en: 'Tomate, mozzarella, atún y cebolla', it: 'Tomate, mozzarella, atún y cebolla' }, price: 9.00 },
  { id: 'pi9', name: 'Pizza Diavola', description: { es: 'Tomate, mozzarella y salami picante', en: 'Tomate, mozzarella y salami picante', it: 'Tomate, mozzarella y salami picante' }, price: 9.00 },
  { id: 'pi10', name: 'Pizza Golden', description: { es: 'Tomate, rúcula, jamón serrano, parmesano y mozzarella de búfala', en: 'Tomate, rúcula, jamón serrano, parmesano y mozzarella de búfala', it: 'Tomate, rúcula, jamón serrano, parmesano y mozzarella de búfala' }, price: 13.00 },
  { id: 'pi11', name: 'Pizza Carbonara', description: { es: 'Mozzarella, guanciale, huevos, parmesano, pecorino y pimienta negra', en: 'Mozzarella, guanciale, huevos, parmesano, pecorino y pimienta negra', it: 'Mozzarella, guanciale, huevos, parmesano, pecorino y pimienta negra' }, price: 13.00 },
  { id: 'pi12', name: 'Pizza Vegetariana', description: { es: 'Tomate, mozzarella y verduras mixtas', en: 'Tomate, mozzarella y verduras mixtas', it: 'Tomate, mozzarella y verduras mixtas' }, price: 10.00 },
  { id: 'pi13', name: 'Pizza Quattro Formaggi', description: { es: 'Mozzarella, queso azul, queso ahumado y parmesano', en: 'Mozzarella, queso azul, queso ahumado y parmesano', it: 'Mozzarella, queso azul, queso ahumado y parmesano' }, price: 11.50 },
  { id: 'pi14', name: 'Pizza Hellvis', description: { es: 'Mozzarella, rúcula, pollo frito, tomate cherry y mostaza y miel', en: 'Mozzarella, rúcula, pollo frito, tomate cherry y mostaza y miel', it: 'Mozzarella, rúcula, pollo frito, tomate cherry y mostaza y miel' }, price: 13.00 },
  { id: 'pi15', name: 'Pizza Capricciosa', description: { es: 'Tomate, mozzarella, champiñones, jamón cocido y alcachofas', en: 'Tomate, mozzarella, champiñones, jamón cocido y alcachofas', it: 'Tomate, mozzarella, champiñones, jamón cocido y alcachofas' }, price: 10.00 },
  { id: 'pi16', name: 'Pizza Campesina', description: { es: 'Tomate, anchoas, aceitunas y orégano', en: 'Tomate, anchoas, aceitunas y orégano', it: 'Tomate, anchoas, aceitunas y orégano' }, price: 8.00 },
  { id: 'pi17', name: 'Pizza Rústica', description: { es: 'Mozzarella, queso ahumado, longaniza y friarelli', en: 'Mozzarella, queso ahumado, longaniza y friarelli', it: 'Mozzarella, queso ahumado, longaniza y friarelli' }, price: 12.00 },
  { id: 'pi18', name: 'Pizza Meat Feast', description: { es: 'Mozzarella, tomate, jamón cocido, wurstel, salami picante y cebolla', en: 'Mozzarella, tomate, jamón cocido, wurstel, salami picante y cebolla', it: 'Mozzarella, tomate, jamón cocido, wurstel, salami picante y cebolla' }, price: 13.00 },
  { id: 'pi19', name: 'Pizza Aurora', description: { es: 'Mozzarella, longaniza, queso ahumado', en: 'Mozzarella, longaniza, queso ahumado', it: 'Mozzarella, longaniza, queso ahumado' }, price: 10.00 },
  { id: 'pi20', name: 'Pizza Marinera', description: { es: 'Tomate, mozzarella, gambas, almejas, mejillones y perejil', en: 'Tomate, mozzarella, gambas, almejas, mejillones y perejil', it: 'Tomate, mozzarella, gambas, almejas, mejillones y perejil' }, price: 15.00 },
  { id: 'pi21', name: 'Pizza sin Gluten (Suplemento)', description: { es: '', en: '', it: '' }, price: 2.00 },
];

export const PASTAS: MenuItem[] = [
  { id: 'pa1', name: 'Gnocchi Sorrentina', description: { es: 'Tomate y mozzarella', en: 'Tomate y mozzarella', it: 'Tomate y mozzarella' }, price: 11.00 },
  { id: 'pa2', name: 'Spaghetti Carbonara', description: { es: 'Guanciale, huevos, parmesano pecorino y pimienta negra', en: 'Guanciale, huevos, parmesano pecorino y pimienta negra', it: 'Guanciale, huevos, parmesano pecorino y pimienta negra' }, price: 14.00 },
  { id: 'pa3', name: 'Spaghetti con Marisco', description: { es: 'Hecho con tintura de calamares', en: 'Hecho con tintura de calamares', it: 'Hecho con tintura de calamares' }, price: 16.00 },
  { id: 'pa4', name: 'Tagliatelle Boloñesa', description: { es: '', en: '', it: '' }, price: 12.00 },
  { id: 'pa5', name: 'Tagliatelle con Albóndigas', description: { es: '', en: '', it: '' }, price: 14.00 },
  { id: 'pa6', name: 'Lasaña Boloñesa', description: { es: '', en: '', it: '' }, price: 11.00 },
  { id: 'pa7', name: 'Ravioli de Ricotta y Espinaca', description: { es: 'Con mantequilla y salvia', en: 'Con mantequilla y salvia', it: 'Con mantequilla y salvia' }, price: 13.00 },
  { id: 'pa8', name: 'Gnocco Cuatro Quesos con Guanciale', description: { es: 'Parmesano, pecorino, queso ahumado, queso azul y guanciale', en: 'Parmesano, pecorino, queso ahumado, queso azul y guanciale', it: 'Parmesano, pecorino, queso ahumado, queso azul y guanciale' }, price: 14.00 },
  { id: 'pa9', name: 'Gnocco Amatriciana', description: { es: 'Salsa de tomate, guanciale y queso pecorino', en: 'Salsa de tomate, guanciale y queso pecorino', it: 'Salsa de tomate, guanciale y queso pecorino' }, price: 13.00 },
  { id: 'pa10', name: 'Linguini de Tinta de Calamares', description: { es: 'Con mantequilla, anchoas y burrata', en: 'Con mantequilla, anchoas y burrata', it: 'Con mantequilla, anchoas y burrata' }, price: 14.00 },
  { id: 'pa11', name: 'Pasta sin Gluten (Suplemento)', description: { es: '', en: '', it: '' }, price: 2.00 },
];

export const RISOTTOS: MenuItem[] = [
  { id: 'ri1', name: 'Arroz Meloso con Champiñones y Salchichas', description: { es: '', en: '', it: '' }, price: 15.00 },
  { id: 'ri2', name: 'Arroz Meloso con Azafrán y Osobuco', description: { es: '', en: '', it: '' }, price: 17.00 },
  { id: 'ri3', name: 'Arroz Meloso con Mariscos', description: { es: '', en: '', it: '' }, price: 17.00 },
  { id: 'ri4', name: 'Arroz Meloso con Alcachofas', description: { es: 'Guanciale y crema de queso azul', en: 'Guanciale y crema de queso azul', it: 'Guanciale y crema de queso azul' }, price: 16.00 },
  { id: 'ri5', name: 'Arroz Meloso con Hígado de Pollo y Salvia', description: { es: '', en: '', it: '' }, price: 14.00 },
];

export const SECONDI: MenuItem[] = [
  { id: 'se1', name: 'Albóndigas de Carne (12 unidades)', description: { es: 'Con salsa de tomate y pan casero', en: 'Con salsa de tomate y pan casero', it: 'Con salsa de tomate y pan casero' }, price: 13.00 },
  { id: 'se2', name: 'Albóndigas Fritas (10 unidades)', description: { es: '', en: '', it: '' }, price: 10.00 },
  { id: 'se3', name: 'Lomo Alto 300g', description: { es: 'Con rúcula, tomate cherry y parmesano', en: 'Con rúcula, tomate cherry y parmesano', it: 'Con rúcula, tomate cherry y parmesano' }, price: 19.00 },
  { id: 'se4', name: 'Tartar de Scottona 150g', description: { es: 'Carne italiana con pan casero', en: 'Carne italiana con pan casero', it: 'Carne italiana con pan casero' }, price: 17.00 },
  { id: 'se5', name: 'Porchetta Estilo Nonno Piero 250g', description: { es: 'Con focaccia', en: 'Con focaccia', it: 'Con focaccia' }, price: 13.00 },
  { id: 'se6', name: 'Brochetas de Oveja (8 unidades)', description: { es: 'Con papas rústicas', en: 'Con papas rústicas', it: 'Con papas rústicas' }, price: 16.00 },
];

export const BURGERS: MenuItem[] = [
  { id: 'bu1', name: 'Golden Burger', description: { es: 'Hamburguesa de ternera 200g, cebolla caramelizada, bacon, tomate, pepinillo y salsa burger', en: 'Hamburguesa de ternera 200g, cebolla caramelizada, bacon, tomate, pepinillo y salsa burger', it: 'Hamburguesa de ternera 200g, cebolla caramelizada, bacon, tomate, pepinillo y salsa burger' }, price: 17.00 },
  { id: 'bu2', name: 'Cheeseburger', description: { es: 'Hamburguesa de ternera 200g, doble queso, lechuga, tomate, ketchup', en: 'Hamburguesa de ternera 200g, doble queso, lechuga, tomate, ketchup', it: 'Hamburguesa de ternera 200g, doble queso, lechuga, tomate, ketchup' }, price: 14.00 },
  { id: 'bu3', name: 'Italian Burger', description: { es: 'Hamburguesa de ternera 200g, guanciale, cebolla caramelizada, queso ahumado, lechuga y mayonesa', en: 'Hamburguesa de ternera 200g, guanciale, cebolla caramelizada, queso ahumado, lechuga y mayonesa', it: 'Hamburguesa de ternera 200g, guanciale, cebolla caramelizada, queso ahumado, lechuga y mayonesa' }, price: 16.00 },
];

export const DESSERTS: MenuItem[] = [
  { id: 'de1', name: 'Tarta de Chocolate con Helado de Vainilla', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 'de2', name: 'Focaccia con Nutella y Granola de Avellanas', description: { es: '', en: '', it: '' }, price: 7.50 },
  { id: 'de3', name: 'Tarta de Manzana con Helado de Vainilla', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 'de4', name: 'Tiramisú', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 'de5', name: 'Helado de Vainilla (3 bolas)', description: { es: '', en: '', it: '' }, price: 3.50 },
];

export const DRINKS: MenuItem[] = [
  // REFRESCOS
  { id: 'dr1', name: 'Coca Cola', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr2', name: 'Sprite', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr3', name: 'Fanta Limón', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr4', name: 'Fanta Naranja', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr5', name: 'Aquarius', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr6', name: 'Nestea', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr7', name: 'Schweppes', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr8', name: 'Agua Sin Gas 0.5L', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Refrescos' },
  { id: 'dr9', name: 'Agua Con Gas 0.5L', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Refrescos' },
  { id: 'dr10', name: 'Zumo Manzana', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  // CERVEZAS
  { id: 'dr11', name: 'Caña', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Cervezas' },
  { id: 'dr12', name: 'Jarra', description: { es: '', en: '', it: '' }, price: 3.50, subcategory: 'Cervezas' },
  { id: 'dr13', name: 'Cerveza Limón', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Cervezas' },
  { id: 'dr14', name: 'Cerveza Sin Alcohol', description: { es: '', en: '', it: '' }, price: 3.00, subcategory: 'Cervezas' },
  { id: 'dr15', name: 'Estrella Galicia', description: { es: '', en: '', it: '' }, price: 3.00, subcategory: 'Cervezas' },
  { id: 'dr16', name: 'Heineken', description: { es: '', en: '', it: '' }, price: 3.00, subcategory: 'Cervezas' },
  { id: 'dr17', name: 'Canarias Birra Artigianale IPA', description: { es: '', en: '', it: '' }, price: 4.50, subcategory: 'Cervezas' },
  // VINOS
  { id: 'dr18', name: 'Vino de la Casa (Botella)', description: { es: '', en: '', it: '' }, price: 12.00, subcategory: 'Vinos' },
  { id: 'dr19', name: 'Vino de la Casa (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr20', name: 'Sangiovese Merlot Puglia IGT', description: { es: '', en: '', it: '' }, price: 14.00, subcategory: 'Vinos' },
  { id: 'dr21', name: 'Nero D\'Avola Sicilia DOC', description: { es: '', en: '', it: '' }, price: 14.00, subcategory: 'Vinos' },
  { id: 'dr22', name: 'Vino Blanco de la Casa (Botella)', description: { es: '', en: '', it: '' }, price: 12.00, subcategory: 'Vinos' },
  { id: 'dr23', name: 'Vino Blanco de la Casa (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr24', name: 'Pinot Grigio Terra D\'Abruzzo IGT', description: { es: '', en: '', it: '' }, price: 15.00, subcategory: 'Vinos' },
  { id: 'dr25', name: 'Malvasia y Chardonnay Puglia IGT', description: { es: '', en: '', it: '' }, price: 15.00, subcategory: 'Vinos' },
  { id: 'dr26', name: 'Vino Rosado Puglia IGP', description: { es: '', en: '', it: '' }, price: 13.00, subcategory: 'Vinos' },
  { id: 'dr27', name: 'Vino Rosado Puglia IGP (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr28', name: 'Cava Brut (Botella)', description: { es: '', en: '', it: '' }, price: 12.00, subcategory: 'Vinos' },
  { id: 'dr29', name: 'Cava Brut (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr30', name: 'Sangria Vino Tinto 1L', description: { es: '', en: '', it: '' }, price: 13.00, subcategory: 'Vinos' },
  { id: 'dr31', name: 'Sangria Vino Tinto (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr32', name: 'Sangria de Cava 1L', description: { es: '', en: '', it: '' }, price: 15.00, subcategory: 'Vinos' },
  { id: 'dr33', name: 'Sangria de Cava (Copa)', description: { es: '', en: '', it: '' }, price: 5.00, subcategory: 'Vinos' },
  // CÓCTELES
  { id: 'dr34', name: 'Aperol Spritz', description: { es: '', en: '', it: '' }, price: 7.00, subcategory: 'Cócteles' },
  { id: 'dr35', name: 'Campari Spritz', description: { es: '', en: '', it: '' }, price: 9.00, subcategory: 'Cócteles' },
  { id: 'dr36', name: 'Cuba Libre', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr37', name: 'Gin Tonic', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr38', name: 'Vodka Lemon / Red Bull', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr39', name: 'Mojito', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr40', name: 'Americano Spritz', description: { es: '', en: '', it: '' }, price: 7.00, subcategory: 'Cócteles' },
  { id: 'dr41', name: 'Mojito Sin Alcohol', description: { es: '', en: '', it: '' }, price: 5.00, subcategory: 'Cócteles' },
  // CAFÉS
  { id: 'dr42', name: 'Café Espresso', description: { es: '', en: '', it: '' }, price: 1.30, subcategory: 'Cafés' },
  { id: 'dr43', name: 'Café Cortado', description: { es: '', en: '', it: '' }, price: 1.50, subcategory: 'Cafés' },
  { id: 'dr44', name: 'Cortado Leche Leche', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Cafés' },
  { id: 'dr45', name: 'Café con Leche', description: { es: '', en: '', it: '' }, price: 1.80, subcategory: 'Cafés' },
  { id: 'dr46', name: 'Latte', description: { es: '', en: '', it: '' }, price: 3.00, subcategory: 'Cafés' },
  { id: 'dr47', name: 'Café Americano', description: { es: '', en: '', it: '' }, price: 1.80, subcategory: 'Cafés' },
  { id: 'dr48', name: 'Cappuccino', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Cafés' },
  { id: 'dr49', name: 'Barraquito', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Cafés' },
  { id: 'dr50', name: 'Carajillo', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Cafés' },
  // AMAROS
  { id: 'dr51', name: 'Limoncello (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr52', name: 'Limoncello (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr53', name: 'Montenegro (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr54', name: 'Montenegro (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr55', name: 'Jagermeister (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr56', name: 'Jagermeister (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr57', name: 'Grappa Bianca (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr58', name: 'Grappa Bianca (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr59', name: 'Rum y Miel (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr60', name: 'Rum y Miel (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr61', name: 'Sambuca (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr62', name: 'Sambuca (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr63', name: 'Averna (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr64', name: 'Averna (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr65', name: 'Baileys (Copa)', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr66', name: 'Baileys (Chupito)', description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
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
