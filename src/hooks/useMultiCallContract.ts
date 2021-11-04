import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { MULTI_CALL_ABI, MULTI_CALL_ADDRESS } from '../connectors/constants';
import { getContract } from '../functions/contract';
import { isNull } from '../libs/helpers/type';
import useToast from './useToast';

const useMultiCallContract = (withSignerIfPossible = true) => {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!library || !chainId) return null;
    try {
      const multiCallAddress = MULTI_CALL_ADDRESS[chainId];

      if (isNull(multiCallAddress)) {
        return null;
      }

      return getContract(
        multiCallAddress,
        MULTI_CALL_ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      return null;
    }
  }, [chainId, library, withSignerIfPossible, account]);
};

export default useMultiCallContract;
