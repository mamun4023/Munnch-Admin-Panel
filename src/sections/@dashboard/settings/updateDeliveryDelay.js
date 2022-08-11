import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {toast} from 'material-react-toastify'
import {DelayUpdate} from '../../../redux/settings/actions';
import {FetchUserString} from '../../../redux/strings/user/fetch/action'

// material
import {
  Stack,
  Grid,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function Update() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliveryDelay, setDeliveryDelay] = useState();

  const FetchData = ()=>{
    FetchUserString()
      .then(res =>{
        const response = res.data?.data?.user_variables_list[5];
        setDeliveryDelay(response);
      })
  }

  useEffect(()=>{
    FetchData();
  }, [])

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      delay: deliveryDelay?.value == 1?"1" : "0"
    },
    onSubmit: (values) => {
    
    const data = {
      "data": [
          {
              "name": "is_delivery_delayed",
              "value": values?.delay
          }
      ]
    }

    setLoading(true);
    DelayUpdate(data)
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

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

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
                                select
                                label="Delivery time"
                                {...getFieldProps('delay')}
                                error={Boolean(touched.delay && errors.delay)}
                                helperText={touched.delay && errors.delay}
                            >    
                                <MenuItem value= "1">Delay</MenuItem>
                                <MenuItem value= "0">Non-Delay</MenuItem>
                            </TextField> 
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
