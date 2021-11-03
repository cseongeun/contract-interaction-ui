export interface Protocol {}

export interface IFarm {
  network: {
    name: string;
  };
  protocol: {
    name: string;
    iconUrl: string;
    link: string;
  };
  farm: {
    apr: string;
    liquidityAmount: string;
    liquidityUSD: string;
  };
  stakeToken: {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    priceUSD: string;
    iconUrl: string;
  };
  rewardToken: {
    name: string;
    symbol: string;
    decimals: string;
    address: string;
    priceUSD: string;
    iconUrl: string;
  };
}
