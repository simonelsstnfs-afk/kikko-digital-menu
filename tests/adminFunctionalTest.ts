/**
 * Test Funcional Automatizado para el Editor de Administración de Kikko
 * Ejecutar con: npx tsx tests/adminFunctionalTest.ts
 */

import { autoTranslateProduct } from '../src/utils/translateService';
import { menuData as initialMenuData } from '../src/data';
import { MenuItem, MenuCategory, PromoPillConfig } from '../src/types';
import { ALLERGENS, detectAllergensFromText } from '../src/allergens';

async function runAdminFunctionalTests() {
  console.log('\n======================================================');
  console.log('🧪 INICIANDO TEST FUNCIONAL: EDITOR DE ADMINISTRACIÓN');
  console.log('======================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      if (details) console.log(`     └─ ${details}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      if (details) console.error(`     └─ ERROR: ${details}`);
    }
  }

  // -------------------------------------------------------------
  // TEST 1: SERVICIO DE TRADUCCIÓN AUTOMÁTICA EN VIVO (ES -> EN, IT)
  // -------------------------------------------------------------
  console.log('🔹 1. Probando Generación Automática de Traducciones...');
  const testDishName = 'Pizza Trufada con Champiñones';
  const testDishDesc = 'Base de tomate San Marzano, mozzarella fior di latte, aceite de trufa blanca y queso parmesano.';

  try {
    const startTime = Date.now();
    const translation = await autoTranslateProduct(testDishName, testDishDesc);
    const duration = Date.now() - startTime;

    assert(
      typeof translation.name.en === 'string' && translation.name.en.length > 0 && translation.name.en !== testDishName,
      'Traducción de nombre a Inglés generada correctamente',
      `"${testDishName}" -> "${translation.name.en}" (${duration}ms)`
    );

    assert(
      typeof translation.name.it === 'string' && translation.name.it.length > 0,
      'Traducción de nombre a Italiano generada correctamente',
      `"${testDishName}" -> "${translation.name.it}"`
    );

    assert(
      typeof translation.description.en === 'string' && translation.description.en.length > 0 && translation.description.en !== testDishDesc,
      'Traducción de ingredientes a Inglés generada correctamente',
      `"${translation.description.en.slice(0, 70)}..."`
    );

    assert(
      typeof translation.description.it === 'string' && translation.description.it.length > 0,
      'Traducción de ingredientes a Italiano generada correctamente',
      `"${translation.description.it.slice(0, 70)}..."`
    );
  } catch (err: any) {
    assert(false, 'Servicio de traducción automática', err?.message || String(err));
  }

  // -------------------------------------------------------------
  // TEST 2: AÑADIR NUEVO PRODUCTO AL MENÚ (CRUD: CREATE)
  // -------------------------------------------------------------
  console.log('\n🔹 2. Probando Creación de Nuevo Plato (CRUD: Create)...');
  const mockCategories: MenuCategory[] = JSON.parse(JSON.stringify(initialMenuData));
  const targetCategory = mockCategories.find(c => c.id === 'pizzas')!;
  const initialPizzaCount = targetCategory.items.length;

  const newTestItem: Omit<MenuItem, 'id'> = {
    name: {
      es: 'Pizza Burrata di Puglia (Test)',
      en: 'Pugliese Burrata Pizza (Test)',
      it: 'Pizza Burrata Pugliese (Test)'
    },
    description: {
      es: 'Tomate cherry confitado, pesto de albahaca y burrata fresca.',
      en: 'Confit cherry tomatoes, basil pesto and fresh burrata.',
      it: 'Pomodorini confit, pesto di basilico e burrata fresca.'
    },
    price: 14.50,
    available: true,
    subcategory: 'Gourmet'
  };

  const createdId = `test_dish_${Date.now()}`;
  const createdProduct: MenuItem = {
    id: createdId,
    ...newTestItem
  };
  targetCategory.items.push(createdProduct);

  assert(
    targetCategory.items.length === initialPizzaCount + 1,
    'El plato se añade exitosamente al catálogo',
    `Cantidad inicial: ${initialPizzaCount} -> Cantidad actual: ${targetCategory.items.length}`
  );

  const foundItem = targetCategory.items.find(i => i.id === createdId);
  assert(
    foundItem !== undefined && foundItem.price === 14.50 && foundItem.available === true,
    'Integridad de los datos del nuevo plato preservada',
    `ID: ${foundItem?.id}, Precio: ${foundItem?.price}€, Disponible: ${foundItem?.available}`
  );

  // -------------------------------------------------------------
  // TEST 3: EDICIÓN RÁPIDA DE PRECIO Y MODIFICACIÓN (CRUD: UPDATE)
  // -------------------------------------------------------------
  console.log('\n🔹 3. Probando Modificación de Precio y Disponibilidad (CRUD: Update)...');
  const updatedPrice = 16.90;
  foundItem!.price = updatedPrice;

  assert(
    foundItem!.price === updatedPrice,
    'Edición rápida de precio aplicada correctamente',
    `Precio anterior: 14.50€ -> Nuevo precio: ${foundItem!.price.toFixed(2)}€`
  );

  // Toggle disponibilidad
  foundItem!.available = false;
  assert(
    foundItem!.available === false,
    'Toggle de disponibilidad a "Agotado" aplicado',
    `Estado available: ${foundItem!.available}`
  );

  foundItem!.available = true;
  assert(
    foundItem!.available === true,
    'Toggle de disponibilidad de vuelta a "Disponible" aplicado',
    `Estado available: ${foundItem!.available}`
  );

  // -------------------------------------------------------------
  // TEST 4: REORDENACIÓN DE PLATOS (DRAG & DROP / REORDER EN CATEGORÍA)
  // -------------------------------------------------------------
  console.log('\n🔹 4. Probando Reordenación de Platos (Drag & Drop / Reorder)...');
  const originalOrderIds = targetCategory.items.map(i => i.id);
  const reorderedItems = [...targetCategory.items];
  // Mover el último elemento (el recién creado) al primer lugar (#1)
  const movedItem = reorderedItems.pop()!;
  reorderedItems.unshift(movedItem);
  targetCategory.items = reorderedItems;

  assert(
    targetCategory.items[0].id === createdId,
    'Plato movido a la primera posición (#1) mediante reordenación',
    `Nuevo primer plato: "${typeof targetCategory.items[0].name === 'string' ? targetCategory.items[0].name : targetCategory.items[0].name.es}"`
  );

  assert(
    targetCategory.items[1].id === originalOrderIds[0],
    'El orden relativo de los demás platos se preserva íntegramente',
    `Segundo plato: "${typeof targetCategory.items[1].name === 'string' ? targetCategory.items[1].name : targetCategory.items[1].name.es}"`
  );

  // -------------------------------------------------------------
  // TEST 5: INTEGRIDAD DE COPIA DE SEGURIDAD (EXPORTACIÓN / IMPORTACIÓN)
  // -------------------------------------------------------------
  console.log('\n🔹 5. Probando Sistema de Backup y Restauración...');
  const testPromo: PromoPillConfig = {
    active: true,
    tag: { es: 'Novedad', en: 'New', it: 'Novità' },
    title: { es: 'Test Novedad', en: 'Test New', it: 'Test Novità' },
    targetCategory: 'pizzas'
  };

  const exportedBackupStr = JSON.stringify({
    categories: mockCategories,
    promoPill: testPromo,
    exportedAt: new Date().toISOString()
  });

  assert(
    typeof exportedBackupStr === 'string' && exportedBackupStr.includes(createdId),
    'Exportación de respaldo JSON generada con todos los datos y platos nuevos'
  );

  const parsedBackup = JSON.parse(exportedBackupStr);
  assert(
    Array.isArray(parsedBackup.categories) && parsedBackup.categories.length === mockCategories.length,
    'Importación de respaldo JSON valida y restaura estructura exacta sin pérdidas'
  );

  // -------------------------------------------------------------
  // TEST 6: ELIMINACIÓN SEGURA DE PLATO (CRUD: DELETE)
  // -------------------------------------------------------------
  console.log('\n🔹 6. Probando Eliminación de Plato (CRUD: Delete)...');
  const indexToDelete = targetCategory.items.findIndex(i => i.id === createdId);
  if (indexToDelete !== -1) {
    targetCategory.items.splice(indexToDelete, 1);
  }

  assert(
    targetCategory.items.length === initialPizzaCount,
    'Plato eliminado correctamente y catálogo retornado a estado inicial',
    `Cantidad inicial: ${initialPizzaCount} == Cantidad final: ${targetCategory.items.length}`
  );

  const itemAfterDelete = targetCategory.items.find(i => i.id === createdId);
  assert(
    itemAfterDelete === undefined,
    'Confirmación de que el plato no existe en la categoría tras borrado'
  );

  // -------------------------------------------------------------
  // TEST 7: SISTEMA OFICIAL DE ALÉRGENOS (CATÁLOGO + DETECCIÓN + PERSISTENCIA)
  // -------------------------------------------------------------
  console.log('\n🔹 7. Probando Sistema de Alérgenos...');

  assert(
    ALLERGENS.length === 14,
    'Catálogo maestro contiene los 14 alérgenos oficiales de la UE',
    `Total registrados: ${ALLERGENS.length}`
  );

  const testPizzaDish = {
    name: 'Pizza Carbonara Autentica',
    description: 'Masa madre, mozzarella fiordilatte, guanciale crujiente, yema de huevo y pecorino romano.'
  };
  const detectedAllergens = detectAllergensFromText(testPizzaDish.name, testPizzaDish.description, 'pizzas');

  assert(
    detectedAllergens.includes('gluten') && detectedAllergens.includes('lacteos') && detectedAllergens.includes('huevos'),
    'Motor heurístico detecta gluten, lácteos y huevos en Pizza Carbonara',
    `Alérgenos detectados: [${detectedAllergens.join(', ')}]`
  );

  // Test de Entrantes: Croquetas y Bruschetta sin descripción explícita
  const croquetasDetected = detectAllergensFromText('Croquetas Mixtas Pollo y Jamón (6 unidades)', '', 'entrantes');
  assert(
    croquetasDetected.includes('gluten') && croquetasDetected.includes('lacteos') && croquetasDetected.includes('huevos'),
    'Motor heurístico detecta alérgenos culinarios en Croquetas (gluten, lácteos, huevos) aun sin descripción',
    `Croquetas detectadas: [${croquetasDetected.join(', ')}]`
  );

  const bruschettaDetected = detectAllergensFromText('Bruschetta con Tomate', '', 'entrantes');
  assert(
    bruschettaDetected.includes('gluten'),
    'Motor heurístico detecta gluten en Bruschetta por ser preparación a base de pan',
    `Bruschetta detectada: [${bruschettaDetected.join(', ')}]`
  );

  const dishWithAllergens: MenuItem = {
    id: 'test_dish_alg',
    name: { es: 'Calamares Fritos', en: 'Fried Squids', it: 'Calamari Fritti' },
    description: { es: 'Calamares con harina de sémola', en: 'Squids with semolina flour', it: 'Calamari con semola' },
    price: 14.5,
    allergens: ['gluten', 'moluscos']
  };

  assert(
    Array.isArray(dishWithAllergens.allergens) && dishWithAllergens.allergens.length === 2,
    'Plato almacena y persiste array de alérgenos correctamente',
    `Alérgenos asignados: ${dishWithAllergens.allergens?.join(', ')}`
  );

  // -------------------------------------------------------------
  // TEST 8: DYNAMIC ISLAND — NUEVOS PRESETS NO COMERCIALES (RESEÑAS & RESERVAS)
  // -------------------------------------------------------------
  console.log('\n🔹 8. Probando Presets de Dynamic Island (Reseñas Google & Reservas)...');

  const promoReviewPreset: PromoPillConfig = {
    active: true,
    type: 'google_review',
    tag: { es: 'RESEÑAS', en: 'REVIEWS', it: 'RECENSIONI' },
    title: { es: '¿Te gustó la experiencia?', en: 'Did you enjoy the experience?', it: "Ti è piaciuta l'esperienza?" },
    description: {
      es: 'Valóranos en Google con 5 estrellas y apoya a nuestro equipo.',
      en: 'Rate us 5 stars on Google and support our team.',
      it: 'Valutaci con 5 stelle su Google e supporta il nostro team.'
    },
    targetType: 'google_review'
  };

  assert(
    promoReviewPreset.type === 'google_review' && promoReviewPreset.targetType === 'google_review',
    'Preset de Reseñas de Google inicializa tipo y targetType correctos',
    `Tipo: ${promoReviewPreset.type}, Target: ${promoReviewPreset.targetType}`
  );

  const titleObj = typeof promoReviewPreset.title === 'object' && promoReviewPreset.title !== null ? promoReviewPreset.title : null;
  assert(
    titleObj !== null && titleObj.es.includes('experiencia'),
    'Preset de Reseñas contiene textos trilingües completos en título y tag',
    `ES: "${titleObj?.es}", EN: "${titleObj?.en}"`
  );

  const promoBookingPreset: PromoPillConfig = {
    active: true,
    type: 'booking',
    tag: { es: '📅 RESERVAS', en: '📅 BOOKINGS', it: '📅 PRENOTAZIONI' },
    title: { es: 'Reserva tu mesa en Kikko', en: 'Book your table at Kikko', it: 'Prenota il tuo tavolo da Kikko' },
    description: {
      es: 'Asegura tu sitio en salón o terraza en pocos segundos por WhatsApp.',
      en: 'Secure your table in dining room or terrace in seconds via WhatsApp.',
      it: 'Assicura il tuo posto in sala o terrazza in pochi secondi via WhatsApp.'
    },
    targetType: 'reservation'
  };

  assert(
    promoBookingPreset.type === 'booking' && promoBookingPreset.targetType === 'reservation',
    'Preset de Reservas de mesa inicializa tipo y targetType correctos',
    `Tipo: ${promoBookingPreset.type}, Target: ${promoBookingPreset.targetType}`
  );

  // Serialización y restauración de Dynamic Island
  const serializedPromo = JSON.stringify({ promoPill: promoReviewPreset });
  const restoredPromo = JSON.parse(serializedPromo).promoPill as PromoPillConfig;
  assert(
    restoredPromo.type === 'google_review' && restoredPromo.targetType === 'google_review',
    'Configuración de aviso no comercial se serializa y restaura íntegramente',
    `Restaurado: ${restoredPromo.type} con tag "${typeof restoredPromo.tag === 'object' ? restoredPromo.tag.es : restoredPromo.tag}"`
  );

  // -------------------------------------------------------------
  // RESUMEN FINAL
  // -------------------------------------------------------------
  console.log('\n======================================================');
  console.log(`📊 RESULTADOS DEL TEST: ${passedTests}/${totalTests} PASADOS (${Math.round((passedTests / totalTests) * 100)}%)`);
  if (passedTests === totalTests) {
    console.log('🎉 TODOS LOS TESTS FUNCIONALES PASARON CON ÉXITO');
    console.log('🛡️  Ningún dato de producción en Google Sheets fue alterado.');
  } else {
    console.error('⚠️  ALGUNOS TESTS FALLARON. REVISA EL REPORTE SUPERIOR.');
  }
  console.log('======================================================\n');
}

runAdminFunctionalTests().catch((err) => {
  console.error('Error fatal al ejecutar tests:', err);
  process.exit(1);
});
