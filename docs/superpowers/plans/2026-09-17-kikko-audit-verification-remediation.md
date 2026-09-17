# Plan de Implementación: Verificación y Remediación de Auditoría — Carta Web Kikko

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remediar de forma sistemática y no invasiva las vulnerabilidades, constantes huérfanas, carencias de SEO/i18n y optimizaciones de build detectadas en la auditoría contrastada de la Carta Web Kikko.

**Architecture:** Enfoque por fases priorizadas: Fase 1 (Remediaciones Express de datos, SEO e internacionalización con cero riesgo regresivo) y Fase 2 (Blindaje de seguridad HTTP, vendor splitting de chunks con Vite, modo estricto de TypeScript y limpieza de dependencias).

**Tech Stack:** React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4, Motion 12, Google Apps Script REST.

## Global Constraints

- No alterar la experiencia visual minimalista y gourmet aprobada por el cliente.
- Mantener la compatibilidad total con Google Sheets sin cabeceras prohibidas que provoquen bloqueos CORS.
- Todo el código modificado debe satisfacer `npm run lint` (`tsc --noEmit` en modo estricto) y `npm run build`.
- No alterar ni eliminar datos de producción en Google Sheets.
- Todas las salidas y documentaciones en español.

---

### Task 1: Unificación de Constantes de Negocio y Eliminación de Código Muerto

**Files:**
- Modify: `src/products.ts`
- Modify: `src/components/ReservationForm.tsx:55-65`
- Modify: `src/components/GoogleReviewCTA.tsx:1-10`
- Modify: `src/components/DynamicIsland.tsx:15-20`

**Interfaces:**
- Produces: `PHONE_WHATSAPP = '34611873391'` y `GOOGLE_MAPS_REVIEW_URL = 'https://g.page/r/CTkP71YejfMQEBM/review'` como constantes únicas canónicas exportadas desde `src/products.ts`.

- [ ] **Paso 1: Actualizar constantes canónicas y eliminar código muerto en `src/products.ts`**

En `src/products.ts`:
1. Actualizar `PHONE_WHATSAPP` con `'34611873391'`.
2. Actualizar `GOOGLE_MAPS_REVIEW_URL` con `'https://g.page/r/CTkP71YejfMQEBM/review'`.
3. Eliminar el array residual `REVIEWS` (líneas 165-198) que no se utiliza en ningún lugar de la aplicación.

- [ ] **Paso 2: Consumir `PHONE_WHATSAPP` en `ReservationForm.tsx`**

Importar `PHONE_WHATSAPP` desde `../products` y actualizar línea 60:
```typescript
const whatsappUrl = `https://wa.me/${PHONE_WHATSAPP}?text=${encodedMessage}`;
```

- [ ] **Paso 3: Consumir `GOOGLE_MAPS_REVIEW_URL` en `GoogleReviewCTA.tsx` y `DynamicIsland.tsx`**

Importar `GOOGLE_MAPS_REVIEW_URL` desde `../products` eliminando las definiciones locales duplicadas.

- [ ] **Paso 4: Verificar compilación y tests**

Ejecutar: `npm run lint && npm run test:admin`

- [ ] **Paso 5: Commit de Task 1**

```bash
git add src/products.ts src/components/ReservationForm.tsx src/components/GoogleReviewCTA.tsx src/components/DynamicIsland.tsx
git commit -m "refactor(config): unify phone and review constants and remove dead code REVIEWS"
```

---

### Task 2: Persistencia de Idioma en `LanguageContext`

**Files:**
- Modify: `src/LanguageContext.tsx`

**Interfaces:**
- Produces: Persistencia del idioma del comensal en `localStorage` con clave `kikko_preferred_lang`.

- [ ] **Paso 1: Añadir lectura y escritura en `localStorage` con salvaguardas de SSR**

Modificar `src/LanguageContext.tsx`:
```typescript
const STORAGE_KEY = 'kikko_preferred_lang';

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language;
      if (stored === 'es' || stored === 'en' || stored === 'it') {
        return stored;
      }
      const navLang = navigator.language.slice(0, 2);
      if (navLang === 'it') return 'it';
      if (navLang === 'en') return 'en';
    } catch (e) {}
  }
  return 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    } catch (e) {}
  };
```

- [ ] **Paso 2: Verificar tests**

Ejecutar: `npm run lint && npm run test:admin`

- [ ] **Paso 3: Commit de Task 2**

```bash
git add src/LanguageContext.tsx
git commit -m "feat(i18n): persist user language selection in localStorage"
```

---

### Task 3: Enriquecimiento de SEO, OpenGraph y Metadatos del Proyecto

**Files:**
- Modify: `index.html`
- Modify: `metadata.json`

- [ ] **Paso 1: Enriquecer `<head>` en `index.html`**

Añadir meta descripción, Open Graph para previsualizaciones de WhatsApp/redes sociales y favicon:
```html
<meta name="description" content="Carta Digital Gourmet de Kikko Restaurante Pizzería en Tenerife. Auténticas pizzas artesanales, pastas, risottos, alérgenos y reservas directas por WhatsApp." />
<meta property="og:title" content="Kikko - Restaurante Pizzeria Italiano" />
<meta property="og:description" content="Carta Digital Gourmet y reservas en mesa para Kikko Pizzería en Tenerife." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://pizza-delivery-web-app-zeta.vercel.app/" />
<meta property="og:image" content="https://pizza-delivery-web-app-zeta.vercel.app/social-banner.jpg" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- [ ] **Paso 2: Actualizar `metadata.json`**

