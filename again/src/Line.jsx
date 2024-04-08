import { Chart } from "chart.js/auto";
import React, { useRef, useEffect } from "react";

export default function LineChart({ topTracks }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    // Map topTracks to get the names and popularity
    const trackNames = topTracks.map(track => track.name);
    const trackPopularity = topTracks.map(track => track.popularity);

    // Data for the line chart
    const lineChartData = {
      labels: trackNames,
      datasets: [
        {
          label: "Top Track Popularity",
          data: trackPopularity,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    chartInstance.current = new Chart(myChartRef, {
      type: "line",
      data: lineChartData,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Top Track Popularity Over Time",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Popularity'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tracks'
            }
          }
        }
      },
    });

    return () => {
      chartInstance.current && chartInstance.current.destroy();
    };
  }, [topTracks]);

  return <canvas ref={chartRef} />;
}
