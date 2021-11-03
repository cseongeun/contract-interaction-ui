import { computed, observable, flow, makeObservable, autorun, action } from 'mobx';
import { dashboardInstance } from 'helpers/axios';
import { staticLendings, userLendingInfoAPI } from 'config/dashboardApi';
import { TokenType } from 'store/token/types';
import { isNull } from 'lodash';

class LendingStore {
  fetchUserLendingLoading: boolean = false;
  totalLendings: any[] = [];
  userLendings: any[] = [];

  constructor() {
    makeObservable(this, {
      totalLendings: observable,
      userLendings: observable,

      totalLendingCollection: computed,
      userLendingCollection:computed,

      fetchTotalLendings: flow,
      fetchUserLendings: flow,
    });

    this.runTasks();
  }

  /* Store's Tasks */
  runTasks() {}

  get totalLendingCollection() {
    if (this.totalLendings.length == 0) return [];
    return this.totalLendings.map(( { liquidity_amount, liquidity_usd, supply_amount, supply_usd, supply_apr, borrow_amount, borrow_usd, borrow_apr, collateral_factor, Token, Protocol}) => {
      return { 
        liquidity_amount,
        liquidity_usd,
        supply_amount,
        supply_usd,
        supply_apr,
        borrow_amount,
        borrow_usd,
        borrow_apr,
        collateral_factor,
        symbol: Token.symbol,
        Protocol,
      }
    })
  }

  get userLendingCollection() {
    const lendingPortfolio: any[] = [];
    Object.keys(this.userLendings).forEach((protocol: any) => {
      const protocolMarkets = this.userLendings[protocol];
      for (let i = 0; i < protocolMarkets.length; i++) {
        const { liquidity_amount, liquidity_usd, supply_amount, supply_usd, supply_apr, borrow_amount, borrow_usd, borrow_apr, collateral_factor, Token, Protocol, supply, borrow } = protocolMarkets[i];
        lendingPortfolio.push({
          liquidity_amount,
          liquidity_usd,
          supply_amount,
          supply_usd,
          supply_apr,
          borrow_amount,
          borrow_usd,
          borrow_apr,
          collateral_factor,
          symbol: Token.symbol,
          Protocol,
          supply,
          borrow,
        })
      }
      
    })
    return lendingPortfolio
  }

  *fetchTotalLendings() {
    const { data } = yield dashboardInstance(staticLendings());
    this.totalLendings = data?.data?.result;
  }

  *fetchUserLendings(account: string | null) {
    if (isNull(account)) return;
    try {
      this.fetchUserLendingLoading = true;
      const { data } = yield dashboardInstance(userLendingInfoAPI(account as string));
      this.userLendings = data?.data?.result;
      this.fetchUserLendingLoading = false;
         
    } catch (e) {

    }
  }

}

export default LendingStore;
