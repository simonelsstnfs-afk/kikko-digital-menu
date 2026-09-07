import React, { useState, useEffect } from 'react';
import { Reorder, useDragControls } from 'motion/react';
import { useMenuData } from '../../context/MenuDataContext';
import { MenuItem } from '../../types';
import ProductModal from './ProductModal';
import { translateText } from '../../utils/translateService';
import {
  Lock,
  LogOut,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Check,
  RotateCcw,
  Download,
  Upload,
  Search,
  Sparkles,
  UtensilsCrossed,
  Sliders,
  Eye,
  EyeOff,
  AlertTriangle,
  Cloud,
  CloudOff,
  RefreshCw,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Loader2,
  HelpCircle,
  FlaskConical,
  GripVertical,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const DEFAULT_PIN = 'kikko2026';
const PIN_STORAGE_KEY = 'kikko_admin_pin_v1';

interface DraggableProductItemProps {
  item: MenuItem;
  index: number;
  totalItems: number;
  categoryId: string;
  editingPriceId: string | null;
  tempPrice: string;
  setEditingPriceId: (id: string | null) => void;
  setTempPrice: (price: string) => void;
  handleSavePrice: (categoryId: string, itemId: string) => void;
  toggleItemAvailable: (categoryId: string, itemId: string) => void;
  setEditingProduct: (item: MenuItem) => void;
  setIsModalOpen: (open: boolean) => void;
  setProductToDelete: (prod: { categoryId: string; item: MenuItem } | null) => void;
  handleMoveItem: (categoryId: string, index: number, direction: 'up' | 'down') => void;
}

function DraggableProductItem({
  item,
  index,
  totalItems,
  categoryId,
  editingPriceId,
  tempPrice,
  setEditingPriceId,
  setTempPrice,
  handleSavePrice,
  toggleItemAvailable,
  setEditingProduct,
  setIsModalOpen,
  setProductToDelete,
  handleMoveItem
}: DraggableProductItemProps) {
  const dragControls = useDragControls();
  const displayName = typeof item.name === 'string' ? item.name : item.name.es;
  const isAvailable = item.available !== false;

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={dragControls}
      className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
        isAvailable
          ? 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 shadow-sm'
          : 'bg-zinc-950/70 border-zinc-800/50 opacity-65'
      }`}
    >
      {/* Controles de orden + Información del Plato */}
      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Agarre de arrastre táctil y flechas arriba/abajo */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 pt-0.5 sm:pt-0">
          <button
            type="button"
            onPointerDown={(e) => dragControls.start(e)}
            className="p-1.5 sm:p-2 text-zinc-500 hover:text-white cursor-grab active:cursor-grabbing touch-none rounded-lg hover:bg-zinc-800/80 transition-colors flex items-center justify-center"
            title="Mantén pulsado y arrastra para reordenar"
            aria-label="Arrastrar plato"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          <div className="flex flex-col">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => handleMoveItem(categoryId, index, 'up')}
              className="p-1 text-zinc-500 hover:text-white disabled:opacity-20 disabled:pointer-events-none hover:bg-zinc-800 rounded transition-colors cursor-pointer"
              title="Subir una posición"
              aria-label="Subir posición"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={index === totalItems - 1}
              onClick={() => handleMoveItem(categoryId, index, 'down')}
              className="p-1 text-zinc-500 hover:text-white disabled:opacity-20 disabled:pointer-events-none hover:bg-zinc-800 rounded transition-colors cursor-pointer"
              title="Bajar una posición"
              aria-label="Bajar posición"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Información del Plato */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-semibold text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50 select-none">
              #{index + 1}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-wide break-words">
              {displayName}
            </h4>
            {item.subcategory && (
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 shrink-0">
                {item.subcategory}
              </span>
            )}
            {!isAvailable && (
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800 shrink-0">
                Agotado
              </span>
            )}
          </div>

          {item.description?.es && (
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 break-words">
              {item.description.es}
            </p>
          )}
        </div>
      </div>

      {/* Controles de Precio y Acciones */}
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-2.5 sm:pt-0 border-t border-zinc-800/70 sm:border-t-0 shrink-0 pl-11 sm:pl-0">
        {/* Edición rápida de precio */}
        <div className="flex items-center">
          {editingPriceId === item.id ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                autoFocus
                value={tempPrice}
                onChange={(e) => setTempPrice(e.target.value)}
                className="w-18 px-2 py-1 text-base sm:text-sm bg-black border border-[#C2410C] rounded text-white font-mono text-right"
              />
              <button
                type="button"
                onClick={() => handleSavePrice(categoryId, item.id)}
                className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                title="Guardar precio"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditingPriceId(item.id);
                setTempPrice(item.price.toFixed(2));
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-mono font-bold text-xs sm:text-sm transition-colors cursor-pointer group flex items-center gap-1.5"
              title="Toca para cambiar precio rápido"
            >
              <span>{item.price.toFixed(2)} €</span>
              <Edit2 className="w-3 h-3 text-zinc-500 group-hover:text-[#C2410C] transition-colors" />
            </button>
          )}
        </div>

        {/* Acciones secundarias (Visibilidad, Edición completa, Borrado) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleItemAvailable(categoryId, item.id)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isAvailable
                ? 'text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/50 border-emerald-800/50'
                : 'text-zinc-500 bg-zinc-900 hover:bg-zinc-800 border-zinc-700'
            }`}
            title={isAvailable ? 'Marcar como agotado' : 'Marcar como disponible'}
          >
            {isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingProduct(item);
              setIsModalOpen(true);
            }}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 rounded-lg border border-zinc-700/60 transition-colors cursor-pointer"
            title="Editar detalles del plato"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setProductToDelete({ categoryId, item })}
            className="p-2 text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/50 rounded-lg border border-red-900/40 transition-colors cursor-pointer"
            title="Eliminar plato"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
}

