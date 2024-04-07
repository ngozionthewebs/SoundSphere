import { Chart } from "chart.js/auto";
import React, { useRef, useEffect } from "react"

export default function BarChart({ topTracks }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destroy the previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const myChartRef = chartRef.current.getContext("2d");

        // If topTracks is not null or empty, map through it and create new arrays for names and popularity
        const trackPopularity = topTracks ? topTracks.map(track => track.popularity) : [];
        const trackNames = topTracks ? topTracks.map(track => track.name) : [];

        // Set up the chart with the new data
        chartInstance.current = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: trackNames, // Labels are the track names
                datasets: [{
                    label: "Top Track",
                    data: trackPopularity, // Data points are the track popularity values
                    backgroundColor: "rgba(255, 99, 132, 0.2)", // Color for the bars
                    borderColor: "#fff",
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "#fff" // this will ensure the color of the text is white
                        }
                    }
                },
            },
        });

        // Clean up function to destroy chart instance on component unmount
        return () => {
            chartInstance.current && chartInstance.current.destroy();
        };
    }, [topTracks]); // useEffect will run again if topTracks changes

    return <canvas ref={chartRef} />;
}
