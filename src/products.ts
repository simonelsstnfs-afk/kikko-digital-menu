import { MenuItem, Review } from './types';

export const GOOGLE_MAPS_REVIEW_URL = 'https://maps.app.goo.gl/kikkoPizzeriaTenerife';
export const PHONE_WHATSAPP = '34600000000';

export const STARTERS: MenuItem[] = [
  { id: 's1', name: { es: 'Croquetas Mixtas Pollo y Jamón (6 unidades)', en: 'Mixed Croquettes Chicken and Ham (6 units)', it: 'Crocchette Miste Pollo e Prosciutto (6 unità)' }, description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's2', name: { es: 'Aros de Cebolla (8 unidades)', en: 'Onion Rings (8 units)', it: 'Anelli di Cipolla (8 unità)' }, description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's3', name: { es: 'Papas Fritas', en: 'French Fries', it: 'Patatine Fritte' }, description: { es: '', en: '', it: '' }, price: 4.00 },
  { id: 's4', name: { es: 'Bruschetta con Tomate', en: 'Bruschetta with Tomato', it: 'Bruschetta al Pomodoro' }, description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's5', name: { es: 'Bruschetta con Ajo y Orégano', en: 'Bruschetta with Garlic and Oregano', it: 'Bruschetta con Aglio e Origano' }, description: { es: '', en: '', it: '' }, price: 5.00 },
  { id: 's6', name: { es: 'Pollo Frito', en: 'Fried Chicken', it: 'Pollo Fritto' }, description: { es: '', en: '', it: '' }, price: 8.00 },
  { id: 's7', name: { es: 'Alitas de Pollo BBQ (6 unidades)', en: 'BBQ Chicken Wings (6 units)', it: 'Ali di Pollo BBQ (6 unità)' }, description: { es: '', en: '', it: '' }, price: 9.00 },
  { id: 's8', name: { es: 'Nuggets con Papas Fritas (8 unidades)', en: 'Chicken Nuggets with French Fries (8 units)', it: 'Nuggets di Pollo con Patatine Fritte (8 unità)' }, description: { es: '', en: '', it: '' }, price: 10.00 },
  { id: 's9', name: { es: 'Jalapeños (6 unidades)', en: 'Jalapeños (6 units)', it: 'Jalapeños (6 unità)' }, description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 's10', name: { es: 'Chilli Cheese Bites (8 unidades)', en: 'Chilli Cheese Bites (8 units)', it: 'Chilli Cheese Bites (8 unità)' }, description: { es: '', en: '', it: '' }, price: 6.00 },
];

