import React, {  useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Box, Divider } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStore from 'hooks/useStore';
import FunctionRow from 'pages/ContractInteraction/Content/components/FunctionRow';
import { TransactionDTO } from 'store/transaction/type';
import TransactionListBox from 'pages/ContractInteraction/Content/components/TransactionListBox';

const MultiWrite: React.FC = observer(() => {
  const { contractStore } = useStore()
  const [functions, setFunction] = useState<any[]>([]);
  const [checked, setChecked] = useState<TransactionDTO[]>([]);
  const [left, setLeft] = useState<TransactionDTO[]>([]);
  const [right, setRight] = useState<TransactionDTO[]>([]);

  useEffect(() => {
    const writeList = contractStore.abiParser?.writeFunctions.map(
      ({ name, inputs, outputs, type}) => {
        return {
          name,
          inputs,
          outputs,
          type
        }
      })
      setFunction(writeList)
  }, [setFunction, contractStore.abi])

  const addNewTransaction = (newTransaction: TransactionDTO) => {
    setLeft([...left, newTransaction]) 
  } 
 
  return (
    <React.Fragment>
      <TransactionListBox 
        left={left}
        right={right}
        checked={checked}
        setLeft={setLeft}
        setRight={setRight}
        setChecked={setChecked}
      />
      <Box m={1} />
      <Divider/>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
            </TableRow>
          </TableHead>
          <TableBody>
          {functions.map(({ name, inputs, outputs, type}, index) => (
              <FunctionRow 
                key={index} 
                name={name} 
                inputs={inputs} 
                outputs={outputs} 
                type={type} 
                advance={true}
                addNewTransaction={addNewTransaction}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    </React.Fragment>
  );
})

export default MultiWrite
