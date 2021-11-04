import { useWeb3React } from '@web3-react/core';
import { useWeb3ReactManager } from '@web3-react/core/dist/manager';
import { useCallback, useMemo } from 'react';
import { encodeFunction } from '../libs/helpers/encodeDecode';
import { isEmpty } from '../libs/helpers/object';
import { isNull } from '../libs/helpers/type';
import { TransactionDTO } from '../store/transaction/type';
import useMultiCallContract from './useMultiCallContract';
import useStore from './useStore';
import useToast from './useToast';

const useMultiTransaction = (contractAddress: string, contractAbi: any) => {
  const multiCallContract = useMultiCallContract();
  const { toast } = useToast();
  const { transactionStore } = useStore();

  const handleMultiTransaction = useCallback(async (params: TransactionDTO[]) => {
    try {
      if (!isNull(multiCallContract)) {
        const transactionEncode = params.map(({ name, args }) => [
          contractAddress,
          encodeFunction(contractAbi, name, [...args]),
        ]);

        const result = await multiCallContract.aggregate(transactionEncode);
        transactionStore.addBroadcasted({
          transaction: params,
          result,
        });
        return result.toString();
      }

      toast({
        description: '다중 쓰기를 지원하지않는 플랫폼입니다.',
        type: 'info',
      });
      return null;
    } catch (e) {
      toast({
        description: '트랜잭션 요청 중 알수 없는 에러가 발생하였습니다.',
        type: 'warn',
      });
      return null;
    }
  }, []);

  return { handleMultiTransaction };
};

export default useMultiTransaction;
