import React from  'react';
import {Bar, Line,  Doughnut} from 'react-chartjs-2';


function Chart(){
        
   var data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Helo',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }]
    }

    const options = {
        // vartical chart
        indexAxis : 'x',
        elemetns :{
            bar : {
                borderWidth : 100
            }
        },

        responsive : true,
        plugins : {
            legend : {
                position : 'top'
            }
        },
        title : {
            display : true,
            text : "Bar chart"
        }
    }


    return(
        <>

        <Bar

            data = {data}
              // must include maintainAspectRatio as false to customise hieght and width
            options = {options}
            height = {300}
            width = {400}

        />
        </>
    )
}

export default Chart;