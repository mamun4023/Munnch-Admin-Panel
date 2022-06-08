import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {Stack, Typography} from '@mui/material';

// import create content
import CreateComponent from '../sections/@dashboard/signup/create';


export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <Stack 
          sx = {{
             display : 'flex',
             flexDirection : 'row-reverse',
             justifyContent: 'space-between',
             padding : 1
          }}
          style = {{ backgroundColor : "#eee" }}
        >
          <IconButton
            color='error'
            disableTouchRipple
            onClick = {handleClose}
          > 
            <CloseIcon />
          </IconButton>

          <Typography 
            sx={{
              padding : 1
            }}
            variant="h4"
            component ="h4"
          >
            Hello 
          </Typography>
        </Stack>

        <CreateComponent/>

        <DialogActions>
          <Button autoFocus  onClick={handleClose}>
            Save
          </Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
       
      </Dialog>
    </div>
  );
}
