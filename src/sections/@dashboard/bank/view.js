import * as React from 'react';
import Card from '@mui/material/Card';
import {Link as RouterLink} from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box, IconButton, Grid, CardActionArea } from '@mui/material';
import Iconify from '../../../components/Iconify';


function View() {
  return(
            <>
                <Typography variant="h4" gutterBottom>
                    View Banner Image
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Card 
                        // sx={{ maxWidth: 345 }}
                        style={{ padding : "50px" }}
                    >
                        <CardMedia
                            component="img"
                            style={{backgroundRepeat : "no-repeat", borderRadius : "10px"}}
                            image="https://freedesignfile.com/upload/2020/07/Online-Shopping-Banner-Mobile-App-Vector.jpg"
                            alt="green iguana"
                        />
                    </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
                                </Typography> */}
                                <Typography variant="h5" component="div">
                                    Banner Title
                                </Typography>
                                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                   120 RM    
                                </Typography> */}
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <Box 
                                        sx={{ py: 1}}
                                    >
                                        <h4> Type&ensp;&ensp;&ensp; : &ensp; Merchant  </h4>
                                        <h4> Status &ensp; : &ensp; Active  </h4>
                                    </Box> 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                 </Grid>
            </>
        );
}

export default View;

