# Especificación de Diseño: Plan Detallado de Auditoría y Verificación — Carta Web Kikko

**Fecha:** 2026-09-17  
**Estado:** Aprobado para Implementación  
**Proyecto:** Carta Web Gourmet Kikko (`kikko/carta-digital-kikko`)  
**Metodología:** Análisis Contrastado en Modo Read-Only contra Código Fuente Real  
**Referencia Auditada:** `c:\Users\tnfst\.gemini\antigravity\brain\835d9bed-da6e-42db-b25b-df7aeb331382\auditoria-kikko-carta-digital.md`  

---

## 1. Resumen Ejecutivo y Alcance

Este documento establece el **Plan Detallado de Verificación y Remediación** resultante del análisis exhaustivo y contrastado de la auditoría externa preliminar contra el código fuente real de la Carta Digital Kikko.

El objetivo es discernir entre:
1. **Problemas Confirmados en Código:** Vulnerabilidades o carencias reales que requieren intervención.
2. **Matices y Desincronizaciones Técnicas:** Casos donde el informe asumía fallos totales (e.g. pérdida de reservas de WhatsApp), pero el código real utiliza mecanismos cableados o fuentes paralelas.
3. **Código Muerto / Residuos Legados:** Bloques obsoletos (como el array de reseñas `REVIEWS`) que no se renderizan en la web pública pero generan ruido.
4. **Plan de Acción por Fases:** Hoja de ruta estructurada en Fase 1 (Express Pre-Entrega), Fase 2 (Blindaje y Rendimiento) y Fase 3 (Deuda Técnica Estructural).

---

## 2. Matriz de Diagnóstico y Verificación por Dominios Arquitectónicos

### Dominio 1: Seguridad, Credenciales y Control de Acceso

#### Ficha C3: PIN Maestro en el Bundle de Cliente
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`src/components/admin/AdminPanel.tsx:44`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/src/components/admin/AdminPanel.tsx#L44): `const DEFAULT_PIN = 'kikko2026';`.
- **Causa Raíz:** Arquitectura estática SPA sin backend autenticador tradicional.
- **Repercusión:** Un usuario con DevTools puede inspeccionar el bundle compilado y obtener el PIN por defecto para acceder al panel `/admin`.
- **Mitigación:** 
  1. Reemplazar el PIN por defecto visible por un valor privado seguro o validar directamente contra el `pinAdmin` remoto de Google Sheets.
  2. Forzar al administrador a modificar el PIN en su primer inicio de sesión.
  3. Mantener `sessionStorage` para expiración de sesión al cerrar pestaña.

#### Ficha C4: Exposición del Endpoint de Google Apps Script
- **Estado en Código Actual:** `MATIZADO / CONTROLADO`.
- **Ubicación Exacta:** [`src/services/googleSheetsService.ts:4`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/src/services/googleSheetsService.ts#L4).
- **Causa Raíz:** La carta es una SPA client-side que lee directamente de Google Sheets para velocidad y coste cero de servidor.
- **Repercusión:** Riesgo de peticiones `POST` arbitrarias hacia el webhook si no existe validación en Apps Script.
- **Mitigación:** 
  1. Validar un token secreto (`payload.authKey`) o hash del PIN de administración en el `doPost` de Google Apps Script.
  2. Mover la constante pública a la variable de entorno `VITE_GOOGLE_SHEETS_URL`.

#### Ficha C10: Cabeceras de Seguridad HTTP en `vercel.json`
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`vercel.json`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/vercel.json). Solo contiene la regla de rewrite SPA.
- **Causa Raíz:** Omisión de la sección `headers` en la configuración de Vercel.
- **Repercusión:** Vulnerabilidad a ataques de clickjacking (iframe embebido), MIME-type sniffing y falta de Content-Security-Policy (CSP).
- **Mitigación:** Añadir cabeceras HTTP de seguridad:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Content-Security-Policy` calibrada para recursos de Google Fonts, Maps y Apps Script.

---

### Dominio 2: Integridad de Datos y Fuentes de Verdad

#### Ficha C1: Teléfono de WhatsApp para Reservas
- **Estado en Código Actual:** `MATIZADO / CONSTANTE HUÉRFANA`.
- **Ubicación Exacta:** 
  - En [`src/products.ts:4`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/src/products.ts#L4): `export const PHONE_WHATSAPP = '34600000000'` (no se usa en ningún lugar).
  - En [`src/components/ReservationForm.tsx:60`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/src/components/ReservationForm.tsx#L60): `https://wa.me/34611873391?text=${encodedMessage}` (número real operativo).
