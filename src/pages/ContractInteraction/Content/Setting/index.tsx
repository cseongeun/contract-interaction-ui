import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useStore from 'hooks/useStore';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { isNull } from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const Setting: React.FC = observer(() =>  {
  const classes = useStyles();
  const { account } = useWeb3React()

  const { contractStore } = useStore();
  const [address, setAddress] = useState<string>(null);
  const [abi, setAbi] = useState<string>(null)
  const [freeze, setFreeze] = useState<boolean>(false);


  useEffect(() => {
    if (!isNull(address) && !isNull(abi)) {
      contractStore.setAddress(address)
      contractStore.setAbi(abi)   
    } 
  }, [account])
  
  const inputAddress = (value: string) => {
    setAddress(value)
  }

  const inputAbi = (value: string) => {
    setAbi(value)
  }

  const handleAdd = () => {
    if (freeze) {
      setFreeze(false)
    } else {
      contractStore.setAddress(address)
      contractStore.setAbi(abi)
  
      if (!contractStore.addressError && !contractStore.abiError) {
        setFreeze(true)
      }
    }
  }
  
  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="address" 
          label="Input Contract Address" 
          onChange={event => inputAddress(event.target.value)}
          error={contractStore.addressError}
          disabled={freeze}
        />
        <TextField 
          id="abi" 
          label="Input Contract Abi" 
          onChange={event => inputAbi(event.target.value)}
          error={contractStore.abiError}
          disabled={freeze}
        />
      </form>
      <Button 
        disabled={false} 
        variant="contained" 
        color="primary"
        onClick={handleAdd}
      >
        { freeze ? 'Edit' : 'Add' }
      </Button>
    </React.Fragment>

  );
})

export default Setting