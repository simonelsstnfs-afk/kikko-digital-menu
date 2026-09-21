declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
      identify?: (id: string, data?: Record<string, any>) => void;
      reset?: () => void;
    };
  }
}

export type AnalyticsEvent =
  | { name: 'reservation_submitted'; data: { persons: string; time: string; date: string } }
  | { name: 'phone_call_clicked'; data?: { phone?: string } }
  | { name: 'google_review_clicked'; data: { source: 'cta' | 'dynamic_island' } }
  | { name: 'language_changed'; data: { lang: string } }
  | { name: 'allergen_guide_opened'; data?: { lang?: string } }
  | { name: 'allergen_badge_clicked'; data: { allergen: string } }
  | { name: 'dynamic_island_opened'; data: { tipo: string; vista: 'scrolled' | 'top' } }
  | { name: 'dynamic_island_action'; data: { tipo: string; boton: string } };

/**
 * Despachador seguro y tipado de telemetría web para Umami.
 * Falla de forma silenciosa si Umami está bloqueado por el navegador o en entornos SSR.
 */
export function trackEvent<T extends AnalyticsEvent>(name: T['name'], data?: T['data']) {
  if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
    try {
      window.umami.track(name, data);
    } catch {
      // Falla silenciosa y segura en caso de interferencia del navegador
    }
  }
}
