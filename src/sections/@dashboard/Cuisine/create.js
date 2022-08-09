import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {useDispatch, useSelector} from  'react-redux';
import { toast } from 'material-react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
// material
import {
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  IconButton
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
  
  const  RemoveImagePreview = ()=>{
    formik.setFieldValue("image", null )
  }

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

                          {values.image ? 
                           <Stack 
                              direction= "row-reverse"> 
                                <IconButton
                                  style={{ marginBottom : "-30px" }}
                                  color='error'
                                  variant = "outlined"
                                  onClick={RemoveImagePreview}
                                > <ClearIcon/></IconButton>
                           </Stack>

                          : null}
                        <img  
                          src= {values.image?URL.createObjectURL(values.image):null} 
                          style = {{ maxHeight : "300px" }}
                        />
                        {!values.image ?
                          
                          <label htmlFor="upload-photo"> 
                            <TextField
                              fullWidth
                              InputLabelProps={{
                              shrink : true                                
                              }}
                              style = {{
                                display : "none"
                              }}
                              id = "upload-photo"
                              type="file"
                              onChange={ev=>{ formik.setFieldValue("image",ev.target.files[0]) }} 
                              error={Boolean(touched.image && errors.image)}
                              helperText={touched.image && errors.image}
                            />
                            <Card 
                              variant="outlined"
                              sx={{
                                padding : 10,
                                marginTop : -2,
                                backgroundColor : "#eee",
                                textAlign : "center"
                              }}
                              helperText = "requied"
                              style = {Boolean(touched.image && errors.image)?{border : "1px solid red" }: null}
                            >
                                <CloudUploadIcon style={{fontSize : "50px", color : "gray" }}/>
                                  <Typography style={{color : "gray"}} > Upload Image</Typography>
                            </Card>
                            
                          </label>
                            : null}
          
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
