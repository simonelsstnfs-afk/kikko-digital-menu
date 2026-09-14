export interface AllergenInfo {
  id: string;
  number: number;
  name: {
    es: string;
    en: string;
    it: string;
  };
  description: {
    es: string;
    en: string;
    it: string;
  };
  color: string;
  iconUrl: string;
  cardUrl: string;
}

export const ALLERGENS: AllergenInfo[] = [
  {
    id: 'gluten',
    number: 1,
    name: {
      es: 'Gluten',
      en: 'Gluten',
      it: 'Glutine'
    },
    description: {
      es: 'Cereales que contienen gluten (trigo, centeno, cebada, avena, espelta, kamut).',
      en: 'Cereals containing gluten (wheat, rye, barley, oats, spelt, kamut).',
      it: 'Cereali contenenti glutine (grano, segale, orzo, avena, farro, kamut).'
    },
    color: '#e8623d',
    iconUrl: '/allergens/gluten.svg',
    cardUrl: '/allergens/gluten_card.svg'
  },
  {
    id: 'huevos',
    number: 2,
    name: {
      es: 'Huevos',
      en: 'Eggs',
      it: 'Uova'
    },
    description: {
      es: 'Huevos y productos a base de huevo.',
      en: 'Eggs and products made from eggs.',
      it: 'Uova e prodotti a base di uova.'
    },
    color: '#ee9530',
    iconUrl: '/allergens/huevos.svg',
    cardUrl: '/allergens/huevos_card.svg'
  },
  {
    id: 'moluscos',
    number: 3,
    name: {
      es: 'Moluscos',
      en: 'Molluscs',
      it: 'Molluschi'
    },
    description: {
      es: 'Moluscos y productos a base de moluscos (mejillones, almejas, calamares, pulpo).',
      en: 'Molluscs and mollusc products (mussels, clams, squids, octopus).',
      it: 'Molluschi e prodotti a base di molluschi (cozze, vongole, calamari, polpo).'
    },
    color: '#3fb8c4',
    iconUrl: '/allergens/moluscos.svg',
    cardUrl: '/allergens/moluscos_card.svg'
  },
  {
    id: 'sesamo',
    number: 4,
    name: {
      es: 'Sésamo',
      en: 'Sesame',
      it: 'Sesamo'
    },
    description: {
      es: 'Granos de sésamo y productos a base de granos de sésamo.',
      en: 'Sesame seeds and products made from sesame seeds.',
      it: 'Semi di sesamo e prodotti a base di semi di sesamo.'
    },
    color: '#8b7a5e',
    iconUrl: '/allergens/sesamo.svg',
    cardUrl: '/allergens/sesamo_card.svg'
  },
  {
    id: 'crustaceos',
    number: 5,
    name: {
      es: 'Crustáceos',
      en: 'Crustaceans',
      it: 'Crostacei'
    },
    description: {
      es: 'Crustáceos y productos a base de crustáceos (gambas, langostinos, cangrejos).',
      en: 'Crustaceans and crustacean products (prawns, shrimps, crabs, lobsters).',
      it: 'Crostacei e prodotti a base di crostacei (gamberi, scampi, granchi).'
    },
    color: '#e8623d',
    iconUrl: '/allergens/crustaceos.svg',
    cardUrl: '/allergens/crustaceos_card.svg'
  },
  {
    id: 'pescado',
    number: 6,
    name: {
      es: 'Pescado',
      en: 'Fish',
      it: 'Pesce'
    },
    description: {
      es: 'Pescado y productos a base de pescado.',
      en: 'Fish and fish products.',
      it: 'Pesce e productos a base di pesce.'
    },
    color: '#3f8fc4',
    iconUrl: '/allergens/pescado.svg',
    cardUrl: '/allergens/pescado_card.svg'
  },
  {
    id: 'lacteos',
    number: 7,
    name: {
      es: 'Lácteos',
      en: 'Dairy',
      it: 'Latticini'
    },
    description: {
      es: 'Leche y sus derivados (incluida la lactosa, quesos, mantequilla y nata).',
      en: 'Milk and its derivatives (including lactose, cheeses, butter and cream).',
      it: 'Latte e i suoi derivati (compreso il lattosio, formaggi, burro e panna).'
    },
    color: '#4fa8da',
    iconUrl: '/allergens/lacteos.svg',
    cardUrl: '/allergens/lacteos_card.svg'
  },
  {
    id: 'cacahuetes',
    number: 8,
    name: {
      es: 'Cacahuetes',
      en: 'Peanuts',
      it: 'Arachidi'
    },
    description: {
      es: 'Cacahuetes y productos a base de cacahuetes.',
      en: 'Peanuts and peanut products.',
      it: 'Arachidi e prodotti a base di arachidi.'
    },
    color: '#9c6b30',
    iconUrl: '/allergens/cacahuetes.svg',
    cardUrl: '/allergens/cacahuetes_card.svg'
  },
  {
    id: 'soja',
    number: 9,
    name: {
      es: 'Soja',
      en: 'Soy',
      it: 'Soia'
    },
    description: {
      es: 'Soja y productos a base de soja.',
      en: 'Soybeans and soy products.',
      it: 'Soia e prodotti a base di soia.'
    },
    color: '#7cb03a',
    iconUrl: '/allergens/soja.svg',
    cardUrl: '/allergens/soja_card.svg'
  },
  {
    id: 'frutoscascara',
    number: 10,
    name: {
      es: 'Frutos de cáscara',
      en: 'Tree Nuts',
      it: 'Frutta a guscio'
    },
    description: {
      es: 'Frutos de cáscara (almendras, avellanas, nueces, anacardos, pacanas, pistachos).',
      en: 'Tree nuts (almonds, hazelnuts, walnuts, cashews, pecans, pistachios).',
      it: 'Frutta a guscio (mandorle, nocciole, noci, anacardi, noci pecan, pistacchi).'
    },
    color: '#8b5e34',
    iconUrl: '/allergens/frutoscascara.svg',
    cardUrl: '/allergens/frutoscascara_card.svg'
  },
  {
    id: 'apio',
    number: 11,
    name: {
      es: 'Apio',
      en: 'Celery',
      it: 'Sedano'
    },
    description: {
      es: 'Apio y productos derivados.',
      en: 'Celery and derived products.',
      it: 'Sedano e prodotti derivati.'
    },
    color: '#6aa84f',
    iconUrl: '/allergens/apio.svg',
    cardUrl: '/allergens/apio_card.svg'
  },
  {
    id: 'mostaza',
    number: 12,
    name: {
      es: 'Mostaza',
      en: 'Mustard',
      it: 'Senape'
    },
    description: {
      es: 'Mostaza y productos derivados.',
      en: 'Mustard and derived products.',
      it: 'Senape e productos derivati.'
    },
    color: '#c9a227',
    iconUrl: '/allergens/mostaza.svg',
    cardUrl: '/allergens/mostaza_card.svg'
  },
  {
    id: 'sulfitos',
    number: 13,
    name: {
      es: 'Sulfitos',
      en: 'Sulphites',
      it: 'Solfiti'
    },
    description: {
      es: 'Dióxido de azufre y sulfitos en concentraciones superiores a 10 mg/kg o 10 mg/l (vinos, cervezas).',
      en: 'Sulphur dioxide and sulphites at concentrations over 10 mg/kg or 10 mg/l (wines, beers).',
      it: 'Anidride solforosa e solfiti in concentrazioni superiori a 10 mg/kg o 10 mg/l (vini, birre).'
    },
    color: '#8e44ad',
    iconUrl: '/allergens/sulfitos.svg',
    cardUrl: '/allergens/sulfitos_card.svg'
  },
  {
    id: 'altramuces',
    number: 14,
    name: {
      es: 'Altramuces',
      en: 'Lupins',
      it: 'Lupini'
    },
    description: {
      es: 'Altramuces y productos a base de altramuces.',
      en: 'Lupin and lupin products.',
      it: 'Lupini e prodotti a base di lupini.'
    },
    color: '#a9c93c',
    iconUrl: '/allergens/altramuces.svg',
    cardUrl: '/allergens/altramuces_card.svg'
  }
];

