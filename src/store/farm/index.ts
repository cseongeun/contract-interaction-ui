import { computed, observable, flow, makeObservable, autorun, action } from 'mobx';
import { dashboardInstance } from 'helpers/axios';
import { staticFarms, userFarmInfoAPI } from 'config/dashboardApi';
import { TokenType } from 'store/token/types';
import { isNull } from 'lodash';

class FarmStore {
  fetchUserFarmLoading: boolean = false;
  fetchUserFarmError: boolean = false;
  totalFarms: any[] = [];
  userFarms: any[] = [];

  constructor() {
    makeObservable(this, {
      fetchUserFarmError: observable, 
      totalFarms: observable,
      userFarms: observable,

      totalFarmCollection: computed,
      userFarmCollection:computed,

      fetchTotalFarms: flow,
      fetchUserFarms: flow,

    });

    this.runTasks();
  }

  /* Store's Tasks */
  runTasks() {}

  get totalFarmCollection() {

    if (this.totalFarms.length === 0) return [];
    return this.totalFarms.map(({ type, address, pid, name, liquidity_amount, liquidity_usd, apy, apr, link, log_block_number, Protocol, stakeTokens, rewardTokens }) => {
      const st = stakeTokens.map(({ Token: { type, name, symbol, decimals, balance, icon_link, address, price_usd, Network, pair0, pair1 } }) => {
        return {
          chainId: Network.chain_id,
          name,
          symbol,
          decimals,
          address,
          balance,
          priceUSD: price_usd,
          // value: !isNull(balance) && !isNull(price_usd) ? toFixed(mul(balance, price_usd), 2) : null,
          iconUrl: type === TokenType.MULTI ? [pair0.icon_link, pair1.icon_link] : [icon_link],
        }
      })
      const rt = rewardTokens.map(({ Token: { type, name, symbol, decimals, balance, icon_link, address, price_usd, Network, pair0, pair1 } }) => {
        return {
          chainId: Network.chain_id,
          name,
          symbol,
          decimals,
          address,
          balance,
          priceUSD: price_usd,
          // value: !isNull(balance) && !isNull(price_usd) ? toFixed(mul(balance, price_usd), 2) : null,
          iconUrl: type === TokenType.MULTI ? [pair0.icon_link, pair1.icon_link] : [icon_link],
        }
      }) 
      return {
        type,
        address,
        pid,
        name,
        liquidity_amount,
        liquidity_usd,
        apy,
        apr,
        link,
        log_block_number, 
        chain_id: Protocol.Network.chain_id,
        stakeTokens: st,
        rewardTokens: rt,
        Protocol,
        network: Protocol.Network.currency_symbol,
      };
    });
  }

  get userFarmCollection() {
    const farmsPortfolio: any[] = [];
    Object.keys(this.userFarms).forEach((protocol: any) => {
      const protocolFarms = this.userFarms[protocol];
      
      protocolFarms.forEach((farms: any) => {
        const { type, address, pid, name, liquidity_amount, liquidity_usd, apy, apr, link, log_block_number, Protocol, stakeTokens, rewardTokens, stakeAmount, rewardAmount} = farms;
        const st = stakeTokens.map(({ Token: { type, name, symbol, decimals, balance, icon_link, address, price_usd, Network, pair0, pair1 } }) => {
          return {
            chainId: Network.chain_id,
            name,
            symbol,
            decimals,
            address,
            balance,
            priceUSD: price_usd,
            // value: !isNull(balance) && !isNull(price_usd) ? toFixed(mul(balance, price_usd), 2) : null,
            iconUrl: type === TokenType.MULTI ? [pair0.icon_link, pair1.icon_link] : [icon_link],
          }
        })
        const rt = rewardTokens.map(({ Token: { type, name, symbol, decimals, balance, icon_link, address, price_usd, Network, pair0, pair1 } }) => {
          return {
            chainId: Network.chain_id,
            name,
            symbol,
            decimals,
            address,
            balance,
            priceUSD: price_usd,
            // value: !isNull(balance) && !isNull(price_usd) ? toFixed(mul(balance, price_usd), 2) : null,
            iconUrl: type === TokenType.MULTI ? [pair0.icon_link, pair1.icon_link] : [icon_link],
          }
        }) 
        farmsPortfolio.push({
          type,
          address,
          pid,
          name,
          liquidity_amount,
          liquidity_usd,
          apy,
          apr,
          link,
          log_block_number, 
          chain_id: Protocol.Network.chain_id,
          stakeTokens: st,
          rewardTokens: rt,
          stakeAmount,
          rewardAmount,
          Protocol,
          network: Protocol.Network.currency_symbol,
        })
      })
    })
    return farmsPortfolio;

  }

  *fetchTotalFarms() {
    const { data } = yield dashboardInstance(staticFarms());
    this.totalFarms = data?.data?.result;
  }

  *fetchUserFarms(account: string | null) {
    if (isNull(account)) return;
    try {
      this.fetchUserFarmLoading = true;
      const { data } = yield dashboardInstance(userFarmInfoAPI(account as string));
      this.userFarms = data?.data?.result;
      this.fetchUserFarmLoading = false;
  
    } catch (e) {
      this.fetchUserFarmError = true;
    }
  }

}

export default FarmStore;
