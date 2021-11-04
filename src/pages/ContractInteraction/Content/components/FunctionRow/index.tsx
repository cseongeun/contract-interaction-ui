import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {  makeStyles } from '@material-ui/core/styles';
import ReadBox from './components/ReadBox'
import WriteBox from './components/WriteBox';
import AdvanceWriteBox from './components/MultiWriteBox';
import { TransactionDTO } from 'store/transaction/type';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

interface FunctionRowProps {
  name: string;
  inputs: any;
  outputs: any;
  type: string;
  advance: boolean;
  addNewTransaction?: (transaction: TransactionDTO) => void 
}

const FunctionRow: React.FC<FunctionRowProps> = ({ name, inputs, outputs, type, advance, addNewTransaction }) => {
  const [open, setOpen] = useState(false);
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
          {name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 10, paddingTop:0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit >
            {
              type === 'view'
                ? <ReadBox
                    name={name}
                    inputs={inputs}
                    outputs={outputs}
                    type={type}
                  />
                : !advance
                ? <WriteBox
                    name={name}
                    inputs={inputs}
                    outputs={outputs}
                    type={type}
                  />
                : <AdvanceWriteBox
                    name={name}
                    inputs={inputs}
                    outputs={outputs}
                    addNewTransaction={addNewTransaction}
                    type={type}
                  />
            }
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default FunctionRow


