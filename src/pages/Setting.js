import React, { useState } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {Typography, Box, Button, styled, Grid, Stack} from '@mui/material';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

export default function MyEditor() {
  
  return (
     <>
      <RootStyle title="Settings"> </RootStyle>
          <Typography  variant="h4" gutterBottom>
                Settings
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
                      component={RouterLink} to="/dashboard/settings/loyalty"
                      variant="outlined"
                    >
                      Royalty Setting
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      component={RouterLink} to="/dashboard/settings/delivery_delay"
                      variant="outlined"
                    >
                       Delivery Delay Setting
                    </Button>
                  </Stack>
            </Grid>   
         </Grid>
     </>
  );
}