- **Causa Raíz:** Refactorización previa donde el número real se cableó directamente en el formulario sin actualizar ni conectar `products.ts`.
- **Repercusión:** Las reservas **NO** se pierden. El problema real es la ruptura del principio de Única Fuente de Verdad (SSOT).
- **Mitigación:** Crear constante única `PHONE_WHATSAPP = '34611873391'` en configuración e importarla directamente en `ReservationForm.tsx`.

#### Ficha C2: URL de Reseñas de Google Maps
- **Estado en Código Actual:** `MATIZADO / CONSTANTE HUÉRFANA`.
- **Ubicación Exacta:** 
  - En `src/products.ts:3`: `'https://maps.app.goo.gl/kikkoPizzeriaTenerife'`.
  - En `src/components/GoogleReviewCTA.tsx:4` y `src/components/DynamicIsland.tsx:17`: `https://g.page/r/CTkP71YejfMQEBM/review` (URL oficial activa).
- **Causa Raíz:** Constante obsoleta no eliminada de `products.ts`.
- **Mitigación:** Eliminar la constante huérfana de `products.ts` y consolidar la URL oficial como exportación única.

#### Ficha A3: Alérgeno Altramuces (#14) en el Motor Heurístico
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`src/allergens.ts:380-420`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/src/allergens.ts#L380).
- **Causa Raíz:** Falta de expresión regular para `altramuces` en `detectAllergensFromText`.
- **Repercusión:** Incumplimiento del Reglamento UE 1169/2011 si se da de alta un plato con altramuces y el administrador confía en la detección por IA sin marcarlo a mano.
- **Mitigación:** Incorporar regla: `if (/altramuz|altramuces|lupin|lupini/i.test(fullText)) detected.add('altramuces');`.

#### Ficha A1: Bivalencia de Nombres de Platos (`string` vs `{ es, en, it }`)
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** `src/types.ts:25`.
- **Repercusión:** Riesgo de excepciones `Cannot read property 'es' of string` si se consulta sin guardas de tipo.
- **Mitigación:** Implementar helper utilitario seguro `getLocalizedName(item.name, lang)` de uso transversal.

#### Ficha A7: Cruce de Traducciones (`heroSabor` vs `heroAutentico`)
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** `src/translations.ts:18-19`. `heroSabor` (EN: 'Authentic') y `heroAutentico` (EN: 'Flavor').
- **Mitigación:** Corregir el intercambio en inglés para que `heroSabor` sea `'Flavor'` / `'Taste'` y `heroAutentico` sea `'Authentic'`.

#### Ficha A10: Validación de Fechas Pasadas en Reservas
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** `src/components/ReservationForm.tsx:19`. Comentario `// Date restriction removed`.
- **Repercusión:** Posibilidad de enviar por WhatsApp una reserva para un día anterior.
- **Mitigación:** Añadir `min={new Date().toISOString().split('T')[0]}` al `<input type="date">`.

---

### Dominio 3: Experiencia de Usuario, SEO e Internacionalización

#### Ficha C7: Persistencia de Idioma en `LanguageContext`
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`src/LanguageContext.tsx:13`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/src/LanguageContext.tsx#L13): `useState<Language>('es')`.
- **Causa Raíz:** Falta de interacción con `localStorage`.
- **Repercusión:** Turistas extranjeros (mercado clave en Tenerife) que eligen inglés o italiano pierden su selección al recargar o regresar a la carta.
- **Mitigación:** 
  1. Inicializar leyendo `localStorage.getItem('kikko_lang') || 'es'`.
  2. Persistir en `setLanguage` mediante `localStorage.setItem('kikko_lang', lang)`.

#### Ficha C5: Falta de Metadatos, Open Graph y Favicon en `index.html`
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`index.html`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/index.html).
- **Causa Raíz:** Plantilla base de Vite sin personalizar para entrega final.
- **Repercusión:** Sin descripción para Google; al compartir por WhatsApp no se genera vista previa con imagen ni texto del restaurante.
- **Mitigación:** Añadir `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`), Twitter Cards y favicon vectorial en `public/`.

#### Ficha C6: Nombre Incorrecto en `metadata.json`
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`metadata.json:2`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/metadata.json#L2): `"name": "La Vera - Menú de Pizzería"`.
- **Mitigación:** Renombrar a `"name": "Kikko - Carta Digital Gourmet"` y adaptar descripción.

#### Ficha A8: Reseñas de Google y Residuos de Versión Previa
- **Estado en Código Actual:** `CÓDIGO MUERTO CONFIRMADO`.
- **Ubicación Exacta:** `src/products.ts:165-198`.
- **Diagnóstico Contrastado:** La web **NO muestra reseñas individuales** en ninguna sección. El componente real [`GoogleReviewCTA.tsx`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/src/components/GoogleReviewCTA.tsx) es un banner directo con botón para abrir Google Maps. El array `REVIEWS` en `products.ts` nunca es importado ni consumido.
- **Mitigación:** Eliminar por completo el array residual `REVIEWS` de `products.ts`, reduciendo el bundle y eliminando falsas alarmas.

