import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, Divider, Button, Fade, Backdrop, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface ConfirmModalProps {
  open: boolean,
  handleClose: () => void
  transactions: any
  execute: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleClose, transactions, execute }) => {
  const classes: any = useStyles();

  const [allConfirmed, setAllConfirmed] = useState<boolean>(false);
  const [transactionWithChecked, setTransactionWithChecked] = useState<any>([])

  useEffect(() => {
    const data = []
    if (transactions.length > 0) {
      transactions.map(({ label }, index) => {

        data[index] = { label, checked: false }
      })
      setTransactionWithChecked(data)
    }
  }, [transactions, setTransactionWithChecked])

  useEffect(() => {
    const hasUnChecked = (transactionWithChecked.filter(({ checked }) => !checked)).length > 0
    if (hasUnChecked) {
      setAllConfirmed(false)
    } else {
      setAllConfirmed(true)
    }
  }, [setAllConfirmed, transactionWithChecked])


  const handleCheck = (index: number, checked: boolean) => {
    const newValues = [...transactionWithChecked]
    const value = transactionWithChecked[index]

    newValues[index] = { ...value, checked }

    setTransactionWithChecked(newValues)
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transaction Confirm Receipts</h2>
            <Divider margin-bottom={0} />
            <FormControl required error={!allConfirmed} component="fieldset" className={classes.formControl}>
              <FormGroup>
                {
                  transactionWithChecked.map((value, index) => (
                    <FormControlLabel
                      control={<Checkbox checked={value.state} onChange={event => handleCheck(index, event.target.checked)} name={value.label} />}
                      label={value.label}
                      key={index}
                    />
                  ))
                }
              </FormGroup>
              {
                allConfirmed
                  ? <Box m={1}>
                    <Button
                      disabled={false}
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        await execute()
                        await handleClose()
                      }}
                    > Write </Button>
                  </Box>
                  : <FormHelperText>Should be all transaction checked</FormHelperText>
              }

            </FormControl>
          </div>

        </Fade>
      </Modal>
    </React.Fragment>
  );
}

export default ConfirmModal