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
    maximum_spend : Yup.string().required("Max Spend is required"),
    maximum_discount : Yup.string().required("Max Discount Value is required"),
    maximum_usage_limit : Yup.string().required("Max-Limit-Value is required"),
    description : Yup.string().required("Description is required"),

    days : Yup.array().nullable()

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
      maximum_spend : '',
      maximum_discount : '',
      maximum_usage_limit : '',
      description : '',
      days : null
    },
    validationSchema: CouponSchema,
    onSubmit: (values) => {
      console.log("values", values)

      const data  = {
          code : values.code,
          discount_type: values.discount_type,
          amount : values.amount,
          start_date : values.start_date,
          end_date : values.end_date,
          usage_per_user : values.usage_per_user,
          minimum_spend : values.minimum_spend,
          maximum_spend : values.maximum_spend,
          maximum_discount : values.maximum_discount,
          maximum_usage_limit : values.maximum_usage_limit,
          description : values.description,
          days : ["all days"]
      }

      AddCoupon(data)
        .then(res =>{
          const response = res.data.message;
          setLoading(false)
          toast.dark(response)
          navigate('/dashboard/coupon', { replace: true });
        })
        .catch((err)=>{
          const response = err.response.data.message;
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
                            <MenuItem value= "1">Fixed </MenuItem>
                            <MenuItem value= "2">Percentage </MenuItem>
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
                            type="number"
                            label="Minimum Spend"
                            {...getFieldProps('minimum_spend')}
                            error={Boolean(touched.minimum_spend && errors.minimum_spend)}
                            helperText={touched.minimum_spend && errors.minimum_spend}
                        /> 
                          <TextField
                            fullWidth
                            type="number"
                            label="Maximum Spend"
                            {...getFieldProps('maximum_spend')}
                            error={Boolean(touched.maximum_spend && errors.maximum_spend)}
                            helperText={touched.maximum_spend && errors.maximum_spend}
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
                        <TextField
                            fullWidth
                            type="number"
                            label="Days"
                            {...getFieldProps('days')}
                            error={Boolean(touched.days && errors.days)}
                            helperText={touched.days && errors.days}
                        />
                         <TextField
                            fullWidth
                            multiline
                            rows={5}
                            label="Description"
                            {...getFieldProps('description')}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
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