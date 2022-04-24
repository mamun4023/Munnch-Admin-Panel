import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {useDispatch, useSelector} from  'react-redux';
import { toast } from 'material-react-toastify';
// material
import {
  Stack,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {AddCuisine} from '../../../redux/cuisine/add/action';
// ----------------------------------------------------------------------

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  
  const CuisineSchema = Yup.object().shape({
    cuisine_name: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      cuisine_name : '',
    },
    validationSchema: CuisineSchema,
    
    onSubmit: (values) => {
      const data = new FormData();
      data.append('cuisine_name', values.cuisine_name);
      data.append('image', image)
      setLoading(true)
      AddCuisine(data)
        .then(res =>{
          const response = res.data.message;
          toast.dark(response)
          setLoading(false)
          navigate('/dashboard/cuisine', { replace: true });
      })
      .catch((err)=>{
          const errors = err.response.data.message;
          toast.error(errors)
          setLoading(false)
      })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
            Create Cuisine
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
                            label="Cuisine Name"
                            {...getFieldProps('cuisine_name')}
                            error={Boolean(touched.cuisine_name && errors.cuisine_name)}
                            helperText={touched.cuisine_name && errors.cuisine_name}
                        />
                          <TextField
                            fullWidth
                            type="file"
                            onChange={(e)=>setImage(e.target.files[0])}
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