interface AdminPanelProps {
  onBackToMenu: () => void;
}

export default function AdminPanel({ onBackToMenu }: AdminPanelProps) {
  const {
    categories,
    promoPill,
    syncStatus,
    lastSyncedAt,
    sheetsUrl,
    setSheetsUrl,
    syncWithSheets,
    pushToSheets,
    updatePrice,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleItemAvailable,
    updatePromoPill,
    resetToDefaults,
    exportBackup,
    importBackup,
    isSandboxMode,
    toggleSandboxMode,
    exitSandboxMode,
    reorderItems
  } = useMenuData();

  // Autenticación por PIN
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('kikko_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState('');

  // Pestaña activa: 'products' | 'promo' | 'settings'
  const [activeTab, setActiveTab] = useState<'products' | 'promo' | 'settings'>('products');

  // Categoría seleccionada en gestión de productos
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || 'entrantes');
  const [searchTerm, setSearchTerm] = useState('');

  // Edición rápida de precio en línea
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [productToDelete, setProductToDelete] = useState<{ categoryId: string; item: MenuItem } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Estado del formulario de la píldora de novedad (Soporte multilingüe ES, EN, IT)
  const [pillActive, setPillActive] = useState(promoPill.active);
  const [pillTag, setPillTag] = useState(
    typeof promoPill.tag === 'string' ? promoPill.tag : promoPill.tag?.es || 'Novedad'
  );
  const [pillTagEn, setPillTagEn] = useState(
    typeof promoPill.tag === 'object' ? promoPill.tag?.en || '' : ''
  );
  const [pillTagIt, setPillTagIt] = useState(
    typeof promoPill.tag === 'object' ? promoPill.tag?.it || '' : ''
  );

  const [pillTitle, setPillTitle] = useState(
    typeof promoPill.title === 'string' ? promoPill.title : promoPill.title?.es || 'Risottos Auténticos'
  );
  const [pillTitleEn, setPillTitleEn] = useState(
    typeof promoPill.title === 'object' ? promoPill.title?.en || '' : ''
  );
  const [pillTitleIt, setPillTitleIt] = useState(
    typeof promoPill.title === 'object' ? promoPill.title?.it || '' : ''
  );

  const [pillCategory, setPillCategory] = useState(promoPill.targetCategory || 'risottos');
  const [promoSavedSuccess, setPromoSavedSuccess] = useState(false);
  const [previewLang, setPreviewLang] = useState<'es' | 'en' | 'it'>('es');
  const [isTranslatingPill, setIsTranslatingPill] = useState(false);
  const [pillTranslateDone, setPillTranslateDone] = useState(false);

  useEffect(() => {
    setPillActive(promoPill.active);
    setPillTag(typeof promoPill.tag === 'string' ? promoPill.tag : promoPill.tag?.es || 'Novedad');
    setPillTagEn(typeof promoPill.tag === 'object' ? promoPill.tag?.en || '' : '');
    setPillTagIt(typeof promoPill.tag === 'object' ? promoPill.tag?.it || '' : '');
    setPillTitle(typeof promoPill.title === 'string' ? promoPill.title : promoPill.title?.es || 'Risottos Auténticos');
    setPillTitleEn(typeof promoPill.title === 'object' ? promoPill.title?.en || '' : '');
    setPillTitleIt(typeof promoPill.title === 'object' ? promoPill.title?.it || '' : '');
    setPillCategory(promoPill.targetCategory || 'risottos');
  }, [promoPill]);

  // Cambio de PIN
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  // Estado de configuración de Google Sheets
  const [inputSheetsUrl, setInputSheetsUrl] = useState(sheetsUrl || '');
  const [sheetsActionLoading, setSheetsActionLoading] = useState(false);
  const [sheetsFeedback, setSheetsFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Manejador guardar y conectar Google Sheets
  const handleConnectSheets = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = inputSheetsUrl.trim();
    if (!cleanUrl) {
      setSheetsUrl('');
      setSheetsFeedback({ type: 'success', text: 'Desconectado de Google Sheets (Modo local activo).' });
      setTimeout(() => setSheetsFeedback(null), 4000);
      return;
    }

    if (!cleanUrl.includes('script.google.com') || !cleanUrl.endsWith('/exec')) {
      setSheetsFeedback({
        type: 'error',
        text: 'La URL debe ser de Google Apps Script y terminar en "/exec" (ej. https://script.google.com/macros/s/.../exec).'
      });
      return;
    }

    setSheetsActionLoading(true);
    setSheetsFeedback(null);
    setSheetsUrl(cleanUrl);

    // Intentar sincronizar subiendo el menú actual para inicializar la hoja
    try {
      const ok = await pushToSheets();
      if (ok) {
        setSheetsFeedback({
          type: 'success',
          text: '¡Conexión exitosa! La carta se ha sincronizado con Google Sheets. Los clientes verán los cambios en tiempo real.'
        });
      } else {
        setSheetsFeedback({
          type: 'error',
          text: 'No se pudo comunicar con Google Sheets. Asegúrate de haber seleccionado "Cualquiera" en los permisos de la Aplicación Web.'
        });
      }
    } catch (err: any) {
      setSheetsFeedback({ type: 'error', text: err.message || 'Error de conexión.' });
    } finally {
      setSheetsActionLoading(false);
      setTimeout(() => setSheetsFeedback(null), 6000);
    }
  };

  // Forzar descarga de Google Sheets
  const handlePullFromSheets = async () => {
    setSheetsActionLoading(true);
    setSheetsFeedback(null);
    try {
      const ok = await syncWithSheets();
      if (ok) {
        setSheetsFeedback({ type: 'success', text: '¡Carta actualizada desde Google Sheets con éxito!' });
      } else {
        setSheetsFeedback({ type: 'error', text: 'No se pudieron descargar los datos de la hoja.' });
      }
    } catch (err: any) {
      setSheetsFeedback({ type: 'error', text: err.message || 'Error de sincronización.' });
    } finally {
      setSheetsActionLoading(false);
      setTimeout(() => setSheetsFeedback(null), 4000);
    }
  };

  // Copiar código del script al portapapeles
  const handleCopyScript = () => {
    const scriptCode = `// Pega este código en Extensiones > Apps Script de tu Google Sheets:
// Puedes ver el código completo en el archivo google-apps-script.js del proyecto.`;
    navigator.clipboard.writeText(scriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  // Manejador de Login PIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
    if (pinInput === storedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('kikko_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Código PIN incorrecto. Inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kikko_admin_auth');
    setPinInput('');
  };

  // Auto-traducir campos de la píldora a inglés e italiano
  const handleAutoTranslatePill = async () => {
    if (!pillTitle.trim()) return;
    setIsTranslatingPill(true);
    try {
      const [tTagEn, tTagIt, tTitleEn, tTitleIt] = await Promise.all([
        pillTag.trim() ? translateText(pillTag.trim(), 'en') : Promise.resolve(''),
        pillTag.trim() ? translateText(pillTag.trim(), 'it') : Promise.resolve(''),
        translateText(pillTitle.trim(), 'en'),
        translateText(pillTitle.trim(), 'it')
      ]);

      if (tTagEn) setPillTagEn(tTagEn);
      if (tTagIt) setPillTagIt(tTagIt);
      if (tTitleEn) setPillTitleEn(tTitleEn);
      if (tTitleIt) setPillTitleIt(tTitleIt);
      setPillTranslateDone(true);
      setTimeout(() => setPillTranslateDone(false), 3000);
    } catch (e) {
      console.warn('Error traduciendo píldora:', e);
    } finally {
      setIsTranslatingPill(false);
    }
  };

  // Guardar píldora de novedad con auto-traducción si faltan campos en otros idiomas
  const handleSavePromoPill = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTranslatingPill(true);

    let finalTagEn = pillTagEn.trim();
    let finalTagIt = pillTagIt.trim();
    let finalTitleEn = pillTitleEn.trim();
    let finalTitleIt = pillTitleIt.trim();

    // Auto-completar traducciones faltantes al vuelo antes de guardar
    if (!finalTitleEn || !finalTitleIt || !finalTagEn || !finalTagIt) {
      try {
        const [tTagEn, tTagIt, tTitleEn, tTitleIt] = await Promise.all([
          !finalTagEn && pillTag.trim() ? translateText(pillTag.trim(), 'en') : Promise.resolve(finalTagEn),
          !finalTagIt && pillTag.trim() ? translateText(pillTag.trim(), 'it') : Promise.resolve(finalTagIt),
          !finalTitleEn && pillTitle.trim() ? translateText(pillTitle.trim(), 'en') : Promise.resolve(finalTitleEn),
          !finalTitleIt && pillTitle.trim() ? translateText(pillTitle.trim(), 'it') : Promise.resolve(finalTitleIt)
        ]);
        if (tTagEn) finalTagEn = tTagEn;
        if (tTagIt) finalTagIt = tTagIt;
        if (tTitleEn) finalTitleEn = tTitleEn;
        if (tTitleIt) finalTitleIt = tTitleIt;

        setPillTagEn(finalTagEn);
        setPillTagIt(finalTagIt);
        setPillTitleEn(finalTitleEn);
        setPillTitleIt(finalTitleIt);
      } catch (err) {
        console.warn('Error auto-traduciendo píldora al guardar:', err);
      }
    }
    setIsTranslatingPill(false);

    updatePromoPill({
      active: pillActive,
      tag: {
        es: pillTag.trim(),
        en: finalTagEn || pillTag.trim(),
        it: finalTagIt || pillTag.trim()
      },
      title: {
        es: pillTitle.trim(),
        en: finalTitleEn || pillTitle.trim(),
        it: finalTitleIt || pillTitle.trim()
      },
      targetCategory: pillCategory
    });
    setPromoSavedSuccess(true);
    setTimeout(() => setPromoSavedSuccess(false), 3000);
  };

  // Guardar precio inline rápido
  const handleSavePrice = (categoryId: string, itemId: string) => {
    const num = parseFloat(tempPrice.replace(',', '.'));
    if (!isNaN(num) && num >= 0) {
      updatePrice(categoryId, itemId, num);
    }
    setEditingPriceId(null);
    setTempPrice('');
  };

  // Guardar modal producto (creación o edición)
  const handleSaveProductModal = (productData: Omit<MenuItem, 'id'>) => {
    if (editingProduct) {
      updateProduct(selectedCategory, editingProduct.id, productData);
    } else {
      addProduct(selectedCategory, productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Confirmar eliminación
  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.categoryId, productToDelete.item.id);
      setProductToDelete(null);
    }
  };

  // Mover producto arriba/abajo manualmente
  const handleMoveItem = (categoryId: string, index: number, direction: 'up' | 'down') => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    const items = [...category.items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    reorderItems(categoryId, items);
  };

  // Exportar backup
  const handleExportBackup = () => {
    const jsonStr = exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kikko-carta-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Importar backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importBackup(content);
        if (ok) {
          alert('¡Copia de seguridad restaurada con éxito!');
        } else {
          alert('El archivo JSON no tiene un formato válido.');
        }
      }
    };
    reader.readAsText(file);
  };

  // Cambiar PIN
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      localStorage.setItem(PIN_STORAGE_KEY, newPin.trim());
      setPinChangeMsg('¡PIN actualizado correctamente!');
      setNewPin('');
      setTimeout(() => setPinChangeMsg(''), 3000);
    } else {
      setPinChangeMsg('El PIN debe tener al menos 4 caracteres.');
    }
  };

  // Pantalla de Login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-[#C2410C]/30 text-zinc-300">
        <div className="w-full max-w-md bg-[#141A0F] border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#C2410C]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-zinc-700 text-[#C2410C] shadow-lg mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">Kikko Admin</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">Panel de Gestión Privado de la Carta</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-zinc-400 mb-1.5 tracking-wider">
                Código PIN de Acceso
              </label>
              <input
                type="password"
                autoFocus
                placeholder="Introduce el PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-700 rounded-xl text-white text-center tracking-widest text-base sm:text-lg font-mono focus:outline-none focus:border-[#C2410C] transition-colors"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 text-center font-medium bg-red-950/30 border border-red-900/50 py-2 px-3 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C2410C] hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
            >
              Desbloquear Panel
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800/80 text-center">
            <button
              onClick={onBackToMenu}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer py-1 px-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Carta Pública</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCategoryData = categories.find((c) => c.id === selectedCategory) || categories[0];
  const filteredItems = (currentCategoryData?.items || []).filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const nameStr = typeof item.name === 'string' ? item.name : `${item.name.es} ${item.name.en} ${item.name.it}`;
    const descStr = `${item.description?.es || ''} ${item.description?.en || ''} ${item.description?.it || ''}`;
    return nameStr.toLowerCase().includes(term) || descStr.toLowerCase().includes(term);
  });

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-[#C2410C]/30 pb-28 sm:pb-20">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Lado Izquierdo: Volver a la carta + Título */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onBackToMenu}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-lg border border-zinc-700/60 transition-all cursor-pointer shrink-0"
              title="Volver a la carta digital pública"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C2410C]" />
              <span className="hidden sm:inline">Carta</span>
            </button>

            <div className="h-4 sm:h-5 w-px bg-zinc-800 shrink-0" />

            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="font-serif text-base sm:text-xl font-bold text-white tracking-wide truncate">
                Kikko
              </span>
              <span className="text-[10px] sm:text-xs font-sans px-1.5 sm:px-2 py-0.5 rounded-full bg-[#C2410C]/20 text-[#C2410C] font-bold border border-[#C2410C]/30 uppercase tracking-wider shrink-0">
                Admin
              </span>

              {/* Indicador de Nube */}
              {sheetsUrl ? (
                <span
                  className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-sans px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-medium shrink-0"
                  title={syncStatus === 'syncing' ? 'Sincronizando con Google Sheets...' : 'Conectado a Google Sheets'}
                >
                  <Cloud className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="hidden sm:inline">
                    {syncStatus === 'syncing' ? 'Sincronizando...' : 'Nube Conectada'}
                  </span>
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-sans px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-medium shrink-0"
                  title="Modo local (los cambios se guardan sólo en este navegador)"
                >
                  <CloudOff className="w-3 h-3 text-zinc-400 shrink-0" />
                  <span className="hidden sm:inline">Modo Local</span>
                </span>
              )}
            </div>
          </div>

          {/* Lado Derecho: Sandbox Toggle + Logout */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={toggleSandboxMode}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isSandboxMode
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] font-bold'
                  : 'text-zinc-400 hover:text-amber-400 bg-zinc-800/60 hover:bg-zinc-800 border-zinc-700/60'
              }`}
              title={isSandboxMode ? 'Desactivar Modo Pruebas' : 'Activar Modo Pruebas (Sandbox seguro)'}
            >
              <FlaskConical className={`w-3.5 h-3.5 shrink-0 ${isSandboxMode ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">{isSandboxMode ? 'Modo Pruebas' : 'Probar'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
              title="Cerrar sesión de administración"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>

        </div>
      </header>

      {/* Barra de Pestañas Segmentadas Sticky - Mobile First */}
      <div className="sticky top-14 sm:top-16 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 py-2 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="grid grid-cols-3 gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer min-w-0 ${
                activeTab === 'products'
                  ? 'bg-[#C2410C] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">Platos</span>
                <span className="hidden sm:inline">Platos y Precios</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('promo')}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer min-w-0 ${
                activeTab === 'promo'
                  ? 'bg-[#C2410C] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-400" />
              <span className="truncate">
                <span className="sm:hidden">Novedad</span>
                <span className="hidden sm:inline">Píldora Novedad</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer min-w-0 ${
                activeTab === 'settings'
                  ? 'bg-[#C2410C] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">Ajustes</span>
                <span className="hidden sm:inline">Ajustes & Respaldo</span>
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Banner de Modo Sandbox / Pruebas Activo */}
      {isSandboxMode && (
        <div className="bg-amber-950/95 border-b border-amber-500/60 px-3 sm:px-6 py-2.5 backdrop-blur-md sticky top-[106px] sm:top-[122px] z-25 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-amber-200">
              <FlaskConical className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <span>
                <strong>MODO PRUEBAS / SANDBOX ACTIVO:</strong> Puedes agregar platos, editar precios y generar traducciones. Los comensales y Google Sheets <strong>NO</strong> se modificarán.
              </span>
            </div>
            <button
              onClick={exitSandboxMode}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg transition-colors cursor-pointer text-center shrink-0"
            >
              Salir y Restaurar Carta Real
            </button>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        
        {/* =========================================================================
            PESTAÑA 1: GESTIÓN DE PRODUCTOS Y PRECIOS
           ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Barra superior de categorías y acción añadir */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3 sm:p-4">
              {/* Selector de categoría con scroll táctil suave */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full min-w-0 pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchTerm('');
                    }}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-[#C2410C] text-white shadow-lg font-bold'
                        : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {cat.id.toUpperCase()} ({cat.items.length})
                  </button>
                ))}
              </div>

              {/* Botón Añadir Producto */}
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Producto</span>
              </button>
            </div>

            {/* Barra de búsqueda y contador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Buscar en ${currentCategoryData?.id}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-base sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div className="text-xs text-zinc-400 px-1">
                Mostrando <strong className="text-white">{filteredItems.length}</strong> productos
              </div>
            </div>

            {/* Consejo interactivo de ordenación */}
            {!searchTerm.trim() && (currentCategoryData?.items?.length || 0) > 1 && (
              <div className="flex items-center justify-between gap-2 p-2.5 px-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-xs text-zinc-400">
                <div className="flex items-center gap-2 min-w-0">
                  <GripVertical className="w-4 h-4 text-[#C2410C] shrink-0" />
                  <span className="truncate">
                    <strong className="text-white font-medium">Reordenar:</strong> Arrastra con <span className="font-mono text-zinc-300">⋮⋮</span> o pulsa las flechas <span className="font-mono text-zinc-300">↑↓</span>.
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[11px] text-emerald-400 font-medium shrink-0">
                  ✓ Actualiza la carta web
                </span>
              </div>
            )}

            {/* Aviso si el usuario está filtrando por texto */}
            {searchTerm.trim() && (
              <div className="flex items-center gap-2 p-2.5 bg-amber-950/40 border border-amber-800/50 rounded-xl text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>El reordenamiento manual está pausado mientras buscas. Borra el buscador para arrastrar platos.</span>
              </div>
            )}

            {/* Lista de Productos Mobile First con Reorder */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-zinc-900/30 rounded-2xl border border-zinc-800/60 p-4">
                <p className="text-zinc-500 text-sm">No se encontraron productos en esta categoría.</p>
              </div>
            ) : !searchTerm.trim() ? (
              <Reorder.Group
                axis="y"
                values={currentCategoryData.items}
                onReorder={(newItems) => reorderItems(currentCategoryData.id, newItems)}
                className="grid grid-cols-1 gap-2.5 sm:gap-3"
              >
                {currentCategoryData.items.map((item, index) => (
                  <DraggableProductItem
                    key={item.id}
                    item={item}
                    index={index}
                    totalItems={currentCategoryData.items.length}
                    categoryId={currentCategoryData.id}
                    editingPriceId={editingPriceId}
                    tempPrice={tempPrice}
                    setEditingPriceId={setEditingPriceId}
                    setTempPrice={setTempPrice}
                    handleSavePrice={handleSavePrice}
                    toggleItemAvailable={toggleItemAvailable}
                    setEditingProduct={setEditingProduct}
                    setIsModalOpen={setIsModalOpen}
                    setProductToDelete={setProductToDelete}
                    handleMoveItem={handleMoveItem}
                  />
                ))}
              </Reorder.Group>
            ) : (
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {filteredItems.map((item) => {
                  const displayName = typeof item.name === 'string' ? item.name : item.name.es;
                  const isAvailable = item.available !== false;

                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                        isAvailable
                          ? 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                          : 'bg-zinc-950/70 border-zinc-800/50 opacity-65'
                      }`}
                    >
                      {/* Información del Plato */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide break-words">
                            {displayName}
                          </h4>
                          {item.subcategory && (
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 shrink-0">
                              {item.subcategory}
                            </span>
                          )}
                          {!isAvailable && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800 shrink-0">
                              Agotado
                            </span>
                          )}
                        </div>

                        {item.description?.es && (
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 break-words">
                            {item.description.es}
                          </p>
                        )}
                      </div>

                      {/* Controles de Precio y Acciones */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-2.5 sm:pt-0 border-t border-zinc-800/70 sm:border-t-0 shrink-0">
                        {/* Edición rápida de precio */}
                        <div className="flex items-center">
                          {editingPriceId === item.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                autoFocus
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                className="w-18 px-2 py-1 text-base sm:text-sm bg-black border border-[#C2410C] rounded text-white font-mono text-right"
                              />
                              <button
                                type="button"
                                onClick={() => handleSavePrice(currentCategoryData.id, item.id)}
                                className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                                title="Guardar precio"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingPriceId(item.id);
                                setTempPrice(item.price.toFixed(2));
                              }}
                              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-mono font-bold text-xs sm:text-sm transition-colors cursor-pointer group flex items-center gap-1.5"
                              title="Toca para cambiar precio rápido"
                            >
                              <span>{item.price.toFixed(2)} €</span>
                              <Edit2 className="w-3 h-3 text-zinc-500 group-hover:text-[#C2410C] transition-colors" />
                            </button>
                          )}
                        </div>

                        {/* Acciones secundarias (Visibilidad, Edición completa, Borrado) */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleItemAvailable(currentCategoryData.id, item.id)}
                            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                              isAvailable
                                ? 'text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/50 border-emerald-800/50'
                                : 'text-zinc-500 bg-zinc-900 hover:bg-zinc-800 border-zinc-700'
                            }`}
                            title={isAvailable ? 'Marcar como agotado' : 'Marcar como disponible'}
                          >
                            {isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(item);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 rounded-lg border border-zinc-700/60 transition-colors cursor-pointer"
                            title="Editar detalles del plato"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setProductToDelete({ categoryId: currentCategoryData.id, item })}
                            className="p-2 text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/50 rounded-lg border border-red-900/40 transition-colors cursor-pointer"
                            title="Eliminar plato"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            PESTAÑA 2: CONTROL DE LA PÍLDORA DE NOVEDAD (HERO)
           ========================================================================= */}
        {activeTab === 'promo' && (
          <div className="max-w-2xl mx-auto space-y-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
            <div>
              <span className="text-xs font-semibold text-[#C2410C] uppercase tracking-wider">
                Hero Section
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                Píldora de Novedad / Promoción
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Controla manualmente la etiqueta destacada que aparece justo debajo del logo en la cabecera de la carta.
              </p>
            </div>

            {/* Live Preview de la Píldora con selector de idiomas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="block text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                  Vista Previa en Vivo (Hero)
                </label>
                <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setPreviewLang('es')}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                      previewLang === 'es' ? 'bg-[#C2410C] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                    title="Ver cómo lo verán en Español"
                  >
                    🇪🇸 ES
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewLang('en')}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                      previewLang === 'en' ? 'bg-[#C2410C] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                    title="Ver cómo lo verán en Inglés"
                  >
                    🇬🇧 EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewLang('it')}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                      previewLang === 'it' ? 'bg-[#C2410C] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                    title="Ver cómo lo verán en Italiano"
                  >
                    🇮🇹 IT
                  </button>
                </div>
              </div>

              <div className="bg-[#141A0F] border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center min-h-[100px] text-center">
                {pillActive ? (
                  <div className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-950/80 border border-[#C2410C]/60 shadow-[0_0_15px_rgba(194,65,12,0.4)] backdrop-blur-md max-w-full">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#C2410C] shrink-0">
                      {previewLang === 'es' ? pillTag : previewLang === 'en' ? (pillTagEn || pillTag) : (pillTagIt || pillTag)}:
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-zinc-100 uppercase tracking-wider font-semibold truncate">
                      {previewLang === 'es' ? pillTitle : previewLang === 'en' ? (pillTitleEn || pillTitle) : (pillTitleIt || pillTitle)}
                    </span>
                    <span className="text-xs text-[#C2410C] font-bold shrink-0">↓</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500 italic">
                    (La píldora se encuentra oculta actualmente)
                  </span>
                )}
              </div>
            </div>

            {/* Formulario de configuración */}
            <form onSubmit={handleSavePromoPill} className="space-y-4 sm:space-y-5">
              {/* Switch de activación */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 gap-3">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">Mostrar Píldora en el Hero</span>
                  <span className="text-[11px] sm:text-xs text-zinc-400">Si lo desactivas, no aparecerá en la web pública.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPillActive(!pillActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 cursor-pointer ${
                    pillActive ? 'bg-emerald-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pillActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Botón de Auto-Traducción Inteligente */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">
                    Traducción Automática
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Genera inglés e italiano con un solo clic.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoTranslatePill}
                  disabled={isTranslatingPill || !pillTitle.trim()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-950/80 border border-amber-800/60 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  title="Traducir etiqueta y mensaje automáticamente"
                >
                  {isTranslatingPill ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Traduciendo...</span>
                    </>
                  ) : pillTranslateDone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>¡Traducido!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Auto Traducir</span>
                    </>
                  )}
                </button>
              </div>

              {/* Campos en Español */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2410C] block">
                  🇪🇸 Español (Principal)
                </span>
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-400 mb-1 tracking-wider">
                    Etiqueta (Tag)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. NOVEDAD, PROMO..."
                    value={pillTag}
                    onChange={(e) => setPillTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-base sm:text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-400 mb-1 tracking-wider">
                    Texto Principal de la Novedad
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. RISOTTOS AUTÉNTICOS, NUEVA PIZZA TRUFADA..."
                    value={pillTitle}
                    onChange={(e) => setPillTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-base sm:text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
              </div>

              {/* Campos en Inglés e Italiano */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Inglés */}
                <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                    🇬🇧 English
                  </span>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1">
                      Tag
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. NEW, SPECIAL..."
                      value={pillTagEn}
                      onChange={(e) => setPillTagEn(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-base sm:text-xs focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1">
                      Message
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. AUTHENTIC RISOTTOS..."
                      value={pillTitleEn}
                      onChange={(e) => setPillTitleEn(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-base sm:text-xs focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>
                </div>

                {/* Italiano */}
                <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                    🇮🇹 Italiano
                  </span>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1">
                      Tag
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. NOVITÀ, PROMO..."
                      value={pillTagIt}
                      onChange={(e) => setPillTagIt(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-base sm:text-xs focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1">
                      Messaggio
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. RISOTTI AUTENTICI..."
                      value={pillTitleIt}
                      onChange={(e) => setPillTitleIt(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-base sm:text-xs focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>
                </div>
              </div>

              {/* Categoría a la que desplaza al hacer clic */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5 tracking-wider">
                  Categoría a la que salta al hacer clic
                </label>
                <select
                  value={pillCategory}
                  onChange={(e) => setPillCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-base sm:text-sm focus:outline-none focus:border-[#C2410C]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id.charAt(0).toUpperCase() + c.id.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {promoSavedSuccess && (
                <div className="flex items-center gap-2 p-3 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>¡Píldora de novedad actualizada y traducida correctamente!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isTranslatingPill}
                className="w-full py-3.5 bg-[#C2410C] hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {isTranslatingPill ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando y traduciendo...</span>
                  </>
                ) : (
                  <span>Guardar Configuración de la Píldora</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            PESTAÑA 3: AJUSTES, RESPALDO Y SEGURIDAD
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
            
            {/* Sincronización en la Nube con Google Sheets */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>Base de Datos Google Sheets</span>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Sincroniza platos y precios en tiempo real para todos los comensales.
                    </p>
                  </div>
                </div>

                {/* Estado de conexión */}
                <div>
                  {sheetsUrl ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>{syncStatus === 'syncing' ? 'Sincronizando...' : 'Conectado a la Nube'}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                      <CloudOff className="w-3.5 h-3.5" />
                      <span>Modo Local (Sin Nube)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Formulario de URL */}
              <form onSubmit={handleConnectSheets} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase font-semibold text-zinc-300 tracking-wider">
                      URL de Google Apps Script
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowScriptModal(!showScriptModal)}
                      className="text-xs text-[#C2410C] hover:text-orange-400 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showScriptModal ? 'Ocultar Guía' : '¿Cómo obtenerla?'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={inputSheetsUrl}
                      onChange={(e) => setInputSheetsUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-base sm:text-xs font-mono focus:outline-none focus:border-[#C2410C] min-w-0"
                    />
                    <button
                      type="submit"
                      disabled={sheetsActionLoading}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#C2410C] hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                    >
                      {sheetsActionLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Guardando...</span>
                        </>
                      ) : (
                        <span>Conectar y Probar</span>
                      )}
                    </button>
                  </div>
                </div>

                {sheetsFeedback && (
                  <div className={`p-3 text-xs rounded-xl border flex items-center gap-2 break-words ${
                    sheetsFeedback.type === 'success'
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800'
                      : 'bg-red-950/40 text-red-400 border-red-800'
                  }`}>
                    {sheetsFeedback.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                    <span>{sheetsFeedback.text}</span>
                  </div>
                )}
              </form>

              {/* Botones de acción manual si está conectado */}
              {sheetsUrl && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      disabled={sheetsActionLoading}
                      onClick={handlePullFromSheets}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${sheetsActionLoading ? 'animate-spin' : ''}`} />
                      <span>Descargar menú</span>
                    </button>

                    <button
                      type="button"
                      disabled={sheetsActionLoading}
                      onClick={async () => {
                        setSheetsActionLoading(true);
                        await pushToSheets();
                        setSheetsActionLoading(false);
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Subir cambios</span>
                    </button>
                  </div>

                  {lastSyncedAt && (
                    <span className="text-[11px] text-zinc-500 text-center sm:text-right">
                      Última sincr:{' '}
                      {(() => {
                        try {
                          const d = lastSyncedAt instanceof Date ? lastSyncedAt : new Date(lastSyncedAt);
                          return isNaN(d.getTime()) ? '' : d.toLocaleTimeString();
                        } catch {
                          return '';
                        }
                      })()}
                    </span>
                  )}
                </div>
              )}

              {/* Guía desplegable de Google Sheets */}
              {showScriptModal && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs text-zinc-300 break-words overflow-hidden">
                  <h4 className="font-bold text-white text-sm">
                    Guía rápida para conectar Google Sheets (2 minutos):
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 leading-relaxed">
                    <li>Abre <a href="https://drive.google.com" target="_blank" rel="noreferrer" className="text-[#C2410C] underline font-semibold">Google Drive</a> y crea una nueva <strong>Hoja de cálculo</strong>.</li>
                    <li>Nómbrala como quieras (ej. <em>"Kikko Menú Base de Datos"</em>).</li>
                    <li>En el menú superior, ve a <strong>Extensiones &gt; Apps Script</strong>.</li>
                    <li>Borra el código que haya y pega el script de sincronización oficial.</li>
                    <li>Haz clic en el botón azul <strong>Implementar &gt; Nueva implementación</strong>.</li>
                    <li>Selecciona el tipo <strong>Aplicación web</strong> (icono de engranaje).</li>
                    <li>En <em>"Quién tiene acceso"</em> selecciona <strong>"Cualquiera"</strong>.</li>
                    <li>Pulsa <strong>Implementar</strong> y copia la URL terminada en <code>/exec</code>.</li>
                  </ol>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="https://drive.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold text-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir Google Drive</span>
                    </a>
                    <span className="text-[11px] text-zinc-500">
                      Script en <code>google-apps-script.js</code> en la raíz.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Entorno de Pruebas Seguro (Sandbox) */}
            <div className={`border rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 transition-all ${
              isSandboxMode
                ? 'bg-amber-950/30 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                : 'bg-zinc-900/60 border-zinc-800'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    isSandboxMode
                      ? 'bg-amber-950/80 border-amber-600/60 text-amber-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                  }`}>
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>Modo Sandbox / Pruebas Seguras</span>
                      {isSandboxMode && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold">
                          Activo
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Prueba a añadir platos, cambiar precios y generar traducciones sin alterar la base de datos de los clientes en las mesas.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleSandboxMode}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 text-center ${
                    isSandboxMode
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg'
                      : 'bg-zinc-800 hover:bg-amber-500 hover:text-black text-white border border-zinc-700'
                  }`}
                >
                  {isSandboxMode ? 'Desactivar y Restaurar' : 'Activar Modo Sandbox'}
                </button>
              </div>

              {isSandboxMode && (
                <div className="p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200 leading-relaxed">
                  🛡️ <strong>Aislamiento total activo:</strong> Los cambios que hagas se guardan exclusivamente en esta sesión de tu navegador. Las sincronizaciones automáticas hacia Google Sheets están pausadas. Al pulsar en <em>"Desactivar y Restaurar"</em>, el menú regresará de inmediato a los datos reales de producción.
                </div>
              )}
            </div>

            {/* Copias de seguridad */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Copias de Seguridad (Backup)</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Guarda una copia de toda la carta en tu dispositivo o restaura un respaldo previo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleExportBackup}
                  className="flex items-center justify-center gap-2 p-3.5 sm:p-4 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#C2410C]" />
                  <span>Descargar Backup (JSON)</span>
                </button>

                <label className="flex items-center justify-center gap-2 p-3.5 sm:p-4 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 text-emerald-500" />
                  <span>Restaurar desde JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Cambiar PIN */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Seguridad de Acceso</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Cambia el código PIN de acceso al panel de administración.
                </p>
              </div>

              <form onSubmit={handleChangePin} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <input
                    type="password"
                    placeholder="Nuevo PIN (mínimo 4 caracteres)"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-base sm:text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Actualizar
                  </button>
                </div>
                {pinChangeMsg && (
                  <p className="text-xs text-emerald-400 font-medium">{pinChangeMsg}</p>
                )}
              </form>
            </div>

            {/* Restablecer de Fábrica */}
            <div className="bg-red-950/20 border border-red-900/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-red-400">Restablecer Carta de Fábrica</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Esta acción devolverá todos los platos, precios y la píldora a sus valores originales.
                  </p>
                </div>
              </div>

              {isResetConfirmOpen ? (
                <div className="p-4 bg-red-950/40 border border-red-800 rounded-xl space-y-3">
                  <p className="text-xs text-red-200 font-medium">
                    ¿Estás 100% seguro? Se perderán las modificaciones que no hayas descargado en un archivo backup.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => {
                        resetToDefaults();
                        setIsResetConfirmOpen(false);
                        alert('Carta restablecida a los valores originales.');
                      }}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Sí, restablecer ahora
                    </button>
                    <button
                      onClick={() => setIsResetConfirmOpen(false)}
                      className="px-4 py-2.5 bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-red-950/50 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restablecer Menú Original</span>
                </button>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Modal de Crear / Editar Producto */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProductModal}
        initialProduct={editingProduct}
        categoryTitle={currentCategoryData?.id.toUpperCase() || ''}
        isDrinkCategory={selectedCategory === 'bebidas'}
      />

      {/* Modal de Confirmación de Eliminación */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <Trash2 className="w-6 h-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-white">Eliminar Producto</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              ¿Seguro que deseas eliminar{' '}
              <strong className="text-white">
                {typeof productToDelete.item.name === 'string'
                  ? productToDelete.item.name
                  : productToDelete.item.name.es}
              </strong>
              ? Esta acción no se puede deshacer (a menos que uses una copia de seguridad).
            </p>
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 rounded-xl cursor-pointer text-center"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg cursor-pointer text-center"
              >
                Eliminar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