Actualizar `"name": "Kikko - Carta Digital Gourmet"` y su descripción respectiva.

- [ ] **Paso 3: Commit de Task 3**

```bash
git add index.html metadata.json
git commit -m "feat(seo): add meta description, OpenGraph tags and update project metadata"
```

---

### Task 4: Detección de Altramuces, Corrección de Traducciones y Fecha Mínima de Reservas

**Files:**
- Modify: `src/allergens.ts:400-420`
- Modify: `src/translations.ts:18-20`
- Modify: `src/components/ReservationForm.tsx:18-25`

- [ ] **Paso 1: Añadir expresión regular para altramuces en `src/allergens.ts`**

En `detectAllergensFromText`:
```typescript
if (/altramuz|altramuces|lupin|lupini/i.test(fullText)) {
  detected.add('altramuces');
}
```

- [ ] **Paso 2: Corregir claves intercambiadas en `src/translations.ts`**

Corregir inglés de `heroSabor` a `'Flavor'` y `heroAutentico` a `'Authentic'`.

- [ ] **Paso 3: Añadir validación de fecha mínima en `ReservationForm.tsx`**

En el `<input type="date">`, añadir `min={new Date().toISOString().split('T')[0]}` para evitar reservas en fechas pasadas.

- [ ] **Paso 4: Verificar tests**

Ejecutar: `npm run lint && npm run test:admin`

- [ ] **Paso 5: Commit de Task 4**

```bash
git add src/allergens.ts src/translations.ts src/components/ReservationForm.tsx
git commit -m "fix(compliance): add lupin allergen detection, fix translation keys and enforce min reservation date"
```

---

### Task 5: Optimización de Build (manualChunks), Headers de Seguridad y Limpieza de Dependencias

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`
- Modify: `vercel.json`
- Create: `.env.example`

- [ ] **Paso 1: Limpiar y organizar `package.json`**

- Eliminar duplicación de `vite` de `dependencies` (mantenerlo únicamente en `devDependencies`).
- Mover `@tailwindcss/vite` y `@vitejs/plugin-react` a `devDependencies`.
- Cambiar nombre a `"name": "kikko-carta-digital"`.

- [ ] **Paso 2: Configurar `manualChunks` en `vite.config.ts`**

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom'],
        'vendor-motion': ['motion'],
        'vendor-icons': ['lucide-react']
      }
    }
  }
}
```

- [ ] **Paso 3: Añadir cabeceras de seguridad HTTP en `vercel.json`**

```json
{
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

- [ ] **Paso 4: Crear `.env.example`**

```bash
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbwg8LkEU_r4YU610af0mnzwV2jsnZZTfo0Z4bZKWsuxdayPubJGjArqcjdei-Ydi7j5/exec
```

- [ ] **Paso 5: Habilitar `"strict": true` en `tsconfig.json` y verificar**

Verificar que `npm run lint` pase sin errores.

- [ ] **Paso 6: Commit de Task 5**

```bash
git add package.json vite.config.ts tsconfig.json vercel.json .env.example
git commit -m "perf(build): configure vendor manualChunks, security headers in vercel and clean dependencies"
```

---

### Task 6: Verificación Integral Final y Actualización de Auditoría

**Files:**
- Modify: `AUDITORIA_ENTREGA_KIKKO.md`
- Update: `reports/technical-audit-report.json`

- [ ] **Paso 1: Ejecutar verificación estática completa**

Ejecutar: `npm run lint`  
Esperado: 0 errores.

- [ ] **Paso 2: Ejecutar compilación de producción**

Ejecutar: `npm run build`  
Esperado: Compilación limpia sin avisos de chunks mayores a 500 kB.

- [ ] **Paso 3: Ejecutar suite de auditoría técnica con auto-rollback**

Ejecutar: `npm run test:audit`  
Esperado: 100% aprobado y reporte generado.

- [ ] **Paso 4: Ejecutar suite funcional de administración**

Ejecutar: `npm run test:admin`  
Esperado: 24/24 aprobados.

- [ ] **Paso 5: Actualizar `AUDITORIA_ENTREGA_KIKKO.md` certificando la remediación de los hallazgos de la auditoría externa**

- [ ] **Paso 6: Commit final y push a producción**

```bash
git add AUDITORIA_ENTREGA_KIKKO.md reports/
git commit -m "docs: certify complete remediation of external audit findings in delivery document"
git push origin main
```
