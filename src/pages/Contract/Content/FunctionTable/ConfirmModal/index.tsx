import React, { useCallback, useEffect, useState } from 'react';
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
  afterConfirm: () => void
  transactionArguments: any[]
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleClose, afterConfirm, transactionArguments }) => {
  const classes: any = useStyles();

  const [safeProcess, setSafeProcess] = useState<boolean>(false);
  const [labelWithChecked, setLabelWithChecked] = useState<any>([])

  useEffect(() => {
    const transactionData = []
    if (transactionArguments.length > 0) {
      transactionArguments.map(({ name, inputData }, index) => {
        let label = name 
        if (inputData.length > 0) {
          label += `(${inputData.join(',')})`
        } else {
          label += '()'
        }

        transactionData[index] = { label, checked: false }
      })
      setLabelWithChecked(transactionData)
    }
  }, [transactionArguments, setLabelWithChecked])

  useEffect(() => {
    const hasUnChecked = (labelWithChecked.filter(({ checked }) => !checked)).length > 0
    if (hasUnChecked) {
      setSafeProcess(false)
    } else {
      setSafeProcess(true)
    }
  }, [setSafeProcess, labelWithChecked])


  const handleState = useCallback((index: number, checked: boolean) => {
    const newValues = [...labelWithChecked]
    const value = labelWithChecked[index]

    newValues[index] = { ...value, checked }

    setLabelWithChecked(newValues)
  }, [setLabelWithChecked, labelWithChecked])

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
            <Divider margin-bottom={0}/>
            <FormControl required error={!safeProcess} component="fieldset" className={classes.formControl}>
              <FormGroup>
              {
                labelWithChecked.map((value, index) => (
                  <FormControlLabel
                   control={<Checkbox checked={value.state} onChange={event => handleState(index, event.target.checked)} name={value.label}  />}
                   label={value.label}
                   key={index}
                  /> 
                ))
              }
              </FormGroup>
              {
                safeProcess 
                  ? <Box m={1}>
                      <Button 
                        disabled={false}
                        variant="contained"
                        color="primary"
                        onClick={() => afterConfirm()}
                      > Process </Button>
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