export const PIZZAS: MenuItem[] = [
  { id: 'pi1', name: 'Focaccia', description: { es: '', en: '', it: '' }, price: 5.00 },
  { id: 'pi2', name: 'Pizza Margherita', description: { es: 'Tomate, mozzarella y albahaca', en: 'Tomato, mozzarella and basil', it: 'Pomodoro, mozzarella e basilico' }, price: 7.00 },
  { id: 'pi3', name: 'Pizza York', description: { es: 'Tomate, mozzarella, york', en: 'Tomato, mozzarella, ham', it: 'Pomodoro, mozzarella, prosciutto cotto' }, price: 9.00 },
  { id: 'pi4', name: 'Pizza Marinara', description: { es: 'Tomate, ajo y orégano', en: 'Tomato, garlic and oregano', it: 'Pomodoro, aglio e origano' }, price: 6.00 },
  { id: 'pi5', name: { es: 'Pizza Jamón y Setas', en: 'Pizza Ham & Mushrooms', it: 'Pizza Prosciutto e Funghi' }, description: { es: 'Tomate, mozzarella, jamón y mixto de setas', en: 'Tomato, mozzarella, ham and mixed mushrooms', it: 'Pomodoro, mozzarella, prosciutto cotto e funghi misti' }, price: 10.00 },
  { id: 'pi6', name: { es: 'Pizza Wurstel y Papas Fritas', en: 'Pizza Frankfurter & French Fries', it: 'Pizza Wurstel e Patatine Fritte' }, description: { es: 'Tomate, mozzarella, frankfurt y papas fritas', en: 'Tomato, mozzarella, frankfurter and french fries', it: 'Pomodoro, mozzarella, wurstel e patatine fritte' }, price: 11.00 },
  { id: 'pi7', name: 'Pizza Hawai', description: { es: 'Tomate, mozzarella, york y piña', en: 'Tomato, mozzarella, ham and pineapple', it: 'Pomodoro, mozzarella, prosciutto cotto e ananas' }, price: 10.00 },
  { id: 'pi8', name: { es: 'Pizza Atún y Cebolla', en: 'Pizza Tuna & Onion', it: 'Pizza Tonno e Cipolla' }, description: { es: 'Tomate, mozzarella, atún y cebolla', en: 'Tomato, mozzarella, tuna and onion', it: 'Pomodoro, mozzarella, tonno e cipolla' }, price: 9.00 },
  { id: 'pi9', name: 'Pizza Diavola', description: { es: 'Tomate, mozzarella y salami picante', en: 'Tomato, mozzarella and spicy salami', it: 'Pomodoro, mozzarella e salame piccante' }, price: 9.00 },
  { id: 'pi10', name: 'Pizza Golden', description: { es: 'Tomate, rúcula, jamón serrano, parmesano y mozzarella de búfala', en: 'Tomato, arugula, serrano ham, parmesan and buffalo mozzarella', it: 'Pomodoro, rucola, prosciutto crudo, parmigiano e mozzarella di bufala' }, price: 13.00 },
  { id: 'pi11', name: 'Pizza Carbonara', description: { es: 'Mozzarella, guanciale, huevos, parmesano, pecorino y pimienta negra', en: 'Mozzarella, guanciale, eggs, parmesan, pecorino and black pepper', it: 'Mozzarella, guanciale, uova, parmigiano, pecorino e pepe nero' }, price: 13.00 },
  { id: 'pi12', name: 'Pizza Vegetariana', description: { es: 'Tomate, mozzarella y verduras mixtas', en: 'Tomato, mozzarella and mixed vegetables', it: 'Pomodoro, mozzarella e verdure miste' }, price: 10.00 },
  { id: 'pi13', name: 'Pizza Quattro Formaggi', description: { es: 'Mozzarella, queso azul, queso ahumado y parmesano', en: 'Mozzarella, blue cheese, smoked cheese and parmesan', it: 'Mozzarella, gorgonzola, provola affumicata e parmigiano' }, price: 11.50 },
  { id: 'pi14', name: 'Pizza Hellvis', description: { es: 'Mozzarella, rúcula, pollo frito, tomate cherry y mostaza y miel', en: 'Mozzarella, arugula, fried chicken, cherry tomatoes and honey mustard', it: 'Mozzarella, rucola, pollo fritto, pomodorini e senape al miele' }, price: 13.00 },
  { id: 'pi15', name: 'Pizza Capricciosa', description: { es: 'Tomate, mozzarella, champiñones, jamón cocido, alcachofas y aceitunas negras', en: 'Tomato, mozzarella, mushrooms, cooked ham, artichokes and black olives', it: 'Pomodoro, mozzarella, funghi, prosciutto cotto, carciofi e olive nere' }, price: 10.00 },
  { id: 'pi16', name: { es: 'Pizza Campesina', en: 'Pizza Campesina', it: 'Pizza Contadina' }, description: { es: 'Tomate, anchoas, aceitunas y orégano', en: 'Tomato, anchovies, olives and oregano', it: 'Pomodoro, acciughe, olive e origano' }, price: 8.00 },
  { id: 'pi17', name: { es: 'Pizza Rústica', en: 'Rustic Pizza', it: 'Pizza Rustica' }, description: { es: 'Mozzarella, queso ahumado, longaniza y friarelli', en: 'Mozzarella, smoked cheese, sausage and friarielli', it: 'Mozzarella, provola affumicata, salsiccia e friarielli' }, price: 12.00 },
  { id: 'pi18', name: 'Pizza Meat Feast', description: { es: 'Mozzarella, tomate, jamón cocido, wurstel, salami picante y cebolla', en: 'Mozzarella, tomato, cooked ham, wurstel, spicy salami and onion', it: 'Mozzarella, pomodoro, prosciutto cotto, wurstel, salame piccante e cipolla' }, price: 13.00 },
  { id: 'pi19', name: 'Pizza Aurora', description: { es: 'Mozzarella, longaniza, queso ahumado', en: 'Mozzarella, sausage, smoked cheese', it: 'Mozzarella, salsiccia, provola affumicata' }, price: 10.00 },
  { id: 'pi20', name: { es: 'Pizza Marinera', en: 'Seafood Pizza', it: 'Pizza Pescatora' }, description: { es: 'Tomate, mozzarella, gambas, almejas, mejillones y perejil', en: 'Tomato, mozzarella, prawns, clams, mussels and parsley', it: 'Pomodoro, mozzarella, gamberi, vongole, cozze e prezzemolo' }, price: 15.00 },
  { id: 'pi21', name: { es: 'Pizza sin Gluten (Extra)', en: 'Gluten Free Pizza (Extra)', it: 'Pizza Senza Glutine (Extra)' }, description: { es: '', en: '', it: '' }, price: 2.00 },
  { id: 'pi22', name: { es: 'Pizza para Llevar (Extra)', en: 'Take Away Pizza (Extra)', it: 'Pizza d\'Asporto (Extra)' }, description: { es: '', en: '', it: '' }, price: 0.50 },
  { id: 'pi23', name: { es: 'Ingrediente Extra', en: 'Extra Ingredient', it: 'Ingrediente Extra' }, description: { es: '', en: '', it: '' }, price: 1.50 },
];

