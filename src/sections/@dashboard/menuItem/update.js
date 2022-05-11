

import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Autocomplete } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'material-react-toastify';
import DeleteIcon from  '@mui/icons-material/Delete'
import AddCircleIcon from  '@mui/icons-material/AddCircle';

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
import {FetchCuisineTypeList , FetchFoodTypeList, CategoryList} from '../../../redux/merchantStore/other/actions';
import { FetchSingleMenu} from '../../../redux/menu/fetchSingle/action';
import {UpdateMenu} from '../../../redux/menu/update/action';

// ----------------------------------------------------------------------

// const FoodType = ['Burgers', 'Nasi Lemak', 'Ice Latte', 'Sushi', 'Fried Chicken'];
// const Cuisines = ['Asian', 'Western', 'Arabian', 'Russian'];
// const Category = ['Category 1', 'Category 2', "Category 3"];
// const Addons = ['Addon 1','Addon 2','Addon 3','Addon 4','Addon 5'];
// const Variations = ['Variation 1', 'Variation 2','Variation 3','Variation 4', 'Variation 5']

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

export default function Create() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [SingleMenu, setSingleMenu] = useState([]);

  const [inputFields, setInputFields] = useState([
    { name: '', price: '' },
  ])


  const FetchMenu = (id)=>{
    FetchSingleMenu(id)
      .then((res)=>{
          const response = res.data.data;
          setSingleMenu(response)
      })
  }

  useEffect(()=>{
    FetchMenu(id)
  },[])
 
  console.log("single menu", SingleMenu)

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
 }

  // console.log(inputFields)
  const addFields = (e) => {
    e.preventDefault();
    let newfield = { name: '', price: '' }
    setInputFields([...inputFields, newfield])
}

