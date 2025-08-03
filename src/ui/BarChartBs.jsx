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

export default function BarChartBs({
  dateArray,
  revenueArray,
  operatingIncomeArray,
  netIncomeArray,
  legendState,
}) {
  console.log("date", dateArray);
  console.log("operating", operatingIncomeArray);
  console.log("netincome", netIncomeArray);
  console.log("revenue", revenueArray);
  if (!dateArray || !revenueArray || !operatingIncomeArray || !netIncomeArray) {
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
  // x
  const chartData = {
    labels: dateArray, // These are your x-axis labels (5 dates)
    datasets: [
      {
        label: "Revenue",
        data: revenueArray.map((val) => val / 1_000_000),
        backgroundColor: "rgba(0, 100, 145, 0.7)",
      },
      {
        label: "Operating Income",
        data: operatingIncomeArray.map((val) => val / 1_000_000),
        backgroundColor: "rgba(70, 130, 50, 0.7)",
      },
      {
        label: "Net Income",
        data: netIncomeArray.map((val) => val / 1_000_000),
        backgroundColor: "rgba(145, 40, 60, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", display: legendState },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        title: {
          display: true,
          text: "Income",
        },
        ticks: {
          callback: function (value) {
            return value.toLocaleString() + "M";
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
