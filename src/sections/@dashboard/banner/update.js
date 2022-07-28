import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {FetchSingleBanner} from '../../../redux/banner/fetchSingle/action';
import {UpdateBanner} from '../../../redux/banner/update/action';
import {StoreList} from '../../../redux/banner/add/action';
import {FetchSingleMerchant} from '../../../redux/merchant/fetchSingle/action';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function Update() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [singleBanner, setSingleBanner] = useState([])
  const [storeList, setStoreList] = useState([]);
  // const [singleStore, setSingeStore] = useState([]);
  const [storeId, setStoreId] = useState();
  const [image, setImage] = useState();
  const loading = useSelector(state => state.UpdateBanner.loading)

  const FetchSingleBannerData = (id)=>{
    FetchSingleBanner(id)
      .then(res =>{
          const response = res.data.data;
          setSingleBanner(response);
          setStoreId(response?.restaurant_id)

      })
  }

  const FetchStoreList = (storeId)=>{
    StoreList(storeId)
      .then(res =>{
         const response = res.data.data;
         setStoreList(response);
      })
  }

  useEffect(()=>{
    FetchSingleBannerData(id)
    FetchStoreList(storeId)
    dispatch(FetchSingleMerchant(storeId))
  },[])

  const singlStore = useSelector(state => state.FetchSingleMerchant.data);

  const HandlerChange =(e)=>{
    setImage(e.target.files[0])
  }

  console.log("Single singlStore", singlStore)

  const BannerSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      title: singleBanner?.title,
      type : singleBanner.type === 1? "1": "2",
      url : singleBanner?.url,
      restaurant_name : null,
      image : singleBanner?.image? singleBanner.image : singleBanner.url,
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
                            InputLabelProps={{
                              shrink : true                                
                            }}
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
                            value={1}
                            {...getFieldProps('type')}
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                        >    
                            <MenuItem value= "1">1. URL</MenuItem>
                            <MenuItem value= "2">2. Store</MenuItem>
                        </TextField> 

                       {
                        values.type === "1" || values.type === 1?  
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
                        values.type === 2 || values.type === "2"? 
                        
                        <Autocomplete
                        // multiple
                        fullWidth
                        limitTags={1}
                        options={storeList}
                        getOptionLabel = {(option)=> option.restaurant_name}
                        defaultValue = {singlStore}
                        getOptionSelected={(option, value) => option.restaurant_name  === value.personal_name}
                        onChange = {(event, value)=> formik.setFieldValue("restaurant_name", value) } 
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
                            src= { image?URL.createObjectURL(image) : singleBanner?.image}
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
