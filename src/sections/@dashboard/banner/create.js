import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'material-react-toastify';
import   {PhotoCamera} from '@mui/icons-material';

// material
import {
  Stack,
  TextField,
  Grid, 
  Typography,
  IconButton,
  LinearProgress
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { LoadingButton } from '@mui/lab';
// component
import {AddBanner} from '../../../redux/banner/add/action';

// ----------------------------------------------------------------------

export default function Create(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const BannerSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    image : Yup.mixed().required("Image is required").nullable()
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      url : '',
      image : null,
    },
    validationSchema: BannerSchema,
    onSubmit: (values) => {
      let data = new FormData();
      data.append('title', values.title);
      data.append('image', values.image);
      data.append('url', values.url);

      setLoading(true)
      AddBanner(data)
        .then(res =>{
          const response = res.data.message;
          setLoading(false)
          toast.dark(response)
          navigate('/dashboard/banner', { replace: true });
        })
        .catch((err)=>{
          const errors = err.response.data.errors

          if(errors.url?errors.url[0]:false){ 
            toast.error(errors?.url[0])
          }

          if(errors.title?errors.title[0]:false){ 
            toast.error(errors?.title[0])
          }
          setLoading(false)
        })
      }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Create Banner
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
                <FormikProvider  value={formik}>
                    <Form encType="multipart/form-data" autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                            label="URL (Optional)"
                            {...getFieldProps('url')}
                        />

                        <img 
                           src= {values.image?URL.createObjectURL(values.image): null}
                           style = {{maxHeight : "300px"}}
                        />

                        <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink : true                                
                            }}
                            type="file"
                            label="Banner Image"
                            onChange={ev=>{ formik.setFieldValue("image",ev.target.files[0]) }} 
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