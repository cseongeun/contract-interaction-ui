import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useStore from '../../../../hooks/useStore';
import { observer } from 'mobx-react';

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
  const { contractStore } = useStore();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="address" 
        label="Contract Address" 
        onChange={event => contractStore.setAddress(event.target.value)}
        error={contractStore.addressError}
      />
      <TextField 
        id="abi" 
        label="Contract Abi" 
        onChange={event => contractStore.setAbi(event.target.value)}
        error={contractStore.abiError}
      />
    </form>
  );
})

export default Setting