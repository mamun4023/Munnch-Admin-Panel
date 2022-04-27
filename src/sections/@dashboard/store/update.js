import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid,Autocomplete, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { toast } from 'material-react-toastify';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { textAlign } from '@mui/system';
import {FetchSingleStore} from '../../../redux/merchantStore/fetchSingle/action';
import {UpdateStore} from '../../../redux/merchantStore/update/action';
import {FetchCuisineTypeList, FetchFoodTypeList } from '../../../redux/merchantStore/other/actions';
import Moment from 'react-moment';
import moment from 'moment';
// ----------------------------------------------------------------------


function Update() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const {id} = useParams();
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);


  const[foodList, setFoodList] = useState([]);
  const[selectedFoodList, setSelectedFoodList] = useState();
  const[cuisineList, setCuisineList] = useState([]);
  const[selectedCuisine, setSelectedCuisineList] = useState();



  const LoadListData = ()=>{
    FetchCuisineTypeList()
      .then(res =>{
        const response = res.data.data.cuisine_list;
        setCuisineList(response);
      })

    FetchFoodTypeList()
      .then(res =>{
        const response = res.data.data.food_list;
        setFoodList(response);
      }) 
  }
  
  useEffect(()=>{
    dispatch(FetchSingleStore(id));
    LoadListData();
  },[])

  const SingleStoreData = useSelector(state => state.SingleStore.data);
  // const FoodList = useSelector(state => state.FetchFoodList.data);
  // const CusineList = useSelector(state => state.FetchCuisineList.data)

     console.log("SingleStoreData " , SingleStoreData.operational_hours);
  //  console.log("SingleStoreData " , moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss '));
  //  console.log("Cusine", CusineList);


