import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid,Autocomplete, Switch, Box, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
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


  const SundayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
    }
    if(data === 1){
      result = 0
    }
    setSundayIsOpen(result);
  }

  const MondayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
    }
    if(data === 1){
      result = 0
    }
    setMondayIsOpen(result);
  }

  const TuesdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
    }
    if(data === 1){
      result = 0
    }
    setTuesdayIsOpen(result);
  }

  const WednesdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
    }
    if(data === 1){
      result = 0
    }
    setWednesdayIsOpen(result);
  }

  const ThursdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
    }
    if(data === 1){
      result = 0
    }
    setThursdayIsOpen(result);
  }


  const FridayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
    }
    if(data === 1){
      result = 0
    }
    setFridayIsOpen(result);
  }

  
  const SaturdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
    }
    if(data === 1){
      result = 0
    }
    setSaturdayIsOpen(result);
  }




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

   console.log("SingleStoreData " , SingleStoreData.operational_hours[0].is_open);
  
   const [sundayIsOpen, setSundayIsOpen] = useState(SingleStoreData.operational_hours[0]?.is_open);
   const [mondayIsopen, setMondayIsOpen] = useState(SingleStoreData.operational_hours[1]?.is_open);
   const [tuesdayIsOpen, setTuesdayIsOpen] = useState(SingleStoreData.operational_hours[2]?.is_open);
   const [wednesdayIsOpen, setWednesdayIsOpen] = useState(SingleStoreData.operational_hours[3]?.is_open);
   const [thursdayIsOpen, setThursdayIsOpen] = useState(SingleStoreData.operational_hours[4]?.is_open);
   const [fridayIsOpen, setFridayIsOpen] = useState(SingleStoreData.operational_hours[5]?.is_open);
   const [saturdayIsOpen, setSaturdayIsOpen] = useState(SingleStoreData.operational_hours[6]?.is_open);



