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
import {AddCuisine} from '../../../redux/cuisine/add/action';
// ----------------------------------------------------------------------

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  
  const CuisineSchema = Yup.object().shape({
    cuisine_name: Yup.string().required('Name is required'),
    image : Yup.mixed().required("Cuisine Image is required").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      cuisine_name : '',
      image : null,
    },
    validationSchema: CuisineSchema,
    
    onSubmit: (values) => {
      const data = new FormData();
      data.append('cuisine_name', values.cuisine_name);
      data.append('image', values.image);

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
                        <img  
                          src= {values.image?URL.createObjectURL(values.image):null} 
                          style = {{ maxHeight : "300px" }}
                        />
                        <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink : true                                
                            }}
                            type="file"
                            label="Cuisine Image"
                            onChange = {e => {formik.setFieldValue('image', e.target.files[0])}} 
                            error={Boolean(touched.image && errors.image)}
                            helperText={touched.image && errors.image}
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
