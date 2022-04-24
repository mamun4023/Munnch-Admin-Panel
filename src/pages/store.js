import { useState, useEffect, useDebugValue } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  ImageList,
  ImageListItem

} from '@mui/material';
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
import {AddImage} from '../redux/merchantStore/upload/action'
// ----------------------------------------------------------------------

const Input = styled('input')({
  display: 'none',
});



export default function Store() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.SingleStore.loading);
  const [image, setImage] = useState();

  const UploadHandler = (e)=>{
    const data = new FormData();
    data.append('image', e.target.files[0])
    AddImage(id, data);
    setTimeout(()=>{
      dispatch(FetchSingleStore(id))
    },1000)
  }


  const ImageDeleteHandler = (storeId, imageId)=>{
    dispatch(RemoveImage(storeId, imageId));
    setTimeout(()=>{
      dispatch(FetchSingleStore(id))
    },1000)
    
  }

  useEffect(()=>{
    dispatch(FetchSingleStore(id))
  },[])

  const StoreData = useSelector(state => state.SingleStore.data);


  return (
    <Page title="Munchh | Food">
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
                         <Typography padding={2} style={{background : "#eee" }}  textAlign="center" variant="h6" component="div">
                            Store Operational Hours
                        </Typography>
                        {StoreData.operational_hours? <TimingTable timing = {StoreData.operational_hours} />: "Empty"} 
                    </Card>

                    <Card> 
                        <Typography style={{ background : "#eee" }}  padding={2} textAlign= "center" variant="h6" component="div">
                            Description
                        </Typography>
                        
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {StoreData.description? StoreData.description : "empty" }
                        </Typography>
                    </Card>
                    <Card> 
                        <Typography padding={2} style={{background : "#eee" }}  textAlign="center" variant="h6" component="div">
                            Store Images
                        </Typography>
                        {StoreData.images? <>

    <ImageList >
     
    
      {StoreData.images.map((item) => ( 
        <> 

        <ImageListItem key={item.id}>
          <img
            src={item.image}
            // srcSet={`${item.id}}
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
                                <Typography variant="h5" component="div">
                                   Store Name &emsp;&ensp;: &ensp; {StoreData.store_name?StoreData.store_name : "empty"}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <Box 
                                        sx={{ py: 1}}
                                    >
                                        <h4> Contact Number &ensp;&ensp; : &ensp;  {StoreData.contact_no?StoreData.contact_no: "empty" }  </h4>
                                        <h4> Max Delivery KM &emsp;: &ensp; {StoreData.max_delivery_km?StoreData.max_delivery_km: "empty"} </h4>
                                        {/* <h4> Delivery Charge &ensp; &ensp; : &ensp; {StoreData.delivery_charge? StoreData.delivery_charge: "empty" }  </h4>
                                        <h4> Minimum Order&ensp;&ensp; &ensp; : &ensp;  {StoreData.minimum_order? StoreData.minimum_order : "empty" }  </h4>
                                        */}
                                    </Box> 
                                </Typography>
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
                             <IconButton href= {StoreData.social_links?StoreData.social_links.website : null} size='large' > <Iconify icon= "mdi:web-box" /></IconButton>
                             <IconButton href= {StoreData.social_links?StoreData.social_links.facebook : null} size='large'  > <Iconify icon= "fa6-brands:facebook-square" /></IconButton>
                             <IconButton href= {StoreData.social_links?StoreData.social_links.instagram: null} size='large'  > <Iconify icon= "fa6-brands:instagram-square" /></IconButton>
                          </CardContent>
                        </Card>
                    </Grid>
                 </Grid>
               
      </Container>
    </Page>
  );
}
