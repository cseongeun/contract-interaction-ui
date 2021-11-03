export const setupNetwork = async (chainId: any) => {
  return null;
  // const provider = window.ethereum;
  // if (provider) {
  //   const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
  //   try {
  //     await provider.request({
  //       method: 'wallet_addEthereumChain',
  //       params: [
  //         {
  //           chainId: `0x${chainId.toString(16)}`,
  //           chainName: 'Binance Smart Chain Mainnet',
  //           nativeCurrency: {
  //             name: 'BNB',
  //             symbol: 'bnb',
  //             decimals: 18,
  //           },
  //           rpcUrls: nodes,
  //           blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
  //         },
  //       ],
  //     });
  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // } else {
  //   console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
  //   return false;
  // }
};

// /**
//  * Prompt the user to add a custom token to metamask
//  * @param tokenAddress
//  * @param tokenSymbol
//  * @param tokenDecimals
//  * @param tokenImage
//  * @returns {boolean} true if the token has been added, false otherwise
//  */
// export const registerToken = async (
//   tokenAddress: string,
//   tokenSymbol: string,
//   tokenDecimals: number,
//   tokenImage: string,
// ) => {
//   const tokenAdded = await window.ethereum.request({
//     method: 'wallet_watchAsset',
//     params: {
//       type: 'ERC20',
//       options: {
//         address: tokenAddress,
//         symbol: tokenSymbol,
//         decimals: tokenDecimals,
//         image: tokenImage,
//       },
//     },
//   });

//   return tokenAdded;
// };
