import React, {useEffect, useState} from 'react';
import { Table, TableRow, TableCell, Card, CardActions, CardContent, Typography, Button, CardMedia, Stack, Box, IconButton, Grid } from '@mui/material';
import {Link as RouterLink, useParams} from 'react-router-dom';
import Moment from 'react-moment';
import {useDispatch, useSelector} from 'react-redux';
import { withStyles, makeStyles } from "@mui/styles";
import Iconify from '../../../components/Iconify';
import {FetchSingleMenu} from '../../../redux/menu/fetchSingle/action';

const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    tableRow: {
      height: 30
    },
    tableCell: {
      padding: "0px 16px",
      fontSize : "16px"
    }
  });

export default function View() {
    const {id} = useParams();
    const [singleMenu, setSingleMenu] = useState([]);

    const FetchSingleMenuData = (id)=>{
        FetchSingleMenu(id)
            .then(res =>{
                const response = res.data.data;
                setSingleMenu(response)
            })
    }

    useEffect(()=>{
        FetchSingleMenuData(id);
    },[])

    const classes = useStyles();
    const {name, price, image, description, in_stock, best_seller, food_item_estimate_days, created_at, updated_at, store, menu_item_addons, menu_item_variations} = singleMenu;

    return(
            <>
                <Typography variant="h4" gutterBottom>
                    View Menu Item
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Card> 
                            <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                                Item Image 
                            </Typography>
                            <img 
                                src= {image}
                                style = {{minWidth : "700px"}}
                            />
                             <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                               Item Description
                            </Typography>
                            <Typography padding={1} textAlign= "left"  component="div">
                              {description}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Card>
                            <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                                Item Information 
                            </Typography>
                            <CardContent>
                                <Table> 
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left"  className={classes.tableCell}> Item Name </TableCell>
                                        <TableCell align="left" className={classes.tableCell}>{name}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Item Price </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> RM {price}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Stock </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> {in_stock ==1? "In" : "Out"}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Best Seller </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> {best_seller== 1?"Yes":"No"}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Food Item Estimate </TableCell>
                                        <TableCell align="left" className={classes.tableCell}>  {food_item_estimate_days} Days</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Updated At </TableCell>
                                        <TableCell align="left" className={classes.tableCell}>  <Moment format="DD-MM-YYYY hh:mm a" >{updated_at}</Moment></TableCell>
                                    </TableRow>

                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Created At </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment></TableCell>
                                    </TableRow>

                                </Table>  
                            </CardContent>
                        </Card>

                        <Card>
                            <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                                Store Information 
                            </Typography>
                            <CardContent>
                                <Table> 
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left"  className={classes.tableCell}> Store Name </TableCell>
                                        <TableCell align="left" className={classes.tableCell}>{store?.restaurant_name}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Email </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> {store?.email} </TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Phone </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> {store?.contact_no} </TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}>Delivery Charge </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> RM {store?.delivery_charge} </TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell align="left" className={classes.tableCell}> Maximum Radius </TableCell>
                                        <TableCell align="left" className={classes.tableCell}> {store?. max_delivery_km} KM </TableCell>
                                    </TableRow>


                                </Table>  
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                                Addons  
                            </Typography>
                            <CardContent>
                                <Table> 
                                    {menu_item_addons?.map(data => <> 
                                        <TableRow className={classes.tableRow}>
                                            <TableCell align="left"  className={classes.tableCell}> Name </TableCell>
                                            <TableCell align="left" className={classes.tableCell}> {data.name}</TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell align="left" className={classes.tableCell}> Price  </TableCell>
                                            <TableCell align="left" className={classes.tableCell}> RM {data.price}</TableCell>
                                        </TableRow>
                                    </>)}
                                </Table>  
                            </CardContent>
                        </Card>

                        <Card>
                            <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                                Variations  
                            </Typography>
                            <CardContent>
                                <Table> 
                                    {menu_item_variations?.map(data => <> 
                                        <TableRow className={classes.tableRow}>
                                            <TableCell align="left"  className={classes.tableCell}> Half Price </TableCell>
                                            <TableCell align="left" className={classes.tableCell}>RM {data.half_price}</TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell align="left" className={classes.tableCell}> Full Price  </TableCell>
                                            <TableCell align="left" className={classes.tableCell}> RM {data.full_price}</TableCell>
                                        </TableRow>
                                    </>)}
                                </Table>  
                            </CardContent>
                        </Card>

                    </Grid>
                 </Grid>
            </>
        );
}
