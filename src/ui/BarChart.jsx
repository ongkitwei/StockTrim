"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({
  dateArray,
  segmentArray,
  revenueArray,
  legendState,
}) {
  if (!dateArray || !segmentArray || !revenueArray) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const barChartColourArray = [
    "rgba(0, 100, 145, 0.7)", // Deep navy blue (trustworthy)
    "rgba(70, 130, 50, 0.7)", // Forest green (growth)
    "rgba(145, 40, 60, 0.7)", // Crimson red (decline)
    "rgba(120, 80, 160, 0.7)", // Royal purple (premium)
    "rgba(220, 130, 30, 0.7)", // Amber gold (value)
    "rgba(30, 70, 110, 0.7)", // Steel blue (stable)
    "rgba(180, 60, 40, 0.7)", // Rust orange (volatility)
    "rgba(50, 90, 90, 0.7)", // Dark teal (liquidity)
    "rgba(160, 50, 110, 0.7)", // Deep magenta (innovation)
    "rgba(80, 110, 50, 0.7)", // Olive (sustainability)
    "rgba(110, 50, 80, 0.7)", // Maroon (dividends)
    "rgba(40, 70, 120, 0.7)", // Sapphire (tech)
    "rgba(90, 50, 110, 0.7)", // Eggplant (luxury)
    "rgba(200, 100, 0, 0.7)", // Bronze (commodities)
    "rgba(60, 60, 60, 0.7)", // Charcoal (neutral)
  ];

  const datasetArray = segmentArray?.map((x, index) => {
    const data = revenueArray.map((dateRevenue) => dateRevenue[index]);
    return {
      label: x || "null",
      data,
      backgroundColor: barChartColourArray[index],
    };
  });
  const chartData = {
    labels: dateArray, // x-axis dates
    datasets: datasetArray,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", display: legendState },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue",
        },
        ticks: {
          callback: function (value) {
            if (value >= 1_000_000_000) return value / 1_000_000_000 + "B";
            if (value >= 1_000_000) return value / 1_000_000 + "M";
            if (value >= 1_000) return value / 1_000 + "K";
            return value;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
