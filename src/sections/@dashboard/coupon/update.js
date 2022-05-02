import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// material
import {
  Link,
  Stack,
  Checkbox,
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {FetchSingleCoupon} from '../../../redux/coupon/fetchSingle/action';
import {UpdateCoupon} from '../../../redux/coupon/update/action';

const Days = ["All Days", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

// ----------------------------------------------------------------------

export default function Update() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(FetchSingleCoupon(id))
  }, [])

  const SingleCoupon = useSelector(state => state.SingleCoupon.data)


  console.log("single coupon", SingleCoupon);

  const CouponSchema = Yup.object().shape({
    code: Yup.string().required('Coupon Code is required'),
    coupon_type: Yup.string().required('Coupon Type is required'),
    amount: Yup.string().required('Amount is required'),
    start_date : Yup.string().required("Start date is required"),
    end_date : Yup.string().required("Expire Date is required"),
    usage_per_user : Yup.string().required("Usage-Per-User is required"),
    minimum_spend : Yup.string().required("Min Spend is required"),
    maximum_spend : Yup.string().required("Maximum Spend Value is required"),
    maximum_usage_limit : Yup.string().required("Max-Limit-Value is required"),
    description : Yup.string().required("Description is required"),
    days : Yup.array().required("Days is required").nullable(),
    
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      code : SingleCoupon.code ? SingleCoupon.code : "",
      coupon_type: SingleCoupon.coupon_type? SingleCoupon.coupon_type : "",
      amount : SingleCoupon.amount ? SingleCoupon.amount : "",
      start_date : SingleCoupon.start_date? SingleCoupon.start_date : "",
      end_date :  SingleCoupon.end_date? SingleCoupon.end_date : "",
      usage_per_user : SingleCoupon.usage_per_user ? SingleCoupon.usage_per_user : "",
      minimum_spend : SingleCoupon.minimum_spend ? SingleCoupon.usage_per_user : "",
      maximum_spend : SingleCoupon.maximum_spend ? SingleCoupon.maximum_spend : "",
      maximum_usage_limit : SingleCoupon.maximum_usage_limit ? SingleCoupon.maximum_usage_limit : "",
      description : SingleCoupon.description? SingleCoupon.description : '',
      days : SingleCoupon.days?SingleCoupon.days : "",
    },
    validationSchema: CouponSchema,
    onSubmit: (values) => {
      console.log("values", values)


      const data  = {
        code : values.code,
        coupon_type: values.coupon_type,
        amount : values.amount,
        start_date : values.start_date,
        end_date : values.end_date,
        usage_per_user : values.usage_per_user,
        minimum_spend : values.minimum_spend,
        maximum_spend : values.maximum_spend,
        maximum_discount : values.maximum_discount,
        maximum_usage_limit : values.maximum_usage_limit,
        description : values.description,
        days : values.days
    }

      UpdateCoupon(id, data)
        .then(res =>{
          const response = res.data.message;
          setLoading(false)
          toast.dark(response)
          navigate('/dashboard/coupon', { replace: true });
        })
        .catch((err)=>{
          const response = err.response.data.message;
          const errors = err.response.data.errors.code[0];
          toast.error(response + errors )
          setLoading(false)
      })
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Coupon
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
                            label="Coupon Type"
                            {...getFieldProps('coupon_type')}
                            error={Boolean(touched.coupon_type && errors.coupon_type)}
                            helperText={touched.coupon_type && errors.coupon_type}
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
                            type="text"
                            label="Minimum Spend"
                            {...getFieldProps('minimum_spend')}
                            error={Boolean(touched.minimum_spend && errors.minimum_spend)}
                            helperText={touched.minimum_spend && errors.minimum_spend}
                        /> 
                        <TextField
                            fullWidth
                            type="text"
                            label="Maximum Spend"
                            {...getFieldProps('maximum_spend')}
                            error={Boolean(touched.maximum_spend && errors.maximum_spend)}
                            helperText={touched.maximum_spend && errors.maximum_spend}
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
                            type="text"
                            label="maximum_spend"
                            {...getFieldProps('maximum_spend')}
                            error={Boolean(touched.maximum_spend && errors.maximum_spend)}
                            helperText={touched.maximum_spend && errors.maximum_spend}
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
                      {
                        values.days? 

                        <Autocomplete
                            multiple
                            fullWidth
                            id="combo-box-demo"
                            defaultValue={values.days}
                            options={Days}
                            disableCloseOnSelect
                            getOptionSelected={(option, value) => option === "All Days"}
                            // filterOptions={Days => Days.filter(opt => opt.fieldType)}
                            disabledItemsFocusable
                            // limitTags = {1}
                            onChange = {(event, value)=>  formik.setFieldValue("days", value) }        
                            renderInput={(params) => 
                              <TextField 
                                {...params} 
                                label="Days"
                                error={Boolean(touched.days && errors.days)}
                                helperText={touched.days && errors.days} 
                              
                              />}
                        /> 

                        : null
                        // <Autocomplete
                        //     multiple
                        //     fullWidth
                        //     id="combo-box-demo"
                           
                        //     options={Days}
                        //     disableCloseOnSelect
                        //     getOptionSelected={(option, value) => option === "All Days"}
                        //     // filterOptions={Days => Days.filter(opt => opt.fieldType)}
                        //     disabledItemsFocusable
                        //     // limitTags = {1}
                        //     onChange = {(event, value)=>  formik.setFieldValue("days", value) }        
                        //     renderInput={(params) => 
                        //       <TextField 
                        //         {...params} 
                        //         label="Days"
                        //         error={Boolean(touched.days && errors.days)}
                        //         helperText={touched.days && errors.days} 
                              
                        //       />}
                        // /> 
                              
 
                      }

                        


                        


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
