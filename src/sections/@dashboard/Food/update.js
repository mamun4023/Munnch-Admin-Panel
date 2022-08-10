import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'material-react-toastify';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// material
import {
  Stack,
  TextField,
  Grid,
  Typography,
  Card,
  IconButton
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import {FetchSingleList} from '../../../redux/food/fetchSingle/action';
import {UpdateFood} from '../../../redux/food/update/action';

// ----------------------------------------------------------------------

 export default function Update() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const HandlerChange =(e)=>{
    setImage(e.target.files[0])
  }

  useEffect(()=>{
      dispatch(FetchSingleList(id))
  }, [id])

  const FoodData = useSelector(state => state.FetchSingleFoodList.data);

  const FoodSchema = Yup.object().shape({
    food_type_name: Yup.string().required('Food Name is required'),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      food_type_name: FoodData?.food_type_name,
      image : FoodData?.image
    },
    validationSchema: FoodSchema,
    onSubmit: (values) => {
      const data = new FormData();
      data.append('food_name', values.food_type_name);
      if(image != undefined){
        data.append('image', image);
      }
      data.append('_method', 'PUT');

      setLoading(true)
      UpdateFood(id, data)
          .then(res =>{
              const response = res.data.message;
              toast.dark(response);
              setLoading(false)
              navigate('/dashboard/food', { replace: true });
            })
            .catch((err)=>{
                const response = err.response.data.message;
                toast.dark(response)
                setLoading(false)
            })
      }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const  RemoveImagePreview = ()=>{
    formik.setFieldValue("image", null )
    if(image){
      setImage("")
    }
  }

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Update Food
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
                              type="text"
                              label="Food Name"
                              InputLabelProps={{
                                shrink : true
                              }}
                              {...getFieldProps('food_type_name')}
                              error={Boolean(touched.food_type_name && errors.food_type_name)}
                              helperText={touched.food_type_name && errors.food_type_name}
                          />
                          {
                            values.image  || image? 
                              <Stack 
                                  direction= "row-reverse"> 
                                    <IconButton
                                      style={{ marginBottom : "-30px" }}
                                      color='error'
                                      variant = "outlined"
                                      onClick={RemoveImagePreview}
                                    > 
                                      <ClearIcon/>
                                    </IconButton>
                              </Stack>
                            : null
                          }
                          <img 
                            src= {image?URL.createObjectURL(image) : values?.image}
                            style = {{ maxHeight : "300px" }}
                          />
                          {
                            !values.image && !image?
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
                                    backgroundColor : "#eee"
                                  }}
                      
                                  style = {{textAlign : "center"}}
                                >
                                    <CloudUploadIcon style={{fontSize : "50px", color : "gray" }}/>
                                      <Typography style={{color : "gray"}} > Upload Image</Typography>
                                </Card>
                                </label>
                            : null
                          }
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
