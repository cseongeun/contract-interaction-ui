import { useWeb3React } from "@web3-react/core";
import { useWeb3ReactManager } from "@web3-react/core/dist/manager";
import { useCallback, useMemo } from "react";
import { isNull } from "../libs/helpers/type";
import { TransactionDTO } from "../store/transaction/type";
import useContract from "./useContract";
import useStore from "./useStore";
import useToast from './useToast';

export enum TransactionType {
  READ= 'read',
  WRITE= 'write'
}

const useTransaction = (contractAddress: string, contractAbi: any, type: string = TransactionType.READ) => {
  const contract = useContract(contractAddress, contractAbi, type === TransactionType.READ ? false : true );
  const { toast } = useToast();
  const { transactionStore} = useStore()

  const handleTransaction = useCallback(async (params: TransactionDTO) => {    
    try {
      const { name, args } = params

      if (!isNull(contract)) {
        const result = await contract?.[name](...args)
        transactionStore.addBroadcasted({ transaction: [params], result: result.toString() })
        return result.toString()
      } 

      toast({ 
        description: '트랜잭션을 요청할 수 없는 상태입니다. (지갑 연결, 컨트랙트 정보 확인 필요합니다)',
        type: 'info'
      })
      
  
      return null;
    } catch (e) {
      console.log(e)
      toast({
        description: '트랜잭션 요청 중 알수 없는 에러가 발생하였습니다. 올바른 함수 인자 전달 부탁드립니다.',
        type: 'warn',
      });
      return null;
    }
  }, [
    contractAddress,
    contractAbi,
  ]);

  return { handleTransaction }
};

export default useTransaction;
