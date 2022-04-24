
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Grid,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {useSelector, useDispatch} from 'react-redux'
import {ChangePassword} from '../../redux/auth/profile/changePassword/actions';
// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

export default function ChangeAdminPassword() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ChangePassword.loading);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const data = {
        old_password: values.currentPassword,
        password : values.newPassword,
        password_confirmation : values.confirmPassword
      }
      dispatch(ChangePassword(data))
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword((show) => !show);
  };

  const handleShowNewPassword = ()=>{
    setShowNewPassword((show)=> !show);
  }

  const handleShowConfirmPassword = ()=>{
    setShowConfirmPassword((show)=> !show);
  }

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
                        autoComplete="current-password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        label="current Password"
                        {...getFieldProps('currentPassword')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowCurrentPassword} edge="end">
                                <Iconify icon={showCurrentPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />
                   
                      <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showNewPassword ? 'text' : 'password'}
                        label="New Password"
                        {...getFieldProps('newPassword')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowNewPassword} edge="end">
                                <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />

                      <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        {...getFieldProps('confirmPassword')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowConfirmPassword} edge="end">
                                <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
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
