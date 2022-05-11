import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Typography, Autocomplete } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'material-react-toastify';
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
import {AddMerchant} from '../../../redux/merchant/add/action';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const MerchantSchema = Yup.object().shape({
    personal_name: Yup.string().required('Name is required'),
    ic_number: Yup.string().required('IC Number is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().required('Phone Number is required').min(9, "Minimum 9 digit").max(11, "Maximum 11 digit"),
    store_phone: Yup.string().required('Store Phone Number is required').min(9, "Minimum 9 digit").max(11, "Maximum 11 digit"),
    password: Yup.string().required('Password is required').min(8, "Minimum 8 Characters"),
    password_confirmation: Yup.string().required("Confirm Password is required").min(8, "Minimum 8 Characters").when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Confirm Password not matched"
      )
    })
  });

  const formik = useFormik({
    initialValues: {
      personal_name : '',
      ic_number : '',
      email : '',
      phone : '',
      store_phone : '',
      password : '',
      password_confirmation : '',
    },
  
    validationSchema: MerchantSchema,
    onSubmit: (values) => {
      
      setLoading(true);
      AddMerchant(values)
        .then(res =>{
          const response = res.data.message;
          console.log(response);
          navigate('/dashboard/merchant', { replace: true });
          toast.dark(response)
          setLoading(false);
        })
        .catch((err)=>{
          setLoading(false);
          const errors = err.response.data.errors;
          
          if(errors.phone?errors.phone[0]:false){ 
            toast.error(errors?.phone[0])
          }
          
          if(errors.store_phone?errors.store_phone[0]: false){
            toast.error(errors?.store_phone[0])
          }
           
          if( errors.email?errors.email[0] : false){
            toast.error( errors?.email[0])
          }
          if( errors.ic_number?errors.ic_number[0] : false){
            toast.error( errors?.ic_number[0])
          }

        })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Create Merchant
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
                              label="Name"
                              {...getFieldProps('personal_name')}
                              error={Boolean(touched.personal_name && errors.personal_name)}
                              helperText={touched.personal_name && errors.personal_name}
                          />
                          <TextField
                              fullWidth
                              type="text"
                              label="IC Number"
                              {...getFieldProps('ic_number')}
                              error={Boolean(touched.ic_number && errors.ic_number)}
                              helperText={touched.ic_number && errors.ic_number}
                          />
                          <TextField
                              fullWidth
                              type="email"
                              label="Email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                          />
                          <TextField
                              fullWidth
                              type="number"
                              label="Phone Number"
                              {...getFieldProps('phone')}
                              error={Boolean(touched.phone && errors.phone)}
                              helperText={touched.phone && errors.phone}
                          />
                          <TextField
                              fullWidth
                              type="number"
                              label="Store Phone"
                              {...getFieldProps('store_phone')}
                              error={Boolean(touched.store_phone && errors.store_phone)}
                              helperText={touched.store_phone && errors.store_phone}
                          />
                          <TextField
                              fullWidth
                              type="password"
                              label="Password"
                              {...getFieldProps('password')}
                              error={Boolean(touched.password && errors.password)}
                              helperText={touched.password && errors.password}
                          />
                          <TextField
                              fullWidth
                              type="password"
                              label="Confirm Password"
                              {...getFieldProps('password_confirmation')}
                              error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                              helperText={touched.password_confirmation && errors.password_confirmation}
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

export default Create;