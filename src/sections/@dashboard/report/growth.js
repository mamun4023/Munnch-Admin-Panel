import { forEach, merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import {useDispatch, useSelector} from 'react-redux';
import { Card, CardHeader, Box, MenuItem, Stack, TextField} from '@mui/material';
import { BaseOptionChart } from '../../../components/charts';
import { useEffect, useState } from 'react';
import {FetchGrowth} from '../../../redux/report/fetchGrowth/action';

// ----------------------------------------------------------------------

export default function UserGrowth() {
  const dispatch = useDispatch();
  const [year, setYear] = useState("2022");

  useEffect(()=>{
    dispatch(FetchGrowth(year))
  }, [year])

  const GrowthData = useSelector(state =>state.GrowthChart.data)

  const CustomerYear = [
    {
      "month": "January",
      "total": 0
    },
    {
      "month": "February",
      "total": 0
    },
    {
      "month": "March",
      "total": 0
    },
    {
      "month": "April",
      "total": 0
    },
    {
      "month": "May",
      "total": 0
    },
    {
      "month": "June",
      "total": 0
    },
    {
      "month": "July",
      "total": 0
    },
    {
      "month": "August",
      "total": 0
    },
    {
      "month": "September",
      "total": 0
    },
    {
      "month": "October",
      "total": 0
    },
    {
      "month": "November",
      "total": 0
    },
    {
      "month": "December",
      "total": 0
    }
  ]

  const MerchantYear = [
    {
      "month": "January",
      "total": 0
    },
    {
      "month": "February",
      "total": 0
    },
    {
      "month": "March",
      "total": 0
    },
    {
      "month": "April",
      "total": 0
    },
    {
      "month": "May",
      "total": 0
    },
    {
      "month": "June",
      "total": 0
    },
    {
      "month": "July",
      "total": 0
    },
    {
      "month": "August",
      "total": 0
    },
    {
      "month": "September",
      "total": 0
    },
    {
      "month": "October",
      "total": 0
    },
    {
      "month": "November",
      "total": 0
    },
    {
      "month": "December",
      "total": 0
    }
  ]

  // filter customer data
  CustomerYear.forEach(data =>{
    GrowthData?.customers?.forEach(d =>{
      if(data.month == d.month) {
        data.total = d.total
      }
    })
 })

 // filter merchant data
 MerchantYear.forEach(data =>{
  GrowthData?.vendors?.forEach(d =>{
    if(data.month == d.month) {
      data.total = d.total
    }
  })
})

// sorting month
  const map = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August' : 8,
    'September' : 9,
    'October' : 10,
    'Novermber' : 11,
    'December' : 12
  };
  CustomerYear.sort((a, b) => {
    return map[a.day] - map[b.day];
  });

  MerchantYear.sort((a, b) => {
    return map[a.day] - map[b.day];
  });

 const customerData = [];
 const merchantData = [];
 
 CustomerYear.forEach(data =>{
   customerData.push(data.total)
 })

  
 MerchantYear.forEach(data =>{
  merchantData.push(data.total)
})

  
  const CHART_DATA = [
    {
      name: 'Customers ',
      type: 'column',
      data: customerData
    },
    {
      name: 'Merchants',
      type: 'area',
      data: merchantData
    },
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      `Jan`,
      `Feb`,
      `Mar`,
      `Apr`,
      `May`,
      `Jun`,
      `Jul`,
      `Aug`,
      `Sep`,
      `Oct`,
      `Nov`,
      `Dec`
    ],
    xaxis: { type: 'date' },
    tooltip: {
      // shared: true,
      // intersect: false,
      // y: {
      //   formatter: (y) => {
      //     if (typeof y !== 'undefined') {
      //       return `${y.toFixed(0)}`;
      //     }
      //     return y;
      //   }
      // },
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined,
    },
    }
  });

  return (
      <Card>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}> 
              <CardHeader title=" User Growth" />
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
