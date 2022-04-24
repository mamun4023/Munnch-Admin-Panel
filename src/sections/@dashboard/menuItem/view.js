import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box, IconButton, Grid } from '@mui/material';
import Iconify from '../../../components/Iconify';
import {FetchSingleMenu} from '../../../redux/menu/fetchSingle/action';

export default function View() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(FetchSingleMenu(id))
    },[])

    const SingleMenu = useSelector(state => state.FetchSingle.data)
    console.log("singleMenu ", SingleMenu)

  return(
            <>
                <Typography variant="h4" gutterBottom>
                    View Menu Item
                </Typography>

                

                <Grid container spacing={2}>
                    <Grid item xs={8}>

                    <Card> 
                        <Typography style={{ background : "#eee" }}  padding={2} textAlign= "center" variant="h6" component="div">
                            Store 
                        </Typography>
                        
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            

                        </Typography>
                    </Card>


                       
                    </Grid>
                    <Grid item xs={4}>

                    
                        <Card>
                            <CardContent>
                                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
                                </Typography> */}
                                <Typography variant="h5" component="div">
                                    Hamburger
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                   120 RM
                                    
                                </Typography>
                                <Typography variant="body2">
                                   <Box 
                                        sx={{ py: 1}}
                                   >
                                        Enriched Flour (Wheat Flour, Malted Barley Flour, Niacin, Iron, Thiamine Mononitrate, Riboflavin, Folic Acid), Water, Sugar, Yeast, Soybean Oil, Contains 2% or Less: Salt, Wheat Gluten, Potato Flour, May Contain One or More Dough Conditioners (DATEM, Ascorbic Acid, Mono and Diglycerides, Enzymes), Vinegar.
                                        100% Pure USDA Inspected Beef; No Fillers, No Extenders.
                                        Tomato Concentrate from Red Ripe Tomatoes, Distilled Vinegar, High Fructose Corn Syrup, Corn Syrup, Water, Salt, Natural Flavors.
                                        Cucumbers, Water, Distilled Vinegar, Salt, Calcium Chloride, Alum, Potassium Sorbate (Preservative), Natural Flavors, Polysorbate 80, Extractives of Turmeric (Color).
                                        Onions 
                                    </Box>
                                    <Box 
                                        sx={{ py: 1}}
                                    
                                    >
                                        <h4> Cuisine &ensp; : &ensp; Asian  </h4>
                                        <h4> Type &ensp;&ensp; &ensp; : &ensp; Burger  </h4>
                                        {/* <h4> Category &ensp; :</h4> */}
                                    </Box> 
                                    
                                    <Box
                                         sx={{ py: 1}}
                                    >
                                        <h4> Add-Ons </h4>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Empty
                                        </Typography>
                                    </Box>

                                    <Box
                                         sx={{ py: 1}}
                                    >
                                        <h4> Variation </h4>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Empty
                                        </Typography>
                                    </Box>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {/* <Button size="small">Learn More</Button> */}
                            </CardActions>
                        </Card>
                    </Grid>
                 </Grid>
            </>
        );
}
