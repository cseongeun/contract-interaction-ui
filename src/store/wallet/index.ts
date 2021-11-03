import { computed, observable, flow, makeObservable, autorun } from 'mobx';
import { dashboardInstance } from 'helpers/axios';
import { userFarmInfoAPI, userLendingInfoAPI, userNFTokenInfoAPI, userTokenBalanceAPI } from 'config/dashboardApi';
import { isAddress, isNull } from 'helpers/type';
import { toBigNumber, add, mul, toFixed } from 'helpers/bignumber';
import { TokenType } from 'store/token/types';

class WalletStore {
  prevAccount: null | string = null;
  account: null | string = null;
  shouldRefresh: boolean = false;

  userTokens: any[] = [];
  userNFTokens: any[] = [];
  userFarms: any[] = [];
  userLendings: any[] = [];

  constructor() {
    makeObservable(this, {
      prevAccount: observable,
      account: observable,
      userTokens: observable,
      
      shouldRefresh: observable,

      userTokensValue: computed,

      assetsPortfolio: computed,
      tokenPortfolio: computed,
      networkPortfolio: computed,

      fetchUserTokens: flow,
    });

    this.runTasks();
  }

  /* Store's Tasks */
  runTasks() {}

  setAccount(newAccount: string | null): void {
    this.prevAccount = this.account;

    if (isAddress(newAccount)) {
      this.account = newAccount;
      this.fetchUserTokens();
    } else {
      this.account = null;
    }
  }

  get userTokensValue() {
    let totalSum = toBigNumber(0);
    Object.keys(this.userTokens).forEach((network: any) => {
      const networkAssets = this.userTokens[network];
      const ids = Object.keys(networkAssets);
      if (ids.length > 0) {
        const networkSum = ids.reduce((prev, id) => {
          const { balance, price_usd } = networkAssets[id];

          if (!isNull(balance) && !isNull(price_usd)) {
            if (!toBigNumber(balance).isNaN() && !toBigNumber(price_usd).isNaN()) {
              return add(prev, mul(balance, price_usd));
            }
          }
          return prev;
        }, toBigNumber(0));

        totalSum = add(totalSum, networkSum);
      }
    });
    return totalSum.toString();
  }



  get assetsPortfolio() {
    const assetsPortfolio: any[] = [];
    Object.keys(this.userTokens).forEach((network: any) => {
      const networkAssets = this.userTokens[network];
      const ids = Object.keys(networkAssets);
      if (ids.length > 0) {
        ids.forEach(id => {
          const { type, name, symbol, decimals, balance, icon_link, address, price_usd, Network, pair0, pair1 } = networkAssets[id];
          assetsPortfolio.push({
            chainId: Network.chain_id,
            name,
            symbol,
            decimals,
            address,
            balance,
            priceUSD: price_usd,
            value: !isNull(balance) && !isNull(price_usd) ? toFixed(mul(balance, price_usd), 2) : null,
            iconUrl: type === TokenType.MULTI ? [pair0.icon_link, pair1.icon_link] : [icon_link],
          });
        });
      }
      return [];
    });
    return assetsPortfolio;
  }



  get tokenPortfolio() {
    const tokenPortfolio: any = {};
    Object.keys(this.userTokens).forEach((network: any) => {
      const networkAssets = this.userTokens[network];
      const ids = Object.keys(networkAssets);
      if (ids.length > 0) {
        ids.forEach(id => {
          const { symbol, balance, price_usd } = networkAssets[id];

          if (!isNull(balance) && !isNull(price_usd)) {
            if (!toBigNumber(balance).isNaN() && !toBigNumber(price_usd).isNaN()) {
              tokenPortfolio[`${network}/${symbol}`] = toFixed(mul(balance, price_usd), 2);
            }
          }
        });
      }
    });
    return tokenPortfolio;
  }

  get networkPortfolio() {
    const networkPortfolio: any = {};
    Object.keys(this.userTokens).forEach((network: any) => {
      const networkAssets = this.userTokens[network];
      
      const ids = Object.keys(networkAssets);
      if (ids.length > 0) {
        const networkSum = ids.reduce((prev, id) => {
          const { balance, price_usd } = networkAssets[id];

          if (!isNull(balance) && !isNull(price_usd)) {
            if (!toBigNumber(balance).isNaN() && !toBigNumber(price_usd).isNaN()) {
              return add(prev, mul(balance, price_usd));
            }
          }
          return prev;
        }, toBigNumber(0));

        networkPortfolio[network] = toFixed(networkSum, 2);
      }
    });
    return networkPortfolio;
  }

  
  *fetchUserTokens() {
    if (isNull(this.account)) return;
    const { data } = yield dashboardInstance(userTokenBalanceAPI(this.account as string));
    this.userTokens = data?.data?.result;
  }

  



}

export default WalletStore;
