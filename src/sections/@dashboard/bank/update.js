import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'material-react-toastify';
import {useDispatch, useSelector} from 'react-redux';
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
import {FetchSingleBank} from '../../../redux/bank/fetchSingle/action';
import {UpdateBank} from '../../../redux/bank/update/action';


// ----------------------------------------------------------------------

export default function Update() {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(FetchSingleBank(id))
  },[])

  const SingleBank = useSelector(state => state.FetchSingleBank.data);

  console.log("Single bank", SingleBank)

  const BankSchema = Yup.object().shape({
    name : Yup.string().required('Bank Name is required'),
    is_popular: Yup.string().required('Popularity is required'),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      name : SingleBank.name?SingleBank.name : '',
      is_popular : SingleBank.is_popular? "1" : '0',
    },
    validationSchema: BankSchema,
    onSubmit: (values) => {

      const data = new FormData();
      data.append('name', values.name);
      data.append('is_popular', values.is_popular);
      data.append('image', image);
      data.append('_method', 'PUT')

      setLoading(true)
      UpdateBank(id, data)
        .then(res =>{
          const response = res.data.message;
          toast.dark(response)
          setLoading(false)
          navigate('/dashboard/bank', { replace: true });
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
          Update Bank
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
                            label="Bank Name"
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                        />

                        <TextField
                            fullWidth
                            select
                            label="Popularity"
                            {...getFieldProps('is_popular')}
                            error={Boolean(touched.is_popular && errors.is_popular)}
                            helperText={touched.is_popular && errors.is_popular}
                        >    
                            <MenuItem value= "1">Yes</MenuItem>
                            <MenuItem value= "0">No</MenuItem>
                        </TextField> 

                        <img 
                          src= {SingleBank.image}
                        />

                        <TextField
                            fullWidth
                            type="file"
                            onChange={(e)=> setImage(e.target.files[0])}
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