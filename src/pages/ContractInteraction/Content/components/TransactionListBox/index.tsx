import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { TransactionDTO } from 'store/transaction/type';
import ConfirmModal from '../ConfirmModal';
import { isNull } from 'libs/helpers/type';
import useToast from 'hooks/useToast';
import useStore from 'hooks/useStore';
import useMultiTransaction from 'hooks/useMultiTransacton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
    },
    card: {
      width: 500,
      maxWidth: 500,
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
    },
    list: {
      width: 200,
      height: 230,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }),
);

function not(a: TransactionDTO[], b: TransactionDTO[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: TransactionDTO[], b: TransactionDTO[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: TransactionDTO[], b: TransactionDTO[]) {
  return [...a, ...not(b, a)];
}

interface TransactionListBoxProps {
  left: TransactionDTO[]
  right: TransactionDTO[]
  checked: TransactionDTO[]
  setLeft: (params: any) => void
  setRight: (params: any) => void
  setChecked: (params: any) => void 
} 

const TransactionListBox: React.FC<TransactionListBoxProps> = ({ left, right, checked, setLeft, setRight, setChecked }) => {
  const classes = useStyles();
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const { toast }= useToast()

  const { contractStore } = useStore();
  const { handleMultiTransaction } = useMultiTransaction(contractStore.address, contractStore.abi) 

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const numberOfChecked = (items: TransactionDTO[]) => intersection(checked, items).length;

  const handleToggle = (value: TransactionDTO) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const availableProcess = () => {
    if (!isNull(rightChecked) && rightChecked.length > 0) {
      return true
    } else {
      toast({ description: '우측 카드(Registered)의 체크된 트랜잭션이 1개 이상 존재해야합니다.', type: 'info' })
      return false
    }
  }

  const openConfirmModal = () => {
    setConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  }

  const handleToggleAll = (items: TransactionDTO[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };


  const execute = async () => {
    const result = await handleMultiTransaction(rightChecked)
  }


  const customList = (title: string, items: TransactionDTO[]) => (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {
          items.map((item: any, index: number) => {
            return (
              <ListItem key={index} role="listitem" button onClick={handleToggle(item)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(item) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': item.label }}
                  />
                </ListItemIcon>
                <ListItemText id={item.label} primary={item.label} />
              </ListItem>
            );
          })
        }
      </List>
    </Card>
  );

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{customList('Not Registered', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>

        <Grid item>{customList('Registered', right)}</Grid>

      </Grid>
      <div style={{ display:'flex', justifyContent:'center'}}>
        <Button 
          disabled={false} 
          variant="contained" 
          color="primary"
          onClick={() => {
             const condition = availableProcess();
             if (condition) {
               openConfirmModal()
             } else {
               closeConfirmModal()
             }
           }}
        >
          Confirm
        </Button>      
      </div>
      <ConfirmModal 
         open={confirmModalOpen} 
         handleClose={closeConfirmModal}
         transactions={rightChecked}
         execute={execute}
      /> 

    </React.Fragment>
  );
}

export default TransactionListBox