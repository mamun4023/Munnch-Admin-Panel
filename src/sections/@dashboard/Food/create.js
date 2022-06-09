import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import {toast} from 'material-react-toastify'
// material
import {
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AddFood } from 'src/redux/food/add/action';

// ----------------------------------------------------------------------

export default function Create() {
  const navigate = useNavigate();
  const [loading, setLoading] =  useState(false);

  const FoodSchema = Yup.object().shape({
    food_name: Yup.string().required('Food Name is required'),
    image : Yup.mixed().required("Food Image is required").nullable()
  });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      food_name: '',
      image : null
    },

    validationSchema: FoodSchema,
    onSubmit: (values) => {
      const data = new FormData();
      data.append('food_name', values.food_name);
      data.append('image', values.image);
      setLoading(true)
      AddFood(data)
        .then(res =>{
            const response = res.data.message;
            setLoading(false)
            toast.dark(response)
            navigate('/dashboard/food', { replace: true });
          })
          .catch((err)=>{
            const response = err.response.data.errors.food_name[0];
            toast.error(response)
            setLoading(false)
        })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return(
        <>
        <Typography variant="h4" gutterBottom>
          Create Food
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
                            {...getFieldProps('food_name')}
                            error={Boolean(touched.food_name && errors.food_name)}
                            helperText={touched.food_name && errors.food_name}
                        />
                         <img 
                            src= {values.image?URL.createObjectURL(values.image):null}
                            style = {{ maxHeight : "300px" }}
                        />
                        <TextField
                            fullWidth
                            InputLabelProps={{
                              shrink : true                                
                            }}
                            type="file"
                            label="Food Image"
                            onChange = {e => {formik.setFieldValue('image', e.target.files[0])}} 
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
