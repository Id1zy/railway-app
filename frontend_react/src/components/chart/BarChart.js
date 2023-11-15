import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function BarChart({chartData}){
    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        scales:{
            y:{
                beginAtZero: true,
            }
        }
    }
    return <Bar data={chartData} options={options}/>
}

export default BarChart;