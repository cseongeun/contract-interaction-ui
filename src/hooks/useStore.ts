import { useContext } from 'react';
import storeContext from 'contexts/Store';

const useStore = () => {
  return useContext(storeContext);
};

export default useStore;
