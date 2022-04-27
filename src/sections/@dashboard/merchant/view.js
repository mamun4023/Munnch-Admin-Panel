import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack, Box, IconButton, Grid, CardActionArea, Button } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { FetchSingleMerchant } from '../../../redux/merchant/fetchSingle/action';
import Spinner from 'src/components/Spinner';

function View() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(FetchSingleMerchant(id))
    },[id])

    const MerchantData = useSelector(state => state.FetchSingleMerchant.data);
    const loading = useSelector(state => state.FetchSingleMerchant.loading);

    console.log("Merchant data", MerchantData)
    return(
            <>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="h4" gutterBottom>
                        Merchnat Details
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to= {`/dashboard/merchant/update/${id}`}
                        startIcon={<Iconify icon="clarity:note-edit-solid" />}
                    >
                        Update Merchant
                    </Button>
                </Stack>  

                {loading? <Spinner/> : <Box>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                    <Card>

                    <Typography variant="h5" component="div">
                        Description
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {MerchantData.description? MerchantData.description : "empty"}
                    </Typography>
                    </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Name &emsp;&emsp;: &ensp; {MerchantData.personal_name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <Box 
                                        sx={{ py: 1}}
                                    >
                                        <h4> IC Number &ensp;&ensp; : &ensp; {MerchantData.ic_number}  </h4>
                                        <h4> Phone &emsp;&emsp; &emsp; : &ensp; {MerchantData.phone} </h4>
                                        <h4> Email &emsp; &emsp; &emsp; : &ensp; {MerchantData.email}  </h4>
                                        <h4> Store phone &ensp; : &ensp; {MerchantData.store_phone}  </h4>
                                    </Box> 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                 </Grid>
                 </Box>}
            </>
        );
}

export default View;