// geo location
  const [address, setAddress] = useState('');
    // latLot data
  const[latllogAddress, setLatllogAddress] = useState(SingleStoreData.location?SingleStoreData.location.address: ""); // set default address
  const[location , setLocation] = useState();
  const[lat, setLat] = useState();
  const[lng, setLng] = useState();

  const handleSelect = async (values) => {
  const result = await geocodeByAddress(values)
  setLocation(result[0].formatted_address)
  // console.log("address",result[0].formatted_address)
  const latlogResult = await getLatLng(result[0])
  // console.log(latlogResult)
  setLat(latlogResult.lat);
  setLng(latlogResult.lng);
  setAddress(result[0].formatted_address)
  setLatllogAddress(values)
  };

  console.log(lat+","+lng)
  console.log(address);


  const StoreSchema = Yup.object().shape({
    store_name: Yup.string().required('Store Name is required'),
    description: Yup.string().required('Description is required'),
    max_delivery_km : Yup.string().required("Delivery KM is required"),
    contact_no : Yup.string().required("Contact Number is required").min(10,"Must be 10 digit").max(10,"Must be 10 digit"),
    // country : Yup.string().required('Country is required'),
    // city : Yup.string().required('City is required'),
    saturday_start_time : Yup.string().required("Start Time is required"),
    saturday_no_of_hours : Yup.string().required("Hour is required"),

    sunday_start_time : Yup.string().required("Start Time is required"),
    sunday_no_of_hours : Yup.string().required("Hour is required"),

    monday_start_time : Yup.string().required("Start Time is required"),
    monday_no_of_hours : Yup.string().required("Hour is required"),

    tuesday_start_time : Yup.string().required("Start Time is required"),
    tuesday_no_of_hours : Yup.string().required("Hour is required"),

    wednesday_start_time : Yup.string().required("Start Time is required"),
    wednesday_no_of_hours : Yup.string().required("Hour is required"),

    thursday_start_time : Yup.string().required("Start Time is required"),
    thursday_no_of_hours : Yup.string().required("Hour is required"),

    friday_start_time : Yup.string().required("Start Time is required"),
    friday_no_of_hours : Yup.string().required("Hour is required"),

  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      store_name:  SingleStoreData.store_name? SingleStoreData.store_name : "",
      description : SingleStoreData.description? SingleStoreData.description : "",
      max_delivery_km :  SingleStoreData.max_delivery_km ? SingleStoreData.max_delivery_km : '',
      contact_no :  SingleStoreData.contact_no? SingleStoreData.contact_no : "",
      country : SingleStoreData.location ? SingleStoreData.location.country  : " " ,
      city : SingleStoreData.location ? SingleStoreData.location.city  : " " ,

      // oprational hours
      saturday_start_time :   SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      saturday_no_of_hours : '',

      sunday_start_time : SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      sunday_no_of_hours : '',

      monday_start_time : SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[1].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      monday_no_of_hours : '',
      
      tuesday_start_time : SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      tuesday_no_of_hours : '',

      wednesday_start_time :  SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      wednesday_no_of_hours : '',

      thursday_start_time :  SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      thursday_no_of_hours : '',

      friday_start_time :  SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      friday_no_of_hours : '',

      // social media
      website : SingleStoreData.social_links?SingleStoreData.social_links.website : "" ,
      instagram : SingleStoreData.social_links?SingleStoreData.social_links.instagram : "" ,
      facebook : SingleStoreData.social_links?SingleStoreData.social_links.facebook : "" ,

    },
    validationSchema: StoreSchema,
    onSubmit: (values) => {
      console.log(values)

      const CuisineIds = [];
      const FoodIds = [];

      for( let i in  selectedCuisine){
        let obj = {
          cuisine_id : selectedCuisine[i].id
        }
        CuisineIds.push(obj)
      }
      for( let i in  selectedFoodList){
        let obj = {
          food_type_id : selectedFoodList[i].id
        }
        FoodIds.push(obj)
      }
  
      const data = {
        "restaurant_name" : values.store_name,
        "description" : values.description,
        "distance" : values.distance,
        "max_delivery_km" : values.max_delivery_km,
        "contact_no" : values.contact_no,
        "address" : 
            {
                "country" : values.country,
                "city" : values.city,
                "address" : address,
                "latitude" : lat,
                "longitude": lng
            },
        "operational_hours" : [
            {
              "day" : "Saturday",
              "start_time": moment(values.saturday_start_time, 'hh:mm:ss').format('hh:mm:ss') ,
              "no_of_hours": values.saturday_no_of_hours
            },
            {
                "day" : "Sunday",
                "start_time":  moment(values.sunday_start_time,'hh:mm:ss').format('hh:mm:ss') ,
                "no_of_hours": values.sunday_no_of_hours
            },
            {
                "day" : "Monday",
                "start_time":  moment(values.monday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours": values.monday_no_of_hours
            },
            {
                "day" : "Tuesday",
                "start_time": moment(values.tuesday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours": values.tuesday_no_of_hours,
            },
            {
                "day" : "Thursday",
                "start_time": moment(values.thursday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours": values.thursday_no_of_hours
            },
            {
                "day" : "Friday",
                "start_time":  moment(values.friday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours": values.friday_no_of_hours
            },
        ],
        "social_links" : {
            "website" : values.website,
            "instagram" : values.instagram,
            "facebook" : values.facebook
        },
        "food_types": FoodIds,
        "cuisines" : CuisineIds
    }

    console.log("Submitting data",data)
    
    setLoading(true);
    UpdateStore(id, data)
      .then(res =>{
        const response = res.data.message;
        setLoading(false);
        navigate(`/dashboard/merchant/store/${id}`, { replace: true });
        toast.dark(response);
      })
      .catch((err)=>{
        const response = err.response.data.errors.cuisine_name[0];
        toast.dark(response);
        setLoading(false);
      }) 
    }
});

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Store
        </Typography>
            
        <Grid
            container
            // item xs={8} 
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh' }}
        >
            <Grid item xs={6} >
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack style={{ width : "500px" }} spacing={3}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Restaurant Name"
                            {...getFieldProps('store_name')}
                            error={Boolean(touched.store_name && errors.store_name)}
                            helperText={touched.store_name && errors.store_name}
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="description"
                            multiline
                            rows={4}
                            {...getFieldProps('description')}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                        />

                          <TextField
                            fullWidth
                            type= "number"
                            label="Max Delivery KM"
                            {...getFieldProps('max_delivery_km')}
                            error={Boolean(touched.max_delivery_km && errors.max_delivery_km)}
                            helperText={touched.max_delivery_km && errors.max_delivery_km}
                          />   

                          <TextField
                            fullWidth
                            type = "number"
                            label="Contact Number"
                            {...getFieldProps('contact_no')}
                            error={Boolean(touched.contact_no && errors.contact_no)}
                            helperText={touched.contact_no && errors.contact_no}
                          /> 
                          <TextField
                            fullWidth
                            type = "text"
                            label="Country"
                            {...getFieldProps('country')}
                            error={Boolean(touched.country && errors.country)}
                            helperText={touched.country && errors.country}
                          />  
                          <TextField
                            fullWidth
                            type = "text"
                            label="City"
                            {...getFieldProps('city')}
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                          />  

                          <PlacesAutocomplete
                              value= {latllogAddress}
                              // defaultInputValue = "dhaka"
                              // getDefaultValue={"dhak"}
                              onChange = {setLatllogAddress}
                              onSelect = {handleSelect}
                              highlightFirstSuggestion = {true}
                            >
                              {({ getInputProps, suggestions, getSuggestionItemProps, loading})=> 
                                <div>
                                    <TextField 
                                      fullWidth
                                      value={"dhaka"}
                                      // {...getFieldProps('location')}
                                      // error={Boolean(touched.location && errors.location)}
                                      // helperText={touched.location && errors.location}
                                      {...getInputProps({placeholder : "Location"})}
                                    /> 
                                    <div>
                                        {loading?<div> {loading}</div>:null}
                                        {suggestions.map((suggestion)=>{
                                          const style = {
                                            backgroundColor : suggestion.active ? 'white' : "#eee"
                                          };
                                          return(
                                              <div className='p-5' {...getSuggestionItemProps(suggestion, {style})} > 
                                                <span style={{position : "relative"}}> {suggestion.description} </span>
                                              </div>
                                            )
                                          })}
                                    </div>
                                </div>}
                          </PlacesAutocomplete>


                        <h4 style={{textAlign : "center"}}> Operational Hours </h4>
                        <label> Saturday</label>
                          <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type= "time"
                            label="Start Time"
                            {...getFieldProps('saturday_start_time')}
                            error={Boolean(touched.saturday_start_time && errors.saturday_start_time)}
                            helperText={touched.saturday_start_time && errors.saturday_start_time}
                          />  

                          <TextField
                            fullWidth
                            label="No Of Hours"
                            {...getFieldProps('saturday_no_of_hours')}
                            error={Boolean(touched.saturday_no_of_hours && errors.saturday_no_of_hours)}
                            helperText={touched.saturday_no_of_hours && errors.saturday_no_of_hours}
                          />  
                        
                        <label> Sunday</label>
                          <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type= "time"
                            label="Start Time"
                            {...getFieldProps('sunday_start_time')}
                            error={Boolean(touched.sunday_start_time && errors.sunday_start_time)}
                            helperText={touched.sunday_start_time && errors.sunday_start_time}
                          />  

                          <TextField
                            fullWidth
                            label="No Of Hours"
                            {...getFieldProps('sunday_no_of_hours')}
                            error={Boolean(touched.sunday_no_of_hours && errors.sunday_no_of_hours)}
                            helperText={touched.sunday_no_of_hours && errors.sunday_no_of_hours}
                          />  
           
                          <label> Monday</label>
                          <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type= "time"
                            label="Start Time"
                            {...getFieldProps('monday_start_time')}
                            error={Boolean(touched.monday_start_time && errors.monday_start_time)}
                            helperText={touched.monday_start_time && errors.monday_start_time}
                          />  

                          <TextField
                            fullWidth
                            label="No Of Hours"
                            {...getFieldProps('monday_no_of_hours')}
                            error={Boolean(touched.monday_no_of_hours && errors.monday_no_of_hours)}
                            helperText={touched.monday_no_of_hours && errors.monday_no_of_hours}
                          />  

                          <label> Tuesday </label>
                          <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type= "time"
                            label="Start Time"
                            {...getFieldProps('tuesday_start_time')}
                            error={Boolean(touched.tuesday_start_time && errors.tuesday_start_time)}
                            helperText={touched.tuesday_start_time && errors.tuesday_start_time}
                          />  

                          <TextField
                            fullWidth
                            label="No Of Hours"
                            {...getFieldProps('tuesday_no_of_hours')}
                            error={Boolean(touched.tuesday_no_of_hours && errors.tuesday_no_of_hours)}
                            helperText={touched.tuesday_no_of_hours && errors.tuesday_no_of_hours}
                          />  
                          
                          <label> Wednesday </label>
                          <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type= "time"
                            label="Start Time"
                            {...getFieldProps('wednesday_start_time')}
                            error={Boolean(touched.wednesday_start_time && errors.wednesday_start_time)}
                            helperText={touched.wednesday_start_time && errors.wednesday_start_time}
                          />  

                          <TextField
                            fullWidth
                            label="No Of Hours"
                            {...getFieldProps('wednesday_no_of_hours')}
                            error={Boolean(touched.wednesday_no_of_hours && errors.wednesday_no_of_hours)}
                            helperText={touched.wednesday_no_of_hours && errors.wednesday_no_of_hours}
                          />  

                          
                          <label> Thursday </label>
                          <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type= "time"
                            label="Start Time"
                            {...getFieldProps('thursday_start_time')}
                            error={Boolean(touched.thursday_start_time && errors.thursday_start_time)}
                            helperText={touched.thursday_start_time && errors.thursday_start_time}
                          />  

                          <TextField
                            fullWidth
                           
                            label="No Of Hours"
                            {...getFieldProps('thursday_no_of_hours')}
                            error={Boolean(touched.thursday_no_of_hours && errors.thursday_no_of_hours)}
                            helperText={touched.thursday_no_of_hours && errors.thursday_no_of_hours}
                          />  
                          
                          <label> Friday </label>
                          <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type= "time"
                            label="Start Time"
                            {...getFieldProps('friday_start_time')}
                            error={Boolean(touched.friday_start_time && errors.friday_start_time)}
                            helperText={touched.friday_start_time && errors.friday_start_time}
                          />  

                          <TextField
                            fullWidth
                            label="No Of Hours"
                            {...getFieldProps('friday_no_of_hours')}
                            error={Boolean(touched.friday_no_of_hours && errors.friday_no_of_hours)}
                            helperText={touched.friday_no_of_hours && errors.friday_no_of_hours}
                          />  


              <Autocomplete
                multiple
                options={cuisineList}
                // defaultValue = {["new", "old"]}
                getOptionLabel = {(option)=> option.cuisine_name}
                renderInput = {(option)=> <TextField {...option} label ="Cuisine Type" /> }
                onChange = {(event, value)=> setSelectedCuisineList(value) }

            />

            <Autocomplete
                multiple
                options={foodList}
                getOptionLabel = {(option)=> option.food_type_name}
                renderInput = {(option)=> <TextField {...option} label ="Food Type" /> }
                onChange = {(event, value)=> setSelectedFoodList(value) }

            />  
                          




                          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {/* <TimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          label="With seconds"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        {/* <TimePicker
           
           label="Basic example"
           value={value}
           onChange={(newValue) => {
             setValue(newValue);
           }}
           renderInput={(params) => <TextField {...params} />}
        
        /> */}
      </Stack>
    </LocalizationProvider>






                          <h4 style= {{ textAlign : "center" }} > Social Address </h4>
                          <TextField
                            fullWidth
                            label="website"
                            {...getFieldProps('website')}
                            error={Boolean(touched.website && errors.website)}
                            helperText={touched.website && errors.website}
                          />  

                          <TextField
                            fullWidth
                            label="Instagram"
                            {...getFieldProps('instagram')}
                            error={Boolean(touched.instagram && errors.instagram)}
                            helperText={touched.instagram && errors.instagram}
                          />

                          <TextField
                            fullWidth
                            label="Facebook"
                            {...getFieldProps('facebook')}
                            error={Boolean(touched.facebook && errors.facebook)}
                            helperText={touched.facebook && errors.facebook}
                          />






                          {/* <Autocomplete
                             fullWidth
                              multiple
                              limitTags={2}
                              id="multiple-limit-tags"
                              options={FoodList}
                              getOptionLabel={(option) => option.food_name}
                              // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                              renderInput={(params) => (
                                <TextField {...params} label="Food Types" placeholder="Favorites" />
                              )}
                              sx={{ width: '500px' }}
                          /> */}

                          {/* <Autocomplete
                             fullWidth
                              multiple
                              limitTags={2}
                              id="multiple-limit-tags"
                              options={CusineList}
                              getOptionLabel={(option) => option.cuisine_name}
                              // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                              renderInput={(params) => (
                                <TextField {...params} label="Cuisines" placeholder="Favorites" />
                              )}
                              sx={{ width: '500px' }}
                          /> */}

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

export default Update;