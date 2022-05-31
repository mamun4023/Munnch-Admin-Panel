import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
import {UpdateCuisine} from '../../../redux/cuisine/update/action';
import {FetchSingleList} from '../../../redux/cuisine/fetchSingle/action';
// ----------------------------------------------------------------------

export default function Update() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  useEffect(()=>{
    dispatch(FetchSingleList(id))
  },[])

  const SingleCuisine = useSelector(state => state.FetchSingleCusineList.data)

  const CuisineSchema = Yup.object().shape({
    cuisine_name: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      cuisine_name : SingleCuisine.cuisine_name? SingleCuisine.cuisine_name :"",
    },
    validationSchema: CuisineSchema,
    onSubmit: (values) => {
      const data = new FormData();
      data.append('cuisine_name', values.cuisine_name);
      if(image != undefined){
        data.append('image', image);
      }
      data.append('_method', 'PUT')     
      UpdateCuisine(id, data)
        .then(res =>{
          const response = res.data.message;
          console.log(response);
          toast.dark(response);
          navigate('/dashboard/cuisine', { replace: true });
        })
        .catch((err)=>{
          const response = err.response;
          toast.error(response)
        })
      }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Cuisine
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
                          src= {image?URL.createObjectURL(image):SingleCuisine.image} 
                          style = {{ maxHeight : "300px" }}
                        />
                        <TextField 
                          type= "file"
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
