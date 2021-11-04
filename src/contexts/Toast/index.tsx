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
    const { description, type, position } = toastProperty;
    let area = ToastPosition
    if (position) {
      area = position
    }
    switch (type) {
      case 'success': {
        return toast.success(`🟦 ${description}`, { position: area });
      }
      case 'error': {
        return toast.error(`🟥 ${description}`, { position: area });
      }
      case 'warn': {
        return toast.warn(`🟧 ${description}`, { position: area });
      }
      case 'info': {
        return toast.info(`🟩 ${description}`, { position: area });
      }
      case 'dark': {
        return toast.dark(`⬛ ${description}`, { position: area });
      }
      default: {
        return toast(`🟨 ${description}`, { position: area });
      }
    }
  }, []);

  return (
    <ToastContext.Provider value={{ onPresent: notify }}>
      {children}
      <ToastContainer autoClose={ToastDuration} style={{ width:'85%' }} />
    </ToastContext.Provider>
  );
};

export { ToastContext };
export default ToastProvider;
