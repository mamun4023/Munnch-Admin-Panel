import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
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
import {AddCoupon} from '../../../redux/coupon/add/action';

// ----------------------------------------------------------------------

function Create() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const CouponSchema = Yup.object().shape({
    code: Yup.string().required('Coupon Code is required'),
    discount_type: Yup.string().required('Discount Type is required'),
    amount: Yup.string().required('Amount is required'),
    start_date : Yup.string().required("Start date is required"),
    end_date : Yup.string().required("Expire Date is required"),
    usage_per_user : Yup.string().required("Usage-Per-User is required"),
    minimum_spend : Yup.string().required("Min Spend is required"),
    maximum_discount : Yup.string().required("Max Discount Value is required"),
    maximum_usage_limit : Yup.string().required("Max-Limit-Value is required"),
  });

  const formik = useFormik({
    initialValues: {
      code : '',
      discount_type: '',
      amount : '',
      start_date : '',
      end_date : '',
      usage_per_user : '',
      minimum_spend : '',
      maximum_discount : '',
      maximum_usage_limit : '',
    },
    validationSchema: CouponSchema,
    onSubmit: (values) => {
      console.log("values", values)

      AddCoupon(values)
        .then(res =>{
          const response = res.data.message;
          setLoading(false)
          toast.dark(response)
          navigate('/dashboard/coupon', { replace: true });
        })
        .catch((err)=>{
          const response = err.response.data
          toast.error(response)
          setLoading(false)
      })
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Create Coupon
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
                            label="Coupon Code"
                            {...getFieldProps('code')}
                            error={Boolean(touched.code && errors.code)}
                            helperText={touched.code && errors.code}
                        />
                        <TextField
                            fullWidth
                            select
                            label="Discount Type"
                            {...getFieldProps('discount_type')}
                            error={Boolean(touched.discount_type && errors.discount_type)}
                            helperText={touched.discount_type && errors.discount_type}
                        >    
                            <MenuItem value= "1">Quantity </MenuItem>
                            <MenuItem value= "2">Cash </MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            type="text"
                            label="Amount"
                            {...getFieldProps('amount')}
                            error={Boolean(touched.amount && errors.amount)}
                            helperText={touched.amount && errors.amount}
                        />
                        <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="date"
                            label="Start Date"
                            {...getFieldProps('start_date')}
                            error={Boolean(touched.start_date && errors.start_date)}
                            helperText={touched.start_date && errors.start_date}
                        />  
                         <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="date"
                            label="Expire Date"
                            {...getFieldProps('end_date')}
                            error={Boolean(touched.end_date && errors.end_date)}
                            helperText={touched.end_date && errors.end_date}
                        />  
                        <TextField
                            fullWidth
                            type="text"
                            label="Usage Per User"
                            {...getFieldProps('usage_per_user')}
                            error={Boolean(touched.usage_per_user && errors.usage_per_user)}
                            helperText={touched.usage_per_user && errors.usage_per_user}
                        />  
                         <TextField
                            fullWidth
                            type="text"
                            label="Minimum Spend"
                            {...getFieldProps('minimum_spend')}
                            error={Boolean(touched.minimum_spend && errors.minimum_spend)}
                            helperText={touched.minimum_spend && errors.minimum_spend}
                        /> 
                        <TextField
                            fullWidth
                            type="text"
                            label="Maximum Discount"
                            {...getFieldProps('maximum_discount')}
                            error={Boolean(touched.maximum_discount && errors.maximum_discount)}
                            helperText={touched.maximum_discount && errors.maximum_discount}
                        />  
                        <TextField
                            fullWidth
                            type="text"
                            label="Maximum Limit"
                            {...getFieldProps('maximum_usage_limit')}
                            error={Boolean(touched.maximum_usage_limit && errors.maximum_usage_limit)}
                            helperText={touched.maximum_usage_limit && errors.maximum_usage_limit}
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