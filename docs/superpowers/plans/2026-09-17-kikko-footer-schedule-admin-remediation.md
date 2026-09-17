# Plan de Implementación: Gestor de Horarios de Apertura en /admin y Pie de Página

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permitir al administrador gestionar los horarios de apertura de la pizzería desde la pestaña "Ajustes & Respaldo" en `/admin` con soporte multilínea, presets trilingües, auto-traducción en 1 clic y sincronización con Google Sheets, mostrándolos de forma adaptativa y fluida en el pie de página (`Footer.tsx`).

**Architecture:** El modelo `ScheduleConfig` almacena un array de `ScheduleItem` (días trilingües, horas y bandera de cerrado). `MenuDataContext` administra el estado reactivo, la persistencia en Google Sheets vía Apps Script, la inclusión en respaldos JSON y el aislamiento en Sandbox. `AdminPanel.tsx` ofrece controles de edición con previsualización en vivo, y `Footer.tsx` renderiza las líneas según el idioma activo del comensal.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Google Apps Script REST API.

## Global Constraints
- Responder siempre en español.
- Mantener TypeScript en modo estricto (`"strict": true`) sin errores de compilación (`tsc --noEmit`).
- No romper la maquetación mobile-first ni provocar desbordamientos horizontales.
- Preservar la compatibilidad CORS y los reintentos automáticos con Google Sheets.

---

### Task 1: Definición de Tipos y Configuración por Defecto
**Files:**
- Modify: `src/types.ts`

**Interfaces:**
- Produces: `ScheduleItem`, `ScheduleConfig`, `defaultScheduleConfig`.

- [ ] **Paso 1: Agregar interfaces `ScheduleItem` y `ScheduleConfig` en `src/types.ts`**
```typescript
export interface ScheduleItem {
  id: string;
  days: {
    es: string;
    en: string;
    it: string;
  };
  hours: string;
  isClosed?: boolean;
}

export interface ScheduleConfig {
  items: ScheduleItem[];
  updatedAt?: string;
}

export const defaultScheduleConfig: ScheduleConfig = {
  items: [
    {
      id: 'sched_default_1',
      days: {
        es: 'Lunes - Domingo',
        en: 'Monday - Sunday',
        it: 'Lunedì - Domenica'
      },
      hours: '12:30 - 21:30',
      isClosed: false
    }
  ]
};
```
- [ ] **Paso 2: Verificar compilación con `npm run lint`**
- [ ] **Paso 3: Commit de los tipos**
```bash
git add src/types.ts
git commit -m "feat(types): add ScheduleItem and ScheduleConfig interfaces"
```

---

### Task 2: Estado Global, Sincronización y Backups en `MenuDataContext` y Servicios
**Files:**
- Modify: `src/services/googleSheetsService.ts`
- Modify: `src/context/MenuDataContext.tsx`

**Interfaces:**
- Consumes: `ScheduleConfig`, `defaultScheduleConfig` desde `src/types.ts`.
- Produces: `schedule: ScheduleConfig`, `updateSchedule: (config: ScheduleConfig) => Promise<{ success: boolean; error?: string }>`.

- [ ] **Paso 1: Actualizar `src/services/googleSheetsService.ts`**
  - Añadir `schedule?: ScheduleConfig` en `SheetsResponse`.
  - En `sendMenuToSheets`, aceptar parámetro opcional `schedule?: ScheduleConfig` e incluirlo en el payload JSON enviado al Webhook.
  - En `fetchMenuFromSheets`, capturar `data.schedule` si existe en la respuesta de Google Sheets.
- [ ] **Paso 2: Actualizar `src/context/MenuDataContext.tsx`**
  - Añadir `schedule: ScheduleConfig` y `updateSchedule` al contrato de `MenuDataContextType`.
  - Crear estado `const [schedule, setSchedule] = useState<ScheduleConfig>(defaultScheduleConfig)`.
  - En `executePessimisticUpdate`, enviar `schedule` a `sendMenuToSheets`.
  - Implementar `updateSchedule`: en Sandbox actualiza en memoria; en modo real ejecuta guardado pesimista hacia Google Sheets.
  - En `exportBackup`, incluir `schedule: schedule` en el JSON exportado.
  - En `importBackup`, restaurar `schedule` si está presente en el archivo JSON.
  - En `syncWithSheets`, si la respuesta trae `schedule`, actualizar el estado local.
- [ ] **Paso 3: Verificar compilación con `npm run lint`**
- [ ] **Paso 4: Commit de la lógica de contexto y sincronización**
```bash
git add src/services/googleSheetsService.ts src/context/MenuDataContext.tsx
git commit -m "feat(context): integrate schedule state, cloud sync and backup handling"
```

