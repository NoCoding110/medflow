import { toast as hotToast } from 'react-hot-toast';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

interface Toast {
  type: ToastType;
  title: string;
  description?: string;
}

export const useToast = () => {
  const addToast = ({ type, title, description }: Toast, options?: ToastOptions) => {
    const toastOptions = {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
    };

    switch (type) {
      case 'success':
        hotToast.success(description || title, toastOptions);
        break;
      case 'error':
        hotToast.error(description || title, toastOptions);
        break;
      case 'info':
        hotToast(description || title, {
          ...toastOptions,
          icon: 'ℹ️',
        });
        break;
      case 'warning':
        hotToast(description || title, {
          ...toastOptions,
          icon: '⚠️',
        });
        break;
    }
  };

  return { addToast };
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    hotToast.success(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
    });
  },
  error: (message: string, options?: ToastOptions) => {
    hotToast.error(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
    });
  },
  info: (message: string, options?: ToastOptions) => {
    hotToast(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      icon: 'ℹ️',
    });
  },
  warning: (message: string, options?: ToastOptions) => {
    hotToast(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      icon: '⚠️',
    });
  },
}; 