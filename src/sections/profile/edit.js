import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Grid, TextField, Stack} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import {useSelector, useDispatch} from 'react-redux';
import {FetchProfile} from '../../redux/auth/profile/getProfile/action';
import {UpdateProfileData} from '../../redux/auth/profile/updateProfile/action';

// ----------------------------------------------------------------------

export default function Edit() {
  const dispatch = useDispatch();
  const loading  = useSelector(state => state.Profile.loading);

  useEffect(()=>{
    dispatch(FetchProfile())
  }, [dispatch])

  const profileData = useSelector(state => state.Profile)

  console.log("profileData", profileData)
  
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.number().required('phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(UpdateProfileData(values))
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
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
                            label="Name"
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                        />

                        <TextField
                            fullWidth
                            type="text"
                            label="email"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="phone"
                            {...getFieldProps('phone')}
                            error={Boolean(touched.phone && errors.phone)}
                            helperText={touched.phone && errors.phone}
                        />
                        

                        
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={loading}
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
