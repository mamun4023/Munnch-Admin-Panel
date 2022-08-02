import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'material-react-toastify';

// material
import {
  Stack,
  TextField,
  Grid, 
  Typography,
  MenuItem,
  Autocomplete
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
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
    // restaurant_name : Yup.string().required("Select Store").nullable(),
    image : Yup.mixed().required("Image is required").nullable(),
    url : Yup.string().when("type" , {
      is : 1,
      then : Yup.string().required("required").nullable(),
    }),
    // image : Yup.string().when("type", {
    //   is : 2,
    //   then : Yup.mixed().required("Image is required"),
    // }),
    // restaurant_name : Yup.string().when("type", {
    //   is : 2,
    //   then : Yup.mixed().required("Select Store name"),
    // }),
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
                                // multiple
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