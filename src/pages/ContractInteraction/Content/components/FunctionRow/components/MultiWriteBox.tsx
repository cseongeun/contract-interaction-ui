import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TransactionDTO } from 'store/transaction/type';
import { removeFalsey } from 'libs/helpers/array';

interface AdvanceWriteBoxProps {
  name: string,
  inputs: any,
  outputs: any,
  type: string,
  addNewTransaction: (transaction: TransactionDTO) => void
}

const MultiWriteBox: React.FC<AdvanceWriteBoxProps> = ({ name, inputs, outputs, type, addNewTransaction }) => {
  const [error, setError] = useState<boolean>(false)
  const [args, setArgs] = useState<any[]>([])
  const [transaction, setTransaction] = useState<TransactionDTO>(null)
   
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
    } else {
      setError(false)
      addNewTransaction(new TransactionDTO({ name, inputs, outputs, type, args }))
    }
  }

  const execute = () => {
    addNewTransaction(transaction)
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
        Add
      </Button>
    </React.Fragment>
  )
}


export default MultiWriteBox