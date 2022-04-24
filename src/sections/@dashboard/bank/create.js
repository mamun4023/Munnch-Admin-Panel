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
import {AddBank} from '../../../redux/bank/add/action';

// ----------------------------------------------------------------------

function Create() {
  const navigate = useNavigate();
  const[image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const BankSchema = Yup.object().shape({
    name : Yup.string().required('Bank Name is required'),
    is_popular: Yup.string().required('Popularity is required'),
  });


  const formik = useFormik({
    initialValues: {
      name : '',
      is_popular : '',
    },
    validationSchema: BankSchema,
    onSubmit: (values) => {
      console.log(values)

      const data = new FormData();
      data.append('name', values.name);
      data.append('is_popular', values.is_popular);
      data.append('image', image)

      setLoading(true)
      AddBank(data)
        .then(res =>{
          const response = res.data.message;
          toast.dark(response)
          setLoading(false);
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
          Add Bank
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

export default Create;