// geo location
  const [address, setAddress] = useState(SingleStoreData.location?SingleStoreData.location.address: "");
    // latLot data
  const[latllogAddress, setLatllogAddress] = useState(SingleStoreData.location?SingleStoreData.location.address: ""); // set default address
  const[location , setLocation] = useState();
  const[lat, setLat] = useState(SingleStoreData.location?SingleStoreData.location.latitude: "");
  const[lng, setLng] = useState(SingleStoreData.location?SingleStoreData.location.longitude: "");
  
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

  // console.log(lat+","+lng)
  // console.log(address);

  
  const StoreSchema = Yup.object().shape({
    store_name: Yup.string().required('Store Name is required'),
    description: Yup.string().required('Description is required'),
    max_delivery_km : Yup.string().required("Delivery KM is required"),
    contact_no : Yup.string().required("Contact Number is required").min(10,"Must be 10 digit").max(10,"Must be 10 digit"),
    country : Yup.string().required('Country is required'),
    city : Yup.string().required('City is required'),
    cuisines : Yup.array().required("Cusine is required").nullable(),
    foodType : Yup.array().required("Food Type is required").nullable(),

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
      cuisines : SingleStoreData.cuisines? SingleStoreData.cuisines : "",
      foodType : SingleStoreData.food_types? SingleStoreData.food_types : "",

      // oprational hours
   

      sunday_start_time : SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      sunday_close_time : SingleStoreData.operational_hours[0]? moment(SingleStoreData.operational_hours[0].closing_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      sunday_is_open : SingleStoreData.operational_hours[0].is_open === 1? SingleStoreData.operational_hours[0].is_open : 0,
      sunday_no_of_hours :  "",

      monday_start_time : SingleStoreData.operational_hours[1]? moment(SingleStoreData.operational_hours[1].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      monday_close_time : SingleStoreData.operational_hours[1]? moment(SingleStoreData.operational_hours[1].closing_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      monday_is_open : SingleStoreData.operational_hours[1].is_open  === 1? SingleStoreData.operational_hours[1].is_open : 0,
      monday_no_of_hours : '',
      
      tuesday_start_time : SingleStoreData.operational_hours[2]? moment(SingleStoreData.operational_hours[2].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      tuesday_close_time : SingleStoreData.operational_hours[2]? moment(SingleStoreData.operational_hours[2].closing_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      tuesday_is_open : SingleStoreData.operational_hours[2].is_open  === 1? SingleStoreData.operational_hours[2].is_open : 0,
      tuesday_no_of_hours : '',

      wednesday_start_time :  SingleStoreData.operational_hours[3]? moment(SingleStoreData.operational_hours[3].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      wednesday_close_time :  SingleStoreData.operational_hours[3]? moment(SingleStoreData.operational_hours[3].closing_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      wednesday_is_open : SingleStoreData.operational_hours[3].is_open === 1? SingleStoreData.operational_hours[3].is_open : 0,
      wednesday_no_of_hours : '',

      thursday_start_time :  SingleStoreData.operational_hours[4]? moment(SingleStoreData.operational_hours[4].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      thursday_close_time :  SingleStoreData.operational_hours[4]? moment(SingleStoreData.operational_hours[4].closing_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      thursday_is_open : SingleStoreData.operational_hours[4].is_open === 1 ?1 : 0,
      thursday_no_of_hours : '',

      friday_start_time : SingleStoreData.operational_hours[5]? moment(SingleStoreData.operational_hours[5].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      friday_close_time : SingleStoreData.operational_hours[5]? moment(SingleStoreData.operational_hours[5].closing_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      friday_is_open : SingleStoreData.operational_hours[5].is_open  === 1? SingleStoreData.operational_hours[5].is_open : 0,
      friday_no_of_hours : '',

      saturday_start_time :  SingleStoreData.operational_hours[6]? moment(SingleStoreData.operational_hours[6].start_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      saturday_close_time :  SingleStoreData.operational_hours[6]? moment(SingleStoreData.operational_hours[6].closing_time,  'hh:mm:ss').format('hh:mm:ss') : "",
      saturday_is_open : SingleStoreData.operational_hours[6].is_open === 1? SingleStoreData.operational_hours[6].is_open : 0,
      saturday_no_of_hours : '',

      // social media
      website : SingleStoreData.social_links?SingleStoreData.social_links.website : "" ,
      instagram : SingleStoreData.social_links?SingleStoreData.social_links.instagram : "" ,
      facebook : SingleStoreData.social_links?SingleStoreData.social_links.facebook : "" ,

    },
    // validationSchema: StoreSchema,
    onSubmit: (values) => {

      // console.log(values)

      const CuisineIds = [];
      const FoodIds = [];

      const cuisineData = values.cuisines;
      const FoodData = values.foodType;

      for( let i in  cuisineData){
        let obj = {
          cuisine_id : cuisineData[i].id
        }
        CuisineIds.push(obj)
      }
      for( let i in  FoodData){
        let obj = {
          food_type_id : FoodData[i].id
        }
        FoodIds.push(obj)
      }
  
      const data = {
        "restaurant_name" : values.store_name,
        "description" : values.description,
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
                "day" : "Sunday",
                "start_time":  moment(values.sunday_start_time,'hh:mm:ss').format('hh:mm:ss') ,
                "no_of_hours": Math.abs(moment(values.sunday_start_time, "hh").format('hh') - moment(values.sunday_close_time, "hh").format('hh')),
                "is_open" : sundayIsOpen,
            },
            {
                "day" : "Monday",
                "start_time":  moment(values.monday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours":  Math.abs(moment(values.monday_start_time, "hh").format('hh') - moment(values.monday_close_time, "hh").format('hh')),
                "is_open" : mondayIsopen,
            },
            {
                "day" : "Tuesday",
                "start_time": moment(values.tuesday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours":  Math.abs(moment(values.tuesday_start_time, "hh").format('hh') - moment(values.tuesday_close_time, "hh").format('hh')),
                "is_open" : tuesdayIsOpen,
            },
            {
              "day" : "Wednesday",
              "start_time": moment(values.wednesday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
              "no_of_hours": Math.abs(moment(values.wednesday_start_time, "hh").format('hh') - moment(values.wednesday_close_time, "hh").format('hh')),
              "is_open" : wednesdayIsOpen,
          },
            {
                "day" : "Thursday",
                "start_time": moment(values.thursday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours":  Math.abs(moment(values.thursday_start_time, "hh").format('hh') - moment(values.thursday_close_time, "hh").format('hh')),
                "is_open" : thursdayIsOpen
            },
            {
                "day" : "Friday",
                "start_time":  moment(values.friday_start_time, 'hh:mm:ss').format('hh:mm:ss'),
                "no_of_hours":  Math.abs(moment(values.friday_start_time, "hh").format('hh') - moment(values.friday_close_time, "hh").format('hh')),
                "is_open" : fridayIsOpen,
            },
            {
              "day" : "Saturday",
              "start_time": moment(values.saturday_start_time, 'hh:mm:ss').format('hh:mm:ss') ,
              "no_of_hours":  Math.abs(moment(values.saturday_start_time, "hh").format('hh') - moment(values.saturday_close_time, "hh").format('hh')),
              "is_open" : saturdayIsOpen,
            }
        ],
        "social_links" : {
            "website" : values.website,
            "instagram" : values.instagram,
            "facebook" : values.facebook
        },
        "food_types": FoodIds,
        "cuisines" : CuisineIds
    }

    
    console.log("data", data);
    
    
    
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
                            label="Description"
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
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Sunday</label> 
                            <label> Open <Switch onChange={()=>SundayTogglerHandeler(values.sunday_is_open)} defaultChecked  = {values.sunday_is_open === 1? true : false}  /></label> 
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                            spacing={2}
                        >
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
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                {...getFieldProps('sunday_close_time')}
                                error={Boolean(touched.sunday_close_time && errors.sunday_close_time)}
                                helperText={touched.sunday_close_time && errors.sunday_close_time}
                            />  
                        </Stack>


                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Monday</label> 
                            <label> Open <Switch onChange={()=>MondayTogglerHandeler(values.monday_is_open)}  defaultChecked  = {values.monday_is_open === 1? true : false}  /></label> 
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                            spacing={2}
                        >
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
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                {...getFieldProps('monday_close_time')}
                                error={Boolean(touched.monday_close_time && errors.monday_close_time)}
                                helperText={touched.monday_close_time && errors.monday_close_time}
                            />  
                        </Stack>


                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Tuesday</label> 
                            <label> Open <Switch onChange={()=>TuesdayTogglerHandeler(values.tuesday_is_open)} defaultChecked  = {values.tuesday_is_open === 1? true : false}  /></label> 
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                            spacing={2}
                        >
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
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                {...getFieldProps('tuesday_close_time')}
                                error={Boolean(touched.tuesday_close_time && errors.tuesday_close_time)}
                                helperText={touched.tuesday_close_time && errors.tuesday_close_time}
                            />  
                        </Stack>


                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Wednesday</label> 
                            <label> Open <Switch onChange={()=>WednesdayTogglerHandeler(values.wednesday_is_open)}  defaultChecked  = {values.wednesday_is_open === 1? true : false}  /></label> 
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                            spacing={2}
                        >
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
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                {...getFieldProps('wednesday_close_time')}
                                error={Boolean(touched.wednesday_close_time && errors.wednesday_close_time)}
                                helperText={touched.wednesday_close_time && errors.wednesday_close_time}
                            />  
                        </Stack>



                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Thursday</label> 
                            <label> Open <Switch onChange={()=>ThursdayTogglerHandeler(values.thursday_is_open)} defaultChecked  = {values.thursday_is_open === 1? true : false}  /></label> 
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                            spacing={2}
                        >
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
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                {...getFieldProps('thursday_close_time')}
                                error={Boolean(touched.thursday_close_time && errors.thursday_close_time)}
                                helperText={touched.thursday_close_time && errors.thursday_close_time}
                            />  
                        </Stack>



                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Friday</label> 
                            <label> Open <Switch onChange={()=>FridayTogglerHandeler(values.friday_is_open)} defaultChecked  = {values.friday_is_open === 1? true : false}  /></label> 
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                            spacing={2}
                        >
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
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Start Time"
                                {...getFieldProps('friday_close_time')}
                                error={Boolean(touched.friday_close_time && errors.friday_close_time)}
                                helperText={touched.friday_close_time && errors.friday_close_time}
                            />  
                        </Stack>
                        
                        
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Saturday</label> 
                            <label> Open <Switch onChange={()=>SaturdayTogglerHandeler(values.sunday_is_open)} defaultChecked  = {values.saturday_is_open === 1? true : false}  /></label> 
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                            spacing={2}
                        >
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
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                {...getFieldProps('saturday_close_time')}
                                error={Boolean(touched.saturday_close_time && errors.saturday_close_time)}
                                helperText={touched.saturday_close_time && errors.saturday_close_time}
                            />  
                        </Stack>
                        
                        
                        
                        

                  
                         
                    
              
              {values.cuisines?  
              
              <Autocomplete
                multiple
                options={cuisineList}
                defaultValue = {values.cuisines}
                getOptionSelected={(option, value) => option.cuisine_name === values.cuisine_name}
                getOptionLabel = {(option)=> option.cuisine_name}
                renderInput = {(option)=> <TextField {...option} label ="Cuisine Type" /> }
                onChange = {(event, value)=> setSelectedCuisineList(value) }

            />
            : null}

            {values.foodType? 
            <Autocomplete
                multiple
                options={foodList}
                defaultValue = {values.foodType}
                getOptionSelected={(option, value) => option.food_type_name === values.food_type_name}

                getOptionLabel = {(option)=> option.food_type_name}
                renderInput = {(option)=> <TextField {...option} label ="Food Type" /> }
                onChange = {(event, value)=> setSelectedFoodList(value) }

            />  

            :null}
                          




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
                            label="Website"
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