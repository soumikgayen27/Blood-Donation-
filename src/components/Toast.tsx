import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, X, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

const icons = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
  warning: AlertTriangle,
};

const styles: Record<ToastType, string> = {
  success: 'ring-success-500/30 bg-white',
  error: 'ring-primary-500/30 bg-white',
  info: 'ring-navy-300 bg-white',
  warning: 'ring-warning-500/30 bg-white',
};

const iconColors: Record<ToastType, string> = {
  success: 'text-success-600 bg-success-50',
  error: 'text-primary-600 bg-primary-50',
  info: 'text-navy-600 bg-navy-100',
  warning: 'text-warning-600 bg-warning-50',
};

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}) {
  return createPortal(
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
}

function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  const Icon = icons[toast.type];
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4200);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl p-4 shadow-card ring-1 animate-slide-in ${styles[toast.type]}`}
      role="status"
    >
      <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${iconColors[toast.type]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-semibold text-navy-900">{toast.title}</p>
        {toast.message && (
          <p className="mt-0.5 text-sm text-navy-600">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded-md p-1 text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-700"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

let counter = 0;
export function useToastController() {
  // placeholder hook retained for API symmetry — container lives in App
  return { gen: () => `t-${Date.now()}-${counter++}` };
}
