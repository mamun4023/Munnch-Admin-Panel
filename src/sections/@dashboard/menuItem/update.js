import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Autocomplete } from '@mui/material';
import { useFormik, Form, FormikProvider, getIn, FieldArray } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'material-react-toastify';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from  '@mui/icons-material/AddCircle';

// material
import {
  Stack,
  TextField,
  IconButton,
  Card
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
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
  const[foodList, setFoodList] = useState([]);
  const[cuisineList, setCuisineList] = useState([]);
  const[categoryList, setCategoryList] = useState([]);
  const[image, setImage] = useState();

  const HandlerChange = (e)=>{
    setImage(e.target.files[0])
  }

  const FetchMenu = (id)=>{
    FetchSingleMenu(id)
      .then((res)=>{
          const response = res.data.data;
          setSingleMenu(response)
          setStoreId(response.store.id)
      })
  }

  useEffect(()=>{
    FetchMenu(id)
  },[])
 
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
    image : Yup.mixed(),
    variations : Yup.array().of(
      Yup.object().shape({
        name : Yup.string().required("Name is required"),
        price : Yup.string().required("Price is required")
      })
    ),
    addons : Yup.array().of(
      Yup.object().shape({
        name : Yup.string().required("Name is required"),
        price : Yup.string().required("Price is required")
      })
    )
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
      image : SingleMenu?.image,
      food_item_type  : SingleMenu.food_item_type === "Food Item"?1 : 2,
      food_item_estimate_days : SingleMenu?.food_item_estimate_days,
      restaurant_id : SingleMenu.store?.id,
      variations : SingleMenu?.menu_item_variations,
      addons : SingleMenu?.menu_item_addons
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

      if(values?.variations?.length) {
          values?.variations?.forEach((item, index) => {
            form.append(`food_variations[${index}][name]`, item?.name);
            form.append(`food_variations[${index}][price]`, item?.price);
        });
      }
      
      if(values?.addons?.length) {
          values?.addons?.forEach((item, index) => {
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
          const errors = err.response.data.errors;
          
          if(errors?.category_id?errors.category_id[0] : false){
            toast.error(errors.category_id[0])
          }

          if(errors?.image?errors.image[0] : false){
            toast.error(errors?.image[1])
          }

          // Handled addon error & show popup message
          for(let i = 0; i<values?.addons.length; i++){
            if(errors?.[`food_addons.${i}.name`]){
              toast.error(`Addon ${i+1} has duplicate value`);
            }
          }
            // Handled Variation error & show popup message
          for(let i = 0; i<values?.variations.length; i++){
            if(errors?.[`food_variations.${i}.name`]){
              toast.error(`Variation ${i+1} has duplicate value`);
            }
          }
        })
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  const  RemoveImagePreview = ()=>{
    formik.setFieldValue("image", null )
    if(image){
      setImage("")
    }
  }
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
                                limitTags={1}
                                options={categoryList}
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
                        <FieldArray name="variations">
                          {({ push, remove }) => (
                            <div>
                              {values?.variations?.map((p, index) => {
                                const name = `variations[${index}].name`;
                                const touchedName = getIn(touched, name);
                                const errorName = getIn(errors, name);
                                const price = `variations[${index}].price`;
                                const touchedPrice = getIn(touched, price);
                                const errorPrice = getIn(errors, price);

                                return (
                                  <div key={p.id}>
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="flex-start"
                                      spacing={2}
                                      marginBottom = {2}
                                    >
                                      <TextField
                                        type= "text"
                                        variant="outlined"
                                        label="Name"
                                        name={name}
                                        value={p.name}
                                        helperText={
                                          touchedName && errorName
                                            ? errorName
                                            : ""
                                        }
                                        error={Boolean(touchedName && errorName)}
                                        {...getFieldProps(name)}
                                      />
                                      <TextField
                                        type= "number"
                                        variant="outlined"
                                        label="Price"
                                        name={price}
                                        value={p.price}
                                        helperText={
                                          touchedPrice && errorPrice
                                            ? errorPrice
                                            : ""
                                        }
                                        error={Boolean(touchedPrice && errorPrice)}
                                        {...getFieldProps(price)}
                                      />
                                      <IconButton
                                        sx={{
                                          padding : 2,
                                        }}
                                        style = {{marginLeft : "-8px"}}
                                        type="button"
                                        color="error"
                                        variant="outlined"
                                        onClick={() => remove(index)}
                                      >
                                        <ClearIcon />
                                      </IconButton>
                                    </Stack>
                                  </div>
                                );
                              })}
                              <IconButton
                                sx={{
                                  marginTop : -2                                  
                                }}
                                type="button"
                                variant="outlined"
                                onClick={() =>
                                  push({ name: "", price: "" })
                                }
                              >
                                  <AddCircleIcon/>
                              </IconButton>
                            </div>
                          )}
                        </FieldArray>
                          <h4 style={{ textAlign : "center" }} > Addons </h4>
                        <FieldArray name="addons">
                          {({ push, remove }) => (
                            <div>
                              {values?.addons?.map((p, index) => {
                                const name = `addons[${index}].name`;
                                const touchedName = getIn(touched, name);
                                const errorName = getIn(errors, name);
                                const price = `addons[${index}].price`;
                                const touchedPrice = getIn(touched, price);
                                const errorPrice = getIn(errors, price);

                                return (
                                  <div key={p.id}>
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                        spacing={2}
                                        marginBottom={2}
                                      >
                                          <TextField
                                            type = "text"
                                            variant="outlined"
                                            label="Name"
                                            name={name}
                                            value={p.name}
                                            helperText={
                                              touchedName && errorName
                                                ? errorName
                                                : ""
                                            }
                                            error={Boolean(touchedName && errorName)}
                                            {...getFieldProps(name)}
                                          />
                                          <TextField
                                            type= "number"                                  
                                            variant="outlined"
                                            label="Price"
                                            name={price}
                                            value={p.price}
                                            helperText={
                                              touchedPrice && errorPrice
                                                ? errorPrice
                                                : ""
                                            }
                                            error={Boolean(touchedPrice && errorPrice)}
                                            {...getFieldProps(price)}
                                          />
                                          <IconButton
                                            sx={{
                                              padding : 2,
                                            }}
                                            style = {{marginLeft : "-8px"}}
                                            type="button"
                                            color="error"
                                            variant="outlined"
                                            onClick={() => remove(index)}
                                          >
                                            <ClearIcon />
                                          </IconButton>
                                      </Stack>  
                                  </div>
                                );
                              })}
                              <IconButton
                                sx={{
                                  marginTop : -2                                  
                                }}
                                margin="normal"
                                type="button"
                                variant="outlined"
                                onClick={() =>
                                  push({ name: "", price: "" })
                                }
                              >
                                <AddCircleIcon/>
                              </IconButton>
                            </div>
                          )}
                        </FieldArray>
                        {values.image  || image? 
                           <Stack 
                              direction= "row-reverse"> 
                                <IconButton
                                  style={{ marginBottom : "-30px" }}
                                  color='error'
                                  variant = "outlined"
                                  onClick={RemoveImagePreview}
                                > <ClearIcon/></IconButton>
                           </Stack>
                        : null}
                        <img 
                            src= {image?URL.createObjectURL(image) : values?.image}
                            style = {{ maxHeight : "300px" }}
                        />
                        {!values.image && !image?
                            <label htmlFor="upload-photo"> 
                              <TextField
                                fullWidth
                                type = "file"
                                onChange= {HandlerChange}                            
                                style = {{
                                  display : "none"
                                }}
                                id = "upload-photo"
                              />
                              <Card 
                                variant="outlined"
                                sx={{
                                  padding : 10,
                                  marginTop : -2,
                                  backgroundColor : "#eee",
                                  textAlign : "center" 
                                }}
                              >
                                  <CloudUploadIcon style={{fontSize : "50px", color : "gray" }}/>
                                    <Typography style={{color : "gray"}} > Upload Image</Typography>
                              </Card>
                            </label>
                        : null}
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
