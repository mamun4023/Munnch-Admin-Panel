import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import {Link as RouterLink, useParams} from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack, Box, IconButton, CardMedia, Grid, Table, TableBody,TableRow, TableCell } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {FetchSingleOrder} from '../../../redux/order/fetchSingle/action';
import { makeStyles } from "@mui/styles";
import Moment from 'react-moment'
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles({
    tableRow: {
      height: 20
    },
    tableCell: {
      padding: "5px 5px"
    }
  });

function View() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(FetchSingleOrder(id))
    },[])

    const orderedData = useSelector(state => state.SingleOrder.data)
    
    const {order, address, customer, order_remarks, store, created_at, updated_at} = orderedData;
    const classes = useStyles();
    return(
            <>
                <Typography variant="h4" gutterBottom>
                    Order Details
                </Typography>
                <Grid container >
                    <Grid item xs={8}>
                     {order?.cart_items.length > 0? <> 
                        {order.cart_items.map((data, i = 0 )=> <> 
                            <Card style={{ marginTop : "10px" }}   > 
                                <Stack direction="row" spacing={1}>
                                    <Box 
                                        sx={{ textAlign: 'center' }}
                                        style = {{ minWidth : "100px", background : "#eee" }}
                                    >
                                        <h1 style={{fontSize : "50px" }}> 
                                            {i+1}
                                        </h1> 
                                    </Box>
                                    <Box
                                        sx={{
                                            minWidth : "250px",
                                            display : "flex",
                                            flexDirection : "column",
                                            flexWrap : "nowrap",
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        {data?.image?  
                                            <CardMedia
                                                component="img"
                                                style = {{maxHeight : "150px" }}
                                                image= {data?.image}
                                            />
                                        : <div style={{minHeight : "150px", minWidth : "200px"}}>
                                            <Typography padding={5} variant="body2" textAlign="center" color="text.secondary"> No Image </Typography>
                                          </div>    
                                        }
                                    </Box>
                                    <Box>
                                        <CardContent textAlign = "right" >
                                            <Stack direction="column" spacing={1}>  
                                                <Box> 
                                                    <Typography 
                                                        style = {{ 
                                                            fontSize : "15px"
                                                        }}
                                                        variant="h6" component="div">
                                                        {data?.store_menu_item_name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <h4> Quantity  &ensp; : &ensp; {data?.quantity}</h4>
                                                        <h4> Price &ensp;&ensp;&ensp; &ensp; : &ensp; RM {data?.total_price} </h4>
                                                    </Typography>
                                                </Box>
                                                <Box> 
                                                    <Typography variant="body2" color="text.secondary">
                                                        <h4> Remark  &ensp;&ensp; : &ensp; {order_remarks !== null? order_remarks :  "Empty"}</h4>
                                                    </Typography>
                                                </Box>
                                            </Stack> 
                                        </CardContent>
                                    </Box>
                                </Stack> 
                            </Card>
                        </>)}
                    </>  : <Typography paddingTop={8} variant="body2" textAlign="center" color="text.secondary"> No order Found </Typography>}   
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <Typography  padding={1} style={{background : "#eee" }}  textAlign="center" variant="h6" component="div">
                                Payment Information  (<IconButton>  <RemoveIcon/></IconButton>)
                            </Typography>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell} align="left">Total Price</TableCell>
                                            <TableCell className={classes.tableCell} align="left"> RM {order?.bill_details.item_total} </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell}  align="left">Delivery Fee</TableCell>
                                            <TableCell className={classes.tableCell} align="left">  RM {order?.bill_details.delivery_fee} </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell}  align="left">Coupon Discount </TableCell>
                                            <TableCell className={classes.tableCell} align="left">  RM {order?.bill_details.coupon_discount} </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell}  align="left">Royalty Discount </TableCell>
                                            <TableCell className={classes.tableCell} align="left">  RM {order?.bill_details.loyalty_stamp_discount} </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell}  align="left">Total Payment </TableCell>
                                            <TableCell className={classes.tableCell} align="left">  RM {order?.bill_details.to_pay} </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell}  align="left">User Phone </TableCell>
                                            <TableCell className={classes.tableCell} align="left">  {customer?.phone} </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                </Typography>
                                <h4> Delivery Address</h4>
                                <Typography variant="body2">
                                   <Box 
                                        sx={{ py: 1}}
                                   >
                                       {address}
                                    </Box>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ marginTop: 2 }}>
                            <Typography  padding={1} style={{background : "#eee" }}  textAlign="center" variant="h6" component="div">
                                Order Information 
                            </Typography>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell} align="left"> Delivered </TableCell>
                                            <TableCell className={classes.tableCell} align="left"> {order?.is_delivery == 1? "Yes" : "No"} </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell}  align="left"> Update At </TableCell>
                                            <TableCell className={classes.tableCell} align="left">  <Moment format="DD-MM-YYYY hh:mm a" >{updated_at}</Moment>  </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell}  align="left"> Create At </TableCell>
                                            <TableCell className={classes.tableCell} align="left"> <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment> </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell} align="left"> Estimated Delivery Days </TableCell>
                                            <TableCell className={classes.tableCell} align="left"> {order?.estimated_delivery_days} </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell} align="left"> Contact No </TableCell>
                                            <TableCell className={classes.tableCell} align="left"> {store?.contact_no} </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                </Typography>
                                <h4> Shop Address</h4>
                                <Typography variant="body2">
                                   <Box 
                                        sx={{ py: 1}}
                                   >
                                       {store?.store_addresses?.address}
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

