import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
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
import {FetchFeeList} from '../../../redux/deliveryFee/fetchSingle/action';
import {UpdateDeliveryFee} from '../../../redux/deliveryFee/update/action';
// ----------------------------------------------------------------------

export default function Update() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    dispatch(FetchFeeList(id))
  },[])

  const singleList = useSelector(state => state.singleFee.data);
  console.log("Single list", singleList)

  const DeliveryFeeSchema = Yup.object().shape({
    range: Yup.string().required('Delivery Range(KM) is required'),
    fee: Yup.string().required('Fee is required'),
    
  });
  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      range : singleList.range?singleList.range: "",
      fee : singleList.fee? singleList.fee : ""
    },
    validationSchema: DeliveryFeeSchema,
    onSubmit: (values) => {
      setLoading(true)
      UpdateDeliveryFee(id, values)
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
          Update Delivery Range
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
