import { useContext, useCallback } from 'react';
import { ToastContext } from 'contexts/Toast';
import { IToastProperty } from 'contexts/Toast/constants';

const useToast = () => {
  const { onPresent } = useContext(ToastContext);

  const handlePresent = useCallback(
    (toastProperty: IToastProperty) => {
      onPresent(toastProperty);
    },
    [onPresent]
  );

  return { toast: handlePresent };
};

export default useToast;
