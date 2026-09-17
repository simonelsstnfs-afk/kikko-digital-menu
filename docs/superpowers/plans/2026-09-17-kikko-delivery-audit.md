# Auditoría de Entrega Final — Carta Web Kikko Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar una suite técnica automatizada con auto-rollback transaccional y redactar el documento oficial de entrega y aceptación para certificar la estabilidad, seguridad, sincronización bidireccional (Google Sheets ➔ `/admin` ➔ Frontend) y personalización total de la Carta Web Kikko.

**Architecture:** Arquitectura de auditoría en 2 fases: Fase A (técnica local pre-merge con suite de 5 módulos en TypeScript ejecutada en Node mediante `tsx`, que valida conectividad en vivo, reversión transaccional y lógica de administración sin residuos en base de datos) y Fase B (protocolo de aceptación en producción con checklist paso a paso y acta de recepción formal para el cliente).

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Google Apps Script / Google Sheets API, TSX, Node.js fetch nativo.

## Global Constraints

- Cero cabeceras prohibidas (`Cache-Control`) en peticiones a Google Apps Script para evitar bloqueos CORS preflight.
- El ciclo de prueba de escritura con Google Sheets DEBE ser transaccional con auto-rollback incondicional en bloque `finally` para no alterar la carta en servicio del cliente.
- Cumplimiento estricto de los 14 alérgenos oficiales según el Reglamento UE 1169/2011.
- Todas las salidas y documentación deben estar en español.
- Código limpio, tipado estricto sin `any` descontrolados.

---

### Task 1: Configurar Script de Auditoría en `package.json`

**Files:**
- Modify: `kikko/carta-digital-kikko/package.json:11-14`

**Interfaces:**
- Produces: Script de npm ejecutable `npm run test:audit` que invoca `tsx tests/auditDeliverySuite.ts`.

- [ ] **Paso 1: Añadir comando `"test:audit"` a los scripts de `package.json`**

Modificar `kikko/carta-digital-kikko/package.json` agregando la línea `"test:audit": "tsx tests/auditDeliverySuite.ts"` dentro del objeto `"scripts"`.

```json
    "lint": "tsc --noEmit",
    "test:admin": "tsx tests/adminFunctionalTest.ts",
    "test:audit": "tsx tests/auditDeliverySuite.ts"
```

- [ ] **Paso 2: Verificar sintaxis del `package.json`**

Ejecutar: `node -e "JSON.parse(require('fs').readFileSync('package.json'))"` en `kikko/carta-digital-kikko`.  
Esperado: Sin errores de sintaxis JSON.

- [ ] **Paso 3: Commit de la configuración**

```bash
git add package.json
git commit -m "chore: add test:audit script to package.json"
```

---

### Task 2: Implementar la Suite Técnica de Auditoría con Auto-Rollback (`tests/auditDeliverySuite.ts`)

**Files:**
- Create: `kikko/carta-digital-kikko/tests/auditDeliverySuite.ts`
- Consumes: `src/services/googleSheetsService.ts`, `src/data.ts`, `src/allergens.ts`, `src/types.ts`
- Produces: `reports/technical-audit-report.json`

- [ ] **Paso 1: Escribir el script completo de la suite `tests/auditDeliverySuite.ts`**

Implementar los 5 módulos descritos en la especificación:
1. Healthcheck en vivo con Google Sheets (GET, CORS, latencia).
2. Ciclo transaccional con auto-rollback garantizado en bloque `finally`.
3. Coherencia de modelos, precios, alérgenos oficiales y Dynamic Island.
4. Seguridad (autenticación por PIN y sanitización de inputs).
5. Generación de informe JSON estructurado en `reports/technical-audit-report.json`.

