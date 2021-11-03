import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles,Theme, createStyles } from '@material-ui/core/styles';
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
import { Box, Button, Divider, TextField } from '@material-ui/core';
import { isNull, isNullBytes } from '../../../../../libs/helpers/type';
import useTransaction, { TransactionType } from '../../../../../hooks/useTransaction';
import ConfirmModal from '../ConfirmModal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TransferListBox from '../TransferListBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);




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
  
  const { contractStore } = useStore()
  const { handleTransaction } = useTransaction(contractStore.address, contractStore.abi, TransactionType.WRITE)

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
      {inputs?.map((args, index) => (
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
        // onClick={() => handleConfirmModalOpen()}
      >
        Add
      </Button>
   
    </React.Fragment>
  )
}


const AdvanceWriteTable: React.FC = observer(() => {
  const classes = useStyles();
  const { contractStore } = useStore()
  const [functions, setFunction] = useState<any[]>([]);
  const [targetFunction, setTargetFunction] = useState<any>(null);
  const [open, setOpen] = useState(false);

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

  const handleTargetFunction = useCallback((value: unknown) => {
    const thisFunction = functions.filter(({ name }) => name == value)
  
    console.log(thisFunction)
    if (thisFunction.length == 0) {
      console.log('heeeee')
      setTargetFunction(null)
    }

    setTargetFunction(thisFunction[0]);
  }, [setTargetFunction, functions]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Functions</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={targetFunction?.name}
          onChange={event => handleTargetFunction(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            functions.map((row, index) => (
              <MenuItem value={row.name} key={index}>{row.name}</MenuItem>
            ))
          }
        </Select>
        <Divider />
        {
          !isNull(targetFunction)
            ? <Box m={1} > 
                <InputBox
                  name={targetFunction?.name}
                  inputs={targetFunction?.inputs}
                  outputs={targetFunction?.outputs}
                />
              </Box>
            : ''
        }
      </FormControl>

      <Box m={3}>

        <TransferListBox />
      </Box>
  </div>
  );
})

export default AdvanceWriteTable
