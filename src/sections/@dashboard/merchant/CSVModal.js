import  React, {useEffect, useState} from 'react';
import { CSVLink } from 'react-csv';
import moment from 'moment'
import {
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText , 
    DialogTitle,
    TextField,
    Box,
    Typography,
    IconButton

} from '@mui/material';
import {CSVList} from '../../../redux/merchant/other/csvapi';
import CloseIcon from '@mui/icons-material/Close';




export default function AlertDialog({open, handleClickOpen, handleClose, status}) {
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [csvDATA, setCSVData] = useState([])

    const FetchCSVData = (status, startDate, endDate)=>{
        CSVList(status, startDate, endDate)
            .then(res =>{
                const response = res.data.data.merchants;
                setCSVData(response)
            })
    }


    useEffect(()=>{
        FetchCSVData(status, startDate, endDate)
    }, [status, startDate, endDate])


    let csvFilteredDATA = [];
    csvDATA?.forEach(data => {
    let obj = {
        id : data?.id,
        merchantName : data?.personal_name,
        IC_NUMBER : data?.ic_number,
        email : data?.email,
        phone : data?.phone,
        walletBalance : data?.wallet.balance,
        ratting : data?.restaurants?.average_rating? data?.restaurants?.average_rating : 0,
        status : data?.status? "Active" : "Inactive",
        date : moment(data?.created_at).format("DD-MM-YYYY hh:mm a")
    }
    csvFilteredDATA.push(obj)
    })


    const headers = [
        { label: "ID", key: "id" },
        { label: "MERCHANT NAME", key: "merchantName" },
        { label: "IC NUMBER", key: "IC_NUMBER" },
        { label: "EMAIL", key: "email" },
        { label: "PHONE NUMBER", key: "phone" },
        { label: "WALLET BALANCE", key: "walletBalance"},
        { label: "RATTING", key: "ratting"},
        { label: "ACCOUNT Status", key : "status"},
        { label: "CREATED AT", key: "date" },
    ];


    console.log(csvDATA)

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          Download CSV File
        </DialogTitle> */}
        <DialogActions>
            <IconButton 
                variant='outlined' 
                color='error'
                onClick={handleClose}    
            >
                <CloseIcon/>
            </IconButton>
        </DialogActions>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
                marginTop={1}
                marginBottom = {2}
            > 
                <TextField 
                    type = "date"
                    label = "Start Date"
                    InputLabelProps={{
                        shrink : true
                    }}
                    onChange = {(e)=>setStartDate(e.target.value)}
                    value = {startDate}
                    sx ={{
                        marginRight : "10px"
                    }}
                />
                <TextField 
                    type = "date"
                    label = "End Date"
                    InputLabelProps={{
                        shrink : true
                    }}
                    onChange = {(e)=>setEndDate(e.target.value)}
                    value = {endDate}
                    disabled = {startDate?false : true}
                />
            </Box>
            <Button 
                fullWidth
                variant='contained'
                disabled = {csvDATA?.length?false : true}
            > 
                <CSVLink
                    style = {{color : "white", textDecoration : "none"}}
                    headers={headers}
                    filename="merchnatList.csv"
                    data={csvFilteredDATA}
                  >
                    Download CSV
                </CSVLink>
            
             </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
