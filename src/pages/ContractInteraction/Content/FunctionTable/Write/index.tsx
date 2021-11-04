import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import useStore from 'hooks/useStore';
import FunctionRow from '../../components/FunctionRow';

const Write: React.FC = observer(() => {
  const { contractStore } = useStore()
  const [functions, setFunction] = useState<any[]>([]);

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

  return (
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
              advance={false}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
})

export default Write
