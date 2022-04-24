import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'material-react-toastify';
// material
import {
  Stack,
  TextField,
  Typography,
  Grid,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {AddNotification} from '../../../redux/notify/add/action';

// ----------------------------------------------------------------------

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);

  const NotifySchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    message: Yup.string().required('Message is required'),
    user_type: Yup.string().required('Send-To is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
      user_type: '',
    },
    validationSchema: NotifySchema,
    onSubmit: (values) => {
      console.log(values)
      setLoading(true)
      AddNotification(values)
        .then(res =>{
          const response = res.data.message;
          toast.dark(response)
          setLoading(false)      
          navigate('/dashboard/notify', { replace: true });    
        })
        .catch((err)=>{
          const response = err.response.data.errors.food_name[0];
          toast.error(response)
          setLoading(false)  
        })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Add Notification
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
                            label="Title"
                            {...getFieldProps('title')}
                            error={Boolean(touched.title && errors.title)}
                            helperText={touched.title && errors.title}
                          />
                          <TextField
                            fullWidth
                            type="text"
                            label="Message"
                            multiline
                            rows={4}
                            {...getFieldProps('message')}
                            error={Boolean(touched.message && errors.message)}
                            helperText={touched.message && errors.message}
                          />
                          <TextField
                            fullWidth
                            select
                            label="Send-To"
                            {...getFieldProps('user_type')}
                            error={Boolean(touched.user_type && errors.user_type)}
                            helperText={touched.user_type && errors.user_type}
                          >    
                            <MenuItem value= "1">User</MenuItem>
                            <MenuItem value= "2">Merchant</MenuItem>
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

export default Create;