# Especificación de Diseño: Auditoría de Entrega Final — Carta Web Kikko

**Fecha:** 2026-09-17  
**Estado:** Aprobado para Implementación  
**Proyecto:** Carta Web Gourmet Kikko (`kikko/carta-digital-kikko`)  
**Autor:** Antigravity Pairing Assistant  

---

## 1. Resumen Ejecutivo y Objetivos

El objetivo de este proyecto es establecer una auditoría integral, rigurosa y verificable para la entrega formal al cliente de la **Carta Web Kikko**. Dicha auditoría certifica:
1. **Conectividad e Integridad en Tiempo Real:** Comunicación fluida y sin fallos entre la base de datos (Google Sheets vía Google Apps Script), el backend/panel de control (`/admin`) y el frontend público de comensales.
2. **Eliminación Definitiva de Split-Brain y Bloqueos CORS:** Garantizar que la carta pública del comensal consuma siempre datos frescos de Google Sheets (`fetch` con `_t=Date.now()` sin cabeceras prohibidas que disparen preflights bloqueantes) y prescinda de copias obsoletas en `localStorage`.
3. **Autonomía Operativa Total del Administrador:** Verificación técnica y visual de todas las herramientas de personalización (precios, stock, alérgenos oficiales con IA, Dynamic Island promocional y evergreen, ordenación drag & drop, copias de seguridad y seguridad de PIN).
4. **Garantía Cero Residuos:** Pruebas automatizadas transaccionales con auto-rollback en memoria que no alteran la base de datos en producción.

---

## 2. Arquitectura de Auditoría en 2 Fases

```
[ Rama local: refactor-split-brain ]
                 │
                 ▼
┌───────────────────────────────────────────────────────────────┐
│          FASE A: AUDITORÍA TÉCNICA LOCAL (PRE-MERGE)          │
│        Comando: npm run test:audit                            │
│        Archivo: tests/auditDeliverySuite.ts                   │
│                                                               │
│   1. Healthcheck en vivo ──► Google Apps Script (GET 200)     │
│   2. Test Transaccional ──► Mutación temporal + Auto-Rollback │
│   3. Lógica de Negocio ───► Precios, Alérgenos, Promo, PIN    │
│   4. Seguridad & XSS ─────► Sanitización y control de accesos │
│   5. Generador de Reporte ─► reports/technical-audit.json     │
└───────────────────────────────┬───────────────────────────────┘
                                │ (Si 100% de aserciones pasan)
                                ▼
               [ Merge a 'main' & Push a GitHub ]
                                │
                                ▼
               [ Despliegue Automático en Vercel ]
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│         FASE B: PROTOCOLO DE ACEPTACIÓN EN PRODUCCIÓN         │
│         Documento: AUDITORIA_ENTREGA_KIKKO.md                 │
│                                                               │
│   1. Validación en Vivo ──► URL de Vercel (Móvil y Desktop)   │
│   2. Checklist Operativa ─► Pruebas guiadas del Administrador │
│   3. Verificación Comensal ► Comprobación de reflejo público  │
│   4. Acta de Conformidad ─► Firma formal de recepción         │
└───────────────────────────────────────────────────────────────┘
```

---

## 3. Especificación de la Suite Técnica Automatizada (`tests/auditDeliverySuite.ts`)

La suite técnica se implementa en TypeScript y se ejecuta en Node vía `tsx` sin dependencias de navegadores pesados:

### 3.1 Módulos de Prueba

#### Módulo 1: Healthcheck en Vivo y Conectividad con Google Sheets
- Realiza una petición `fetch(freshUrl)` nativa hacia `DEFAULT_GOOGLE_SHEETS_URL`.
- **Criterios de Aceptación:**
  - Código de estado HTTP 200.
  - Latencia total medida `< 2000ms` (alerta si superara 1500ms).
  - Estructura JSON válida conteniendo `categories` (array no vacío), `promoPill` (objeto de configuración) y `pinAdmin` (string).
  - Confirmación de ausencia de cabeceras prohibidas en `fetch` (`Cache-Control`), evitando bloqueos CORS preflight.

#### Módulo 2: Ciclo Transaccional E2E con Auto-Rollback Garantizado
- **Aislamiento Seguro:**
  1. **Snapshot:** Se toma copia en memoria del estado real actual de la hoja (`originalCategories`, `originalPromoPill`, `originalPin`).
  2. **Mutación Testigo:** Se aplica una alteración inocua e identificable (e.g. `promoPill.tag.es = "[AUDIT_VERIFIED]"`).
  3. **Escritura POST:** Se envía el payload vía `sendMenuToSheets` esperando `{ success: true }`.
  4. **Relectura GET:** Se solicita la hoja con timestamp anti-caché y se comprueba que el valor devuelto contenga exactamente `[AUDIT_VERIFIED]`.
  5. **Rollback Incondicional (`finally` block):**
     ```typescript
     try {
       // Ejecución de la prueba de mutación y relectura
     } finally {
       // Restauración inmediata del snapshot original
       await sendMenuToSheets(originalCategories, originalPromoPill, originalPin);
       // Verificación de que la hoja ha recuperado su estado original
     }
     ```

