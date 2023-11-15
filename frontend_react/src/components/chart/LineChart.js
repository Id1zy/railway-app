import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function LineChart({data, labels ,title}) {

  const options = {
    scales: {
      y: {
          min: 0,
          stepSize: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Número de comentarios',
        data: data,
        borderColor: 'rgb(61, 59, 235)',
        backgroundColor: 'rgba(61, 59, 235)',
      },
    ],
  }



  return <Line options={options} data={chartData} />;
}
