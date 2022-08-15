import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {Typography, Box, Button, styled, Grid, Stack} from '@mui/material';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

export default function Contact() {

  return (
     <>
      <RootStyle title="Munchh | Contact"> </RootStyle>
          <Typography  variant="h4" gutterBottom>
                Contact Us Management
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
                      component={RouterLink} to="/dashboard/contact/user"
                      variant="outlined"
                    >
                      User Contact
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      component={RouterLink} to="/dashboard/contact/merchant"
                      variant="outlined"
                    >
                      Merchant Contact
                    </Button>
                  </Stack>
            </Grid>   
         </Grid>
     </>
  );
}