#### Módulo 3: Validación de Integridad de Modelos y Personalización
- **Precios e Ítems:** Verificación de tipos numéricos (`price > 0`), identificadores únicos y consistencia de categorías.
- **Matriz Oficial de 14 Alérgenos (Directiva UE 1169/2011):**
  - Validación contra la lista canónica de claves de alérgenos (`gluten`, `crustaceos`, `huevos`, `pescado`, `cacahuetes`, `soja`, `lacteos`, `frutos_cascara`, `apio`, `mostaza`, `sesamo`, `sulfitos`, `altramuces`, `moluscos`).
  - Verificación del asistente heurístico de detección automática de alérgenos (`detectAllergensFromText`).
- **Dynamic Island (Todos los Presets):**
  - Presets promocionales: `new`, `discount`, `two_for_one`, `event`.
  - Presets no comerciales: `google_review` (Google Maps 5★) y `booking` (WhatsApp directo de reservas).
  - Preservación de la estructura trilingüe `{ es, en, it }`.
- **Ordenación (Drag & Drop):** Verificación de funciones de reordenación de platos (`reorderItems`).
- **Copias de Seguridad (Backup JSON):** Comprobación de que la exportación de backup genera un JSON íntegro y que el importador valida la estructura correctamente antes de inyectarla al estado.

#### Módulo 4: Seguridad y Sanitización
- Verificación del flujo de autenticación por PIN:
  - Rechazo de PIN incorrecto.
  - Aceptación de PIN válido.
- Sanitización de entradas: Comprobación de que cadenas con caracteres especiales o intentos de inyección HTML/script no corrompan el parseo de datos ni rompan el contexto de React.

#### Módulo 5: Generador de Evidencias Técnicas
- Al finalizar la ejecución, la suite escribe `reports/technical-audit-report.json` con:
  - Timestamp ISO.
  - Branch Git y Commit Hash.
  - Tiempos de latencia registrados.
  - Tabla de aserciones aprobadas y fallidas.

---

## 4. Especificación del Documento Oficial de Entrega (`AUDITORIA_ENTREGA_KIKKO.md`)

Ubicado en la raíz del proyecto para consulta directa del cliente y del equipo técnico:

### 4.1 Secciones del Documento
1. **Ficha Técnica del Proyecto:**
   - Stack tecnológico (React 19, TypeScript, Tailwind CSS v4, Motion, Google Sheets / Apps Script, Vercel).
   - URLs de acceso público, panel de control y base de datos.
2. **Certificado de Resultados Técnicos (Fase A):**
   - Resumen del resultado de `npm run test:audit`.
   - Resultado de validación estática de TypeScript (`npm run lint`) y compilación (`npm run build`).
3. **Protocolo de Pruebas de Aceptación para el Administrador (Fase B):**
   - Formato de lista de chequeo interactiva `[ ]` con 7 pruebas esenciales paso a paso:
     1. Login y seguridad con PIN.
     2. Modificación de precio express y reflejo en mesa.
     3. Gestión de plato agotado / disponibilidad.
     4. Activación de promociones y avisos en Dynamic Island.
     5. Creación de nuevo plato con detector de alérgenos por IA.
     6. Reorganización del orden de la carta mediante arrastre.
     7. Descarga de copia de seguridad (Backup JSON).
4. **Guía Rápida de Contingencia y Recuperación:**
   - Procedimiento de restauración en 1 clic en caso de incidencia.
5. **Acta Formal de Conformidad y Recepción:**
   - Declaración de conformidad técnica y traspaso operativo.
   - Bloques de firma para el Administrador de Kikko y el Responsable Técnico.

---

## 5. Plan de Ejecución y Puertas de Calidad

1. **Configuración de Scripts:**
   - Añadir `"test:audit": "tsx tests/auditDeliverySuite.ts"` al `package.json`.
2. **Ejecución y Superación de Fase A:**
   - Ejecutar `npm run test:audit`.
   - Ejecutar `npm run lint` y `npm run build`.
   - Confirmar 100% de éxito en la rama `refactor-split-brain`.
3. **Merge a `main` y Despliegue:**
   - Fusionar `refactor-split-brain` en `main`.
   - Desplegar a Vercel y comprobar que el build pase limpiamente.
4. **Ejecución de Fase B:**
   - Completar el protocolo en vivo sobre la URL de producción y firmar el acta.
