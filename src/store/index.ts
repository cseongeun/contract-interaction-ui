import ContractStore from 'store/contract';
import TransactionStore from 'store/transaction';

class RootStore {
  contractStore: ContractStore;
  transactionStore: TransactionStore;

  constructor() {
    this.contractStore = new ContractStore();
    this.transactionStore = new TransactionStore();
  }
}

export default RootStore;
