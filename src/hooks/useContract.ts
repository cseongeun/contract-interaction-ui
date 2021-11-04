import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { getContract } from '../functions/contract';

const useContract = (contractAddress: string, contractAbi: any, withSignerIfPossible = true) => {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!contractAddress || !contractAbi || !library) return null;
    console.log(account);

    try {
      return getContract(contractAddress, contractAbi, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      return null;
    }
  }, [contractAddress, contractAbi, library, withSignerIfPossible, account]);
};

export default useContract;