#### Ficha A11 y A18: Cadenas Hardcodeadas en Modales
- **Estado en Código Actual:** `CONFIRMADO`. Cadenas en `ProductModal.tsx` ("Guardar Cambios", "Cancelar") y en `AllergenGuideModal.tsx`.
- **Mitigación:** Migrar estas cadenas al archivo central `src/translations.ts`.

---

### Dominio 4: Rendimiento, Calidad de Código y Despliegue

#### Ficha C9: Fragmentación de Bundles (`manualChunks`) en `vite.config.ts`
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`vite.config.ts`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/vite.config.ts).
- **Causa Raíz:** Ausencia de configuración `build.rollupOptions`. Genera un único bundle JS de >550 kB.
- **Repercusión:** Descarga pesada en conexiones móviles 3G/4G en sala, aumentando el tiempo hasta interactividad (TTI).
- **Mitigación:** Configurar vendor splitting en `vite.config.ts` (`vendor-react`, `vendor-motion`, `vendor-icons`).

#### Ficha C8: Modo Estricto de TypeScript en `tsconfig.json`
- **Estado en Código Actual:** `CONFIRMADO`.
- **Ubicación Exacta:** [`tsconfig.json`](file:///c:/Users/tnfst/Workspaces/Web%20builder/kikko/carta-digital-kikko/tsconfig.json).
- **Causa Raíz:** Falta de `"strict": true`.
- **Mitigación:** Habilitar `"strict": true` y validar compilación con `npm run lint`.

#### Ficha A4 y A5: Timeout con `AbortController` en Google Sheets
- **Estado en Código Actual:** `PARCIALMENTE MITIGADO`. Reintentos ya implementados; falta timeout en escritura POST.
- **Mitigación:** Incorporar `signal: AbortSignal.timeout(10000)` en `sendMenuToSheets`.

#### Fichas A20, A21 y A22: Limpieza de `package.json`
- **Estado en Código Actual:** `CONFIRMADO`.
  - Duplicidad de `vite` en `dependencies` y `devDependencies`.
  - `@tailwindcss/vite` y `@vitejs/plugin-react` en `dependencies`.
  - Nombre `"react-example"`.
- **Mitigación:** Reestructurar dependencias y renombrar a `"kikko-carta-digital"`.

#### Ficha A17: Deuda Técnica en `AdminPanel.tsx` (2.464 líneas)
- **Estado en Código Actual:** `CONFIRMADO`.
- **Mitigación (Fase 3):** Planificar la separación en submódulos especializados:
  - `AdminProductsSection.tsx`
  - `AdminPromoSection.tsx`
  - `AdminSettingsSection.tsx`

---

## 3. Plan de Remediación Integrado por Fases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ FASE 1: Remediaciones Express Pre-Entrega (~30 min)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Centralizar PHONE_WHATSAPP = '34611873391' e importar en ReservationForm│
│ 2. Unificar GOOGLE_MAPS_REVIEW_URL oficial y eliminar constante huérfana   │
│ 3. Eliminar código muerto residual REVIEWS de products.ts                  │
│ 4. Implementar persistencia de idioma en LanguageContext.tsx con localStorage│
│ 5. Añadir meta tags, OpenGraph y descripción local en index.html           │
│ 6. Actualizar metadatos del restaurante en metadata.json                   │
│ 7. Añadir expresión regular para altramuces en allergens.ts                │
│ 8. Limpiar duplicidad de vite y reorganizar dependencias en package.json   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ FASE 2: Blindaje de Seguridad y Rendimiento (~45 min)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Incorporar headers de seguridad HTTP en vercel.json                      │
│ 2. Configurar manualChunks en vite.config.ts para vendor splitting         │
│ 3. Activar "strict": true en tsconfig.json                                 │
│ 4. Añadir AbortController con timeout de 10s en sendMenuToSheets           │
│ 5. Añadir validación de fecha mínima hoy en ReservationForm.tsx            │
│ 6. Crear archivo .env.example documentado                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ FASE 3: Calidad Estructural y Mantenibilidad (Post-Entrega / Backlog)       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Modularización de AdminPanel.tsx (2.464 líneas) en componentes hijos     │
│ 2. Integrar sesión de fotos reales de alta resolución de platos            │
│ 3. Limpieza de prefijos CSS obsoletos y ajustes WCAG 2.1                   │
└─────────────────────────────────────────────────────────────────────────────┘
```
