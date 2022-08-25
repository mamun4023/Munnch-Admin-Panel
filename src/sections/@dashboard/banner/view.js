import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import {Link as RouterLink, useParams} from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box,Grid } from '@mui/material';
import {FetchSingleBanner} from '../../../redux/banner/fetchSingle/action';

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

export default function View() {
    const {id} = useParams();
    const [singleBanner, setSingleBanner] = useState([])

    const FetchBannerData =(id)=>{
        FetchSingleBanner(id)
            .then(res =>{
                const respone = res.data.data;
                setSingleBanner(respone)
            })
    }

    useEffect(()=>{
        FetchBannerData(id)
    },[])

    return(
            <>
                <Typography variant="h4" gutterBottom>
                    View Banner Image
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Card>   
                            <CardMedia
                                component="img"
                                style={{backgroundRepeat : "no-repeat", borderRadius : "10px", maxHeight : "400px"}}
                                image= {singleBanner?.image?singleBanner.image : isImage(singleBanner?.url)?singleBanner?.url: null}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div" color="text.secondary">
                                  Title &ensp; : &ensp; {singleBanner.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <Box 
                                        sx={{ py: 1}}
                                    >
                                        <h4> Status &ensp;: &ensp; {singleBanner.is_enabled? "Active":"Inactive"}  </h4>
                                    </Box> 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                 </Grid>
            </>
        );
}


