import { createContext } from 'react';
import RootStore from 'store';

const rootStore = new RootStore();
const storeContext = createContext(rootStore);

export default storeContext;
