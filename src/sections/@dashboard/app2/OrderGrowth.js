import { forEach, merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import {useDispatch, useSelector} from 'react-redux';
// material
import { Card, CardHeader, Box, MenuItem, Stack, TextField} from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';
import { useEffect, useState } from 'react';
import {FetchOrderGrowth} from '../../../redux/report/fetchOrderGrowth/action';

// ----------------------------------------------------------------------

export default function OrderGrowth() {
  const dispatch = useDispatch();
  const [year, setYear] = useState("2022");

  useEffect(()=>{
    dispatch(FetchOrderGrowth(year))
  }, [year])

  const GrowthData = useSelector(state =>state.OrderGrowth.data)
  
  const orderData = [];

  GrowthData?.forEach(data =>{
    orderData.push(data.total)
  })

  const CHART_DATA = [
    {
      name: 'Order Curve ',
      type: 'area',
      data: orderData
    },
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      `01/01/${year}`,
      `02/01/${year}`,
      `03/01/${year}`,
      `04/01/${year}`,
      `05/01/${year}`,
      `06/01/${year}`,
      `07/01/${year}`,
      `08/01/${year}`,
      `09/01/${year}`,
      `10/01/${year}`,
      `11/01/${year}`,
      `12/01/${year}`
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}> 
              <CardHeader 
                title="Order Growth" 
                // subheader="(+43%) than last year" 
              />
                <Stack
                   sx={{
                    marginRight : 5,
                    marginTop : 3,
                    padding : 0,
                   }}
                > 
                 <TextField
                    fullWidth
                    select
                    size='small'
                    variant="outlined"
                    value={year}
                    onChange = {(e)=>setYear(e.target.value)}
                    >    
                      <MenuItem value= "2022"> 2022 </MenuItem>
                      <MenuItem value= "2023"> 2023 </MenuItem>
                      <MenuItem value= "2024"> 2024 </MenuItem>
                      <MenuItem value= "2025"> 2025 </MenuItem>
                      <MenuItem value= "2026"> 2026 </MenuItem>
                      <MenuItem value= "2027"> 2027 </MenuItem>
                      <MenuItem value= "2028"> 2028 </MenuItem>
                      <MenuItem value= "2029"> 2029 </MenuItem>
                      <MenuItem value= "2030"> 2030 </MenuItem>
                      {/* <MenuItem value= "2024"> 2031 </MenuItem>
                      <MenuItem value= "2024"> 2032 </MenuItem>
                      <MenuItem value= "2024"> 2033 </MenuItem>
                      <MenuItem value= "2024"> 2034 </MenuItem>
                      <MenuItem value= "2024"> 2035 </MenuItem>
                      <MenuItem value= "2024"> 2036 </MenuItem>
                      <MenuItem value= "2024"> 2037 </MenuItem>
                      <MenuItem value= "2024"> 2038 </MenuItem>
                      <MenuItem value= "2024"> 2039 </MenuItem>
                      <MenuItem value= "2024"> 2040 </MenuItem>
                      <MenuItem value= "2024"> 2041 </MenuItem>
                      <MenuItem value= "2024"> 2042 </MenuItem>
                      <MenuItem value= "2024"> 2043 </MenuItem>
                      <MenuItem value= "2024"> 2044 </MenuItem>
                      <MenuItem value= "2024"> 2045 </MenuItem>
                      <MenuItem value= "2024"> 2046 </MenuItem>
                      <MenuItem value= "2024"> 2047 </MenuItem>
                      <MenuItem value= "2024"> 2048 </MenuItem>
                      <MenuItem value= "2024"> 2049 </MenuItem>
                      <MenuItem value= "2024"> 2050 </MenuItem> */}
                  </TextField>
                </Stack>
              </div>  
              
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
