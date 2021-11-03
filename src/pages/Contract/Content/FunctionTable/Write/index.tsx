import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { observer } from 'mobx-react';
import useStore from '../../../../../hooks/useStore';
import { Button, TextField } from '@material-ui/core';
import { isNull } from '../../../../../libs/helpers/type';
import useTransaction, { TransactionType } from '../../../../../hooks/useTransaction';
import ConfirmModal from '../ConfirmModal';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


interface InputBoxProps {
  name: string,
  inputs: any,
  outputs: any,
}

interface RowProps {
  row: any
}


const InputBox: React.FC<InputBoxProps> = ({ name, inputs, outputs }) => {
  const [error, setError] = useState<boolean>(false)
  const [inputData, setInputData] = useState<any[]>([])
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const { contractStore } = useStore()
  const { handleTransaction } = useTransaction(contractStore.address, contractStore.abi, TransactionType.WRITE)

  const handleConfirmModalOpen = useCallback(() => {
    setConfirmModalOpen(true)
  }, [setConfirmModalOpen])

  const handleConfirmModalClose = useCallback(() => {
    setConfirmModalOpen(false)
  }, [setConfirmModalOpen])

  const handleInputData = useCallback((index: number, value: any) => {
    inputData[index] = value
    setInputData(inputData)
  }, [setInputData])


  const write = useCallback(async () => {
    if (inputs.length !== inputData.length) {
      setError(true)
    }

    const result = await handleTransaction(name, inputData)

    if (isNull(result)) {
      setError(true)
    } else {
      setError(false)
    }
  }, [setError, handleTransaction])

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
          onChange={(event) => handleInputData(index, event.target.value)}
          variant="filled"
          error={error}
          key={index}
        />
     ))}
      <Button 
        disabled={false} 
        variant="contained" 
        color="primary"
        onClick={() => handleConfirmModalOpen()}
      >
        Confirm & Write
      </Button>
      <ConfirmModal 
        open={confirmModalOpen} 
        handleClose={handleConfirmModalClose}
        afterConfirm={write}
        transactionArguments={[{ name, inputs, inputData }]}
      />
    </React.Fragment>
  )
}

const Row: React.FC<RowProps> = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align='left'>
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {
              <InputBox
                name={row.name}
                inputs={row.inputs}
                outputs={row.outputs}
              />
            }
           
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const WriteTable: React.FC = observer(() => {
  const { contractStore } = useStore()
  const [functions, setFunction] = useState<any[]>([]);

  useEffect(() => {

    const writeList = contractStore.abiParser?.writeFunctions.map(
      ({ name, inputs, outputs}) => {
        return {
          name,
          inputs,
          outputs
        }
      })
      
      setFunction(writeList)

  }, [setFunction, contractStore.abi])


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align='left'>Function Name</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
          {functions.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
})

export default WriteTable
