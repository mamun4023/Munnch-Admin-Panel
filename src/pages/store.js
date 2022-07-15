import { useState, useEffect, useDebugValue } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Info from '@mui/icons-material/Info';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  Grid,
  CardContent,
  TableBody,
  TableCell,
  TextField,
  CardMedia,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  ImageList,
  ImageListItem

} from '@mui/material';
import { withStyles, makeStyles } from "@mui/styles";
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import TimingTable from '../sections/@dashboard/store/timingTable';
import imageUpload from '../sections/@dashboard/store/imageUpload';
import { FoodListHead,  FoodListToolbar, FoodMoreMenu } from '../sections/@dashboard/Food';
import {FetchFoodList} from '../redux/food/fetchAll/action';
import { Box } from '@mui/system';
import Spinner from 'src/components/Spinner';
import {FetchSingleStore} from '../redux/merchantStore/fetchSingle/action';
import {RemoveImage} from '../redux/merchantStore/remove/action'
import {AddImage} from '../redux/merchantStore/upload/action';

// ----------------------------------------------------------------------

const Input = styled('input')({
  display: 'none',
});

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

export default function Store() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [StoreData, setStoreData] = useState([]);

  const UploadHandler = (e)=>{
    const data = new FormData();
    data.append('image', e.target.files[0])
    AddImage(id, data);

    setTimeout(()=>{
      FetchStore(id)
    },1000)
  }

  const ImageDeleteHandler = (storeId, imageId)=>{
    dispatch(RemoveImage(storeId, imageId));
    FetchStore(id);
  }

  const FetchStore = (id)=>{
    FetchSingleStore(id)
      .then((res)=>{
        const response =  res.data.data;
        setStoreData(response);
      })
  }
  useEffect(()=>{
      FetchStore(id)
  },[])

  // console.log("Store data", StoreData)
  const classes = useStyles();
  return (
    <Page title="Munchh | Store">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
             Store Details
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to= {`/dashboard/merchant/store/update/${id}`}
            startIcon={<Iconify icon="clarity:note-edit-solid" />}
          >
            Update Store
          </Button>
        </Stack>
        <Grid container spacing={2}>
                    <Grid item xs={7}>
                    <Card> 
                         <Typography padding={1} style={{background : "#eee" }}  textAlign="center" variant="h6" component="div">
                            Store Operational Hours
                        </Typography>
                        {StoreData.operational_hours? <TimingTable timing = {StoreData.operational_hours} />: "Empty"} 
                    </Card>
                    <Card> 
                        <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                            Description
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {StoreData.description? StoreData.description : <div  style={{ textAlign : "center"}} > empty </div> }
                        </Typography>
                    </Card>
                    <Card> 
                        <Typography style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                            Additional Information
                        </Typography>
                        
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {StoreData.additional_info? StoreData.additional_info : <div  style={{ textAlign : "center"}} > empty </div> }
                        </Typography>
                    </Card>
                    <Card> 
                        <Typography  marginTop = {3} style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                            Food Type 
                        </Typography>
                          {StoreData.food_types?
                            <ImageList >
                              {StoreData.food_types.map((item) => (
                                <ImageListItem key={item.img}> 
                                  <img
                                    src= {item.image}
                                    style={{ maxHeight : "250px"}}
                                  />
                                  <ImageListItemBar
                                    title={item.food_type_name}
                                    subtitle = {item.status ==1 ? "Active" : "Inactive"}
                                    
                                    actionIcon={
                                      <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                      >
                                        <Info />
                                      </IconButton>
                                    }
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          :null} 
                    </Card>
                    <Card marginTop = {5}> 
                        <Typography  marginTop = {3} style={{ background : "#eee" }}  padding={1} textAlign= "center" variant="h6" component="div">
                            Cuisine Type 
                        </Typography>

                        {StoreData?.cuisines?               
                          <ImageList >
                              {StoreData?.cuisines?.map((item) => (
                                <ImageListItem key={item?.img}>
                                  <img
                                    style={{ maxHeight : "250px"}}
                                    src= {item?.image}
                                  />
                                  <ImageListItemBar
                                    title={item?.cuisine_name}
                                    subtitle = {item?.status ==1 ? "Active" : "Inactive"}

                                    actionIcon={
                                      <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item?.title}`}
                                      >
                                        <Info />
                                      </IconButton>
                                    }
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          : "Empty" }  
                    </Card>
                    <Card> 
                        <Typography  marginTop = {3} padding={1} style={{background : "#eee" }}  textAlign="center" variant="h6" component="div">
                            Store Images
                        </Typography>
                        {StoreData?.images ? <>
                        <ImageList >
                          {StoreData?.images?.map((item) => ( 
                            <> 
                            <ImageListItem key={item?.id}>
                              <img
                                src={item?.image}
                                // alt={item.title}
                                loading="lazy"
                              />
                              <ImageListItemBar
                                actionIcon={
                                  <IconButton
                                    onClick={()=> ImageDeleteHandler(id, item.id)}
                                    sx={{ color: 'rgba(255, 255, 255, 0.80)' }}
                                    // aria-label={`info about ${item.id}`}
                                  >
                                    <DeleteIcon color='error' />
                                  </IconButton>
                                }
                              />
                            </ImageListItem>
                            </>
                          ))}
                          <ImageListItem >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <label htmlFor="icon-button-file">
                                <Input
                                  onChange={UploadHandler}
                                accept="image/*" id="icon-button-file" type="file" />
                                <IconButton  color="primary" aria-label="upload picture" component="span">
                                  <AddPhotoAlternateIcon style={{ margin : "90px", fontSize : "100px" }}  color='primary' />
                                </IconButton>
                              </label>
                          </Stack>
                          </ImageListItem>
                        </ImageList>
                         </>: "empty"}
                    </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Card>
                            <CardContent>
                              <Table> 
                                <TableRow className={classes.tableRow}>
                                   <TableCell align="left"  className={classes.tableCell}> Store Name </TableCell>
                                   <TableCell align="left" className={classes.tableCell}>{StoreData.store_name?StoreData.store_name : "empty"}</TableCell>
                                </TableRow>
                                <TableRow className={classes.tableRow}>
                                   <TableCell align="left" className={classes.tableCell}> Max Delivery KM </TableCell>
                                   <TableCell align="left" className={classes.tableCell}>{StoreData.max_delivery_km?StoreData.max_delivery_km: "empty"}</TableCell>
                                </TableRow>
                                <TableRow className={classes.tableRow}>
                                   <TableCell align="left" className={classes.tableCell}> Business Contact Number</TableCell>
                                   <TableCell align="left" className={classes.tableCell}>{StoreData.contact_no?StoreData.contact_no: "empty"}</TableCell>
                                </TableRow>
                              </Table>             
                            </CardContent>
                        </Card>
                        <Card style={{ marginTop  : "10px" }} >
                          <CardContent style={{ display:'flex', justifyContent:'center' }} >
                            <IconButton  size='large' > <Iconify icon= "entypo:location-pin" /></IconButton> <br/>
                             {StoreData.location? StoreData.location.address : "empty"}
                          </CardContent>
                        </Card>
                        <Card style={{ marginTop  : "10px" }} >
                          <CardContent style={{ display:'flex', justifyContent:'center' }} >
                             {/* <IconButton  target="_blank" href= {StoreData.social_links?StoreData.social_links.website : null} size='large'> <Iconify icon= "mdi:web-box" /></IconButton>
                             <IconButton  target="_blank" href= {StoreData.social_links?StoreData.social_links.facebook : null} size='large'> <Iconify icon= "fa6-brands:facebook-square" /></IconButton>
                             <IconButton  target="_blank" href= {StoreData.social_links?StoreData.social_links.instagram: null} size='large'> <Iconify icon= "fa6-brands:instagram-square" /></IconButton>
                           */}

                             <Table> 
                                <TableRow className={classes.tableRow}>
                                   <TableCell align="right"  className={classes.tableCell}> 
                                      <IconButton size='large'> 
                                        <Iconify icon= "mdi:web-box" />
                                      </IconButton>
                                   </TableCell>
                                   <TableCell align="left" className={classes.tableCell}>{(StoreData?.social_links?.website)?(StoreData?.social_links?.website) : "No link"}</TableCell>
                                </TableRow>
                                <TableRow className={classes.tableRow}>
                                   <TableCell align="right" className={classes.tableCell}>
                                      <IconButton size='large'> 
                                        <Iconify icon= "fa6-brands:facebook-square" /> 
                                      </IconButton>
                                   </TableCell>
                                   <TableCell align="left" className={classes.tableCell}>{ (StoreData?.social_links?.facebook)?(StoreData?.social_links?.facebook) : "No link"}</TableCell>
                                </TableRow>
                                <TableRow className={classes.tableRow}>
                                   <TableCell align="right" className={classes.tableCell}> 
                                      <IconButton size='large'> 
                                        <Iconify icon= "fa6-brands:instagram-square" /> 
                                      </IconButton>
                                   </TableCell>
                                   <TableCell align="left" className={classes.tableCell}>{ (StoreData?.social_links?.instagram)?(StoreData?.social_links?.instagram): "No link"}</TableCell>
                                </TableRow>
                              </Table> 
                          </CardContent>
                        </Card>
                    </Grid>
                 </Grid>
      </Container>
    </Page>
  );
}
