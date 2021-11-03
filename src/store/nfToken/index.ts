import { computed, observable, flow, makeObservable, autorun, action } from 'mobx';
import { dashboardInstance } from 'helpers/axios';
import { staticNFTokens, userNFTokenInfoAPI } from 'config/dashboardApi';
import { TokenType } from 'store/token/types';
import { isNull } from 'lodash';

class NFTokenStore {
  fetchUserNFTokenLoading: boolean = false;
  totalNFTokens: any[] = [];
  userNFTokens: any[] = [];

  constructor() {
    makeObservable(this, {
      totalNFTokens: observable,
      userNFTokens: observable,

      totalNFTokenCollection: computed,
      userNFTokenCollection:computed,

      fetchTotalNFTokens: flow,
      fetchUserNFTokens: flow,
    });

    this.runTasks();
  }

  /* Store's Tasks */
  runTasks() {}

  get totalNFTokenCollection() {
   return [];
  }

  get userNFTokenCollection() {
    const nfTokenPortfolio: any[] =[];
    Object.keys(this.userNFTokens).forEach((protocol: any) => {
      const protocolNFTs  = this.userNFTokens[protocol];
      for (let i = 0; i < protocolNFTs.length; i++) {
        nfTokenPortfolio.push(Object.values(protocolNFTs[i]))
      }
    })
    return nfTokenPortfolio.flat();
  }

  *fetchTotalNFTokens() {
    const { data } = yield dashboardInstance(staticNFTokens());
    this.totalNFTokens = data?.data?.result;
  }

  *fetchUserNFTokens(account: string | null) {
    if (isNull(account)) return;
    try {
      this.fetchUserNFTokenLoading = true;
      const { data } = yield dashboardInstance(userNFTokenInfoAPI(account as string));
      this.userNFTokens = data?.data?.result;  
      this.fetchUserNFTokenLoading = false;
    } catch (e) {

    }
  }

}

export default NFTokenStore;
