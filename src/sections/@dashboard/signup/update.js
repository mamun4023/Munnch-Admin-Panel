import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  TextField,
  Grid,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {FetchSingleBanner} from '../../../redux/banner/fetchSingle/action';
import {UpdateBanner} from '../../../redux/banner/update/action';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function Update() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const loading = useSelector(state => state.UpdateBanner.loading)

  useEffect(()=>{
    dispatch(FetchSingleBanner(id))
  },[])

  const HandlerChange =(e)=>{
    setImage(e.target.files[0])
  }

  const SingleBanner = useSelector(state=> state.FetchSingleBanner.data);
  console.log("Single banner", SingleBanner)

  const BannerSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      title: SingleBanner.title? SingleBanner.title : "",
      url : SingleBanner.url? SingleBanner.url : ""
    },
    validationSchema: BannerSchema,
    onSubmit: (values) => {

      const data = new FormData();
      data.append('title', values.title);
      data.append('_method', "PUT");
      if(image != undefined){
        data.append('image', image);
      }
      data.append('url', values.url);
      dispatch(UpdateBanner(id, data));
      navigate('/dashboard/banner', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Banner
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
                            src= { image?URL.createObjectURL(image) : SingleBanner?.image}
                            style = {{ maxHeight : "300px" }}
                        />
                        <TextField
                            fullWidth
                            type = "file"
                            onChange= {HandlerChange}
                            required
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
