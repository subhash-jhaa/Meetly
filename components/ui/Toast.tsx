'use client';

import { useEffect, useRef } from 'react';

type ToastProps = {
  message: string;
  type?: 'error' | 'success' | 'info';
  onDismiss: () => void;
  duration?: number;
};

export function Toast({
  message,
  type = 'info',
  onDismiss,
  duration = 3500,
}: ToastProps) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timer.current = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer.current);
  }, [duration, onDismiss]);

  const styles = {
    error: 'border-red-500/20 text-red-400',
    success: 'border-white/20 text-white/70',
    info: 'border-white/10 text-white/50',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3
                  bg-surface-raised border px-4 py-3 font-mono text-[12px]
                  animate-in slide-in-from-bottom-2 duration-200
                  ${styles[type]}`}
    >
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="text-white/20 hover:text-white/50 transition-colors ml-1"
      >
        ✕
      </button>
    </div>
  );
}

// Hook for easy usage anywhere
import { useState, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'error' | 'success' | 'info';
  } | null>(null);

  const show = useCallback(
    (message: string, type: 'error' | 'success' | 'info' = 'info') => {
      setToast({ message, type });
    },
    []
  );

  const dismiss = useCallback(() => setToast(null), []);

  return { toast, show, dismiss };
}