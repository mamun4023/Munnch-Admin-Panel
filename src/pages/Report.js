// material
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  TotalUser,
  TotalMerchant,
  TotalCuisine,
  TotalMenu,
  Growth,
  OrderGrowth,
  Top5Cuisine,
  OrderTimeline,
} from '../sections/@dashboard/report';

// ----------------------------------------------------------------------

export default function Report() {
  return (
    <Page title="Munchh | Report ">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TotalUser />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalMerchant />
          </Grid>
           <Grid item xs={12} sm={6} md={3}>
            <TotalCuisine />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalMenu />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Growth />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Top5Cuisine />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <OrderGrowth />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
