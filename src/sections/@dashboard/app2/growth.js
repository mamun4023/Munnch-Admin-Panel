import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, MenuItem, Stack, TextField} from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';
import { useState } from 'react';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Customers ',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 40]
  },
  {
    name: 'Merchants',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 20]
  },
  {
    name: 'Riders',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 30]
  }
];

export default function AppWebsiteVisits() {
  const [year, setYear] = useState("2022");
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2022',
      '02/01/2022',
      '03/01/2022',
      '04/01/2022',
      '05/01/2022',
      '06/01/2022',
      '07/01/2022',
      '08/01/2022',
      '09/01/2022',
      '10/01/2022',
      '11/01/2022',
      '12/01/2022'
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
              <CardHeader title="Growth" subheader="(+43%) than last year" />
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
                    // label="Coupon Type"
                    variant="outlined"
                    value={year}
                    onChange = {(e)=>setYear(e.target.value)}
                    >    
                      <MenuItem value= "2022"> 2022 </MenuItem>
                      <MenuItem value= "2023"> 2023 </MenuItem>
                      <MenuItem value= "2024"> 2024 </MenuItem>
                      <MenuItem value= "2024"> 2025 </MenuItem>
                      <MenuItem value= "2024"> 2026 </MenuItem>
                      <MenuItem value= "2024"> 2027 </MenuItem>
                      <MenuItem value= "2024"> 2028 </MenuItem>
                      <MenuItem value= "2024"> 2029 </MenuItem>
                      <MenuItem value= "2024"> 2030 </MenuItem>
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
