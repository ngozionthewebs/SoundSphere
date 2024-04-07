import { Chart } from "chart.js/auto";
import React, { useRef, useEffect } from "react";

export default function RadarChart({ followers }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    // Assuming 'followers' is a single number
    // You may want to represent it in a more meaningful way, like an array of values over time
    const data = followers ? [followers, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0, 0]; // Followers data at the first position

    // Data for the radar chart
    const radarChartData = {
      labels: ["Followers", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7"], // Adjust categories as needed
      datasets: [
        {
          label: "Artist Followers",
          data: data,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };

    chartInstance.current = new Chart(myChartRef, {
      type: "radar",
      data: radarChartData,
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
          point: {
            backgroundColor: "#fff",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Artist Followers",
            color: "#fff",
          },
        },
        scales: {
          r: {
            angleLines: {
              color: "#fff",
            },
            grid: {
              color: "#fff",
            },
            pointLabels: {
              color: "#fff",
            },
            suggestedMin: 0, // You may want to set a min value for the radar chart
          },
        },
      },
    });

    return () => {
      chartInstance.current && chartInstance.current.destroy();
    };
  }, [followers]); // useEffect will run again if followers changes

  return <canvas ref={chartRef} />;
}