export const PASTAS: MenuItem[] = [
  { id: 'pa1', name: 'Gnocchi Sorrentina', description: { es: 'Tomate y mozzarella', en: 'Tomato and mozzarella', it: 'Pomodoro e mozzarella' }, price: 11.00 },
  { id: 'pa2', name: 'Spaghetti Carbonara', description: { es: 'Guanciale, huevos, parmesano, pecorino y pimienta negra', en: 'Guanciale, eggs, parmesan, pecorino and black pepper', it: 'Guanciale, uova, parmigiano, pecorino e pepe nero' }, price: 14.00 },
  { id: 'pa3', name: { es: 'Spaghetti con Marisco', en: 'Seafood Spaghetti', it: 'Spaghetti allo Scoglio' }, description: { es: 'Hecho con tinta de calamar. Almejas, mejillones, gambas, calamares y perejil', en: 'Made with squid ink. Clams, mussels, prawns, squid and parsley', it: 'Fatto con nero di seppia. Vongole, cozze, gamberi, calamari e prezzemolo' }, price: 16.00 },
  { id: 'pa4', name: { es: 'Tagliatelle Boloñesa', en: 'Tagliatelle Bolognese', it: 'Tagliatelle alla Bolognese' }, description: { es: 'Con parmesano', en: 'With parmesan', it: 'Con parmigiano' }, price: 12.00 },
  { id: 'pa5', name: { es: 'Tagliatelle con Albóndigas', en: 'Tagliatelle with Meatballs', it: 'Tagliatelle con Polpette' }, description: { es: 'Con parmesano', en: 'With parmesan', it: 'Con parmigiano' }, price: 14.00 },
  { id: 'pa6', name: { es: 'Lasaña Boloñesa', en: 'Bolognese Lasagna', it: 'Lasagna alla Bolognese' }, description: { es: '', en: '', it: '' }, price: 11.00 },
  { id: 'pa7', name: { es: 'Ravioli de Ricotta y Espinaca', en: 'Ricotta and Spinach Ravioli', it: 'Ravioli Ricotta e Spinaci' }, description: { es: 'Con mantequilla, salvia y parmesano', en: 'With butter, sage and parmesan', it: 'Con burro, salvia e parmigiano' }, price: 13.00 },
  { id: 'pa8', name: { es: 'Gnocco Cuatro Quesos con Guanciale', en: 'Four Cheese Gnocchi with Guanciale', it: 'Gnocchi ai Quattro Formaggi con Guanciale' }, description: { es: 'Parmesano, pecorino, queso ahumado, queso azul y guanciale', en: 'Parmesan, pecorino, smoked cheese, blue cheese and guanciale', it: 'Parmigiano, pecorino, provola affumicata, gorgonzola e guanciale' }, price: 14.00 },
  { id: 'pa9', name: { es: 'Gnocco Amatriciana', en: 'Amatriciana Gnocchi', it: 'Gnocchi all\'Amatriciana' }, description: { es: 'Salsa de tomate, guanciale y queso pecorino', en: 'Tomato sauce, guanciale and pecorino cheese', it: 'Salsa di pomodoro, guanciale e pecorino' }, price: 13.00 },
  { id: 'pa10', name: { es: 'Linguini de Tinta de Calamar', en: 'Squid Ink Linguini', it: 'Linguine al Nero di Seppia' }, description: { es: 'Con mantequilla, anchoas y burrata', en: 'With butter, anchovies and burrata', it: 'Con burro, acciughe e burrata' }, price: 14.00 },
  { id: 'pa11', name: { es: 'Pasta sin Gluten (Extra)', en: 'Gluten Free Pasta (Extra)', it: 'Pasta Senza Glutine (Extra)' }, description: { es: '', en: '', it: '' }, price: 2.00 },
];

