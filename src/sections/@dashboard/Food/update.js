import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'material-react-toastify'
// material
import {
  Stack,
  TextField,
  Grid,
  Typography 
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {FetchSingleList} from '../../../redux/food/fetchSingle/action';
import {UpdateFood} from '../../../redux/food/update/action';

// ----------------------------------------------------------------------

 export default function Update() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
      dispatch(FetchSingleList(id))
  }, [id])

  const FoodData = useSelector(state => state.FetchSingleFoodList.data);

  console.log("food list", FoodData)

  const FoodSchema = Yup.object().shape({
    food_type_name: Yup.string().required('Food Name is required'),
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      food_type_name: FoodData.food_type_name? FoodData.food_type_name : "",
    },
    validationSchema: FoodSchema,
    onSubmit: (values) => {

      const data = new FormData();
      
      if(image == undefined){
        data.append('food_name', values.food_type_name);
        data.append('_method', 'PUT');
      }else{
        data.append('food_name', values.food_type_name);
        data.append('image', image);
        data.append('_method', 'PUT');
      }
      

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
                            // value={formik.values.food_type_name}
                            {...getFieldProps('food_type_name')}
                            error={Boolean(touched.food_type_name && errors.food_type_name)}
                            helperText={touched.food_type_name && errors.food_type_name}
                        />

                        <img 
                          src= {FoodData.image}
                        />

                        <TextField
                            fullWidth
                            type="file"
                            onChange={(e)=> setImage(e.target.files[0])}
                            
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
