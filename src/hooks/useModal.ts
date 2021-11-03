import { useCallback, useContext } from 'react';
import { ModalContext } from 'contexts/Modal';

const useModal = (modal: React.ReactNode, key?: string) => {
  const { onDismiss, onPresent } = useContext(ModalContext);

  const handlePresent = useCallback(() => {
    onPresent(modal, key);
  }, [key, modal, onPresent]);

  return [handlePresent, onDismiss];
};

export default useModal;
