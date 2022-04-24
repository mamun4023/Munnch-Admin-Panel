import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function Update() {
  const navigate = useNavigate();
  
  const LoginSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    amount: Yup.string().required('Amount is required'),
    sendTo: Yup.string().required('Send-To is required'),

  });

  const formik = useFormik({
    initialValues: {
      type: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values)
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



  return(
        <>
        <Typography variant="h4" gutterBottom>
            Update Loyalty
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
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack style={{ width : "450px" }} spacing={3}>
                        <TextField
                            fullWidth
                            type="text"
                            label="type"
                            {...getFieldProps('type')}
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                        />

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Save
                        </LoadingButton>
                        </Stack>
                    </Form>      
                </FormikProvider>
            </Grid>   
         </Grid>
    </> 
  );
}
