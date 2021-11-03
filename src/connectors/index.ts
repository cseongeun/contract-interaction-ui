import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { RPC } from 'connectors/constants';

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
  supportedChainIds: Object.keys(RPC).map(k => parseInt(k)),
});

export const walletconnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export const connectors: { [key: string]: any } = [
  {
    title: 'Metamask',
    icon: require('assets/images/wallets/metamask.svg'),
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    icon: require('assets/images/wallets/wallet-connect.svg'),
    connectorId: ConnectorNames.WalletConnect,
  },
];

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
