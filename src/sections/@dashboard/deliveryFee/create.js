import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'material-react-toastify';
// material
import {
  Stack,
  TextField,
  Grid,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {AddDeliveryFee} from '../../../redux/deliveryFee/add/action';

// ----------------------------------------------------------------------

function Create() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const DeliveryFeeSchema = Yup.object().shape({
    range: Yup.string().required('Delivery Range(KM) is required'),
    fee: Yup.string().required('Fee is required'),
    
  });

  const formik = useFormik({
    initialValues: {
      range : '',
      fee : ''
    },
    validationSchema: DeliveryFeeSchema,
    onSubmit: (values) => {
      setLoading(true)
      AddDeliveryFee(values)
        .then(res =>{
          const response = res.data.message;
          toast.dark(response)
          setLoading(false);
          navigate('/dashboard/delivery_fee', { replace: true });
        })
        .catch((err)=>{
          const response = err.response.data.message
          toast.error(response)
          setLoading(false)
        })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Add New Range
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
                            label="Delivery Range(KM)"
                            {...getFieldProps('range')}
                            error={Boolean(touched.range && errors.range)}
                            helperText={touched.range && errors.range}
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Delivery Fee"
                            {...getFieldProps('fee')}
                            error={Boolean(touched.fee && errors.fee)}
                            helperText={touched.fee && errors.fee}
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