const removeFields = (index) => {
  index.preventDefault();
  let data = [...inputFields];
  data.splice(index, 1)
  setInputFields(data)
}

  const[foodList, setFoodList] = useState([]);
  const[selectedFoodList, setSelectedFoodList] = useState();
  const[cuisineList, setCuisineList] = useState([]);
  const[selectedCuisine, setSelectedCuisineList] = useState();
  const[categoryList, setCategoryList] = useState([]);
  const[selectedCategory, setSelectedCategoryList] = useState();


      // console.log("selectedFoodList", selectedFoodList)
 

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

      CategoryList()
      .then(res =>{
        const response = res.data.data;
        setCategoryList(response);
      })  
  }

  useEffect(()=>{
    LoadListData();
  },[])

 
  // // const theme = useTheme()
  // const [addons, setAddons] = useState([]);
  // const [variations, setVariations] = useState([]);


  // const handleAddonsChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setAddons(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };


  // const handleVariationsChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setVariations(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  const MenuItemSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.string().required('Price is required'),
    description : Yup.string().required("Description is required").max(100, "Maximum 100 Characters"),
    food_types: Yup.mixed().required('Food Type is required').nullable(),
    cuisine_types: Yup.mixed().required('Cuisine Type is required').nullable(),
    categories: Yup.mixed().required('Category is required').nullable(),
    food_item_type: Yup.string().required('Food Item Type is required'),
    food_item_estimate_days :Yup.string().required('Estimate Days are required'),
    image : Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      name : SingleMenu?.name,
      price : SingleMenu?.price,
      description : SingleMenu?.description,
      food_types : SingleMenu?.food_type,
      cuisine_types : SingleMenu?.cuisine,
      categories : SingleMenu?.category,
      image : null,
      food_item_type  : SingleMenu.food_item_type === "Food Item"?1 : 2,
      food_item_estimate_days : SingleMenu?.food_item_estimate_days,
      restaurant_id : SingleMenu.store?.id,
      addons : '',
      variationHalf : '',
      variationFull : ''
    },

    validationSchema: MenuItemSchema,
    onSubmit: (values) => {
 
      // const data = {
      //   name : values.name,
      //   price : values.price,
      //   description : values.description,
      //   food_type_id : values.food_types.id,
      //   cuisine_id : values.cuisine_types.id,
      //   category_id : values.categories.id,
      //   food_item_type : values.food_item_type,
      //   food_item_estimate_days : values.food_item_estimate_days,
      //   restaurant_id : id,
      //   food_addons : inputFields,
      //   food_variations : {
      //       "full" : values.variationFull,
      //       "half" : values.variationHalf
      //     },
      //   image : "",
      // }

      const data = new FormData();
      data.append('name', values.name);
      data.append('price', values.price);
      data.append('description', values.description);
      data.append('food_type_id', values.food_types.id);
      data.append("cuisine_id", values.cuisine_types.id);
      data.append("category_id", values.categories.id)
      data.append("food_item_type",  values.food_item_type);
      data.append("food_item_estimate_days", values.food_item_estimate_days);
      data.append("restaurant_id", values.restaurant_id);
      data.append(inputFields, "food_addons");
      data.append([{"full" : values.variationFull, "half" : values.variationHalf }], 'food_variations')
      data.append('image', values.image);

      // console.log(data)

      setLoading(true);
      UpdateMenu(id, data)
        .then(res =>{
          const response = res.data.message;
          setLoading(false);
          toast.dark(response)
          navigate(`/dashboard/merchant/menu/${values.restaurant_id}`, { replace: true });
        })
        .catch((err)=>{
          setLoading(false);
          const errors = err.response.data.message;
          const ddd = err.response.data.errors?.name[0];
          toast.error(ddd?ddd : errors)
        })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Menu Item
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
                              InputLabelProps={{
                                 shrink : true                                
                              }}
                              
                              type="text"
                              label="Name"
                              {...getFieldProps('name')}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                          />

                          <TextField
                              fullWidth
                              InputLabelProps={{
                                shrink : true                                
                             }}
                              type="number"
                              label="Price"
                              {...getFieldProps('price')}
                              error={Boolean(touched.price && errors.price)}
                              helperText={touched.price && errors.price}
                          />

                            <TextField
                              fullWidth
                              InputLabelProps={{
                                shrink : true                                
                             }}
                              type="text"
                              label="Description"
                              multiline
                              rows={4}
                              {...getFieldProps('description')}
                              error={Boolean(touched.description && errors.description)}
                              helperText={touched.description && errors.description}
                          />

                          {values.food_types? 
                          <Autocomplete
                              options={foodList}
                              disableClearable
                              getOptionLabel = {(option)=> option.food_type_name}
                              defaultValue = {values.food_types}
                              getOptionSelected={(option, value) => option.food_type_name === value.food_type_name}
                              onChange = {(event, value)=>  formik.setFieldValue("food_types", value) }  
                              renderInput = {(option)=> 
                                  <TextField 
                                      {...option} 
                                      label ="Food Type" 
                                      error={Boolean(touched.food_types && errors.food_types)}
                                      helperText={touched.food_types && errors.food_types}
                                  /> }
                          />  
                          : null}

                         {values.cuisine_types? 
                          <Autocomplete
                              // multiple
                              fullWidth
                              limitTags={1}
                              options={cuisineList}
                              getOptionLabel = {(option)=> option.cuisine_name || option.name}
                              defaultValue = {values.cuisine_types}
                              getOptionSelected={(option, value) => option.name === value.name}
                              onChange = {(event, value)=>  formik.setFieldValue("cuisine_types", value) } 
                              renderInput = {(option)=> 
                                  <TextField 
                                      {...option} 
                                      label ="Cuisine Type"
                                      error={Boolean(touched.cuisine_types && errors.cuisine_types)}
                                      helperText={touched.cuisine_types && errors.cuisine_types} 

                                  /> }
                          />
                          : null}

                          {values.categories? 
                          <Autocomplete
                              // multiple
                              limitTags={1}
                              options={categoryList}
                              // defaultValue = {["new", "old"]}
                              getOptionLabel = {(option)=> option.name}
                              defaultValue = {values.categories}
                              getOptionSelected={(option, value) => option.name === value.name}
                              onChange = {(event, value)=>  formik.setFieldValue("categories", value) } 
                              renderInput = {(option)=> 
                                  <TextField 
                                    {...option} 
                                    label ="Category" 
                                    error={Boolean(touched.categories && errors.categories)}
                                    helperText={touched.categories && errors.categories} 
                                    /> }
                          />

                          : null}

                          <TextField
                            fullWidth
                            select
                            InputLabelProps={{
                              shrink : true                                
                           }}
                            label="Food Item Type"
                            {...getFieldProps('food_item_type')}
                            error={Boolean(touched.food_item_type && errors.food_item_type)}
                            helperText={touched.food_item_type && errors.food_item_type}
                        >    
                            <MenuItem value= "1">Food Item</MenuItem>
                            <MenuItem value= "2">Pre Order Item</MenuItem>
                        </TextField> 


                        <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink : true                                
                           }}
                            type="number"
                            label="food Item Estimate Days"
                            {...getFieldProps('food_item_estimate_days')}
                            error={Boolean(touched.food_item_estimate_days && errors.food_item_estimate_days)}
                            helperText={touched.food_item_estimate_days && errors.food_item_estimate_days}
                        /> 

                        {/* <TextField
                            fullWidth
                            type="number"
                            label="Restaurant ID"
                            {...getFieldProps('restaurant_id')}
                            error={Boolean(touched.restaurant_id && errors.restaurant_id)}
                            helperText={touched.restaurant_id && errors.restaurant_id}
                        /> */}

                          <h4 style={{ textAlign : "center" }} > Variation </h4>
                         
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={2}
                          >

                            <TextField
                              fullWidth
                              type="number"
                              label="Half"
                              {...getFieldProps('variationHalf')}
                              error={Boolean(touched.variationHalf && errors.variationHalf)}
                              helperText={touched.variationHalf && errors.variationHalf}
                              
                            />
                            <TextField
                                fullWidth
                                type="number"
                                label="Full"
                                {...getFieldProps('variationFull')}
                                error={Boolean(touched.variationFull && errors.variationFull)}
                                helperText={touched.variationFull && errors.navariationFullme}
                            />
                          </Stack>

                          <h4 style={{ textAlign : "center" }} > Addons </h4>
                          {inputFields.map((input, index) => {
                            return (
                                <div key={index}>
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                    spacing={2}
                                  >
                                      <TextField
                                        name='name'
                                        placeholder='Name'
                                        value={input.name}
                                        onChange={event => handleFormChange(index, event)}
                                      />
                                      <TextField
                                        name='price'
                                        type= "number"
                                        placeholder='Price'
                                        value={input.price}
                                        onChange={event => handleFormChange(index, event)}
                                      />
                                  </Stack>
                                </div>
                              )
                          })}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          margin={0}
                        >
                          <IconButton onClick={addFields} aria-label="delete" size="large">
                            <AddCircleIcon/>
                          </IconButton>
                          {inputFields.length ===0 ? 
                            <IconButton disabled  onClick={(index) => removeFields(index)} aria-label="delete" size="large">
                              <DeleteIcon />
                            </IconButton>
                          : 
                            <IconButton  onClick={(index) => removeFields(index)} aria-label="delete" size="large">
                              <DeleteIcon />
                            </IconButton>
                          }
                        </Stack>

                        <img 
                          src= {SingleMenu.image}
                        />

                          
                        <TextField
                            fullWidth
                            type="file"
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