```typescript
import fs from 'fs';
import path from 'path';
import {
  fetchMenuFromSheets,
  sendMenuToSheets,
  getStoredSheetsUrl,
  DEFAULT_GOOGLE_SHEETS_URL
} from '../src/services/googleSheetsService';
import { menuData as initialMenuData } from '../src/data';
import { ALLERGENS, detectAllergensFromText } from '../src/allergens';
import { MenuCategory, PromoPillConfig } from '../src/types';

interface TestResult {
  module: string;
  name: string;
  passed: boolean;
  details?: string;
  durationMs?: number;
}

// ... Implementación detallada de assertions, healthcheck, snapshot, rollback, allergen checks y reporte JSON ...
```

- [ ] **Paso 2: Ejecutar la suite técnica localmente**

Ejecutar: `npm run test:audit` en `kikko/carta-digital-kikko`.  
Esperado: 100% de tests aprobados (0 fallos) y mensaje "TODOS LOS TESTS DE AUDITORÍA SUPERADOS CON ÉXITO — BASE DE DATOS RESTAURADA AL 100%".

- [ ] **Paso 3: Verificar la generación del reporte técnico JSON**

Comprobar existencia y contenido de `reports/technical-audit-report.json`.

- [ ] **Paso 4: Commit de la suite técnica**

```bash
git add tests/auditDeliverySuite.ts reports/
git commit -m "feat: implement automated delivery audit suite with auto-rollback"
```

---

### Task 3: Redactar el Documento Oficial de Entrega y Aceptación (`AUDITORIA_ENTREGA_KIKKO.md`)

**Files:**
- Create: `kikko/carta-digital-kikko/AUDITORIA_ENTREGA_KIKKO.md`

- [ ] **Paso 1: Redactar `AUDITORIA_ENTREGA_KIKKO.md`**

Incluir:
1. Ficha técnica y URLs del proyecto.
2. Certificado de resultados técnicos (Fase A).
3. Protocolo de aceptación paso a paso para el administrador (Fase B) con 7 pruebas prácticas y casillas `[ ]`.
4. Guía de contingencia y restauración con copia de seguridad JSON.
5. Acta formal de recepción con bloques de firma.

- [ ] **Paso 2: Verificar formato y enlaces del documento**

Comprobar que todas las secciones estén completas, sin marcadores de posición ("TODO" o "TBD") y con explicaciones claras.

- [ ] **Paso 3: Commit del documento de entrega**

```bash
git add AUDITORIA_ENTREGA_KIKKO.md
git commit -m "docs: add official client delivery and acceptance audit document"
```

---

### Task 4: Ejecución de la Verificación Técnica Pre-Merge (Fase A)

**Files:**
- Validate: Todo el workspace `kikko/carta-digital-kikko`

- [ ] **Paso 1: Ejecutar verificación de tipos de TypeScript**

Ejecutar: `npm run lint`  
Esperado: Sin errores de TypeScript (`tsc --noEmit` código 0).

- [ ] **Paso 2: Ejecutar build de producción de Vite**

Ejecutar: `npm run build`  
Esperado: Compilación exitosa en `dist/`.

- [ ] **Paso 3: Ejecutar la suite de auditoría técnica**

Ejecutar: `npm run test:audit`  
Esperado: Todos los tests pasan y latencia de Sheets confirmada.

- [ ] **Paso 4: Ejecutar la suite funcional del editor**

Ejecutar: `npm run test:admin`  
Esperado: 24/24 tests pasados.

---

### Task 5: Fusión a `main`, Despliegue en Producción y Cierre de Memoria

**Files:**
- Modify: `memory/current_status.md`, `memory/open_tasks.md`, `memory/changelog.md`

- [ ] **Paso 1: Fusionar rama `refactor-split-brain` a `main`**

```bash
git checkout main
git merge refactor-split-brain --no-ff -m "merge: release refactor-split-brain with delivery audit suite"
git push origin main
```

- [ ] **Paso 2: Verificar despliegue en Vercel**

Comprobar que Vercel termine la compilación y que la URL pública responda con HTTP 200 y la versión auditada.

- [ ] **Paso 3: Actualizar sistema de memoria del proyecto**

Actualizar `memory/current_status.md`, `memory/open_tasks.md` y `memory/changelog.md` documentando la finalización de la auditoría de entrega.
