import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';

export default function BasicTable({timing}) {

  // sorting days
  const map = {
    'Sunday': 1,'Monday': 2,'Tuesday': 3,'Wednesday': 4,'Thursday': 5,'Friday': 6,
    'Saturday': 7
  };
  timing.sort((a, b) => {
    return map[a.day] - map[b.day];
  });

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
                   <TableCell align="right"> 
                      {
                        moment(data.start_time, "HH:mm:ss").format("hh:mm A")
                      }
                   </TableCell>
                   <TableCell align="right"> 
                      {
                        moment(data.closing_time, "HH:mm:ss").format("hh:mm A")
                      }
                    </TableCell> 
                 </TableRow>
           )}
        </TableBody>
        </>}
      </Table>
    </TableContainer>
  );
}
