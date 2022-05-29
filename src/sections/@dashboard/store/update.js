import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid,Autocomplete, Switch, Box, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'material-react-toastify';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton
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
  var [operationalHours, setOperationalHours] = useState([]);

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

  // operational hours arry manipulation
  const OperationHoursFiltering = (Hours)=>{
    for(let i =0; i<Hours.length; i++){
      // Hours[i].no_of_hours = moment(Hours[i].start_time , "HH:mm:ss").diff(moment(Hours[i].closing_time , "HH:mm:ss"), "hh");
      Hours[i].no_of_hours = moment.utc(moment(Hours[i].closing_time,"HH:mm:ss").diff(moment(Hours[i].start_time ,"HH:mm:ss"))).format("HH")
      delete Hours[i].closing_time;
    }
    return Hours;
  }



    // shop timing data
  // const [newHours, setNewHours] = useState([]);

  // sunday hooks
  const [sundayStartTime, setSundayStartTime] = useState();
  const [sundayCloseTime, setSundayCloseTime] = useState();
  const [sundayIsOpen, setSundayIsOpen] = useState();

  // monday hooks
  const [mondayStartTime, setMondayStartTime]  = useState();
  const [mondayCloseTime, setMondayCloseTime] = useState();
  const [mondayIsopen, setMondayIsOpen] = useState();

  // tuesday hooks
  const[tuesdayStartTime, setTuesdayStartTime] = useState();
  const[tuesdayCloseTime, setTuesdayCloseTime] = useState();
  const[tuesdayIsOpen, setTuesdayIsOpen] = useState();


  //wednessday hooks
  const [wednesdayStartTime, setWednesdayStartTime] = useState();
  const [wednesdayCloseTime, setWednesdayCloseTime] = useState();
  const [wednesdayIsOpen, setWednesdayIsOpen] = useState();

  //thursday hooks
  const [thursdayStartTime, setThursdayStartTime] = useState();
  const [thursdayCloseTime, setThursdayCloseTime] = useState();
  const [thursdayIsOpen, setThursdayIsOpen] = useState();

  //friday hooks
  const [fridayStartTime, setFridayStartTime] = useState();
  const [fridayCloseTime, setFridayCloseTime] = useState();
  const [fridayIsOpen, setFridayIsOpen] = useState();

  // saturday hooks
  const [saturdayStartTime, setSaturdayStartTime] = useState();
  const [saturdayCloseTime, setSaturdayCloseTime] = useState();
  const [saturdayIsOpen, setSaturdayIsOpen] = useState();


  const FetchStoreData =(id)=>{
    FetchSingleStore(id)
      .then(res =>{
        const response = res.data.data;
        setSingleStoreData(response);
        setOperationalHours(response?.operational_hours);
        setLatllogAddress(response?.location.address)
        setAddress(response?.location.address);
        
        //Sunday data initialize
        setSundayStartTime(response?.operational_hours?.find(data => data.day === "Sunday")?.start_time)
        setSundayCloseTime(response?.operational_hours?.find(data => data.day === "Sunday")?.closing_time)
        setSundayIsOpen(response?.operational_hours?.find(data => data.day === "Sunday")?.is_open?1:0)
        
        //Monday data initialize
        setMondayStartTime(response?.operational_hours?.find(data => data.day === "Monday")?.start_time)
        setMondayCloseTime(response?.operational_hours?.find(data => data.day === "Monday")?.closing_time)
        setMondayIsOpen(response?.operational_hours?.find(data => data.day === "Monday")?.is_open?1:0)
        
        //Tuesday data initialize
        setTuesdayStartTime(response?.operational_hours?.find(data => data.day === "Tuesday")?.start_time)
        setTuesdayCloseTime(response?.operational_hours?.find(data => data.day === "Tuesday")?.closing_time)
        setTuesdayIsOpen(response?.operational_hours?.find(data => data.day === "Tuesday")?.is_open?1:0)
        
         //Wednesday data initialize
         setWednesdayStartTime(response?.operational_hours?.find(data => data.day === "Wednesday")?.start_time)
         setWednesdayCloseTime(response?.operational_hours?.find(data => data.day === "Wednesday")?.closing_time)
         setWednesdayIsOpen(response?.operational_hours?.find(data => data.day === "Wednesday")?.is_open?1:0)
         

        //Thursday data initialize
         setThursdayStartTime(response?.operational_hours?.find(data => data.day === "Thursday")?.start_time)
         setThursdayCloseTime(response?.operational_hours?.find(data => data.day === "Thursday")?.closing_time)
         setThursdayIsOpen(response?.operational_hours?.find(data => data.day === "Thursday")?.is_open?1:0)
         
        //Friday data initialize
         setFridayStartTime(response?.operational_hours?.find(data => data.day === "Friday")?.start_time)
         setFridayCloseTime(response?.operational_hours?.find(data => data.day === "Friday")?.closing_time)
         setFridayIsOpen(response?.operational_hours?.find(data => data.day === "Friday")?.is_open?1:0)
         
         //Saturday data initialize
         setSaturdayStartTime(response?.operational_hours?.find(data => data.day === "Saturday")?.start_time)
         setSaturdayCloseTime(response?.operational_hours?.find(data => data.day === "Saturday")?.closing_time)
         setSaturdayIsOpen(response?.operational_hours?.find(data => data.day === "Saturday")?.is_open?1:0)
         
        // fetch shop status
        // setSundayIsOpen(response.operational_hours?.find(data => data.day === "Sunday")?.is_open) 
      })
  }

  useEffect(()=>{
    FetchStoreData(id);
    LoadListData();
    setAddress()
  },[])


  // console.log("Closing time", sundayCloseTime)


  // geo location
  const [address, setAddress] = useState();
    // latLot data
  const[latllogAddress, setLatllogAddress] = useState(); // set default address
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
  // console.log(address)




  // start operational hours hooks

  let Sunday = {
    "day": "Sunday",
    "start_time": sundayStartTime,
    "closing_time": sundayCloseTime,
    "is_open": sundayIsOpen
  }

  let Monday = {
    "day": "Monday",
    "start_time": mondayStartTime,
    "closing_time": mondayCloseTime,
    "is_open": tuesdayIsOpen
  }

  let Tuesday = {
    "day": "Tuesday",
    "start_time": tuesdayStartTime,
    "closing_time": tuesdayCloseTime,
    "is_open": tuesdayIsOpen
  }


  let Wednesday = {
    "day": "Wednesday",
    "start_time": wednesdayStartTime,
    "closing_time": wednesdayCloseTime,
    "is_open": wednesdayIsOpen
  }

  let Thursday = {
    "day": "Thursday",
    "start_time": thursdayStartTime,
    "closing_time": thursdayCloseTime,
    "is_open": thursdayIsOpen
  }

  let Friday = {
    "day": "Friday",
    "start_time": fridayStartTime,
    "closing_time": fridayCloseTime,
    "is_open": fridayIsOpen
  }

  let Saturday = {
    "day": "Saturday",
    "start_time": saturdayStartTime,
    "no_of_hours": saturdayCloseTime,
    "is_open": saturdayIsOpen,
  }

  // update operational hours


  // operational hours days objects

  // Sunday configuration functions

  const SundayStartTimeHandler =(e)=>{
    setSundayStartTime(e.target.value);
  }

  const SundayCloseTimeHandler =(e)=>{
    setSundayCloseTime(e.target.value);
  }

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
    return 0;
  }


  // monday handler
  const MondayStartTimeHandler  = (e)=>{
    setMondayStartTime(e.target.value)
  }

  const MondayCloseTimeHandler  = (e)=>{
    setMondayCloseTime(e.target.value)
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

  // Tuesday handler
  const TuesdayStartTimeHandler  = (e)=>{
    setTuesdayStartTime(e.target.value)
  }

  const TuesdayCloseimeHandler  = (e)=>{
    setTuesdayCloseTime(e.target.value)
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

  // Wednesday handler
  const WednesdayStartTimeHandler  = (e)=>{
    setWednesdayStartTime(e.target.value)
  }

  const WednesdayCloseTimeHandler  = (e)=>{
    setWednesdayCloseTime(e.target.value)
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


   // Wednesday handler
   const ThursdayStartTimeHandler  = (e)=>{
    setThursdayStartTime(e.target.value)
  }

  const ThursdayCloseTimeHandler  = (e)=>{
    setThursdayCloseTime(e.target.value)
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


    // Friday handler
    const FridayStartTimeHandler  = (e)=>{
      setFridayStartTime(e.target.value)
    }
  
    const FridayCloseTimeHandler  = (e)=>{
      setFridayCloseTime(e.target.value)
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

    // Saturdasy handler
    const SaturdayStartTimeHandler  = (e)=>{
      setSaturdayStartTime(e.target.value)
    }
  
    const SaturdayCloseTimeHandler  = (e)=>{
      setSaturdayCloseTime(e.target.value)
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
   
      // sunday_start_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Sunday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // sunday_close_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Sunday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // sunday_is_open : SingleStoreData?.operational_hours?.find(data => data.day === "Sunday")?.is_open,
      // sunday_no_of_hours : "",

      // monday_start_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Monday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // monday_close_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Monday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // monday_is_open : SingleStoreData?.operational_hours?.find(data => data.day === "Monday")?.is_open,
      // monday_no_of_hours : '',
      
      // tuesday_start_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Tuesday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // tuesday_close_time :moment(SingleStoreData?.operational_hours?.find(data => data.day === "Tuesday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // tuesday_is_open : SingleStoreData?.operational_hours?.find(data => data.day === "Tuesday")?.is_open,
      // tuesday_no_of_hours : '',

      // wednesday_start_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Wednesday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // wednesday_close_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Wednesday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // wednesday_is_open : SingleStoreData?.operational_hours?.find(data => data.day === "Wednesday")?.is_open,
      // wednesday_no_of_hours : '',

      // thursday_start_time :  moment(SingleStoreData?.operational_hours?.find(data => data.day === "Thursday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // thursday_close_time :  moment(SingleStoreData?.operational_hours?.find(data => data.day === "Thursday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // thursday_is_open : SingleStoreData?.operational_hours?.find(data => data.day === "Thursday")?.is_open,
      // thursday_no_of_hours : '',

      // friday_start_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Friday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // friday_close_time : moment(SingleStoreData?.operational_hours?.find(data => data.day === "Friday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // friday_is_open : SingleStoreData?.operational_hours?.find(data => data.day === "Friday")?.is_open,
      // friday_no_of_hours : '',

      // saturday_start_time :  moment(SingleStoreData?.operational_hours?.find(data => data.day === "Saturday")?.start_time, 'hh:mm:ss').format('hh:mm:ss'),
      // saturday_close_time :  moment(SingleStoreData?.operational_hours?.find(data => data.day === "Saturday")?.closing_time, 'hh:mm:ss').format('hh:mm:ss'),
      // saturday_is_open : SingleStoreData?.operational_hours?.find(data => data.day === "Saturday")?.is_open,
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

      // OperationHoursFiltering(operationalHours);


      

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
    //     const response = err.response.data.errors
    //     toast.dark(response);
        
    //   }) 

    }
});


  // console.log("Index of", operationalHours.findIndex(data => data.day === "Monday" ))

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  console.log("wednesday_is_open", values?.wednesday_is_open)

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
                            <label> Sunday {sundayIsOpen} </label> 
                            {/* <label> Open  </label> <Switch onClick={()=>SundayTogglerHandeler(values.sunday_is_open)} defaultChecked = {sundayIsOpen == 1?true:false } /> */}
                            


                            <ToggleButtonGroup
                                size='small'
                                value={sundayIsOpen==1?"ON":"OFF"}
                                exclusive
                                onChange={()=> SundayTogglerHandeler(sundayIsOpen)}
                            >
                                <ToggleButton value="ON">ON</ToggleButton>
                                <ToggleButton value="OFF">OFF</ToggleButton>
                            </ToggleButtonGroup>

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
                                value = {sundayStartTime}
                                onChange = {SundayStartTimeHandler}
                                // {...getFieldProps('sunday_start_time')}
                                // error={Boolean(touched.sunday_start_time && errors.sunday_start_time)}
                                // helperText={touched.sunday_start_time && errors.sunday_start_time}
                            />  

                            <TextField
                               fullWidth
                               InputLabelProps={{
                                 shrink: true,
                               }}
                               type= "time"
                               label="Close Time"
                               value = {sundayCloseTime}
                               onChange = {SundayCloseTimeHandler}
                                // {...getFieldProps('sunday_close_time')}
                                // error={Boolean(touched.sunday_close_time && errors.sunday_close_time)}
                                // helperText={touched.sunday_close_time && errors.sunday_close_time}
                            />  
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Monday {mondayIsopen}</label> 
                            {/* <label> Open <Switch onChange={()=>MondayTogglerHandeler(values.monday_is_open)}  defaultChecked  = {values.monday_is_open == 1? true : false}  /></label>  */}
                      
                            <ToggleButtonGroup
                                size='small'
                                value={mondayIsopen==1?"ON":"OFF"}
                                exclusive
                                onChange={()=> MondayTogglerHandeler(mondayIsopen)}
                            >
                                <ToggleButton value="ON">ON</ToggleButton>
                                <ToggleButton value="OFF">OFF</ToggleButton>
                            </ToggleButtonGroup>  
                        
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
                                value = {mondayStartTime}
                                onChange = {MondayStartTimeHandler}
                                
                                // {...getFieldProps('monday_start_time')}
                                // error={Boolean(touched.monday_start_time && errors.monday_start_time)}
                                // helperText={touched.monday_start_time && errors.monday_start_time}
                            />  

                            <TextField
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                value = {mondayCloseTime}
                                onChange = {MondayCloseTimeHandler}
                                // {...getFieldProps('monday_close_time')}
                                // error={Boolean(touched.monday_close_time && errors.monday_close_time)}
                                // helperText={touched.monday_close_time && errors.monday_close_time}
                            />  
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Tuesday {values.tuesday_is_open}</label> 
                            {/* <label> Open <Switch onChange={()=>TuesdayTogglerHandeler(values.tuesday_is_open)} defaultChecked  = {values.tuesday_is_open == 1? true : false}  /></label>  */}
                            
                            <ToggleButtonGroup
                                size='small'
                                value={tuesdayIsOpen==1?"ON":"OFF"}
                                exclusive
                                onChange={()=> TuesdayTogglerHandeler(tuesdayIsOpen)}
                            >
                                <ToggleButton value="ON">ON</ToggleButton>
                                <ToggleButton value="OFF">OFF</ToggleButton>
                            </ToggleButtonGroup> 
                        
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
                                value = {tuesdayStartTime}
                                onChange = {TuesdayStartTimeHandler}
                                // {...getFieldProps('tuesday_start_time')}
                                // error={Boolean(touched.tuesday_start_time && errors.tuesday_start_time)}
                                // helperText={touched.tuesday_start_time && errors.tuesday_start_time}
                            />  

                            <TextField
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                value = {tuesdayCloseTime}
                                onChange = {TuesdayCloseimeHandler}
                                // {...getFieldProps('tuesday_close_time')}
                                // error={Boolean(touched.tuesday_close_time && errors.tuesday_close_time)}
                                // helperText={touched.tuesday_close_time && errors.tuesday_close_time}
                            />  
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Wednesday {values.wednesday_is_open} </label> 
                            {/* <label> Open <Switch onChange={()=>WednesdayTogglerHandeler(values.wednesday_is_open)}  defaultChecked  = {values.wednesday_is_open == "1"? true : false}  /></label>  */}
                              
                            <ToggleButtonGroup
                                size='small'
                                value={wednesdayIsOpen==1?"ON":"OFF"}
                                exclusive
                                onChange={()=> WednesdayTogglerHandeler(wednesdayIsOpen)}
                            >
                                <ToggleButton value="ON">ON</ToggleButton>
                                <ToggleButton value="OFF">OFF</ToggleButton>
                            </ToggleButtonGroup>  
                        
                        
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
                                value = {wednesdayStartTime}
                                onChange = {WednesdayStartTimeHandler}
                                // {...getFieldProps('wednesday_start_time')}
                                // error={Boolean(touched.wednesday_start_time && errors.wednesday_start_time)}
                                // helperText={touched.wednesday_start_time && errors.wednesday_start_time}
                            />  

                            <TextField
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                value = {wednesdayCloseTime}
                                onChange = {WednesdayCloseTimeHandler}
                                // {...getFieldProps('wednesday_close_time')}
                                // error={Boolean(touched.wednesday_close_time && errors.wednesday_close_time)}
                                // helperText={touched.wednesday_close_time && errors.wednesday_close_time}
                            />  
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Thursday {values.thursday_is_open} </label> 
                            {/* <label> Open <Switch onChange={()=>ThursdayTogglerHandeler(values.thursday_is_open)} defaultChecked  = {values.thursday_is_open == 1? true : false}  /></label>  */}
                            <ToggleButtonGroup
                                size='small'
                                value={thursdayIsOpen==1?"ON":"OFF"}
                                exclusive
                                onChange={()=> ThursdayTogglerHandeler(thursdayIsOpen)}
                            >
                                <ToggleButton value="ON">ON</ToggleButton>
                                <ToggleButton value="OFF">OFF</ToggleButton>
                            </ToggleButtonGroup> 
                        
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
                                value = {thursdayStartTime}
                                onChange = {ThursdayStartTimeHandler}
                                // {...getFieldProps('thursday_start_time')}
                                // error={Boolean(touched.thursday_start_time && errors.thursday_start_time)}
                                // helperText={touched.thursday_start_time && errors.thursday_start_time}
                            />  

                            <TextField
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                value = {thursdayCloseTime}
                                onChange = {ThursdayCloseTimeHandler}
                                // {...getFieldProps('thursday_close_time')}
                                // error={Boolean(touched.thursday_close_time && errors.thursday_close_time)}
                                // helperText={touched.thursday_close_time && errors.thursday_close_time}
                            />  
                        </Stack>



                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Friday {values.friday_is_open}</label> 
                            {/* <label> Open <Switch onChange={()=>FridayTogglerHandeler(values.friday_is_open)} defaultChecked  = {values.friday_is_open == 1? true : false}  /></label>  */}
                            
                            <ToggleButtonGroup
                                size='small'
                                value={fridayIsOpen==1?"ON":"OFF"}
                                exclusive
                                onChange={()=> FridayTogglerHandeler(fridayIsOpen)}
                            >
                                <ToggleButton value="ON">ON</ToggleButton>
                                <ToggleButton value="OFF">OFF</ToggleButton>
                            </ToggleButtonGroup> 
                       
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
                                value = {fridayStartTime}
                                onChange = {FridayStartTimeHandler}
                                // {...getFieldProps('friday_start_time')}
                                // error={Boolean(touched.friday_start_time && errors.friday_start_time)}
                                // helperText={touched.friday_start_time && errors.friday_start_time}
                            />  

                            <TextField
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Start Time"
                                value = {fridayCloseTime}
                                onChange = {FridayCloseTimeHandler}
                                // {...getFieldProps('friday_close_time')}
                                // error={Boolean(touched.friday_close_time && errors.friday_close_time)}
                                // helperText={touched.friday_close_time && errors.friday_close_time}
                            />  
                        </Stack>
                        
                        
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            margin={0}
                        >
                            <label> Saturday {values.saturday_is_open}</label> 
                            {/* <label> Open <Switch onChange={()=>SaturdayTogglerHandeler(values.saturday_is_open)} defaultChecked  = {values.saturday_is_open == 1? true : false}  /></label>  */}
                            <ToggleButtonGroup
                                size='small'
                                value={saturdayIsOpen==1?"ON":"OFF"}
                                exclusive
                                onChange={()=> SaturdayTogglerHandeler(saturdayIsOpen)}
                            >
                                <ToggleButton value="ON">ON</ToggleButton>
                                <ToggleButton value="OFF">OFF</ToggleButton>
                            </ToggleButtonGroup> 
                        
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
                                value = {saturdayStartTime}
                                onChange = {SaturdayStartTimeHandler}
                                // {...getFieldProps('saturday_start_time')}
                                // error={Boolean(touched.saturday_start_time && errors.saturday_start_time)}
                                // helperText={touched.saturday_start_time && errors.saturday_start_time}
                            />  

                            <TextField
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type= "time"
                                label="Close Time"
                                value = {saturdayCloseTime}
                                onChange = {SaturdayCloseTimeHandler}
                                // {...getFieldProps('saturday_close_time')}
                                // error={Boolean(touched.saturday_close_time && errors.saturday_close_time)}
                                // helperText={touched.saturday_close_time && errors.saturday_close_time}
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