export const RISOTTOS: MenuItem[] = [
  { id: 'ri1', name: { es: 'Arroz Meloso con Champiñones y Salchichas', en: 'Creamy Rice with Mushrooms and Sausages', it: 'Risotto con Funghi e Salsiccia' }, description: { es: 'Con mantequilla y queso parmesano', en: 'With butter and parmesan cheese', it: 'Con burro e parmigiano' }, price: 15.00 },
  { id: 'ri2', name: { es: 'Arroz Meloso con Azafrán y Osobuco', en: 'Creamy Rice with Saffron and Ossobuco', it: 'Risotto allo Zafferano con Ossobuco' }, description: { es: 'Con mantequilla y queso parmesano', en: 'With butter and parmesan cheese', it: 'Con burro e parmigiano' }, price: 17.00 },
  { id: 'ri3', name: { es: 'Arroz Meloso con Mariscos', en: 'Creamy Seafood Rice', it: 'Risotto ai Frutti di Mare' }, description: { es: 'Almejas, mejillones, gambas, calamares y perejil (sin queso parmesano)', en: 'Clams, mussels, prawns, squid and parsley (without parmesan cheese)', it: 'Vongole, cozze, gamberi, calamari e prezzemolo (senza parmigiano)' }, price: 17.00 },
  { id: 'ri4', name: { es: 'Arroz Meloso con Alcachofas', en: 'Creamy Rice with Artichokes', it: 'Risotto ai Carciofi' }, description: { es: 'Con mantequilla, parmesano, guanciale y crema de queso azul', en: 'With butter, parmesan, guanciale and blue cheese cream', it: 'Con burro, parmigiano, guanciale e crema al gorgonzola' }, price: 16.00 },
  { id: 'ri5', name: { es: 'Arroz Meloso con Hígado de Pollo y Salvia', en: 'Creamy Rice with Chicken Liver and Sage', it: 'Risotto con Fegatini di Pollo e Salvia' }, description: { es: 'Con mantequilla y queso parmesano', en: 'With butter and parmesan cheese', it: 'Con burro e parmigiano' }, price: 14.00 },
];

export const SECONDI: MenuItem[] = [
  { id: 'se1', name: { es: 'Albóndigas de Carne (12 unidades)', en: 'Meatballs (12 units)', it: 'Polpette di Carne (12 unità)' }, description: { es: 'Con salsa de tomate y pan casero', en: 'With tomato sauce and homemade bread', it: 'Con salsa di pomodoro e pane fatto in casa' }, price: 13.00 },
  { id: 'se2', name: { es: 'Albóndigas Fritas (10 unidades)', en: 'Fried Meatballs (10 units)', it: 'Polpette Fritte (10 unità)' }, description: { es: '', en: '', it: '' }, price: 10.00 },
  { id: 'se3', name: { es: 'Lomo Alto 300g', en: 'Ribeye Steak 300g', it: 'Entrecôte 300g' }, description: { es: 'Con rúcula, tomate cherry y parmesano', en: 'With arugula, cherry tomatoes and parmesan', it: 'Con rucola, pomodorini e parmigiano' }, price: 19.00 },
  { id: 'se4', name: { es: 'Tartar de Scottona 150g', en: 'Scottona Beef Tartare 150g', it: 'Tartare di Scottona 150g' }, description: { es: 'Carne italiana con pan casero', en: 'Italian beef with homemade bread', it: 'Carne italiana con pane fatto in casa' }, price: 17.00 },
  { id: 'se5', name: { es: 'Porchetta Estilo Nonno Piero 250g', en: 'Nonno Piero Style Porchetta 250g', it: 'Porchetta Stile Nonno Piero 250g' }, description: { es: 'Con focaccia', en: 'With focaccia', it: 'Con focaccia' }, price: 13.00 },
  { id: 'se6', name: { es: 'Brochetas de Oveja (8 unidades)', en: 'Sheep Skewers (8 units)', it: 'Arrosticini di Pecora (8 unità)' }, description: { es: 'Con papas rústicas', en: 'With rustic potatoes', it: 'Con patate rustiche' }, price: 16.00 },
];

