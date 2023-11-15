import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

const NegativeChart = ({ data, courseData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const backgroundColor = courseData.map(() => getRandomColor());

      Chart.defaults.color = "#000";

      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: courseData.map((course) => course.curso),
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColor,
            },
          ],
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, courseData]);

  return (
    <div>
      <h2 className="text-xl2 font-bold leading-10 text-blue text-center">Anotaciones Negativas </h2>
      <div className="w-50 h-50 bg-fondo rounded-[20px] p-10">
        <div
          className="chart-container"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div style={{ width: "250px", height: "250px" }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegativeChart;
