import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DashCard = ({ title, subtitle1, subtitle2, quantity1, quantity2, color1, color2, buttonText, color, hovercolor, colortext }) => {
  const containerStyle = {
    backgroundColor: color,
  };

  // Procesar datos para el gráfico circular
  const chartData = {
    labels: [subtitle1, subtitle2],
    datasets: [{
      data: [quantity1, quantity2],
      backgroundColor: [color1, color2],
    }],
  };

  return (
    <div className="bg-white shadow rounded-[20px] p-3" style={containerStyle}>
      <div className="flex justify-center">
        <p className={`${colortext} text-lg text-center font-bold`}>{title}</p>
      </div>
      <div className="text-center mx-auto" style={{ width: '100px', height: '100px' }}>
        <Doughnut
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <div className={`flex justify-center ${color} hover:${hovercolor} py-2 -mx-3 my-4`}>
        <p className="text-white text-lg text-center font-bold">{subtitle1} {quantity1}</p>
      </div>
      <div className={`flex justify-center ${color} hover:${hovercolor} py-2 -mx-3 my-4`}>
        <p className="text-white text-lg text-center font-bold">{subtitle2} {quantity2}</p>
      </div>
    </div>
  );
};

export default DashCard;
