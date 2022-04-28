import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import {toast} from 'material-react-toastify'
import {GetLoyaltyData, GetWithdrawData, UpdateData} from '../../../redux/settings/actions';

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
  const [loading, setLoading] = useState(false);
  const [Loyalty_level, setLoyalty_level] = useState();
  const [withdraw, setWithdraw] = useState();


  const FetchData = ()=>{
    GetLoyaltyData()
      .then(res =>{
        const response = res.data.data.merchant_variable;
        setLoyalty_level(response);
      })

    
    GetWithdrawData()
      .then(res =>{
        const response = res.data.data.merchant_variable;
        setWithdraw(response);
      })
  }

  useEffect(()=>{
    FetchData();
  }, [])




  const LoginSchema = Yup.object().shape({
    loyalty_level_vlaue: Yup.string().required('Value is required'),
    minimum_withdraw_value: Yup.string().required('Value is required'),
  });

  const formik = useFormik({

    enableReinitialize : true,
    initialValues: {
      loyalty_level_vlaue: Loyalty_level?.value ,
      minimum_withdraw_value : withdraw?.value,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
    
    const data = {
        "data": [
            {
              "name": "loyalty_level",
              "value": values.loyalty_level_vlaue
            },
            {
              "name": "minimum_withdraw",
              "value": values.minimum_withdraw_value
            }
        ]
    }

    setLoading(true);
    UpdateData(data)
      .then(res =>{
        const response = res.data.message;
        navigate('/dashboard/settings', { replace: true });
        toast.dark(response)
        setLoading(false);
      
      })
      .catch(err=>{
        const response = err.response.data.message;
        toast.error(response);
        setLoading(false);
      })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
            Update Settings
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
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label="Loyalty Level"
                            {...getFieldProps('loyalty_level_vlaue')}
                            error={Boolean(touched.loyalty_level_vlaue && errors.loyalty_level_vlaue)}
                            helperText={touched.loyalty_level_vlaue && errors.loyalty_level_vlaue}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label="Minimum Withdraw"
                            {...getFieldProps('minimum_withdraw_value')}
                            error={Boolean(touched.minimum_withdraw_value && errors.minimum_withdraw_value)}
                            helperText={touched.minimum_withdraw_value && errors.minimum_withdraw_value}
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
