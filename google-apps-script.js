/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - API DE SINCRONIZACIÓN PARA KIKKO CARTA DIGITAL
 * =========================================================================
 * 
 * INSTRUCCIONES DE INSTALACIÓN (2 MINUTOS):
 * 
 * 1. Ve a Google Drive (https://drive.google.com) y crea una nueva "Hoja de cálculo de Google" (Google Sheets).
 * 2. Nómbrala como quieras (ej. "Kikko Menú Base de Datos").
 * 3. En el menú superior, haz clic en "Extensiones" > "Apps Script".
 * 4. Borra todo el código que haya en el editor y PEGA ESTE ARCHIVO COMPLETO.
 * 5. Haz clic en "Implementar" (botón azul arriba a la derecha) > "Nueva implementación".
 * 6. Selecciona tipo: "Aplicación web" (icono de engranaje > Aplicación web).
 * 7. Configuración:
 *    - Descripción: "API Kikko Menú"
 *    - Ejecutar como: "Yo" (tu cuenta de Google)
 *    - Quién tiene acceso: "Cualquiera" (IMPORTANTE: selecciona "Cualquiera" para que la carta web pueda leer y escribir sin pedir login a los comensales).
 * 8. Haz clic en "Implementar", concede los permisos normales de Google.
 * 9. Copia la "URL de la aplicación web" (termina en /exec) y pégala en el panel /admin de la web en la pestaña "Ajustes".
 * =========================================================================
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Parámetro de acción ligera para verificar versión sin procesar toda la hoja
    if (e && e.parameter && e.parameter.action === 'checkVersion') {
      var rawSheet = ss.getSheetByName("_RAW_DATA");
      var version = 0;
      var updatedAt = null;
      if (rawSheet) {
        var rawVal = rawSheet.getRange("A1").getValue();
        if (rawVal) {
          try {
            var parsed = JSON.parse(rawVal);
            version = parsed.version || (parsed.updatedAt ? new Date(parsed.updatedAt).getTime() : 0);
            updatedAt = parsed.updatedAt || null;
          } catch (err) {}
        }
      }
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        version: version,
        updatedAt: updatedAt
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = readDataFromSheet(ss);
    
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var now = new Date();
    var versionTimestamp = now.getTime();
    
    if (payload.action === 'updatePin') {
      var configSheet = getOrCreateSheet(ss, "Configuracion");
      var configValues = configSheet.getDataRange().getValues();
      var found = false;
      for (var i = 1; i < configValues.length; i++) {
        if (configValues[i][0] === 'pin_admin') {
          configSheet.getRange(i + 1, 2).setValue(payload.pinAdmin);
          found = true;
          break;
        }
      }
      if (!found) {
        configSheet.appendRow(['pin_admin', payload.pinAdmin]);
      }
    } else if (payload.categories && Array.isArray(payload.categories)) {
      writeDataToSheet(ss, payload.categories, payload.promoPill, payload.pinAdmin, payload.schedule);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      version: versionTimestamp,
      updatedAt: now.toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (lock) lock.releaseLock();
  }
}

// -------------------------------------------------------------------------
// FUNCIONES AUXILIARES DE LECTURA Y ESCRITURA
// -------------------------------------------------------------------------

function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function writeDataToSheet(ss, categories, promoPill, pinAdmin, schedule) {
  var now = new Date();
  var versionTimestamp = now.getTime();
  
  // 1. Guardar copia JSON completa para fidelidad absoluta con VERSION atómica
  var rawSheet = getOrCreateSheet(ss, "_RAW_DATA");
  rawSheet.getRange("A1").setValue(JSON.stringify({
    version: versionTimestamp,
    updatedAt: now.toISOString(),
    categories: categories,
    promoPill: promoPill,
    schedule: schedule || null
  }));
  
  // 2. Guardar Píldora de Novedades y PIN en pestaña "Configuracion"
  var configSheet = getOrCreateSheet(ss, "Configuracion");
  
  // Rescatar el PIN anterior si no se provee uno en este guardado general
  var oldPin = null;
  var configValues = configSheet.getDataRange().getValues();
  for (var i = 1; i < configValues.length; i++) {
    if (configValues[i][0] === 'pin_admin') {
      oldPin = configValues[i][1];
      break;
    }
  }

  configSheet.clear();
  configSheet.getRange("A1:B1").setValues([["Clave", "Valor"]]);
  configSheet.getRange("A1:B1").setFontWeight("bold").setBackground("#C2410C").setFontColor("#FFFFFF");
  
  var configRows = [];
  
  if (promoPill) {
    var descEs = typeof promoPill.description === 'object' ? (promoPill.description.es || "") : (promoPill.description || "");
    var descEn = typeof promoPill.description === 'object' ? (promoPill.description.en || "") : "";
    var descIt = typeof promoPill.description === 'object' ? (promoPill.description.it || "") : "";

    configRows = [
      ["activa", promoPill.active ? "SI" : "NO"],
      ["tipo", promoPill.type || "dish"],
      ["tag_es", typeof promoPill.tag === 'object' ? (promoPill.tag.es || "") : (promoPill.tag || "")],
      ["tag_en", typeof promoPill.tag === 'object' ? (promoPill.tag.en || "") : ""],
      ["tag_it", typeof promoPill.tag === 'object' ? (promoPill.tag.it || "") : ""],
      ["titulo_es", typeof promoPill.title === 'object' ? (promoPill.title.es || "") : (promoPill.title || "")],
      ["titulo_en", typeof promoPill.title === 'object' ? (promoPill.title.en || "") : ""],
      ["titulo_it", typeof promoPill.title === 'object' ? (promoPill.title.it || "") : ""],
      ["descripcion_es", descEs],
      ["descripcion_en", descEn],
      ["descripcion_it", descIt],
      ["precio", promoPill.price !== undefined && promoPill.price !== null ? promoPill.price : ""],
      ["precio_original", promoPill.originalPrice !== undefined && promoPill.originalPrice !== null ? promoPill.originalPrice : ""],
      ["tipo_destino", promoPill.targetType || "category"],
      ["id_plato_destino", promoPill.targetItemId || ""],
      ["categoria_salto", promoPill.targetCategory || "risottos"]
    ];
  }
  
  var finalPin = pinAdmin || oldPin || "kikko2026";
  configRows.push(["pin_admin", finalPin.toString()]);
  
  if (configRows.length > 0) {
    configSheet.getRange(2, 1, configRows.length, 2).setValues(configRows);
    configSheet.autoResizeColumns(1, 2);
  }

  // 3. Guardar Platos en pestaña legible "Platos" para que el dueño pueda editarlos tipo Excel si quiere
  var platosSheet = getOrCreateSheet(ss, "Platos");
  platosSheet.clear();
  
  var headers = [
    "ID", "Categoria", "Nombre ES", "Nombre EN", "Nombre IT",
    "Precio (€)", "Subcategoria", "Disponible", 
    "Descripcion ES", "Descripcion EN", "Descripcion IT"
  ];
  platosSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  platosSheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#141A0F").setFontColor("#FFFFFF");

  var rows = [];
  categories.forEach(function(cat) {
    (cat.items || []).forEach(function(item) {
      var nameEs = typeof item.name === 'string' ? item.name : (item.name.es || '');
      var nameEn = typeof item.name === 'object' ? (item.name.en || '') : '';
      var nameIt = typeof item.name === 'object' ? (item.name.it || '') : '';

      var descEs = item.description ? (item.description.es || '') : '';
      var descEn = item.description ? (item.description.en || '') : '';
      var descIt = item.description ? (item.description.it || '') : '';

      rows.push([
        item.id || '',
        cat.id || '',
        nameEs,
        nameEn,
        nameIt,
        Number(item.price || 0),
        item.subcategory || '',
        item.available !== false ? "SI" : "NO",
        descEs,
        descEn,
        descIt
      ]);
    });
  });

  if (rows.length > 0) {
    platosSheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
    platosSheet.getRange(2, 6, rows.length, 1).setNumberFormat("#,##0.00 €");
    platosSheet.autoResizeColumns(1, headers.length);
  }
}

function readDataFromSheet(ss) {
  // Intentar leer primero de _RAW_DATA para máxima velocidad y fidelidad
  var rawDataObj = null;
  var rawSheet = ss.getSheetByName("_RAW_DATA");
  if (rawSheet) {
    var rawVal = rawSheet.getRange("A1").getValue();
    if (rawVal && rawVal.toString().trim().length > 0) {
      try {
        var parsed = JSON.parse(rawVal);
        if (parsed.categories && Array.isArray(parsed.categories)) {
          rawDataObj = parsed;
        }
      } catch (e) {}
    }
  }

  // Leer configuración de la píldora y PIN
  var promoPill = null;
  var pinAdmin = "kikko2026";
  var configSheet = ss.getSheetByName("Configuracion");
  if (configSheet) {
    var configValues = configSheet.getDataRange().getValues();
    var configMap = {};
    for (var j = 1; j < configValues.length; j++) {
      configMap[configValues[j][0]] = configValues[j][1];
    }
    if (configMap["pin_admin"]) {
      pinAdmin = configMap["pin_admin"].toString();
    }
    if (configMap["activa"] !== undefined && configMap["activa"] !== "") {
      promoPill = {
        active: configMap["activa"].toString().toUpperCase() === "SI",
        type: configMap["tipo"] || "dish",
        tag: {
          es: configMap["tag_es"] || "Novedad",
          en: configMap["tag_en"] || "New",
          it: configMap["tag_it"] || "Novità"
        },
        title: {
          es: configMap["titulo_es"] || "Risottos Auténticos",
          en: configMap["titulo_en"] || "Authentic Risottos",
          it: configMap["titulo_it"] || "Risotti Autentici"
        },
        description: {
          es: configMap["descripcion_es"] || "",
          en: configMap["descripcion_en"] || "",
          it: configMap["descripcion_it"] || ""
        },
        price: configMap["precio"] !== "" && !isNaN(Number(configMap["precio"])) ? Number(configMap["precio"]) : undefined,
        originalPrice: configMap["precio_original"] !== "" && !isNaN(Number(configMap["precio_original"])) ? Number(configMap["precio_original"]) : undefined,
        targetType: configMap["tipo_destino"] || "category",
        targetItemId: configMap["id_plato_destino"] || undefined,
        targetCategory: configMap["categoria_salto"] || "risottos"
      };
    }
  }

  // Si hay RAW_DATA usaremos eso para las categorías
  if (rawDataObj) {
    var rawVer = rawDataObj.version || (rawDataObj.updatedAt ? new Date(rawDataObj.updatedAt).getTime() : 0);
    return {
      version: rawVer,
      updatedAt: rawDataObj.updatedAt || null,
      categories: rawDataObj.categories,
      promoPill: promoPill, // Siempre primamos la config leida
      pinAdmin: pinAdmin,
      schedule: rawDataObj.schedule || null
    };
  }

  // Si no hay RAW_DATA o el dueño editó directamente la hoja "Platos":
  var platosSheet = ss.getSheetByName("Platos");
  if (!platosSheet) return { categories: [], promoPill: promoPill, pinAdmin: pinAdmin };

  var values = platosSheet.getDataRange().getValues();
  if (values.length <= 1) return { categories: [], promoPill: promoPill, pinAdmin: pinAdmin };

  var categoriesMap = {};
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var id = row[0].toString();
    var catId = (row[1] || 'otros').toString().toLowerCase().trim();
    var nameEs = row[2].toString();
    var nameEn = row[3] ? row[3].toString() : '';
    var nameIt = row[4] ? row[4].toString() : '';
    var price = parseFloat(row[5]) || 0;
    var subcategory = row[6] ? row[6].toString() : undefined;
    var available = row[7].toString().toUpperCase() !== 'NO';
    var descEs = row[8] ? row[8].toString() : '';
    var descEn = row[9] ? row[9].toString() : '';
    var descIt = row[10] ? row[10].toString() : '';

    if (!categoriesMap[catId]) {
      categoriesMap[catId] = {
        id: catId,
        titleKey: 'tab' + catId.charAt(0).toUpperCase() + catId.slice(1),
        categoryImage: '/' + catId + '.jpg',
        items: []
      };
    }

    var nameObj = (nameEn || nameIt) ? { es: nameEs, en: nameEn || nameEs, it: nameIt || nameEs } : nameEs;
    var descObj = { es: descEs, en: descEn, it: descIt };

    categoriesMap[catId].items.push({
      id: id,
      name: nameObj,
      description: descObj,
      price: price,
      subcategory: subcategory,
      available: available
    });
  }

  var categoriesList = Object.keys(categoriesMap).map(function(k) {
    return categoriesMap[k];
  });

  return {
    categories: categoriesList,
    promoPill: promoPill,
    pinAdmin: pinAdmin
  };
}
