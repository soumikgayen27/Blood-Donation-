import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { ToastViewport, type ToastData } from '@/components/Toast';

interface ToastContextValue {
  push: (t: Omit<ToastData, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (t: Omit<ToastData, 'id'>) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { ...t, id }]);
    },
    [],
  );

  const api: ToastContextValue = {
    push,
    success: (title, message) => push({ type: 'success', title, message }),
    error: (title, message) => push({ type: 'error', title, message }),
    info: (title, message) => push({ type: 'info', title, message }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
