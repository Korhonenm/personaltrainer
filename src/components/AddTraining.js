import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'


export default function AddTraining(props){
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: '', date: '', duration: '', customer: props.customerId
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose =() => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }
 
    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    const [selectDate, handleDateChange] = React.useState( new Date());
    
    const changeDate = (date) => {
        handleDateChange(date);
        const formatDate = date.toISOString();
        setTraining({...training, date: formatDate});
    }

   return(
       <div>
        <Button color="primary" onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add training </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                   
                     <TextField
                        margin="dense"
                        name="date"
                        value={selectDate}
                        onChange={date => changeDate(date)}
                        label="Date"
                        fullWidth
                        variant="standard"
                    />
                   
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="duration"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
</div>
    );
}