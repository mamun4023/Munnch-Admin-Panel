import React, { useState } from "react";
import ReactApexChart from 'react-apexcharts'
import {Card, CardHeader, TextField, MenuItem, Stack} from '@mui/material';

    const data = {
      series: [{
        data: [10, 20, 100, 200, 300, 100, 500, 600, 700, 800]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar : {
            show: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false
        },
        colors:['#000000', '#000000', '#9C27B0'],
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"],
        }
      },
    };

  export default function User(){
    const [year, setYear] = useState('2022')
    return (
      <Card>
              <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}> 
                <CardHeader title="Order Grouth" />
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
        <ReactApexChart   options={data.options} series={data.series} type="bar" height={350} />
      </Card>
    )
  }