export const BURGERS: MenuItem[] = [
  { id: 'bu1', name: 'Golden Burger', description: { es: 'Hamburguesa de ternera 200g, queso, cebolla caramelizada, bacon, tomate, pepinillo y salsa burger', en: '200g beef burger, cheese, caramelized onion, bacon, tomato, pickle and burger sauce', it: 'Hamburger di manzo 200g, formaggio, cipolla caramellata, bacon, pomodoro, cetriolini e salsa burger' }, price: 16.00 },
  { id: 'bu2', name: 'Cheeseburger', description: { es: 'Hamburguesa de ternera 200g, doble queso, ketchup', en: '200g beef burger, double cheese, ketchup', it: 'Hamburger di manzo 200g, doppio formaggio, ketchup' }, price: 14.00 },
  { id: 'bu3', name: 'Italian Burger', description: { es: 'Hamburguesa de ternera 200g, guanciale, cebolla caramelizada, queso ahumado, rúcula y mayonesa', en: '200g beef burger, guanciale, caramelized onion, smoked cheese, arugula and mayonnaise', it: 'Hamburger di manzo 200g, guanciale, cipolla caramellata, provola affumicata, rucola e maionese' }, price: 17.00 },
];

export const DESSERTS: MenuItem[] = [
  { id: 'de1', name: { es: 'Tarta de Chocolate con Helado de Vainilla', en: 'Chocolate Cake with Vanilla Ice Cream', it: 'Torta al Cioccolato con Gelato alla Vaniglia' }, description: { es: 'Con granola de avellana', en: 'With hazelnut granola', it: 'Con granola di nocciole' }, price: 6.00 },
  { id: 'de2', name: { es: 'Focaccia con Nutella y Granola de Avellanas', en: 'Focaccia with Nutella and Hazelnut Crumble', it: 'Focaccia con Nutella e Granella di Nocciole' }, description: { es: '', en: '', it: '' }, price: 7.50 },
  { id: 'de3', name: { es: 'Tarta de Manzana con Helado de Vainilla', en: 'Apple Pie with Vanilla Ice Cream', it: 'Torta di Mele con Gelato alla Vaniglia' }, description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 'de4', name: 'Tiramisú', description: { es: '', en: '', it: '' }, price: 6.00 },
  { id: 'de5', name: { es: 'Helado de Vainilla (3 bolas)', en: 'Vanilla Ice Cream (3 scoops)', it: 'Gelato alla Vaniglia (3 palline)' }, description: { es: '', en: '', it: '' }, price: 3.50 },
];

