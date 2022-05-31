import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import {Link as RouterLink, useParams} from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box,Grid } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {FetchSingleBanner} from '../../../redux/banner/fetchSingle/action';
import Spinner from 'src/components/Spinner';

export default function View() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.FetchSingleBanner.loading);

    useEffect(()=>{
        dispatch(FetchSingleBanner(id))
    },[])

    const singleBanner = useSelector(state=> state.FetchSingleBanner.data);
    // console.log("single banner",singleBanner)
 
    return(
            <>
                <Typography variant="h4" gutterBottom>
                    View Banner Image
                </Typography>

                {loading? <Spinner/> : 
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Card 
                        // sx={{ maxWidth: 345 }}
                        style={{ padding : "50px" }}
                    >
                        <CardMedia
                            component="img"
                            style={{backgroundRepeat : "no-repeat", borderRadius : "10px"}}
                            image= {singleBanner.image}
                            alt="green iguana"
                        />
                    </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
 
                                <Typography variant="h5" component="div">
                                   {singleBanner.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <Box 
                                        sx={{ py: 1}}
                                    >
                                        <h4> Status &ensp; : &ensp; {singleBanner.is_enabled? "Active":"Inactive"}  </h4>
                                    </Box> 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                 </Grid>
                 }
            </>
        );
}


