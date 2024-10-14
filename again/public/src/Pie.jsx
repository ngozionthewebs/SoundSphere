// PieChart.jsx
import { Chart } from "chart.js/auto";
import React, { useRef, useEffect } from "react";

export default function PieChart({ popularity }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    // Data for the pie chart based on artist popularity
    const pieChartData = {
      labels: ["Popularity", "Remaining"],
      datasets: [
        {
          label: "Artist Popularity",
          data: [popularity, 100 - popularity], // Assuming popularity is out of 100
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", // Red color for popularity
            "rgba(54, 162, 235, 0.2)", // Blue color for remaining
          ],
          borderColor: [
            "#fff", // Set border color to white
            "#fff", // Set border color to white
          ],
          borderWidth: 1,
        },
      ],
    };

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: pieChartData,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Artist Popularity",
            color: "#fff", // Set title text color to white
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [popularity]); // Dependency array to re-render the chart when popularity changes

  return <canvas ref={chartRef} />;
}
