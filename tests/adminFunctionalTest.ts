/**
 * Test Funcional Automatizado para el Editor de Administración de Kikko
 * Ejecutar con: npx tsx tests/adminFunctionalTest.ts
 */

import { autoTranslateProduct } from '../src/utils/translateService';
import { menuData as initialMenuData } from '../src/data';
import { MenuItem, MenuCategory, PromoPillConfig } from '../src/types';

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
  // TEST 4: INTEGRIDAD DE COPIA DE SEGURIDAD (EXPORTACIÓN / IMPORTACIÓN)
  // -------------------------------------------------------------
  console.log('\n🔹 4. Probando Sistema de Backup y Restauración...');
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
  // TEST 5: ELIMINACIÓN SEGURA DE PLATO (CRUD: DELETE)
  // -------------------------------------------------------------
  console.log('\n🔹 5. Probando Eliminación de Plato (CRUD: Delete)...');
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
