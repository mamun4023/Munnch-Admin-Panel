import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {Typography, Box, Button, styled, Grid, Stack} from '@mui/material';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

export default function Withdraw() {

  return (
     <>
      <RootStyle title="Munchh | Withdrawal"> </RootStyle>
          <Typography  variant="h4" gutterBottom>
                Withdrawal Management
          </Typography>
        <Grid
            container
            // item xs={8} 
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh' }}
        >
            <Grid item xs={6} >
                  <Stack style={{ width : "450px" }} spacing={3}>
                    <Button
                      fullWidth
                      size="large"
                      component={RouterLink} to="/dashboard/withdrawal/user"
                      variant="outlined"
                    >
                      User Withdrawal
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      component={RouterLink} to="/dashboard/withdrawal/merchant"
                      variant="outlined"
                    >
                      Merchant Withdrawal
                    </Button>
                  </Stack>
            </Grid>   
         </Grid>
     </>
  );
}



