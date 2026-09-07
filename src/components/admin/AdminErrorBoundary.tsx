import React, { ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  onBackToMenu?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AdminErrorBoundary extends (React.Component as new (props: Props) => {
  props: Props;
  state: State;
  setState: (state: Partial<State>) => void;
}) {
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error in AdminPanel:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-300 font-sans">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center space-y-5">
            <div className="inline-flex p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Ha ocurrido un error en el panel
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El panel de administración encontró un problema al renderizar. Puedes intentar recargar la vista o volver a la carta digital.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-black/60 border border-zinc-800 rounded-xl text-left">
                <p className="text-[11px] font-mono text-red-400 break-all">
                  {this.state.error.message || String(this.state.error)}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C2410C] hover:bg-orange-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reintentar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (this.props.onBackToMenu) {
                    this.props.onBackToMenu();
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a la Carta</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminErrorBoundary;
