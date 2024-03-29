import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'material-react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// material
import {
  Stack,
  TextField,
  Grid, 
  Typography,
  MenuItem,
  Autocomplete,
  IconButton,
  Card

} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { LoadingButton } from '@mui/lab';
// component
import {AddBanner, StoreList} from '../../../redux/banner/add/action';

// ----------------------------------------------------------------------

function FilterNullStore(arr){
  return arr.filter((data)=> data.restaurant_name !== null)
}

export default function Create(){
  const navigate = useNavigate();
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(false);

  const FetchStore = ()=>{
    StoreList()
      .then(res =>{
          const response = res.data.data;
          setStoreList(response);
      })
  }

  useEffect(()=>{
    FetchStore();
  },[])

  const BannerSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    type : Yup.string().required("Select Banner Type").nullable(),
    image : Yup.mixed().required("Image is required").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      type : '',
      restaurant_name : null,
      url : '',
      image : null,
    },
    validationSchema: BannerSchema,
    onSubmit: (values) => {
      let data = new FormData();
      data.append('title', values.title);
      data.append('type', values.type);
      
      if(values?.restaurant_name != null){
        data.append('restaurant_id', values?.restaurant_name?.id);
      }
      if(values?.url != ''){
        data.append('url', values.url);
      }
      
      if(values.image != null){
        data.append('image', values.image);
      }
      
      setLoading(true)
      AddBanner(data)
        .then(res =>{
          const response = res.data.message;
          setLoading(false)
          toast.dark(response)
          navigate('/dashboard/banner', { replace: true });
        })
        .catch((err)=>{
          setLoading(false)
          const errors = err.response.data.errors

          if(errors.url?errors.url[0]:false){ 
            toast.error(errors?.url[0])
          }

          if(errors.title?errors.title[0]:false){ 
            toast.error(errors?.title[0])
          }

          if(errors.image?errors.image[0]:false){ 
            toast.error(errors?.image[0])
          }

          if(errors.restaurant_id?errors.restaurant_id[0]:false){ 
            toast.error(errors?.restaurant_id[0])
          }  
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
                              select
                              label="Type"
                              {...getFieldProps('type')}
                              error={Boolean(touched.type && errors.type)}
                              helperText={touched.type && errors.type}
                          >    
                              <MenuItem value= "1">1. URL</MenuItem>
                              <MenuItem value= "2">2. Store</MenuItem>
                          </TextField> 
                          {
                            values.type === "1"?  
                              <TextField
                                fullWidth
                                type="text"
                                label="URL"
                                {...getFieldProps('url')}
                                error={Boolean(touched.url && errors.url)}
                                helperText={touched.url && errors.url}
                              />
                            : null
                          }             
                          {
                            values.type === "2"?
                              <Autocomplete
                                fullWidth
                                limitTags={1}
                                options={FilterNullStore(storeList)}
                                getOptionLabel = {(option)=> option.restaurant_name}
                                onChange = {(event, value)=>  formik.setFieldValue("restaurant_name", value) } 
                                renderInput = {(option)=> 
                                    <TextField 
                                        {...option} 
                                        label ="Restaurant Name"
                                        error={Boolean(touched.restaurant_name && errors.restaurant_name)}
                                        helperText={touched.restaurant_name && errors.restaurant_name} 
                                    /> }
                              />
                            : null
                          }
                          {
                            values.image ? 
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
                            src= {values.image?URL.createObjectURL(values.image): null}
                            style = {{maxHeight : "300px"}}
                          />
                          {
                            !values.image ?
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
                                  label="Banner Image"
                                  onChange={ev=>{ formik.setFieldValue("image",ev.target.files[0]) }} 
                                  error={Boolean(touched.image && errors.image)}
                                  helperText={touched.image && errors.image}
                                />
                                <Card 
                                  variant="outlined"
                                  sx={{
                                    padding : 10,
                                    marginTop : -2,
                                    backgroundColor : "#eee"
                                  }}
                                  helperText = "requied"
                                  style = {Boolean(touched.image && errors.image)?{border : "1px solid red", textAlign : "center" }: { textAlign : "center"}}
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