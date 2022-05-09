import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Moment from 'react-moment';
import moment from 'moment';

export default function BasicTable({timing}) {

  console.log("TImming is", timing)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell> Days  </TableCell>
            <TableCell align="right">Open At</TableCell>
            <TableCell align="right">Close At</TableCell>
          </TableRow>
        </TableHead>
        {timing.length == 0? <TableCell align="right" colSpan={2} >  </TableCell> : <>
        <TableBody>
        {timing.map(data=> 
            <TableRow
                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                 >
                   <TableCell component="th" scope="row"> {data.day} </TableCell>
                   <TableCell align="right"> {data.start_time} </TableCell>
                   <TableCell align="right"> 
                      
                     
                      {
                       moment(data.closing_time, "HH:mm:ss").format("hh:mm A")
                      }
                      {/* <Moment format="mm:ss" >{data.closing_time}</Moment>  */}
                    
                    </TableCell> 
                 </TableRow>
           )}
        </TableBody>
        </>}
      </Table>
    </TableContainer>
  );
}
