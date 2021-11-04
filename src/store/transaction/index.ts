import { observable, makeObservable, computed } from 'mobx';
import { TransactionDTO } from './type';

interface ExecutedTransaction {
  transaction: TransactionDTO[];
  result: any;
}

class TransactionStore {
  broadcasted: ExecutedTransaction[] = [];

  constructor() {
    makeObservable(this, {
      broadcasted: observable,

      broadcastedTransaction: computed,
    });
  }

  addBroadcasted(params: ExecutedTransaction) {
    this.broadcasted.push(params);
    console.log(this.broadcasted);
  }

  get broadcastedTransaction() {
    const result = this.broadcasted[-1];
    console.log(result);
    return result;
  }
}

export default TransactionStore;
