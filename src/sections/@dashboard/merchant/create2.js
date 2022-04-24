import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Typography, Autocomplete } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
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

// ----------------------------------------------------------------------

const FoodType = ['Burgers', 'Nasi Lemak', 'Ice Latte', 'Sushi', 'Fried Chicken'];
const Cuisines = ['Asian', 'Western', 'Arabian', 'Russian'];
const Category = ['Category 1', 'Category 2', "Category 3"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

function Create() {
  const navigate = useNavigate();
  // const theme = useTheme()
  const [address, setAddress] = useState('');


     // latLot data
  const[latllogAddress, setLatllogAddress] = useState();
  const[location , setLocation] = useState();
  const[lat, setLat] = useState();
  const[lng, setLng] = useState();

  const handleSelect = async values => {
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







  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    SSM_Number: Yup.string().required('SSM Number is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword : Yup.string().required("Confirm Password is required"),
    description: Yup.string().required('Description is required'),
    foodType: Yup.string().required('Food Type is required'),
    maxDeliveryKM : Yup.string().required(' Max Delivery KM  is required'),
    customerContactNumber : Yup.string().required('Customer Contact Number is required'),
    foodPrice: Yup.string().required('Food Price is required'),
    cusine: Yup.string().required('Cusine  is required'),
    category: Yup.string().required('Category  is required'),
    walletBalance : Yup.string().required('Wallet Balance  is required'),
    socialLink : Yup.string().required('Social Link is required'),
    status : Yup.string().required('Status is required'),
    featuredBanner : Yup.string().required('Status is required'),
    location : Yup.string().required('Location is required'),
    operationalHours : Yup.string().required('Operational Hours is required'),
  });

  const formik = useFormik({
    initialValues: {
      name : '',
      SSM_Number : '',
      email : '',
      phoneNumber : '',
      password : '',
      confirmPassword : '',
      description : '',
      foodPrice : '',
      foodType : '',
      cusine : '',
      category : '',
      maxDeliveryKM : '',
      customerContactNumber : '',
      walletBalance : '',
      socialLink : '',
      status : '',
      featuredBanner: '',
      location : '',
      operationalHours : '',
      addons : '',
      variation : '',
    },

    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values)
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



  // - Location    need identify geolocation 
  

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Add Merchant
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
                        <Stack style={{ width : "450px" }} spacing={3}>
                          <TextField
                              fullWidth
                              type="text"
                              label="Name"
                              {...getFieldProps('name')}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                          />
                          <TextField
                              fullWidth
                              type="number"
                              label="IC/SSM Number"
                              {...getFieldProps('SSM_Number')}
                              error={Boolean(touched.SSM_Number && errors.SSM_Number)}
                              helperText={touched.SSM_Number && errors.SSM_Number}
                          />
                          <TextField
                              fullWidth
                              type="email"
                              label="Email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                          />
                          <TextField
                              fullWidth
                              type="number"
                              label="Phone Number"
                              {...getFieldProps('phoneNumber')}
                              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
                          />
                          <TextField
                              fullWidth
                              type="password"
                              label="Password"
                              {...getFieldProps('password')}
                              error={Boolean(touched.password && errors.password)}
                              helperText={touched.password && errors.password}
                          />
                          <TextField
                              fullWidth
                              type="password"
                              label="Confirm Password"
                              {...getFieldProps('confirmPassword')}
                              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                              helperText={touched.confirmPassword && errors.confirmPassword}
                          />
                          <TextField
                              fullWidth
                              type="number"
                              label="Max Delivery KM"
                              {...getFieldProps('maxDeliveryKM')}
                              error={Boolean(touched.maxDeliveryKM && errors.maxDeliveryKM)}
                              helperText={touched.maxDeliveryKM && errors.maxDeliveryKM}
                          />
                           <TextField
                              fullWidth
                              type="number"
                              label="Customer Contact Number"
                              {...getFieldProps('customerContactNumber')}
                              error={Boolean(touched.customerContactNumber && errors.customerContactNumber)}
                              helperText={touched.customerContactNumber && errors.customerContactNumber}
                          />
                          <TextField
                              fullWidth
                              type="number"
                              label="Wallet Balance"
                              {...getFieldProps('walletBalance')}
                              error={Boolean(touched.walletBalance && errors.walletBalance)}
                              helperText={touched.walletBalance && errors.walletBalance}
                          />
                          <TextField
                              fullWidth
                              type="text"
                              label="Social Link (Facebook, Instagram, Web)"
                              {...getFieldProps('socialLink')}
                              error={Boolean(touched.socialLink && errors.socialLink)}
                              helperText={touched.socialLink && errors.socialLink}
                          />
                          <TextField
                            fullWidth
                            select
                            label="status"
                            {...getFieldProps('status')}
                            error={Boolean(touched.status && errors.status)}
                            helperText={touched.status && errors.status}
                          >    
                            <MenuItem value= "true">Active</MenuItem>
                            <MenuItem value= "false">Inactive</MenuItem>
                        </TextField>
                        <TextField
                              fullWidth
                              type="number"
                              label="Featured Banner(Max 4)"
                              {...getFieldProps('featuredBanner')}
                              error={Boolean(touched.featuredBanner && errors.featuredBanner)}
                              helperText={touched.featuredBanner && errors.featuredBanner}
                          />
                          <PlacesAutocomplete
                              value= {latllogAddress}
                              onChange = {setLatllogAddress}
                              onSelect = {handleSelect}
                              highlightFirstSuggestion = {true}
                            >
                              {({ getInputProps, suggestions, getSuggestionItemProps, loading})=> 
                                <div>
                                    <TextField 
                                      fullWidth
                                      {...getFieldProps('location')}
                                      error={Boolean(touched.location && errors.location)}
                                      helperText={touched.location && errors.location}
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
                          {/* <TextField
                              fullWidth
                              type="number"
                              label="Location"
                              {...getFieldProps('location')}
                              error={Boolean(touched.location && errors.location)}
                              helperText={touched.location && errors.location}
                          /> */}
                          <TextField
                              fullWidth
                              type="number"
                              label="Operational hours(Monday to Sunday)"
                              {...getFieldProps('operationalHours')}
                              error={Boolean(touched.operationalHours && errors.operationalHours)}
                              helperText={touched.operationalHours && errors.operationalHours}
                          />
                        <TextField
                            fullWidth
                            type="text"
                            label="Description"
                            multiline
                            rows={4}
                            inputProps={{ maxLength: 150 }}
                            {...getFieldProps('description')}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                        />
                        <Autocomplete
                          fullWidth
                          options={FoodType}
                          {...getFieldProps('foodType')}
                          error={Boolean(touched.foodType && errors.foodType)}
                          helperText={touched.foodType && errors.foodType}
                          renderInput={(params) => <TextField {...params} label="Food Type" />}
                        />
                        <Autocomplete
                          fullWidth
                          options={Cuisines}
                          {...getFieldProps('cuisine')}
                          error={Boolean(touched.cusine && errors.cusine)}
                          helperText={touched.cusine && errors.cusine}
                          renderInput={(params) => <TextField {...params} label="Cusine Type" />}
                        />
                        <Autocomplete
                        // multiple
                          fullWidth
                          options={Category}
                          {...getFieldProps('category')}
                          error={Boolean(touched.cusine && errors.cusine)}
                          helperText={touched.cusine && errors.cusine}
                          renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Add
                        </LoadingButton>
                        </Stack>
                    </Form>
                </FormikProvider>
            </Grid>   
         </Grid>
    </> 
  );
}

export default Create;