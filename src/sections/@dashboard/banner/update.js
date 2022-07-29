import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {toast} from 'material-react-toastify';
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

function ObjectTOArray(data){
	let obj = { 
			"id" : data['id'],
			"ic_number" : data['ic_number'],
			"restaurant_name": data['personal_name'],
      "email": data["email"],
      "phone": data["phone"],
    	"profile_pic": data['profile_pic'],
    	"store_phone": data["store_phone"],
    	"status": data['status'],
    	"is_verified": data['is_verified'],
    	"is_approved": data['is_approved'],
    	"tnc": data['tnc']
		}
	return obj;
}



export default function Update() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [singleBanner, setSingleBanner] = useState([])
  const [storeList, setStoreList] = useState([]);
  // const [singleStore, setSingeStore] = useState([]);
  const [storeId, setStoreId] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false); 

  const FetchSingleBannerData = (id)=>{
    FetchSingleBanner(id)
      .then(res =>{
          const response = res.data.data;
          setSingleBanner(response);
          setStoreId(response?.restaurant_id)
          dispatch(FetchSingleMerchant(response?.restaurant_id))

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
    // dispatch(FetchSingleMerchant(storeId))
  },[dispatch])

  const singlStore = useSelector(state => state.FetchSingleMerchant.data);

  const HandlerChange =(e)=>{
    setImage(e.target.files[0])
  }

  console.log("Single singlStore", storeList)

  const BannerSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      title: singleBanner?.title,
      type : singleBanner.type === 1? "1": "2",
      url : singleBanner?.url,
      restaurant_name : singleBanner?.restaurant_id,
      image : singleBanner?.image? singleBanner.image : singleBanner.url,
    },
    validationSchema: BannerSchema,
    onSubmit: (values) => {

      const data = new FormData();
      data.append('title', values.title);
      data.append('_method', "PUT");
      data.append("type", values.type);

      if(values.type === "2"){
        if(image != undefined){
          data.append('image', image);
        }
      }
      
      if(values.type === "2"){
        if(values.restaurant_name?.id){
          data.append('restaurant_id', values.restaurant_name?.id)
        }else{
          data.append('restaurant_id', values.restaurant_name)
        }
      }
      
      if(values.type === "1"){
        data.append('url', values.url);
      }
      setLoading(true)
      UpdateBanner(id, data)
        .then(res =>{
          const response = res.data.message;
          toast.dark(response);
          setLoading(false);
          navigate('/dashboard/banner', { replace: true });
        })
        .catch((err)=>{
            setLoading(false);
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
                        values.type === "2" && Object.keys(singlStore).length > 1  ?  
                        
                        <Autocomplete
                          // multiple
                          fullWidth
                          limitTags={1}
                          options={storeList}
                          getOptionLabel = {(option)=> option.restaurant_name}
                          defaultValue = {ObjectTOArray(singlStore)}
                          getOptionSelected={(option, value) => option.restaurant_name === value.restaurant_name}
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


                        {
                          values.type === "2"? 
                            <TextField
                              fullWidth
                              type = "file"
                              onChange= {HandlerChange}
                              required
                            />
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
