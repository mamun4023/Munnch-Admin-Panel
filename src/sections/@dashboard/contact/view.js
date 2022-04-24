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
                    View Contact Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Card 
                        // sx={{ maxWidth: 345 }}
                        // style={{ padding : "50px" }}
                    >
                        <CardContent>
                                <Typography variant="h5" component="div">
                                    Message
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <Box 
                                        sx={{ py: 1}}
                                    >
                                        We’re so excited that you’ve decided to purchase We’re so excited that you’ve decided to purchase We’re so excited that you’ve decided to purchase We’re so excited that you’ve decided to purchase We’re so excited that you’ve decided to purchase We’re so excited that you’ve decided to purchase We’re so excited that you’ve decided to purchase 
                                    </Box> 
                                </Typography>
                            </CardContent>
                        
                    </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Contact Details
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <Box 
                                        sx={{ py: 1}}
                                    >
                                        <h4> User Name&ensp; : &ensp; Tohid  </h4>
                                        <h4> User Type&ensp; &ensp;: &ensp; Merchant  </h4>
                                        <h4> Email&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; : &ensp; tohid@gmail.com  </h4>
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

