import { useCallback, useMemo } from "react";
import { isNull } from "../libs/helpers/type";
import useContract from "./useContract";
import useToast from './useToast';

export enum TransactionType {
  READ= 'read',
  WRITE= 'write'
}

const useTransaction = (contractAddress: string, contractAbi: any, type: string = TransactionType.READ) => {
  const contract = useContract(contractAddress, contractAbi, type === TransactionType.READ ? false : true );
  const { toast } = useToast();

  const handleTransaction = useCallback(async (targetFunction: string, args?: any) => {
    try {
      if (!isNull(contract)) {
        const result = await contract?.[targetFunction](...args)
        return result.toString()
      } 
      toast({
        description: `failed to query transaction, is valid contract info or wallet connect?`,
        type: 'error'
      });
      return null;
    } catch (e) {
      console.log(e)
      toast({
        description: 'failed to query transaction, is valid network or argument?',
        type: 'error'
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
