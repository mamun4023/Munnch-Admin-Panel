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



function DataFilter(data){
  for(let i = 0; i<data.length; i++){
    delete data[i].created_at;
    delete data[i].store_menu_item_id;
    delete data[i].updated_at;
  }
  return data;
}


export default function Update() {
  const {id} = useParams();
  const [storeId, setStoreId] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [SingleMenu, setSingleMenu] = useState([]);
  const [variationFields, setVariationFields]  = useState([]);
  const [addonFields, setAddonFields] = useState([])

  const FetchMenu = (id)=>{
    FetchSingleMenu(id)
      .then((res)=>{
          const response = res.data.data;
          setSingleMenu(response)
          setStoreId(response.store.id)
          setAddonFields(DataFilter(response?.menu_item_addons));
          setVariationFields(DataFilter(response?.menu_item_variations))
      })
  }

  useEffect(()=>{
    FetchMenu(id)
  },[])
 

    // Variation Handlers
    const handleVariationFormChange = (index, event) => {
      let data = [...variationFields];
      data[index][event.target.name] = event.target.value;
      setVariationFields(data);
   }
  
    const addVariationFields = (e) => {
      e.preventDefault();
      let newfield = { name: '', price: '' }
      setVariationFields([...variationFields, newfield])
    }
  
    const removeVariationFields = (index) => {
      index.preventDefault();
      let data = [...variationFields];
      data.splice(index, 1)
      setVariationFields(data)
    }

  
  // addon Handlers
  const handleAddonFormChange = (index, event) => {
    let data = [...addonFields];
    data[index][event.target.name] = event.target.value;
    setAddonFields(data);
 }

  const addAddonFields = (e) => {
    e.preventDefault();
    let newfield = { name: '', price: '' }
    setAddonFields([...addonFields, newfield])
  }

  const removeAddonFields = (index) => {
    index.preventDefault();
    let data = [...addonFields];
    data.splice(index, 1)
    setAddonFields(data)
  }

  const[foodList, setFoodList] = useState([]);
  const[selectedFoodList, setSelectedFoodList] = useState();
  const[cuisineList, setCuisineList] = useState([]);
  const[selectedCuisine, setSelectedCuisineList] = useState();
  const[categoryList, setCategoryList] = useState([]);
  const[selectedCategory, setSelectedCategoryList] = useState();

  const LoadListData = (storeId)=>{
    FetchCuisineTypeList(storeId)
      .then(res =>{
        const response = res.data.data;
        setCuisineList(response);
      })

    FetchFoodTypeList(storeId)
      .then(res =>{
        const response = res.data.data;
        setFoodList(response);
      })

      CategoryList(storeId)
      .then(res =>{
        const response = res.data.data;
        setCategoryList(response);
      })  
  }

  useEffect(()=>{
    LoadListData(storeId);
  },[storeId])

  const MenuItemSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.string().required('Price is required'),
    description : Yup.string().required("Description is required").max(100, "Maximum 100 Characters"),
    food_types: Yup.mixed().required('Food Type is required').nullable(),
    cuisine_types: Yup.mixed().required('Cuisine Type is required').nullable(),
    categories: Yup.mixed().required('Category is required').nullable(),
    food_item_type: Yup.string().required('Food Item Type is required'),
    food_item_estimate_days :Yup.string().required('Estimate Days are required'),
    image : Yup.mixed()
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
    },

    validationSchema: MenuItemSchema,
    onSubmit: (values) => {
      const form = new FormData();
      form.append("name", values.name);
      form.append("description", values.description);
      form.append("price", values.price);
      form.append("food_type_id", String(values.food_types.id));
      form.append("cuisine_id", String(values.cuisine_types.id));
      form.append("category_id", String(values.categories.id));
      form.append("food_item_type", values.food_item_type)
      if(values.image != null){
        form.append("image", values.image);
      }
      form.append("food_item_estimate_days", values.food_item_estimate_days);
      form.append("restaurant_id", values.restaurant_id);

      if (variationFields?.length) {
        variationFields.forEach((item, index) => {
          form.append(`food_variations[${index}][name]`, item?.name);
          form.append(`food_variations[${index}][price]`, item?.price);
        });
      }
      
      if (addonFields?.length) {
        addonFields.forEach((item, index) => {
          form.append(`food_addons[${index}][name]`, item?.name);
          form.append(`food_addons[${index}][price]`, item?.price);
        });
      }

      setLoading(true);
      UpdateMenu(id, form)
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

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Menu Item
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

                        {
                          values.food_item_type ==="2" || values.food_item_type === 2? 

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
                        : null
                      }

                        <h4 style={{ textAlign : "center" }} > Variation </h4>

                        {variationFields.map((input, index) => {
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
                                        onChange={event => handleVariationFormChange(index, event)}
                                      />
                                      <TextField
                                        name='price'
                                        type= "number"
                                        placeholder='Price'
                                        value={input.price}
                                        onChange={event => handleVariationFormChange(index, event)}
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
                          <IconButton onClick={addVariationFields} aria-label="delete" size="large">
                            <AddCircleIcon/>
                          </IconButton>
                          {addonFields.length ===0 ? 
                            <IconButton disabled  onClick={(index) => removeVariationFields(index)} aria-label="delete" size="large">
                              <DeleteIcon />
                            </IconButton>
                          : 
                            <IconButton  onClick={(index) => removeVariationFields(index)} aria-label="delete" size="large">
                              <DeleteIcon />
                            </IconButton>
                          }
                        </Stack>
                         
                          <h4 style={{ textAlign : "center" }} > Addons </h4>
                          {addonFields.map((input, index) => {
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
                                        onChange={event => handleAddonFormChange(index, event)}
                                      />
                                      <TextField
                                        name='price'
                                        type= "number"
                                        placeholder='Price'
                                        value={input.price}
                                        onChange={event => handleAddonFormChange(index, event)}
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
                          <IconButton onClick={addAddonFields} aria-label="delete" size="large">
                            <AddCircleIcon/>
                          </IconButton>
                          {addonFields.length ===0 ? 
                            <IconButton disabled  onClick={(index) => removeAddonFields(index)} aria-label="delete" size="large">
                              <DeleteIcon />
                            </IconButton>
                          : 
                            <IconButton  onClick={(index) => removeAddonFields(index)} aria-label="delete" size="large">
                              <DeleteIcon />
                            </IconButton>
                          }
                        </Stack>

                        <img 
                            src= {values.image? URL.createObjectURL(values.image):SingleMenu.image}
                            style = {{maxHeight : "300px"}}
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
