export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  MATIC = 137,
  MATIC_TESTNET = 80001,
  FANTOM = 250,
  FANTOM_TESTNET = 4002,
  XDAI = 100,
  BSC = 56,
  BSC_TESTNET = 97,
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 79377087078960,
  MOONBEAM_TESTNET = 1287,
  AVALANCHE = 43114,
  AVALANCHE_TESTNET = 43113,
  HECO = 128,
  HECO_TESTNET = 256,
  HARMONY = 1666600000,
  HARMONY_TESTNET = 1666700000,
  OKEX = 66,
  OKEX_TESTNET = 65,
  CELO = 42220,
  PALM = 11297108109,
  PALM_TESTNET = 11297108099,
  MOONRIVER = 1285,
  FUSE = 122,
}

export const RPC = {
  [ChainId.MAINNET]:
    'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  [ChainId.ROPSTEN]:
    'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
  [ChainId.RINKEBY]:
    'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
  [ChainId.GÖRLI]:
    'https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im',
  [ChainId.KOVAN]:
    'https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER',
  [ChainId.FANTOM]: 'https://rpcapi.fantom.network',
  [ChainId.FANTOM_TESTNET]: 'https://rpc.testnet.fantom.network',
  [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  // [ChainId.MATIC]:
  //     'https://apis.ankr.com/e22bfa5f5a124b9aa1f911b742f6adfe/c06bb163c3c2a10a4028959f4d82836d/polygon/full/main',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today',
  [ChainId.XDAI]: 'https://rpc.xdaichain.com',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
  [ChainId.MOONBEAM_TESTNET]: 'https://rpc.testnet.moonbeam.network',
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.AVALANCHE_TESTNET]: 'https://api.avax-test.network/ext/bc/C/rpc',
  [ChainId.HECO]: 'https://http-mainnet.hecochain.com',
  [ChainId.HECO_TESTNET]: 'https://http-testnet.hecochain.com',
  [ChainId.HARMONY]: 'https://api.harmony.one',
  [ChainId.HARMONY_TESTNET]: 'https://api.s0.b.hmny.io',
  [ChainId.OKEX]: 'https://exchainrpc.okex.org',
  [ChainId.OKEX_TESTNET]: 'https://exchaintestrpc.okex.org',
  [ChainId.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.PALM]:
    'https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267',
};

export const MULTI_CALL_ADDRESS = {
  [ChainId.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [ChainId.ROPSTEN]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [ChainId.RINKEBY]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [ChainId.GÖRLI]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [ChainId.KOVAN]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [ChainId.FANTOM]: null,
  [ChainId.FANTOM_TESTNET]: null,
  [ChainId.MATIC]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [ChainId.MATIC_TESTNET]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
  [ChainId.XDAI]: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  [ChainId.BSC]: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
  [ChainId.BSC_TESTNET]: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
  [ChainId.MOONBEAM_TESTNET]: null,
  [ChainId.AVALANCHE]: null,
  [ChainId.AVALANCHE_TESTNET]: null,
  [ChainId.HECO]: null,
  [ChainId.HECO_TESTNET]: null,
  [ChainId.HARMONY]: null,
  [ChainId.HARMONY_TESTNET]: null,
  [ChainId.OKEX]: null,
  [ChainId.OKEX_TESTNET]: null,
  [ChainId.ARBITRUM]: null,
  [ChainId.PALM]: null,
};

export const MULTI_CALL_ABI = [
  {
    constant: false,
    inputs: [
      {
        components: [
          { name: 'target', type: 'address' },
          { name: 'callData', type: 'bytes' },
        ],
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', type: 'uint256' },
      { name: 'returnData', type: 'bytes[]' },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
