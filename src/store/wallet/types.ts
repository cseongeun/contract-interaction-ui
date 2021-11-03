export interface INetwork {
  name: string;
  currency_symbol: string;
  chain_id: number;
  explorer_url: string;
}

export interface IAsset {
  balance: string | null;
  type: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  price_usd: string | null;
  icon_link: string;
  Network: INetwork;
  pair0: IAsset;
  pair1: IAsset;
}

export interface ITotalAssets {
  [network: string]: {
    [id: number]: IAsset;
  };
}

export interface INetworkAssets {
  [id: number]: IAsset;
}
