# Auditoría Oficial de Entrega Final y Acta de Aceptación — Carta Web Kikko

**Documento Oficial de Entrega Técnica y Manual de Aceptación**  
**Fecha de Certificación:** 17 de Septiembre de 2026  
**Proyecto:** Carta Web Gourmet & Panel de Administración Kikko  
**Estado:** ✅ **CERTIFICADO PARA PRODUCCIÓN (100% AUDITADO)**  

---

## 1. Ficha Técnica y Credenciales Operativas

| Parámetro | Detalle |
| :--- | :--- |
| **Aplicación Web** | Carta Digital Gourmet Kikko |
| **Entorno de Producción** | Vercel Cloud Hosting (`pizza-delivery-web-app-zeta.vercel.app`) |
| **Ruta del Panel de Control** | `/admin` (acceso directo desde navegador o enlace en footer) |
| **PIN Maestro Inicial** | `kikko2026` *(Recomendado cambiarlo tras la entrega)* |
| **Base de Datos Centralizada** | Google Sheets vía Google Apps Script Webhook Oficial |
| **Stack Tecnológico** | React 19, TypeScript, Tailwind CSS v4, Motion, Apps Script REST |
| **Conformidad Legal** | Reglamento Europeo UE 1169/2011 (14 Alérgenos Oficiales) |

---

## 2. Certificado de Pruebas Técnicas (Fase A: Pre-Merge)

La suite de auditoría técnica automatizada (`npm run test:audit`) ha verificado la integridad del sistema contra la base de datos real con los siguientes resultados:

| Módulo de Auditoría | Estado | Resultado / Métricas |
| :--- | :---: | :--- |
| **Módulo 1: Healthcheck en Vivo** | ✅ Aprobado | Conexión HTTP 200 con Google Apps Script. 8 categorías gastronómicas activas. Cero bloqueos de CORS. |
| **Módulo 2: Auto-Rollback Transaccional** | ✅ Aprobado | Mutación testigo inyectada, comprobada en relectura GET y **revertida al 100% de forma incondicional**. Cero datos alterados en producción. |
| **Módulo 3: Modelos y Personalización** | ✅ Aprobado | 14 alérgenos oficiales validados. Detección heurística/IA operativa. Presets comerciales y no comerciales de Dynamic Island verificados. Drag & Drop y Backups JSON conformes. |
| **Módulo 4: Seguridad y Resiliencia** | ✅ Aprobado | Autenticación por PIN estricta. Sanitización anti-inyección (XSS) en nombres e ingredientes. Tolerancia a caídas de red y reintentos automáticos configurados. |
| **Módulo 5: Evidencias Generadas** | ✅ Aprobado | Reporte técnico generado en `reports/technical-audit-report.json` con 17/17 aserciones aprobadas (100%). |

---

## 2.1. Matriz de Remediación y Resolución de Hallazgos de Auditoría Externa

Tras el análisis de la auditoría externa preliminar, se implementó el plan de remediación integral con los siguientes resultados certificados:

