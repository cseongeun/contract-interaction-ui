import WalletStore from "store/wallet";
import FarmStore from "store/farm";
import NFTokenStore from "store/nfToken";
import LendingStore from "store/lending";
import ContractStore from "store/contract";
class RootStore {
  walletStore: WalletStore;
  farmStore: FarmStore;
  nfTokenStore: NFTokenStore;
  lendingStore: LendingStore;
  contractStore: ContractStore;

  constructor() {
    this.walletStore = new WalletStore();
    this.farmStore = new FarmStore();
    this.nfTokenStore = new NFTokenStore();
    this.lendingStore = new LendingStore();
    this.contractStore = new ContractStore();
  }
}

export default RootStore;
