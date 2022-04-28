import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
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
import {StoreImage} from '../../../redux/loyalty/actions'
import { toast } from 'material-react-toastify';

// ----------------------------------------------------------------------

function Create() {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    level: Yup.string().required('Title is required'),
  });

  const formik = useFormik({
    initialValues: {
      level: '',
    },
    validationSchema: LoginSchema,

    onSubmit: (values) => {

      const data = new FormData();
      data.append('level', values.level);
      data.append('image', image);

      setLoading(true);
      StoreImage(data)
        .then(res =>{
          const response = res.data.message;
          toast.dark(response);
          setLoading(false);
          navigate('/dashboard/loyalty', { replace: true });
        })
        .catch(err =>{
          const response = err.data.message;
          toast.dark(response);
          setLoading(false)
        })
      
      setLoading(false)

      
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return(
        <>
        <Typography variant="h4" gutterBottom>
            Add Image
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
                            label="Level"
                            {...getFieldProps('level')}
                            error={Boolean(touched.level && errors.level)}
                            helperText={touched.level && errors.level}
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

export default Create;