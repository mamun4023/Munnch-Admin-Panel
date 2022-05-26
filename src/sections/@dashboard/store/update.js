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
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);
  const[SingleStoreData, setSingleStoreData] = useState([])

  //loading list data variable
  const[foodList, setFoodList] = useState([]);
  const[cuisineList, setCuisineList] = useState([]);

  
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
  

  const FetchStoreData =(id)=>{
    FetchSingleStore(id)
      .then(res =>{
        const response = res.data.data;
        setSingleStoreData(response);
        setOperationalHours(response);
      })
  }


  useEffect(()=>{
    FetchStoreData(id);
    LoadListData();
  },[])



  console.log("Store data", operationalHours)




  // geo location
  const [address, setAddress] = useState(SingleStoreData.location?.address);
    // latLot data
  const[latllogAddress, setLatllogAddress] = useState(SingleStoreData.location?.address); // set default address
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


  // start operational hours hooks

  let Sunday = {
    "day": "Sunday",
    "start_time": "10:00:00",
    "no_of_hours": 3,
    "is_open": false
  }

  let Monday = {
    "day": "Monday",
    "start_time": "10:00:00",
    "no_of_hours": 3,
    "is_open": false
  }

  let Tuesday = {
    "day": "Tuesday",
    "start_time": "10:00:00",
    "no_of_hours": 3,
    "is_open": false
  }


  let Wednesday = {
    "day": "Wednesday",
    "start_time": "10:00:00",
    "no_of_hours": 3,
    "is_open": false
  }



  let Thursday = {
    "day": "Thursday",
    "start_time": "10:00:00",
    "no_of_hours": 3,
    "is_open": false
  }


  let Friday = {
    "day": "Friday",
    "start_time": "10:00:00",
    "no_of_hours": 3,
    "is_open": false
  }

  let Saturday = {
    "day": "Saturday",
    "start_time": "10:00:00",
    "no_of_hours": 3,
    "is_open": false
  }



  var [operationalHours, setOperationalHours] = useState([]);

  const [sundayStart, setSundayStart] = useState();
  const [sundayClose, setSundayClose] = useState();

  const [sundayIsOpen, setSundayIsOpen] = useState();
  const [mondayIsopen, setMondayIsOpen] = useState();
  const [tuesdayIsOpen, setTuesdayIsOpen] = useState();
  const [wednesdayIsOpen, setWednesdayIsOpen] = useState();
  const [thursdayIsOpen, setThursdayIsOpen] = useState();
  const [fridayIsOpen, setFridayIsOpen] = useState();
  const [saturdayIsOpen, setSaturdayIsOpen] = useState();

  

  // operational hours days objects


  const SundayTogglerHandeler = (data)=>{
    let result;
    if(data === 0 || data === "0"){
      result = 1;
      setOperationalHours([...operationalHours, Sunday])
    }
    if(data === 1 || data === "1"){
      result = 0
      setOperationalHours(operationalHours.filter(data => data.day !== "Sunday"));
    }
    setSundayIsOpen(result);
  }


  const MondayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
      setOperationalHours([...operationalHours, Monday])
    }
    if(data === 1){
      result = 0
      setOperationalHours(operationalHours.filter(data => data.day !== "Monday"));
    }
    setMondayIsOpen(result);
 
  }

  const TuesdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0 || data === "0"){
      result = 1;
      setOperationalHours([...operationalHours, Tuesday])
    }
    if(data === 1 || data === "1" ){
      result = 0
      setOperationalHours(operationalHours.filter(data => data.day !== "Tuesday"));
    }
    setTuesdayIsOpen(result);
  }

  const WednesdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
      setOperationalHours([...operationalHours, Wednesday])
    }
    if(data === 1){
      result = 0
      setOperationalHours(operationalHours.filter(data => data.day !== "Wednesday"));
    }
    setWednesdayIsOpen(result);
  }

  const ThursdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
      setOperationalHours([...operationalHours, Thursday])
    }
    if(data === 1){
      result = 0
      setOperationalHours(operationalHours.filter(data => data.day !== "Thursday"));
    }
    setThursdayIsOpen(result);
  }

  const FridayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
      setOperationalHours([...operationalHours, Friday])
    }
    if(data === 1){
      result = 0
      setOperationalHours(operationalHours.filter(data => data.day !== "Friday"));
    }
    setFridayIsOpen(result);
  }

  const SaturdayTogglerHandeler = (data)=>{
    let result;
    if(data === 0){
      result = 1;
      setOperationalHours([...operationalHours, Saturday])
    }
    if(data === 1){
      result = 0
      setOperationalHours(operationalHours.filter(data => data.day !== "Saturday"));
    }
    setSaturdayIsOpen(result);
  }
 
  // const FoodList = useSelector(state => state.FetchFoodList.data);
  // const CusineList = useSelector(state => state.FetchCuisineList.data)

  //  console.log("operationalHours " , operationalHours);
  

  
  const StoreSchema = Yup.object().shape({
    store_name: Yup.string().required('Store Name is required'),
    description: Yup.string().required('Description is required').max(150, "Maximum 150 Characters "),
    max_delivery_km : Yup.string().required("Delivery KM is required"),
    contact_no : Yup.string().required("Contact Number is required").min(9,"Minimum 9 Digit").max(11,"Maximum 11 Digit"),
    additional_info : Yup.string().required('Additional Information is required'),
    country : Yup.string().required('Country is required').nullable(),
    city : Yup.string().required('City is required').nullable(),
    cuisines : Yup.array().required("Cusine is required").nullable(),
    foodType : Yup.array().required("Food Type is required").nullable(),

    // saturday_start_time : Yup.string().required("Start Time is required"),
    // saturday_close_time : Yup.string().required("Close Time is required"),
  
    // sunday_start_time : Yup.string().required("Start Time is required"),
    // sunday_close_time : Yup.string().required("Close Time is required"),

    // monday_start_time : Yup.string().required("Start Time is required"),
    // monday_close_time : Yup.string().required("Close Time is required"),

    // tuesday_start_time : Yup.string().required("Start Time is required"),
    // tuesday_close_time : Yup.string().required("Close Time is required"),

    // wednesday_start_time : Yup.string().required("Start Time is required"),
    // wednesday_close_time : Yup.string().required("Close Time is required"),

    // thursday_start_time : Yup.string().required("Start Time is required"),
    // thursday_close_time : Yup.string().required("Close Time is required"),

    // friday_start_time : Yup.string().required("Start Time is required"),
    // friday_close_time : Yup.string().required("Close Time is required"),

  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      store_name:  SingleStoreData.store_name? SingleStoreData.store_name : "",
      description : SingleStoreData.description? SingleStoreData.description : "",
      max_delivery_km :  SingleStoreData.max_delivery_km ? SingleStoreData.max_delivery_km : '',
      contact_no :  SingleStoreData.contact_no? SingleStoreData.contact_no : "",
      additional_info : SingleStoreData.additional_info? SingleStoreData.additional_info : "",
      country : SingleStoreData.location ? SingleStoreData.location.country  : " " ,
      city : SingleStoreData.location ? SingleStoreData.location.city  : " " ,
      cuisines : SingleStoreData.cuisines? SingleStoreData.cuisines : "",
      foodType : SingleStoreData.food_types? SingleStoreData.food_types : "",

      // oprational hours
   
      // sunday_start_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Sunday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // sunday_close_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Sunday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // sunday_is_open : SingleStoreData?.operational_hours.find(data => data.day === "Sunday")?.is_open,
      // sunday_no_of_hours : "",

      // monday_start_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Monday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // monday_close_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Monday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // monday_is_open : SingleStoreData?.operational_hours.find(data => data.day === "Monday")?.is_open,
      // monday_no_of_hours : '',
      
      // tuesday_start_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Tuesday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // tuesday_close_time :moment(SingleStoreData?.operational_hours.find(data => data.day === "Tuesday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // tuesday_is_open : SingleStoreData?.operational_hours.find(data => data.day === "Tuesday")?.is_open,
      // tuesday_no_of_hours : '',

      // wednesday_start_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Wednesday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // wednesday_close_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Wednesday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // wednesday_is_open : SingleStoreData?.operational_hours.find(data => data.day === "Wednesday")?.is_open,
      // wednesday_no_of_hours : '',

      // thursday_start_time :  moment(SingleStoreData?.operational_hours.find(data => data.day === "Thursday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // thursday_close_time :  moment(SingleStoreData?.operational_hours.find(data => data.day === "Thursday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // thursday_is_open : SingleStoreData?.operational_hours.find(data => data.day === "Thursday")?.is_open,
      // thursday_no_of_hours : '',

      // friday_start_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Friday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // friday_close_time : moment(SingleStoreData?.operational_hours.find(data => data.day === "Friday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // friday_is_open : SingleStoreData?.operational_hours.find(data => data.day === "Friday")?.is_open,
      // friday_no_of_hours : '',

      // saturday_start_time :  moment(SingleStoreData?.operational_hours.find(data => data.day === "Saturday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // saturday_close_time :  moment(SingleStoreData?.operational_hours.find(data => data.day === "Saturday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // saturday_is_open : SingleStoreData?.operational_hours.find(data => data.day === "Saturday")?.is_open,
      // saturday_no_of_hours : '',

      // social media
      website : SingleStoreData.social_links?SingleStoreData.social_links.website : "" ,
      instagram : SingleStoreData.social_links?SingleStoreData.social_links.instagram : "" ,
      facebook : SingleStoreData.social_links?SingleStoreData.social_links.facebook : "" ,

    },
    validationSchema: StoreSchema,
    onSubmit: (values) => {

      // console.log(values.cuisines)

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
        "additional_info" : values.additional_info,
        "address" : 
            {
                "country" : values.country,
                "city" : values.city,
                "address" : address,
                "latitude" : lat,
                "longitude": lng
            },
        "operational_hours" : operationalHours,
        "social_links" : {
            "website" : values.website,
            "instagram" : values.instagram,
            "facebook" : values.facebook
        },
        "food_types": FoodIds,
        "cuisines" : CuisineIds
    }

    console.log("data", data);

    // setLoading(true);
    // UpdateStore(id, data)
    //   .then(res =>{
    //     setLoading(false);
    //     const response = res.data.message;
    //     navigate(`/dashboard/merchant/store/${id}`, { replace: true });
    //     toast.dark(response);
    //   })
    //   .catch((err)=>{
    //     setLoading(false);
    //     const response = err.response.data.errors.cuisine_name[0];
    //     toast.dark(response);
        
    //   }) 

    }
});


  // console.log("Index of", operationalHours.findIndex(data => data.day === "Monday" ))

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  console.log("monday isopen", values?.tuesday_is_open)

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
                            type="text"
                            label="Additional Information"
                            multiline
                            rows={4}
                            {...getFieldProps('additional_info')}
                            error={Boolean(touched.additional_info && errors.additional_info)}
                            helperText={touched.additional_info && errors.additional_info}
                        />  

                          <TextField
                            fullWidth
                            type = "text"
                            label="Business Contact Number"
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
                              // onChange = {(event, value)=> setSelectedCuisineList(value) }
                              onChange = {(event, value)=>  formik.setFieldValue("cuisines", value) } 
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
                              // onChange = {(event, value)=> setSelectedFoodList(value) }
                              onChange = {(event, value)=>  formik.setFieldValue("foodType", value) } 
                          />  
                          :null}

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