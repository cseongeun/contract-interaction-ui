import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TransactionDTO } from 'store/transaction/type';
import { isNull } from 'lodash';
import useStore from 'hooks/useStore';
import useTransaction, { TransactionType } from 'hooks/useTransaction';
import { removeFalsey } from 'libs/helpers/array';

interface ReadBoxProps {
  name: string,
  inputs: any,
  outputs: any,
  type: string
}

const ReadBox: React.FC<ReadBoxProps> = ({ name, inputs, outputs, type }) => {
  const [error, setError] = useState<boolean>(false)
  const [args, setArgs] = useState<any[]>([])
  const [result, setResult] = useState<any>(null)
  const [transaction, setTransaction] = useState<TransactionDTO | null>(null)

  const { contractStore } = useStore();
  const { handleTransaction } = useTransaction(contractStore.address, contractStore.abi, TransactionType.READ)

  const inputArg = (index: number, value: any) => {
    const checkEmpty = value || ''

    if (checkEmpty == '') {
      delete args[index]
    } else {
      args[index] = value  
    }
    setArgs(args)
  }

  const availableProcess = () => {
    if (removeFalsey(args).length !== inputs.length) {
      setError(true)
      setTransaction(null)
      return false
    } else {
      setError(false)
      setTransaction(new TransactionDTO({ name, inputs, outputs, type, args }))
      return true
    }
  }

  const execute = async () => {
    if (isNull(transaction)) {
      setError(true)
      return
    } 

    setError(false);
    const result = await handleTransaction(transaction)
    setResult(result);
  }
 

  return (
    <React.Fragment>
      {inputs.map((args, index) => (
        <TextField
          id="filled-full-width"
          label={args.type} 
          style={{ margin: 8 }}
          placeholder={args.name}
          helperText={args.name}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => inputArg(index, event.target.value)}
          variant="filled"
          error={error}
          key={index}
        />
     ))}
      <Button 
        style={{ left: 10 }}
        disabled={false} 
        variant="contained" 
        color="primary"
        onClick={() => {
          const condition = availableProcess()
          if (condition) {
            execute()
          }
        }}
      >
        Read
      </Button>
      {
        result
        ? <Button 
            style={{ left: 30 }}
            disabled={true} 
          >
          {result}
          </Button>
        : ''
      }
    </React.Fragment>
  )
}


export default ReadBox