import React, { useState } from 'react';
import { useMenuData } from '../../context/MenuDataContext';
import { MenuItem } from '../../types';
import ProductModal from './ProductModal';
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
  Loader2
} from 'lucide-react';

const DEFAULT_PIN = 'kikko2026';
const PIN_STORAGE_KEY = 'kikko_admin_pin_v1';

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
    importBackup
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

  // Estado del formulario de la píldora de novedad
  const [pillActive, setPillActive] = useState(promoPill.active);
  const [pillTag, setPillTag] = useState(
    typeof promoPill.tag === 'string' ? promoPill.tag : promoPill.tag?.es || 'Novedad'
  );
  const [pillTitle, setPillTitle] = useState(
    typeof promoPill.title === 'string' ? promoPill.title : promoPill.title?.es || 'Risottos Auténticos'
  );
  const [pillCategory, setPillCategory] = useState(promoPill.targetCategory || 'risottos');
  const [promoSavedSuccess, setPromoSavedSuccess] = useState(false);

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

  // Guardar píldora de novedad
  const handleSavePromoPill = (e: React.FormEvent) => {
    e.preventDefault();
    updatePromoPill({
      active: pillActive,
      tag: {
        es: pillTag,
        en: typeof promoPill.tag === 'object' ? promoPill.tag.en : pillTag,
        it: typeof promoPill.tag === 'object' ? promoPill.tag.it : pillTag
      },
      title: {
        es: pillTitle,
        en: typeof promoPill.title === 'object' ? promoPill.title.en : pillTitle,
        it: typeof promoPill.title === 'object' ? promoPill.title.it : pillTitle
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
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 selection:bg-[#C2410C]/30 text-zinc-300">
        <div className="w-full max-w-md bg-[#141A0F] border border-zinc-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#C2410C]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 text-[#C2410C] shadow-lg mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Kikko Admin</h1>
            <p className="text-sm text-zinc-400 mt-1">Panel de Gestión Privado de la Carta</p>
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
                className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-700 rounded-xl text-white text-center tracking-widest text-lg font-mono focus:outline-none focus:border-[#C2410C] transition-colors"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 text-center font-medium bg-red-950/30 border border-red-900/50 py-2 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C2410C] hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-sm uppercase tracking-wider"
            >
              Desbloquear Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
            <button
              onClick={onBackToMenu}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-[#C2410C]/30 pb-20">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMenu}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-lg border border-zinc-700/60 transition-all cursor-pointer"
              title="Ir a la carta digital pública"
            >
              <ArrowLeft className="w-4 h-4 text-[#C2410C]" />
              <span className="hidden sm:inline">Ver Carta Pública</span>
            </button>
            <div className="h-5 w-px bg-zinc-800" />
            <h1 className="font-serif text-lg md:text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <span>Kikko</span>
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-[#C2410C]/20 text-[#C2410C] font-semibold border border-[#C2410C]/30 uppercase tracking-wider">
                Admin
              </span>
              {sheetsUrl ? (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-sans px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-medium">
                  <Cloud className="w-3 h-3" />
                  <span>{syncStatus === 'syncing' ? 'Sincronizando...' : 'Nube Conectada'}</span>
                </span>
              ) : (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-sans px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-medium">
                  <CloudOff className="w-3 h-3" />
                  <span>Modo Local</span>
                </span>
              )}
            </h1>
          </div>

          {/* Navegación por pestañas */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#C2410C] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Platos y Precios</span>
            </button>

            <button
              onClick={() => setActiveTab('promo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'promo'
                  ? 'bg-[#C2410C] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Píldora Novedad</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#C2410C] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden md:inline">Ajustes & Respaldo</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800/60 rounded-lg transition-colors ml-1 cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* =========================================================================
            PESTAÑA 1: GESTIÓN DE PRODUCTOS Y PRECIOS
           ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Barra superior de categorías */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
              {/* Selector de categoría */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchTerm('');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
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
                className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all cursor-pointer flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Producto</span>
              </button>
            </div>

            {/* Barra de búsqueda y contador */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={`Buscar en ${currentCategoryData?.id}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div className="text-xs text-zinc-400">
                Mostrando <strong className="text-white">{filteredItems.length}</strong> productos
              </div>
            </div>

            {/* Lista de Productos */}
            <div className="grid grid-cols-1 gap-3">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-zinc-800/60">
                  <p className="text-zinc-500 text-sm">No se encontraron productos en esta categoría.</p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const displayName = typeof item.name === 'string' ? item.name : item.name.es;
                  const isAvailable = item.available !== false;

                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                        isAvailable
                          ? 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                          : 'bg-zinc-950/60 border-zinc-800/40 opacity-60'
                      }`}
                    >
                      {/* Información del Plato */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-white tracking-wide truncate">
                            {displayName}
                          </h4>
                          {item.subcategory && (
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                              {item.subcategory}
                            </span>
                          )}
                          {!isAvailable && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
                              Agotado Temporalmente
                            </span>
                          )}
                        </div>

                        {item.description?.es && (
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                            {item.description.es}
                          </p>
                        )}
                      </div>

                      {/* Controles de Precio y Acciones */}
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800/80">
                        
                        {/* Edición rápida de precio */}
                        <div className="flex items-center gap-1.5">
                          {editingPriceId === item.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                autoFocus
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                className="w-16 px-2 py-1 text-sm bg-black border border-[#C2410C] rounded text-white font-mono text-right"
                              />
                              <button
                                onClick={() => handleSavePrice(currentCategoryData.id, item.id)}
                                className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                                title="Guardar precio"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingPriceId(item.id);
                                setTempPrice(item.price.toFixed(2));
                              }}
                              className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 text-white font-mono font-bold text-sm transition-colors cursor-pointer group flex items-center gap-1.5"
                              title="Click para cambiar precio rápido"
                            >
                              <span>{item.price.toFixed(2)} €</span>
                              <Edit2 className="w-3 h-3 text-zinc-500 group-hover:text-[#C2410C] transition-colors" />
                            </button>
                          )}
                        </div>

                        {/* Toggle de Disponibilidad */}
                        <button
                          onClick={() => toggleItemAvailable(currentCategoryData.id, item.id)}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            isAvailable
                              ? 'text-emerald-400 hover:bg-emerald-950/40 border-emerald-800/40'
                              : 'text-zinc-500 hover:bg-zinc-800 border-zinc-700'
                          }`}
                          title={isAvailable ? 'Marcar como agotado' : 'Marcar como disponible'}
                        >
                          {isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        {/* Editar Plato Completo */}
                        <button
                          onClick={() => {
                            setEditingProduct(item);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg border border-zinc-700/60 transition-colors cursor-pointer"
                          title="Editar detalles del plato"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Eliminar */}
                        <button
                          onClick={() => setProductToDelete({ categoryId: currentCategoryData.id, item })}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg border border-red-900/40 transition-colors cursor-pointer"
                          title="Eliminar plato"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            PESTAÑA 2: CONTROL DE LA PÍLDORA DE NOVEDAD (HERO)
           ========================================================================= */}
        {activeTab === 'promo' && (
          <div className="max-w-2xl mx-auto space-y-8 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8">
            <div>
              <span className="text-xs font-semibold text-[#C2410C] uppercase tracking-wider">
                Hero Section
              </span>
              <h2 className="text-xl font-serif font-bold text-white mt-1">
                Píldora de Novedad / Promoción
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Controla manualmente la etiqueta destacada que aparece justo debajo del logo en la cabecera de la carta.
              </p>
            </div>

            {/* Live Preview de la Píldora */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                Vista Previa en Vivo (Hero)
              </label>
              <div className="bg-[#141A0F] border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[120px]">
                {pillActive ? (
                  <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-[#C2410C]/60 shadow-[0_0_15px_rgba(194,65,12,0.4)] backdrop-blur-md">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#C2410C]">
                      {pillTag}:
                    </span>
                    <span className="text-[11px] text-zinc-100 uppercase tracking-wider font-semibold">
                      {pillTitle}
                    </span>
                    <span className="text-xs text-[#C2410C] font-bold">↓</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500 italic">
                    (La píldora se encuentra oculta actualmente)
                  </span>
                )}
              </div>
            </div>

            {/* Formulario de configuración */}
            <form onSubmit={handleSavePromoPill} className="space-y-5">
              {/* Switch de activación */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <div>
                  <span className="text-sm font-bold text-white block">Mostrar Píldora en el Hero</span>
                  <span className="text-xs text-zinc-400">Si lo desactivas, no aparecerá en la web.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPillActive(!pillActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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

              {/* Texto de la Etiqueta (Tag) */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5 tracking-wider">
                  Etiqueta Destacada (Tag)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. NOVEDAD, PROMO, SUGERENCIA..."
                  value={pillTag}
                  onChange={(e) => setPillTag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              {/* Título / Mensaje */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5 tracking-wider">
                  Texto Principal de la Novedad
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. RISOTTOS AUTÉNTICOS, NUEVA PIZZA TRUFADA..."
                  value={pillTitle}
                  onChange={(e) => setPillTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              {/* Categoría a la que desplaza al hacer clic */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5 tracking-wider">
                  Categoría a la que salta al hacer clic
                </label>
                <select
                  value={pillCategory}
                  onChange={(e) => setPillCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#C2410C]"
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
                  <Check className="w-4 h-4" />
                  <span>¡Píldora de novedad actualizada correctamente!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#C2410C] hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-sm uppercase tracking-wider"
              >
                Guardar Configuración de la Píldora
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            PESTAÑA 3: AJUSTES, RESPALDO Y SEGURIDAD
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Sincronización en la Nube con Google Sheets */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Base de Datos Google Sheets</span>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Sincroniza los platos y precios en la nube para que se vean en los móviles de todas las mesas.
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
                      URL de la Aplicación Web (Google Apps Script)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowScriptModal(!showScriptModal)}
                      className="text-xs text-[#C2410C] hover:text-orange-400 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showScriptModal ? 'Ocultar Guía' : '¿Cómo obtener esta URL?'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={inputSheetsUrl}
                      onChange={(e) => setInputSheetsUrl(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#C2410C]"
                    />
                    <button
                      type="submit"
                      disabled={sheetsActionLoading}
                      className="px-5 py-2.5 bg-[#C2410C] hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 flex-shrink-0"
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
                  <div className={`p-3 text-xs rounded-xl border flex items-center gap-2 ${
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
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-800/80">
                  <button
                    type="button"
                    disabled={sheetsActionLoading}
                    onClick={handlePullFromSheets}
                    className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${sheetsActionLoading ? 'animate-spin' : ''}`} />
                    <span>Descargar menú desde Sheets</span>
                  </button>

                  <button
                    type="button"
                    disabled={sheetsActionLoading}
                    onClick={async () => {
                      setSheetsActionLoading(true);
                      await pushToSheets();
                      setSheetsActionLoading(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Subir cambios a Sheets</span>
                  </button>

                  {lastSyncedAt && (
                    <span className="text-[11px] text-zinc-500 ml-auto">
                      Última sincr: {lastSyncedAt.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              )}

              {/* Guía desplegable de Google Sheets */}
              {showScriptModal && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs text-zinc-300">
                  <h4 className="font-bold text-white text-sm">
                    Guía rápida para conectar Google Sheets (2 minutos):
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 leading-relaxed">
                    <li>Abre <a href="https://drive.google.com" target="_blank" rel="noreferrer" className="text-[#C2410C] underline font-semibold">Google Drive</a> y crea una nueva <strong>Hoja de cálculo de Google</strong>.</li>
                    <li>Nómbrala como quieras (ej. <em>"Kikko Menú Base de Datos"</em>).</li>
                    <li>En el menú superior, ve a <strong>Extensiones &gt; Apps Script</strong>.</li>
                    <li>Borra el código que haya y pega el script de sincronización oficial.</li>
                    <li>Haz clic en el botón azul <strong>Implementar &gt; Nueva implementación</strong>.</li>
                    <li>Selecciona el tipo <strong>Aplicación web</strong> (icono de engranaje).</li>
                    <li>En <em>"Quién tiene acceso"</em> selecciona <strong>"Cualquiera"</strong> (imprescindible para que los comensales lean la carta sin login).</li>
                    <li>Pulsa <strong>Implementar</strong>, concede los permisos de Google y copia la URL terminada en <code>/exec</code>.</li>
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
                      El código del script está en <code>google-apps-script.js</code> en la raíz del proyecto.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Copias de seguridad */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Copias de Seguridad (Backup)</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Guarda una copia de toda la carta en tu ordenador o importa un respaldo previo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleExportBackup}
                  className="flex items-center justify-center gap-2 p-4 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#C2410C]" />
                  <span>Descargar Backup (JSON)</span>
                </button>

                <label className="flex items-center justify-center gap-2 p-4 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm font-semibold transition-colors cursor-pointer">
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
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Seguridad de Acceso</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Cambia el código PIN de acceso al panel de administración.
                </p>
              </div>

              <form onSubmit={handleChangePin} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="password"
                    placeholder="Nuevo PIN (mínimo 4 caracteres)"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
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
            <div className="bg-red-950/20 border border-red-900/40 rounded-3xl p-6 md:p-8 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-red-400">Restablecer Carta de Fábrica</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Esta acción devolverá todos los platos, precios y la píldora a sus valores originales del código inicial.
                  </p>
                </div>
              </div>

              {isResetConfirmOpen ? (
                <div className="p-4 bg-red-950/40 border border-red-800 rounded-xl space-y-3">
                  <p className="text-xs text-red-200 font-medium">
                    ¿Estás 100% seguro? Se perderán las modificaciones que no hayas descargado en un archivo backup.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        resetToDefaults();
                        setIsResetConfirmOpen(false);
                        alert('Carta restablecida a los valores originales.');
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Sí, restablecer ahora
                    </button>
                    <button
                      onClick={() => setIsResetConfirmOpen(false)}
                      className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-950/50 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <Trash2 className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Eliminar Producto</h3>
            </div>
            <p className="text-sm text-zinc-300">
              ¿Seguro que deseas eliminar{' '}
              <strong className="text-white">
                {typeof productToDelete.item.name === 'string'
                  ? productToDelete.item.name
                  : productToDelete.item.name.es}
              </strong>
              ? Esta acción no se puede deshacer (a menos que uses una copia de seguridad).
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-lg cursor-pointer"
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
