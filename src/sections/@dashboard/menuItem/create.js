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
import {AddMenu} from '../../../redux/menu/add/action';
import {FetchCuisineTypeList , FetchFoodTypeList, CategoryList} from '../../../redux/merchantStore/other/actions';

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
  const loading = useSelector(state => state.AddMenu.loading);

  const [inputFields, setInputFields] = useState([
    { name: '', price: '' },
  ])

  console.log(inputFields)

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
 }

  console.log(inputFields)
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
    food_type_id: Yup.string().required('Food Type is required'),
    cuisine_type_id: Yup.string().required('Cuisine Type is required'),
    category_id: Yup.string().required('Category is required'),
    restaurant_id : Yup.string().required('Restaurant Id is required'),
    food_item_type: Yup.string().required('Food Item Type is required'),
    food_item_estimate_days :Yup.string().required('Estimate Days are required')
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      name : '',
      price : '',
      food_type_id : selectedFoodList?.id,
      cuisine_type_id : selectedCuisine?.id,
      category_id : selectedCategory?.id,
      food_item_type  : '',
      food_item_estimate_days : '',
      restaurant_id : id,
      addons : '',
      variationHalf : '',
      variationFull : ''
    },

    validationSchema: MenuItemSchema,
    onSubmit: (values) => {
      // console.log(values)

      const data = {
        name : values.name,
        price : values.price,
        food_type_id : selectedFoodList.id,
        cuisine_id : selectedCuisine.id,
        category_id : selectedCategory.id,
        food_item_type : values.food_item_type,
        food_item_estimate_days : values.food_item_estimate_days,
        restaurant_id : values.restaurant_id,
        food_addons : inputFields,
        food_variations : {
            "full" : values.variationFull,
            "half" : values.variationHalf
          },
        image : "",
      }

      console.log(data)

      AddMenu(data)
        .then(res =>{
          const response = res.data.message;
          console.log(response);
          toast.dark(response)
          navigate(`/dashboard/merchant/menu/${id}`, { replace: true });
        })
        .catch((err)=>{
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
          Add New Item
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
                              label="Price"
                              {...getFieldProps('price')}
                              error={Boolean(touched.price && errors.price)}
                              helperText={touched.price && errors.price}
                          />

                          <Autocomplete
                              // multiple
                              options={foodList}
                              getOptionLabel = {(option)=> option.food_type_name}
                              renderInput = {(option)=> 
                                  <TextField {...option} 
                                      label ="Food Type" 
                                      {...getFieldProps('food_type_id')}
                                      value = {values?.food_type_name}
                                      error={Boolean(touched.food_type_id && errors.food_type_id)}
                                      helperText={touched.food_type_id && errors.food_type_id}
                                  /> }
                              onChange = {(event, value)=> setSelectedFoodList(value) }

                          />  

                          <Autocomplete
                              options={cuisineList}
                              // defaultValue = {["new", "old"]}
                              getOptionLabel = {(option)=> option.cuisine_name}
                              renderInput = {(option)=> 
                                  <TextField 
                                      {...option} 
                                      label ="Cuisine Type"
                                
                                      {...getFieldProps('cuisine_type_id')}
                                      error={Boolean(touched.cuisine_type_id && errors.cuisine_type_id)}
                                      helperText={touched.cuisine_type_id && errors.cuisine_type_id} 

                                  /> }
                              onChange = {(event, value)=> setSelectedCuisineList(value) }
                          />
                          <Autocomplete
                              // multiple
                              options={categoryList}
                              // defaultValue = {["new", "old"]}
                              getOptionLabel = {(option)=> option.name}
                              renderInput = {(option)=> 
                                  <TextField 
                                    {...option} 
                                    label ="Category" 
                                    
                                    {...getFieldProps('category_id')}
                                    error={Boolean(touched.category_id && errors.category_id)}
                                    helperText={touched.category_id && errors.category_id} 
                                    /> }
                              onChange = {(event, value)=> setSelectedCategoryList(value) }
                          />

                          <TextField
                            fullWidth
                            select
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
                            type="number"
                            label="food Item Estimate Days"
                            {...getFieldProps('food_item_estimate_days')}
                            error={Boolean(touched.food_item_estimate_days && errors.food_item_estimate_days)}
                            helperText={touched.food_item_estimate_days && errors.food_item_estimate_days}
                        /> 

                        <TextField
                            fullWidth
                            type="number"
                            label="Restaurant ID"
                            {...getFieldProps('restaurant_id')}
                            error={Boolean(touched.restaurant_id && errors.restaurant_id)}
                            helperText={touched.restaurant_id && errors.restaurant_id}
                        />

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
