import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {Typography, Button, styled, Grid, Stack} from '@mui/material';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

export default function Transaction() {

  return (
     <>
      <RootStyle title="Munchh | Transaction"> </RootStyle>
          <Typography  variant="h4" gutterBottom>
              Transaction Management
          </Typography>
          <Grid
            container
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
                      component={RouterLink} to="/dashboard/transaction_history/user"
                      variant="outlined"
                    >
                      User Transaction History
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      component={RouterLink} to="/dashboard/transaction_history/merchant"
                      variant="outlined"
                    >
                      Merchant Transaction History
                    </Button>
                  </Stack>
            </Grid>   
         </Grid>
     </>
  );
}



