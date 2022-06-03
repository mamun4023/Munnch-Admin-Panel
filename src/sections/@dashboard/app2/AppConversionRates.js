import React from "react";
import ReactApexChart from 'react-apexcharts'

    const data = {
    
      series: [{
        data: [10, 20, 100, 200, 300, 100, 500, 600, 700, 800]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
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
    return (
      

          <div id="chart">
              <ReactApexChart  options={data.options} series={data.series} type="bar" height={350} />
          </div>


    )
  }