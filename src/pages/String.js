import React, { useState } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {Typography, Box, Button, styled, Grid, Stack} from '@mui/material';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

export default function MyEditor() {
  const[editorState, onEditorStateChange] = useState();

  console.log(editorState)

  return (
     <>
      <RootStyle title="Munchh | Strings"> </RootStyle>
          <Typography  variant="h4" gutterBottom>
                Strings Management
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
                      component={RouterLink} to="/dashboard/string/user"
                      variant="outlined"
                    >
                      User String
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      component={RouterLink} to="/dashboard/string/merchant"
                      variant="outlined"
                    >
                      Merchant String
                    </Button>
                  </Stack>
            </Grid>   
         </Grid>
     </>
  );
}