export const ALLERGENS_MAP = new Map<string, AllergenInfo>(
  ALLERGENS.map((item) => [item.id, item])
);

export function getAllergen(id: string): AllergenInfo | undefined {
  return ALLERGENS_MAP.get(id);
}

export function detectAllergensFromText(
  name: string | { es?: string; en?: string; it?: string } = '',
  description: { es?: string; en?: string; it?: string } | string = '',
  categoryId?: string
): string[] {
  const detected = new Set<string>();

  const nameText = typeof name === 'string' 
    ? name 
    : `${name.es || ''} ${name.en || ''} ${name.it || ''}`;
    
  const descText = typeof description === 'string'
    ? description
    : `${description.es || ''} ${description.en || ''} ${description.it || ''}`;

  const fullText = `${nameText} ${descText}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const cat = (categoryId || '').toLowerCase();

  const isExtraOrService = /extra|suplemento|llevar/.test(fullText);
  const isGlutenFree = /sin gluten|gluten free|senza glutine/.test(fullText);

  if ((cat === 'pizzas' || cat === 'pastas' || cat === 'hamburguesas') && !isExtraOrService && !isGlutenFree) {
    detected.add('gluten');
  }

  if (cat === 'pizzas' && !isExtraOrService && !fullText.includes('marinara')) {
    detected.add('lacteos');
  }

  if (cat === 'pastas' && (fullText.includes('parmigiano') || fullText.includes('parmesano') || fullText.includes('queso') || fullText.includes('crema') || fullText.includes('nata') || fullText.includes('carbonara') || fullText.includes('burrata') || fullText.includes('gorgonzola') || fullText.includes('ricotta') || fullText.includes('lasana') || fullText.includes('lasagne'))) {
    detected.add('lacteos');
  }

  if (cat === 'risottos' && !fullText.includes('sin queso')) {
    detected.add('lacteos');
  }

  if (cat === 'bebidas') {
    if (/cerveza|birra|beer|artesanal|ipa|cana|jarra|estrella|heineken/.test(fullText)) {
      detected.add('gluten');
      detected.add('sulfitos');
    }
    if (/vino|wine|prosecco|cava|champagne|sangria|tinto|blanco|rosado|merlot|sangiovese|nero d'avola|pinot|chardonnay|malvasia/.test(fullText)) {
      detected.add('sulfitos');
    }
    if (/leche|latte|cappuccino|cortado|barraquito|baileys/.test(fullText)) {
      detected.add('lacteos');
    }
  }

  // Reglas culinarias y preparaciones gastronómicas específicas
  // 1. Croquetas (bechamel = harina + leche/mantequilla, y rebozado = pan rallado + huevo)
  if (/croqueta|crocchett|croquette/.test(fullText)) {
    detected.add('gluten');
    detected.add('lacteos');
    detected.add('huevos');
  }

  // 2. Bruschettas y panes tostados (base de pan con gluten)
  if (/bruschett/.test(fullText)) {
    detected.add('gluten');
  }

  // 3. Aros de cebolla y bocados rebozados / empanados
  if (/aros de cebolla|anelli di cipolla|onion ring|nugget|rebozado|empanado/.test(fullText)) {
    detected.add('gluten');
  }

  // 4. Pollo frito / nuggets rebozados
  if (/pollo frito|fried chicken|pollo fritto|nugget/.test(fullText)) {
    detected.add('gluten');
    detected.add('huevos');
  }

  // 5. Bocaditos de queso fritos / jalapeños rellenos
  if (/chilli cheese|cheese bite|jalapeno/.test(fullText)) {
    detected.add('gluten');
    detected.add('lacteos');
  }

  // 6. Salsas barbacoa / BBQ (habitualmente llevan mostaza, vinagres y sulfitos)
  if (/bbq|barbacoa/.test(fullText)) {
    detected.add('mostaza');
    detected.add('sulfitos');
  }

  // 7. Albóndigas tradicionales (miga de pan, huevo y a menudo queso)
  if (/albondiga|polpett|meatball/.test(fullText)) {
    detected.add('gluten');
    detected.add('huevos');
  }

  if (/harina|masa|trigo|pan|pasta|spaghetti|penne|tagliatelle|focaccia|cerveza|rebozado|crouton|gnocchi|lasana|lasagne|burger|hamburguesa|brioche|gluten|bocadillo/.test(fullText)) {
    detected.add('gluten');
  }

  if (/queso|mozzarella|burrata|stracciatella|parmesano|parmigiano|gorgonzola|provola|provolone|ricotta|nata|leche|mantequilla|crema|mascarpone|gelato|helado|tiramisu|fonduta|pecorino|cheddar|gouda|lacteos|yogur/.test(fullText)) {
    detected.add('lacteos');
  }

  if (/huevo|huevos|uovo|uova|egg|eggs|carbonara|mayonesa|tiramisu|yema|clara|rebozado/.test(fullText)) {
    detected.add('huevos');
  }

  if (/atun|tonno|salmon|anchoa|anchoas|acciughe|bacalao|pescado|pesce|fish|branzino|lubina|dorada/.test(fullText)) {
    detected.add('pescado');
  }

  if (/gamba|gambas|langostino|langostinos|bogavante|cangrejo|camaron|camarones|gamberi|gamberetti|crostacei|crustaceo/.test(fullText)) {
    detected.add('crustaceos');
  }

  if (/mejillon|mejillones|calamar|calamares|pulpo|almeja|almejas|polpo|cozze|vongole|mollusco|molusco/.test(fullText)) {
    detected.add('moluscos');
  }

  if (/nuez|nueces|pistacho|pistacchio|pistachio|avellana|avellanas|nocciola|nocciole|almendra|almendras|mandorle|mandorla|pinon|pinones|pinoli|nutella|cascara/.test(fullText)) {
    detected.add('frutoscascara');
  }

  if (/cacahuete|cacahuetes|mani|arachidi|peanut|peanuts/.test(fullText)) {
    detected.add('cacahuetes');
  }

  if (/soja|soya|soy|edamame/.test(fullText)) {
    detected.add('soja');
  }

  if (/apio|sedano|celery/.test(fullText)) {
    detected.add('apio');
  }

  if (/mostaza|senape|mustard/.test(fullText)) {
    detected.add('mostaza');
  }

  if (/sesamo|ajonjoli|sesame/.test(fullText)) {
    detected.add('sesamo');
  }

  if (/vino|vinagre|sulfito|sulfitos|aceto|prosecco|cava|champagne/.test(fullText)) {
    detected.add('sulfitos');
  }

  // Postres específicos
  if (/nutella/.test(fullText)) {
    detected.add('frutoscascara');
    detected.add('lacteos');
    detected.add('soja');
  }

  if (/tiramisu/.test(fullText)) {
    detected.add('gluten');
    detected.add('huevos');
    detected.add('lacteos');
  }

  // Si el plato se declara explícitamente "sin gluten", remover gluten
  if (isGlutenFree) {
    detected.delete('gluten');
  }

  // Suplementos o extras de servicio que no son platos de comida en sí
  if (isExtraOrService && (fullText.includes('llevar') || fullText.includes('ingrediente extra'))) {
    detected.clear();
  }

  return ALLERGENS
    .filter(a => detected.has(a.id))
    .map(a => a.id);
}