---

### Task 3: Panel de Administración de Horarios en `AdminPanel.tsx`
**Files:**
- Modify: `src/components/admin/AdminPanel.tsx`

**Interfaces:**
- Consumes: `useMenuData().schedule`, `useMenuData().updateSchedule`, `translateText` (o asistente IA existente).
- Produces: Sección interactiva "Horarios de Apertura" en la pestaña "Ajustes & Respaldo".

- [ ] **Paso 1: Crear componente de gestión de horarios dentro de la pestaña `settings`**
  - Añadir presets predefinidos:
    - `"Lunes - Domingo"` (EN: `"Monday - Sunday"`, IT: `"Lunedì - Domenica"`)
    - `"Lunes - Jueves"` (EN: `"Monday - Thursday"`, IT: `"Lunedì - Giovedì"`)
    - `"Viernes - Domingo"` (EN: `"Friday - Sunday"`, IT: `"Venerdì - Domenica"`)
    - `"Lunes a Viernes"` (EN: `"Monday to Friday"`, IT: `"Da Lunedì a Venerdì"`)
    - `"Sábado y Domingo"` (EN: `"Saturday & Sunday"`, IT: `"Sabato e Domenica"`)
    - `"Día de descanso"` (EN: `"Closed for rest"`, IT: `"Chiuso per riposo"`)
  - Permitir edición de días en español con botón de auto-traducción que llama al traductor automático para rellenar EN e IT.
  - Input para rango de horas.
  - Checkbox / Toggle "Marcar como Cerrado" (`isClosed`).
  - Botón para eliminar fila (`Trash2`), restringido si solo queda 1 fila.
  - Botón `+ Añadir Línea de Horario`.
  - Vista previa en tiempo real idéntica al footer.
  - Botón *"Guardar Horarios en la Nube"* con feedback visual de éxito/error.
- [ ] **Paso 2: Verificar compilación con `npm run lint`**
- [ ] **Paso 3: Commit del componente de administración**
```bash
git add src/components/admin/AdminPanel.tsx
git commit -m "feat(admin): add dynamic schedule management section in settings tab"
```

---

### Task 4: Renderizado Dinámico y Adaptabilidad Móvil en `Footer.tsx`
**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `useMenuData().schedule`, `useLanguage().language`.
- Produces: Lista reactiva de horarios en el pie de página.

- [ ] **Paso 1: Actualizar `src/components/Footer.tsx`**
  - Importar `useMenuData` y extraer `schedule`.
  - Reemplazar la fila estática por un mapeo de `schedule.items`.
  - Resolver el texto del día según idioma: `item.days[language as 'es'|'en'|'it'] || item.days.es`.
  - Ajustar el layout flex con `flex flex-col gap-2` y `justify-between` para que en móviles nunca se corte el texto.
  - Si `item.isClosed`, mostrar insignia de "Cerrado" (`text-rose-400 font-semibold text-xs`).
  - Mantener fallback si `schedule.items` viene vacío.
- [ ] **Paso 2: Verificar compilación con `npm run lint` y `npm run build`**
- [ ] **Paso 3: Commit del pie de página dinámico**
```bash
git add src/components/Footer.tsx
git commit -m "feat(footer): render dynamic schedule items with responsive mobile layout"
```

---

### Task 5: Pruebas Automatizadas y Verificación Final
**Files:**
- Modify: `tests/adminFunctionalTest.ts`
- Modify: `tests/auditDeliverySuite.ts`

- [ ] **Paso 1: Añadir prueba de horarios en `tests/adminFunctionalTest.ts`**
  - Fase 9: Probar adición de nueva fila de horario, edición de días/horas, marcado de cierre y persistencia.
  - Validar que el backup JSON incluye los horarios y los restaura sin pérdidas.
- [ ] **Paso 2: Ejecutar suite de pruebas funcionales**
  - `npm run test:admin` -> Confirmar 100% aprobadas.
- [ ] **Paso 3: Ejecutar suite de auditoría con Google Sheets**
  - `npm run test:audit` -> Confirmar 100% aprobadas.
- [ ] **Paso 4: Comprobar linting y build**
  - `npm run lint` (`tsc --noEmit`) -> 0 errores.
  - `npm run build` -> Compilación limpia.
- [ ] **Paso 5: Commit y push a `main`**
```bash
git add tests/adminFunctionalTest.ts tests/auditDeliverySuite.ts
git commit -m "test(admin): add automated verification for dynamic schedule manager"
git push origin main
```
