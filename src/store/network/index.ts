import { computed, observable, flow, makeObservable, autorun, action } from 'mobx';
import { dashboardInstance } from 'helpers/axios';
import { staticNetworks } from 'config/dashboardApi';
import { TokenType } from 'store/token/types';

class NetworkStore {
  totalNetworks: any[] = [];

  constructor() {
    makeObservable(this, {
      totalNetworks: observable,
      networks: computed,

      fetchTotalNetworks: flow,
    });

    this.runTasks();
  }

  /* Store's Tasks */
  runTasks() {}

  get networks() {
    if (this.totalNetworks.length === 0) return [];
    console.log(this.totalNetworks);
    return null;
    // return this.totalNetworks.map(({ apr, liquidity_usd, liquidity_amount, Protocol, stakeToken, rewardToken }) => {
    //   return {
    //     network: {
    //       name: Protocol.Network.name,
    //     },
    //     protocol: {
    //       name: Protocol.name,
    //       iconUrl: Protocol.icon_link,
    //       link: Protocol.protocol_link,
    //     },
    //     Network: {
    //       apr,
    //       liquidityAmount: liquidity_amount,
    //       liquidityUSD: liquidity_usd,
    //     },
    //     stakeToken: {
    //       name: stakeToken.name,
    //       symbol: stakeToken.symbol,
    //       decimals: stakeToken.decimals,
    //       address: stakeToken.address,
    //       priceUSD: stakeToken.price_usd,
    //       iconUrl: stakeToken.type === TokenType.MULTI ? [stakeToken.pair0.icon_link, stakeToken.pair1.icon_link] : [stakeToken.icon_link],
    //     },
    //     rewardToken: {
    //       name: rewardToken.name,
    //       symbol: rewardToken.symbol,
    //       decimals: rewardToken.decimals,
    //       address: rewardToken.address,
    //       priceUSD: rewardToken.price_usd,
    //       iconUrl:
    //         rewardToken.type === TokenType.MULTI ? [rewardToken.pair0.icon_link, rewardToken.pair1.icon_link] : [rewardToken.icon_link],
    //     },
    //   };
    // });
  }

  *fetchTotalNetworks() {
    const { data } = yield dashboardInstance(staticNetworks());
    this.totalNetworks = data?.data?.result;
  }
}

export default NetworkStore;
