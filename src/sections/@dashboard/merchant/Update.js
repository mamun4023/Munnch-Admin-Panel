import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
import {FetchSingleMerchant} from '../../../redux/merchant/fetchSingle/action';
import {FetchMerchantList} from '../../../redux/merchant/fetchAll/action';
import {UpdateMerchant} from '../../../redux/merchant/update/action';

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
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);

  useEffect(()=>{
    dispatch(FetchMerchantList(1))
    dispatch(FetchSingleMerchant(id))
  },[])

  const SingleMerchant = useSelector(state => state.FetchSingleMerchant.data)
 

  const MerchantSchema = Yup.object().shape({
    personal_name: Yup.string().required('Name is required'),
    ic_number: Yup.string().required('IC Number is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().required('Phone Number is required').min(10, "Must be 10 digit").max(10, "Must be 10 digit"),
    store_phone: Yup.string().required('Store Phone Number is required').min(10, "Must be 10 digit").max(10, "Must be 10 digit"),
    // password: Yup.string().required('Password is required'),
    // password_confirmation : Yup.string().required("Confirm Password is required"),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues :{
      personal_name : SingleMerchant.personal_name? SingleMerchant.personal_name : "",
      ic_number : SingleMerchant.ic_number ? SingleMerchant.ic_number : "",
      email : SingleMerchant.email? SingleMerchant.email : "",
      phone : SingleMerchant.phone? SingleMerchant.phone : "",
      store_phone : SingleMerchant.store_phone ? SingleMerchant.phone : "",
      // password : SingleMerchant.password ? SingleMerchant.password : "",
      // password_confirmation : SingleMerchant.password_confirmation? SingleMerchant.password_confirmation : '',
    },
    validationSchema: MerchantSchema,

    onSubmit: (values) => {

      setLoading(true);
      UpdateMerchant(id, values)
        .then(res =>{
          const response = res.data.message;
          setLoading(false);
          navigate(`/dashboard/merchant`, { replace: true });
          toast.dark(response);
      })
      .catch((err)=>{
          const response = err.response.data.message;
          toast.error(response)
          setLoading(false);
      })
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Merchant
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
                              value={formik.values.personal_name}
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
                          {/* <TextField
                              fullWidth
                              type="password"
                              label="Password"
                              {...getFieldProps('password')}
                              error={Boolean(touched.password && errors.password)}
                              helperText={touched.password && errors.password}
                          /> */}
                          {/* <TextField
                              fullWidth
                              type="password"
                              label="Confirm Password"
                              {...getFieldProps('password_confirmation')}
                              error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                              helperText={touched.password_confirmation && errors.password_confirmation}
                          /> */}

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