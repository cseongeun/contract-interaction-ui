export const staticNetworks = () => '/static/networks';
export const staticProtocols = () => '/static/protocols';
export const staticFarms = () => '/static/farms';
export const staticLendings = () => '/static/lendings';
export const staticTokens = () => '/static/tokens';
export const staticNFTokens = () => '/static/nfTokens';

export const userTokenBalanceAPI = (walletAddress: string) => `/wallet/token/${walletAddress}`;
export const userNFTokenInfoAPI = (walletAddress: string) => `/wallet/nfToken/${walletAddress}`;
export const userFarmInfoAPI = (walletAddress: string) => `/wallet/farm/${walletAddress}`;
export const userLendingInfoAPI = (walletAddress: string) => `/wallet/lending/${walletAddress}`;