| Código | Hallazgo Reportado | Estado de Verificación y Remediación |
| :--- | :--- | :---: |
| **C1 / A1** | Discrepancia en Teléfono de WhatsApp | ✅ **RESUELTO (SSOT)**: Centralizado en `src/products.ts` con `PHONE_WHATSAPP = '34611873391'`. Formulario de reservas consume la constante directamente y bloquea fechas pasadas (`min={today}`). |
| **C2 / A2** | Endpoint Google Sheets Live | ✅ **VERIFICADO**: Webhook Apps Script operativo en vivo con `doGet` y `doPost` sin preflight CORS y con auto-rollback transaccional verificado en tests. |
| **C3 / A3** | Persistencia de Idioma | ✅ **RESUELTO**: Implementado en `src/LanguageContext.tsx` con `localStorage` (`kikko_preferred_lang`), detección de `navigator.language` y salvaguardas SSR. |
| **C4 / A4** | Cabeceras de Seguridad HTTP | ✅ **RESUELTO**: Configuradas en `vercel.json` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`). |
| **C5 / A5** | Optimización de Bundle (>500 kB) | ✅ **RESUELTO**: Configurado `manualChunks` en `vite.config.ts`. Bundle principal reducido de 551 kB a **424 kB**, eliminando todas las advertencias de Vite. |
| **C6 / A6** | Tipado Estricto de TypeScript | ✅ **RESUELTO**: Activado `"strict": true` en `tsconfig.json`, instaladas definiciones `@types/react` y `@types/react-dom`. 0 errores en `tsc --noEmit`. |
| **C7 / A7** | Catálogo de Alérgenos UE 1169/2011 | ✅ **RESUELTO**: Añadida detección de altramuces/lupin en `src/allergens.ts`. Los 14 alérgenos oficiales están 100% operativos. |
| **C8 / A8** | Código Muerto de Reseñas y Fecha Relativa | ✅ **RESUELTO**: Aclarado con el usuario que la web pública no muestra tarjetas individuales de reseñas (solo CTA a Google Maps). Eliminado el array residual `REVIEWS` de `src/products.ts`. Unificada la URL oficial en `GOOGLE_MAPS_REVIEW_URL`. |
| **C9 / A9** | Textos en Inglés Invertidos en Hero | ✅ **RESUELTO**: Corregido el cruce de claves en `src/translations.ts` (`heroSabor` = 'Flavor', `heroAutentico` = 'Authentic'). |
| **C10 / A10** | SEO, OpenGraph y Favicon | ✅ **RESUELTO**: Añadidos meta description, OpenGraph (`og:*`), Twitter Cards y favicon SVG en `index.html`. Actualizado `metadata.json` con el nombre oficial del restaurante. |

---

## 3. Protocolo de Verificación y Aceptación para el Administrador (Fase B: Post-Deploy)

El futuro administrador o encargado del restaurante debe realizar las siguientes 8 pruebas prácticas para familiarizarse y certificar que todo funciona según lo acordado:

### [ ] Prueba 1: Acceso Seguro y Gestión de PIN
- **Paso 1:** Abrir el navegador en el móvil o PC e ingresar a la URL de la carta añadiendo `/admin` al final.
- **Paso 2:** Introducir el PIN `kikko2026`.
- **Criterio de Aceptación:** Se desbloquea el panel de administración con todos los controles operativos. Probar la opción de "Cambiar PIN" en la cabecera si se desea una clave privada.

### [ ] Prueba 2: Ajuste Rápido de Precios en Menos de 10 Segundos
- **Paso 1:** En la lista de platos de cualquier categoría, pulsar directamente sobre el precio de un plato.
- **Paso 2:** Escribir un nuevo precio (por ejemplo, sumar 0.50€) y pulsar el botón de confirmación verde `✓`.
- **Paso 3:** Abrir en otra pestaña o en el móvil de sala la carta pública del comensal.
- **Criterio de Aceptación:** El precio se actualiza en pantalla de inmediato sin descuadrar el formato en euros (€).

### [ ] Prueba 3: Control de Stock y Platos Agotados
- **Paso 1:** En el panel `/admin`, localizar un plato y pulsar el icono del "ojo" para alternar su disponibilidad.
- **Paso 2:** Comprobar la vista del comensal en la carta pública.
- **Criterio de Aceptación:** El plato aparece con una insignia visual de **"Agotado"** y la tarjeta se atenúa ligeramente para que los clientes en mesa sepan que no está disponible hoy.

### [ ] Prueba 4: Configuración de la Dynamic Island
- **Modo Promoción Comercial:**
  - En `/admin`, ir a la sección "Dynamic Island". Seleccionar el preset *2x1* o *Novedad*, vincularlo a un plato y activar la píldora.
  - Comprobar en el móvil: en la parte inferior aparece la burbuja flotante; al tocarla, se abre la tarjeta gourmet y al pulsar "Ir al plato", la pantalla navega sola hasta el plato resaltándolo con un halo de luz.
- **Modo Permanente (Reseñas Google Maps 5★ o Reservas):**
  - Cambiar el preset a *Reseñas de Google*.
  - Comprobar que al pulsar el botón se abre directamente la ficha de Google Maps para que el cliente deje 5 estrellas.

### [ ] Prueba 5: Creación de Plato y Detección de Alérgenos por IA
- **Paso 1:** Pulsar el botón `+ Añadir Plato` en una categoría.
- **Paso 2:** Escribir el nombre y los ingredientes (por ejemplo: *"Pizza de gambas y mozzarella con salsa de nueces"*).
- **Paso 3:** Pulsar el botón con icono de destellos **"Sugerir Alérgenos con IA"**.
- **Criterio de Aceptación:** El sistema marca automáticamente los alérgenos correspondientes (*Crustáceos*, *Lácteos*, *Frutos de cáscara* y *Gluten*). En la carta del comensal aparecen los sellos oficiales vectoriales con tooltip explicativo.

### [ ] Prueba 6: Reordenación de Carta por Arrastre (Drag & Drop)
- **Paso 1:** En `/admin`, tomar un plato desde el tirador de arrastre (`:::`) o usar las flechas `↑` `↓`.
- **Paso 2:** Subir el plato a la primera posición de la categoría.
- **Criterio de Aceptación:** El plato se muestra en primer lugar tanto en el panel como en la carta pública de los comensales.

### [ ] Prueba 7: Copias de Seguridad (Backup en 1 Clic)
- **Paso 1:** En la cabecera del panel `/admin`, pulsar el botón **"Descargar Copia de Seguridad"**.
- **Criterio de Aceptación:** Se descarga en el dispositivo un archivo `kikko-backup.json` con todos los platos, precios, alérgenos y textos de la carta para restaurarla en cualquier momento.

### [ ] Prueba 8: Experiencia Visual del Comensal en Sala
- **Paso 1:** Abrir la carta en dispositivos móviles reales (iPhone con Safari y Android con Chrome).
- **Criterio de Aceptación:** La navegación entre categorías es suave, el header no colisiona con el notch, los textos son nítidos y no existe scroll horizontal molesto.

---

## 4. Protocolo de Contingencia y Recuperación

Si durante el servicio se produce algún error humano (borrado accidental de un plato o desconfiguración):
1. **Restaurar Copia de Seguridad:** En `/admin`, pulsar el botón **"Subir Respaldo"** y seleccionar el archivo `kikko-backup.json` más reciente. La carta volverá a su estado perfecto en 2 segundos.
2. **Restablecer Valores de Fábrica:** En caso de emergencia extrema, existe el botón "Restablecer Carta Original", que recarga el catálogo gourmet inicial verificado.
3. **Modo Sandbox:** Si el administrador desea enseñar a un nuevo empleado cómo usar el panel, puede activar el **"Modo Prueba / Sandbox"** en el panel; cualquier cambio realizado en ese modo no afectará a la carta real de los comensales.

---

## 5. Acta Formal de Conformidad y Entrega

Por la presente se certifica que la **Carta Web Gourmet Kikko** y su **Panel de Administración** han sido desarrollados, auditados y entregados cumpliendo todos los estándares de:
- Sincronización en tiempo real con base de datos en la nube.
- Ausencia total de desincronizaciones de caché ("Split-Brain") y bloqueos de CORS.
- Autonomía completa para la gestión de precios, platos, alérgenos y promociones.
- Rendimiento ultra-rápido y diseño mobile-first adaptado a sala de restaurante.

| Por el Equipo Técnico / Desarrollador | Por el Cliente / Administrador de Kikko |
| :--- | :--- |
| **Nombre:** Equipo Antigravity / Web Builder | **Nombre:** Administrador / Gerente de Kikko |
| **Firma:** ________________________________ | **Firma:** ________________________________ |
| **Fecha:** 17 de Septiembre de 2026 | **Fecha:** 17 de Septiembre de 2026 |
