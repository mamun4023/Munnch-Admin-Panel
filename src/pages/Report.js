// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  
  TotalUser,
  TotalMerchant,
  TotalCuisine,
  TotalMenu,
  Growth,
  OrderGrowth,
  AppBugReports,
  Top5Cuisine,
  AppNewsUpdate,
  AppWeeklySales,
  OrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../sections/@dashboard/app2';

// ----------------------------------------------------------------------

export default function Report() {
  return (
    <Page title="Munchh | Report ">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Report</Typography>
        </Box>
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
            {/* <AppCurrentSubject /> */}
            <OrderTimeline />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            {/* <AppNewsUpdate /> */}
            <AppTrafficBySite />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {/* <AppOrderTimeline /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {/* <AppTrafficBySite /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            {/* <AppTasks /> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
