import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {useDispatch, useSelector} from  'react-redux';
import { toast } from 'material-react-toastify';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
import {UpdateCuisine} from '../../../redux/cuisine/update/action';
import {FetchSingleList} from '../../../redux/cuisine/fetchSingle/action';
// ----------------------------------------------------------------------

export default function Update() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  const HandlerChange = (e)=>{
    setImage(e.target.files[0])
  }

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
      cuisine_name : SingleCuisine?.cuisine_name,
      image : SingleCuisine?.image
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

  const RemoveImagePreview = ()=>{
    formik.setFieldValue("image", null )
    if(image){
      setImage("")
    }
  }

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
                              InputLabelProps={{
                                shrink : true
                              }}
                              {...getFieldProps('cuisine_name')}
                              error={Boolean(touched.cuisine_name && errors.cuisine_name)}
                              helperText={touched.cuisine_name && errors.cuisine_name}
                          />
                          {
                            values.image  || image? 
                              <Stack 
                                  direction= "row-reverse"> 
                                    <IconButton
                                      style={{ marginBottom : "-30px" }}
                                      color='error'
                                      variant = "outlined"
                                      onClick={RemoveImagePreview}
                                    > <ClearIcon/></IconButton>
                              </Stack>
                            : null
                          }
                          <img 
                              src= {image?URL.createObjectURL(image) : values?.image}
                              style = {{ maxHeight : "300px" }}
                          />
                          {
                            !values.image && !image?
                                <label htmlFor="upload-photo"> 
                                  <TextField
                                    fullWidth
                                    type = "file"
                                    onChange= {HandlerChange}                            
                                    style = {{
                                      display : "none"
                                    }}
                                    id = "upload-photo"
                                  />
                                  <Card 
                                    variant="outlined"
                                    sx={{
                                      padding : 10,
                                      marginTop : -2,
                                      backgroundColor : "#eee"
                                    }}
                        
                                    style = {{textAlign : "center" }}
                                  >
                                      <CloudUploadIcon style={{fontSize : "50px", color : "gray" }}/>
                                        <Typography style={{color : "gray"}} > Upload Image</Typography>
                                  </Card>
                                </label>
                            : null
                          }
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
