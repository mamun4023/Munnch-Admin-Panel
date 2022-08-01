import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'material-react-toastify';
import DeleteIcon from  '@mui/icons-material/Delete'
import AddCircleIcon from  '@mui/icons-material/AddCircle';
// material
import {
  Grid,
  Stack,
  TextField,
  IconButton,
  Typography,
  Autocomplete,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {AddMenu} from '../../../redux/menu/add/action';
import {FetchCuisineTypeList , FetchFoodTypeList, CategoryList} from '../../../redux/merchantStore/other/actions';

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

// function createFormData(formData, key, data) {
//   if (data === Object(data) || Array.isArray(data)) {
//       for (var i in data) {
//           createFormData(formData, key + '[' + i + ']', data[i]);
//       }
//   } else {
//       formData.append(key, data);
//   }
// }

export default function Create(){
    const {id} = useParams();
    const navigate = useNavigate();
    const[foodList, setFoodList] = useState([]);
    const[cuisineList, setCuisineList] = useState([]);
    const[categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [variationFields, setVariationFields] = useState([
      // { name: '', price: '' },
    ])
    const [addonFields, setAddonFields] = useState([
      // { name: '', price: '' },
    ])

    // Variations handlers 
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

  // addon handlers 
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

  const LoadListData = (id)=>{
    FetchCuisineTypeList(id)
      .then(res =>{
        const response = res.data.data;
        setCuisineList(response);
      })

    FetchFoodTypeList(id)
      .then(res =>{
        const response = res.data.data;
        setFoodList(response);
      })

      CategoryList(id)
      .then(res =>{
        const response = res.data.data;
        setCategoryList(response);
      })  
  }

  useEffect(()=>{
    LoadListData(id);
  },[id])

  const MenuItemSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.string().required('Price is required'),
    description : Yup.string().required("Description is required").max(100, "Maximum 100 Characters"),
    food_types: Yup.mixed().required('Food Type is required').nullable(),
    cuisine_types: Yup.mixed().required('Cuisine Type is required').nullable(),
    categories: Yup.mixed().required('Category is required').nullable(),
    food_item_type: Yup.string().required('Food Item Type is required'),
    food_item_estimate_days :Yup.string().required('Estimate Days are required'),
    image : Yup.mixed().required('Image is required'),
  });

  const formik = useFormik({
    // enableReinitialize : true,
    initialValues: {
      name : '',
      price : '',
      description : '',
      food_types : null,
      cuisine_types : null,
      categories : null,
      image : null,
      food_item_type  : '',
      food_item_estimate_days : 0,
      restaurant_id : '',
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
      form.append("image", values.image);
      form.append("food_item_estimate_days", values.food_item_estimate_days);
      form.append("restaurant_id", id);
    
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
      AddMenu(form)
        .then(res =>{
          const response = res.data.message;
          setLoading(false);
          toast.dark(response)
          navigate(`/dashboard/merchant/menu/${id}`, { replace: true });
        })
        .catch((err)=>{
          setLoading(false);
          const errors = err.response.data.errors;
          
          if(errors.category_id?errors.category_id[0] : false){
            toast.error(errors.category_id[0])
          }

          // addon message popup
          if(errors["food_addons.0.name"]? errors["food_addons.0.name"][0] : false){
            toast.error(errors["food_addons.0.name"][0])
          }

          if(errors["food_addons.0.price"]? errors["food_addons.0.price"][0] : false){
            toast.error(errors["food_addons.0.price"][0])
          }

          if(errors["food_addons.1.name"]? errors["food_addons.1.name"][1] : false){
            toast.error(errors["food_addons.1.name"][1])
          }

          if(errors["food_addons.1.price"]? errors["food_addons.1.price"][1] : false){
            toast.error(errors["food_addons.1.price"][1])
          }
        })
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

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
                          <Autocomplete
                              // multiple
                              // limitTags={1}
                              options={foodList}
                              disableClearable
                              getOptionLabel = {(option)=> option.food_type_name}
                              onChange = {(event, value)=>  formik.setFieldValue("food_types", value) }  
                              renderInput = {(option)=> 
                                  <TextField 
                                      {...option} 
                                      label ="Food Type" 
                                      error={Boolean(touched.food_types && errors.food_types)}
                                      helperText={touched.food_types && errors.food_types}
                                  /> }
                          />  
                          <Autocomplete
                              // multiple
                              fullWidth
                              limitTags={1}
                              options={cuisineList}
                              getOptionLabel = {(option)=> option.name}
                              onChange = {(event, value)=>  formik.setFieldValue("cuisine_types", value) } 
                              renderInput = {(option)=> 
                                  <TextField 
                                      {...option} 
                                      label ="Cuisine Type"
                                      error={Boolean(touched.cuisine_types && errors.cuisine_types)}
                                      helperText={touched.cuisine_types && errors.cuisine_types} 

                                  /> }
                          />
                          <Autocomplete
                              // multiple
                              limitTags={1}
                              options={categoryList}
                              // defaultValue = {["new", "old"]}
                              getOptionLabel = {(option)=> option.name}
                              onChange = {(event, value)=>  formik.setFieldValue("categories", value) } 
                              renderInput = {(option)=> 
                                  <TextField 
                                    {...option} 
                                    label ="Category" 
                                    error={Boolean(touched.categories && errors.categories)}
                                    helperText={touched.categories && errors.categories} 
                                    /> }
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
                            <MenuItem value= "2">Pre-Order Item</MenuItem>
                        </TextField>
                          {
                            values.food_item_type === 2 || values.food_item_type ==="2"? 
                              <TextField
                                  fullWidth
                                  type="number"
                                  label="food Item Estimate Days"
                                  {...getFieldProps('food_item_estimate_days')}
                                  error={Boolean(touched.food_item_estimate_days && errors.food_item_estimate_days)}
                                  helperText={touched.food_item_estimate_days && errors.food_item_estimate_days}
                              /> 
                            : null
                          }
                          <h4 style={{ textAlign : "center" }} > Variations </h4>
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
                          {variationFields.length ===0 ? 
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
                           src= {values.image?URL.createObjectURL(values.image): null}
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
