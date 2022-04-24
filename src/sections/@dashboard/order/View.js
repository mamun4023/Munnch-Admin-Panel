import * as React from 'react';
import Card from '@mui/material/Card';
import {Link as RouterLink} from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box, IconButton, Grid } from '@mui/material';
import Iconify from '../../../components/Iconify';


function View() {
  return(
            <>
                <Typography variant="h4" gutterBottom>
                    Order Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                      
                      
                        <Card style={{ marginTop : "10px" }}   > 
                            <Grid container spacing={2}>
                                <Grid 
                                    item 
                                    paddingLeft={10}
                                    style = {{background : "#eee"}} 

                                >
                                    <Box 
                                        sx={{ textAlign: 'center' }}
                                        style = {{ width : "100px" }}

                                    >
                                        <h1 style={{fontSize : "50px" }}>1</h1> 
                                    </Box>
                                    
                                </Grid>
                                <Grid item >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        style={{ width : "200px", height : "100px" }}
                                        image="https://previews.123rf.com/images/cokemomo/cokemomo1411/cokemomo141100052/33911511-nasi-lemak-arroz-con-leche-de-coco-cocina-malaya-aislado-en-fondo-blanco.jpg"
                                    />
                                </Grid>
                                <Grid item 
                                    style={{ paddingLeft : "80px" }}
                                > 
                                    <CardContent textAlign = "right" >
                                        <Typography gutterBottom variant="h5" component="div">
                                            Nasi Lemak
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <h4> Quantity  &ensp; : &ensp; 1 P </h4>
                                            <h4> Price &ensp;&ensp;&ensp; &ensp; : &ensp; 100 RM </h4>
                                        </Typography>
                                    </CardContent>

                                </Grid>
                            </Grid>
                        </Card>


                        <Card style={{ marginTop : "10px" }}   > 
                            <Grid container spacing={2}>
                                <Grid 
                                    item 
                                    paddingLeft={10}
                                    style = {{background : "#eee"}} 

                                >
                                    <Box 
                                        sx={{ textAlign: 'center' }}
                                        style = {{ width : "100px" }}
                                    >
                                        <h1 style={{fontSize : "50px" }}>2</h1> 
                                    </Box>
                                    
                                </Grid>
                                <Grid item >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        style={{ width : "200px", height : "100px" }}
                                        image="https://www.pngplay.com/wp-content/uploads/8/Sushi-Transparent-File.png"
                                    />
                                </Grid>
                                <Grid item 
                                     style={{ paddingLeft : "80px" }}
                                > 
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Sushi
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <h4> Quantity  &ensp; : &ensp; 1 P </h4>
                                            <h4> Price &ensp;&ensp;&ensp; &ensp; : &ensp; 100 RM </h4>

                                        </Typography>
                                    </CardContent>

                                </Grid>
                            </Grid>
                        </Card>



                        <Card style={{ marginTop : "10px" }}   > 
                            <Grid container spacing={2}>
                                <Grid 
                                    item 
                                    paddingLeft={10}
                                    style = {{background : "#eee"}} 

                                >
                                    <Box 
                                        sx={{ textAlign: 'center' }}
                                        style = {{ width : "100px" }}
                                    >
                                        <h1 style={{fontSize : "50px" }} >3</h1> 
                                    </Box>
                                    
                                </Grid>
                                <Grid item >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        style={{ width : "200px", height : "100px" }}
                                        image="https://media.istockphoto.com/photos/cheeseburger-isolated-on-white-picture-id1157515115?k=20&m=1157515115&s=612x612&w=0&h=1-tuF1ovimw3DuivpApekSjJXN5-vc97-qBY5EBOUts="
                                    />
                                </Grid>
                                <Grid item 
                                     style={{ paddingLeft : "80px" }}
                                > 
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Hamburger
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <h4> Quantity  &ensp; : &ensp; 1 P </h4>
                                            <h4> Price &ensp;&ensp;&ensp; &ensp; : &ensp; 100 RM </h4>

                                        </Typography>
                                    </CardContent>

                                </Grid>
                            </Grid>
                        </Card>

                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
                                </Typography> */}
                                <Typography variant="h6" component="div">
                                    Total Items &ensp; : &ensp; 3
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Total Price&ensp;&ensp; : &ensp; 200 RM
                                    
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                </Typography>
                                <h4> User Address</h4>
                                <Typography variant="body2">
                                   <Box 
                                        sx={{ py: 1}}
                                   >
                                       SegWitz Sdn Bhd (1367921-K)

                                            Room 4, Lot 10-2,
                                            Jalan Puteri 1/4,
                                            Bandar Puteri,
                                            47100 Puchong.

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