export const DRINKS: MenuItem[] = [
  // REFRESCOS
  { id: 'dr1', name: 'Coca Cola', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr1_1', name: 'Coca Cola Zero', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr2', name: 'Sprite', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr3', name: { es: 'Fanta Limón', en: 'Fanta Lemon', it: 'Fanta al Limone' }, description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr4', name: { es: 'Fanta Naranja', en: 'Fanta Orange', it: 'Fanta all\'Arancia' }, description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr5', name: 'Aquarius', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr6', name: 'Nestea', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr7', name: 'Schweppes', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  { id: 'dr8', name: { es: 'Agua Sin Gas 0.5L', en: 'Still Water 0.5L', it: 'Acqua Naturale 0.5L' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Refrescos' },
  { id: 'dr9', name: { es: 'Agua Con Gas 0.5L', en: 'Sparkling Water 0.5L', it: 'Acqua Frizzante 0.5L' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Refrescos' },
  { id: 'dr10', name: { es: 'Zumo Manzana', en: 'Apple Juice', it: 'Succo di Mela' }, description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Refrescos' },
  // CERVEZAS
  { id: 'dr11', name: { es: 'Caña', en: 'Small Beer', it: 'Birra Piccola' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Cervezas' },
  { id: 'dr12', name: { es: 'Jarra', en: 'Large Beer', it: 'Birra Media' }, description: { es: '', en: '', it: '' }, price: 3.50, subcategory: 'Cervezas' },
  { id: 'dr13', name: { es: 'Cerveza Limón', en: 'Lemon Beer', it: 'Birra al Limone' }, description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Cervezas' },
  { id: 'dr14', name: { es: 'Cerveza Sin Alcohol', en: 'Non-Alcoholic Beer', it: 'Birra Analcolica' }, description: { es: '', en: '', it: '' }, price: 3.00, subcategory: 'Cervezas' },
  { id: 'dr15', name: 'Estrella Galicia', description: { es: '', en: '', it: '' }, price: 3.00, subcategory: 'Cervezas' },
  { id: 'dr16', name: 'Heineken', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Cervezas' },
  { id: 'dr17', name: 'Canarias Birra Artigianale IPA', description: { es: '', en: '', it: '' }, price: 4.50, subcategory: 'Cervezas' },
  // VINOS
  { id: 'dr18', name: { es: 'Vino de la Casa (Botella)', en: 'House Wine (Bottle)', it: 'Vino della Casa (Bottiglia)' }, description: { es: '', en: '', it: '' }, price: 12.00, subcategory: 'Vinos' },
  { id: 'dr19', name: { es: 'Vino de la Casa (Copa)', en: 'House Wine (Glass)', it: 'Vino della Casa (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr20', name: 'Sangiovese Merlot Puglia IGT', description: { es: '', en: '', it: '' }, price: 14.00, subcategory: 'Vinos' },
  { id: 'dr21', name: 'Nero D\'Avola Sicilia DOC', description: { es: '', en: '', it: '' }, price: 14.00, subcategory: 'Vinos' },
  { id: 'dr22', name: { es: 'Vino Blanco de la Casa (Botella)', en: 'House White Wine (Bottle)', it: 'Vino Bianco della Casa (Bottiglia)' }, description: { es: '', en: '', it: '' }, price: 12.00, subcategory: 'Vinos' },
  { id: 'dr23', name: { es: 'Vino Blanco de la Casa (Copa)', en: 'House White Wine (Glass)', it: 'Vino Bianco della Casa (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr24', name: 'Pinot Grigio Terra D\'Abruzzo IGT', description: { es: '', en: '', it: '' }, price: 15.00, subcategory: 'Vinos' },
  { id: 'dr25', name: 'Malvasia y Chardonnay Puglia IGT', description: { es: '', en: '', it: '' }, price: 15.00, subcategory: 'Vinos' },
  { id: 'dr26', name: { es: 'Vino Rosado Puglia IGP (Botella)', en: 'Rosé Wine Puglia IGP (Bottle)', it: 'Vino Rosato Puglia IGP (Bottiglia)' }, description: { es: '', en: '', it: '' }, price: 13.00, subcategory: 'Vinos' },
  { id: 'dr27', name: { es: 'Vino Rosado Puglia IGP (Copa)', en: 'Rosé Wine Puglia IGP (Glass)', it: 'Vino Rosato Puglia IGP (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr28', name: { es: 'Cava Brut (Botella)', en: 'Cava Brut (Bottle)', it: 'Cava Brut (Bottiglia)' }, description: { es: '', en: '', it: '' }, price: 12.00, subcategory: 'Vinos' },
  { id: 'dr29', name: { es: 'Cava Brut (Copa)', en: 'Cava Brut (Glass)', it: 'Cava Brut (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr30', name: { es: 'Sangria Vino Tinto 1L', en: 'Red Wine Sangria 1L', it: 'Sangria di Vino Rosso 1L' }, description: { es: '', en: '', it: '' }, price: 15.00, subcategory: 'Vinos' },
  { id: 'dr31', name: { es: 'Sangria Vino Tinto (Copa)', en: 'Red Wine Sangria (Glass)', it: 'Sangria di Vino Rosso (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Vinos' },
  { id: 'dr32', name: { es: 'Sangria de Cava 1L', en: 'Cava Sangria 1L', it: 'Sangria di Cava 1L' }, description: { es: '', en: '', it: '' }, price: 17.00, subcategory: 'Vinos' },
  { id: 'dr33', name: { es: 'Sangria de Cava (Copa)', en: 'Cava Sangria (Glass)', it: 'Sangria di Cava (Calice)' }, description: { es: '', en: '', it: '' }, price: 5.00, subcategory: 'Vinos' },
  // CÓCTELES
  { id: 'dr34', name: 'Aperol Spritz', description: { es: '', en: '', it: '' }, price: 7.00, subcategory: 'Cócteles' },
  { id: 'dr35', name: 'Campari Spritz', description: { es: '', en: '', it: '' }, price: 7.00, subcategory: 'Cócteles' },
  { id: 'dr36', name: 'Cuba Libre', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr37', name: 'Gin Tonic', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr38', name: 'Vodka Lemon / Red Bull', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr39', name: 'Mojito', description: { es: '', en: '', it: '' }, price: 8.00, subcategory: 'Cócteles' },
  { id: 'dr41', name: { es: 'Mojito Sin Alcohol', en: 'Virgin Mojito', it: 'Mojito Analcolico' }, description: { es: '', en: '', it: '' }, price: 5.00, subcategory: 'Cócteles' },
  // CAFÉS
  { id: 'dr42', name: { es: 'Café Espresso', en: 'Espresso', it: 'Caffè Espresso' }, description: { es: '', en: '', it: '' }, price: 1.30, subcategory: 'Cafés' },
  { id: 'dr43', name: { es: 'Café Cortado', en: 'Macchiato', it: 'Caffè Macchiato' }, description: { es: '', en: '', it: '' }, price: 1.50, subcategory: 'Cafés' },
  { id: 'dr44', name: { es: 'Cortado Leche Leche', en: 'Cortado with Condensed Milk', it: 'Cortado con Latte Condensato' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Cafés' },
  { id: 'dr45', name: { es: 'Café con Leche', en: 'White Coffee', it: 'Caffellatte' }, description: { es: '', en: '', it: '' }, price: 1.80, subcategory: 'Cafés' },
  { id: 'dr46', name: 'Latte', description: { es: '', en: '', it: '' }, price: 3.00, subcategory: 'Cafés' },
  { id: 'dr47', name: { es: 'Café Americano', en: 'Americano', it: 'Caffè Americano' }, description: { es: '', en: '', it: '' }, price: 1.80, subcategory: 'Cafés' },
  { id: 'dr48', name: 'Cappuccino', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Cafés' },
  { id: 'dr49', name: 'Barraquito', description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Cafés' },
  { id: 'dr50', name: 'Carajillo', description: { es: '', en: '', it: '' }, price: 2.50, subcategory: 'Cafés' },
  // AMAROS
  { id: 'dr51', name: { es: 'Limoncello (Copa)', en: 'Limoncello (Glass)', it: 'Limoncello (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr52', name: { es: 'Limoncello (Chupito)', en: 'Limoncello (Shot)', it: 'Limoncello (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr53', name: { es: 'Montenegro (Copa)', en: 'Montenegro (Glass)', it: 'Montenegro (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr54', name: { es: 'Montenegro (Chupito)', en: 'Montenegro (Shot)', it: 'Montenegro (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr55', name: { es: 'Jagermeister (Copa)', en: 'Jagermeister (Glass)', it: 'Jagermeister (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr56', name: { es: 'Jagermeister (Chupito)', en: 'Jagermeister (Shot)', it: 'Jagermeister (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr57', name: { es: 'Grappa Bianca (Copa)', en: 'Grappa Bianca (Glass)', it: 'Grappa Bianca (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr58', name: { es: 'Grappa Bianca (Chupito)', en: 'Grappa Bianca (Shot)', it: 'Grappa Bianca (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr59', name: { es: 'Rum y Miel (Copa)', en: 'Honey Rum (Glass)', it: 'Rum al Miele (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr60', name: { es: 'Rum y Miel (Chupito)', en: 'Honey Rum (Shot)', it: 'Rum al Miele (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr61', name: { es: 'Sambuca (Copa)', en: 'Sambuca (Glass)', it: 'Sambuca (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr62', name: { es: 'Sambuca (Chupito)', en: 'Sambuca (Shot)', it: 'Sambuca (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr63', name: { es: 'Averna (Copa)', en: 'Averna (Glass)', it: 'Averna (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr64', name: { es: 'Averna (Chupito)', en: 'Averna (Shot)', it: 'Averna (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
  { id: 'dr65', name: { es: 'Baileys (Copa)', en: 'Baileys (Glass)', it: 'Baileys (Calice)' }, description: { es: '', en: '', it: '' }, price: 4.00, subcategory: 'Amaros' },
  { id: 'dr66', name: { es: 'Baileys (Chupito)', en: 'Baileys (Shot)', it: 'Baileys (Cicchetto)' }, description: { es: '', en: '', it: '' }, price: 2.00, subcategory: 'Amaros' },
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
    text: "La masa de pizza increíblemente buena, el tomate riquísimo, la carbonara espectacular con su huevo y su guanciale, todos los ingredientes súper frescos y de calidad. El personal muy agradable. Muy bien de precio.",
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
