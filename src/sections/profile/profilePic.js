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
import {FetchProfileData} from '../../redux/auth/profile/profile/action';
import {UpdateProfileImage} from '../../redux/auth/profile/getProfile/action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'material-react-toastify';

// ----------------------------------------------------------------------

export default function ProfileImageUpdate() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    dispatch(FetchProfileData())
  },[])

  const ProfileData = useSelector(state=> state.Profile.data);

  const ProfileSchema = Yup.object().shape({
    image : Yup.mixed().required("Choose new picture").nullable()
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      image : null,
      url : ProfileData.url? ProfileData.url : ""
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      const data = new FormData();
      data.append('image', values.image);

      setLoading(true);
      UpdateProfileImage(data)
        .then(res =>{
            const response = res.data.message;
            toast.dark(response);
            dispatch(FetchProfileData())
            setLoading(false);
        })
        .catch(err =>{
            setLoading(true);
            const errors = err.response.message;
            toast.error(errors)
        })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          
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
                        <img 
                            src= { values.image?URL.createObjectURL(values.image) : ProfileData?.url}
                            style = {{ maxHeight : "300px" }}
                        />
                        <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink : true                                
                            }}
                            type="file"
                            label="Profile Picture"
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
