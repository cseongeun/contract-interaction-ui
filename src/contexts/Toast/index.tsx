import React, { createContext, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ToastDuration, ToastPosition, IToastProperty } from './constants';
import { injectStyle } from 'react-toastify/dist/inject-style';

injectStyle();

interface ToastProps {
  onPresent: (toastProperty: IToastProperty) => React.ReactText | null;
}

const ToastContext = createContext<ToastProps>({
  onPresent: () => null,
});

const ToastProvider: React.FC = ({ children }) => {
  const notify = useCallback((toastProperty: IToastProperty) => {
    const { description, type } = toastProperty;
    switch (type) {
      case 'success': {
        return toast.success(`🟦 ${description}`, { position: ToastPosition });
      }
      case 'error': {
        return toast.error(`🟥 ${description}`, { position: ToastPosition });
      }
      case 'warn': {
        return toast.warn(`🟧 ${description}`, { position: ToastPosition });
      }
      case 'info': {
        return toast.info(`🟩 ${description}`, { position: ToastPosition });
      }
      case 'dark': {
        return toast.dark(`⬛ ${description}`, { position: ToastPosition });
      }
      default: {
        return toast(`🟨 ${description}`, { position: ToastPosition });
      }
    }
  }, []);

  return (
    <ToastContext.Provider value={{ onPresent: notify }}>
      {children}
      <ToastContainer autoClose={ToastDuration} />
    </ToastContext.Provider>
  );
};

export { ToastContext };
export default ToastProvider;
