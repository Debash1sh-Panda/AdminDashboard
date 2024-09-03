import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function UserCountChart({ userData }) {
  const dates = userData.map((data) => data.date);
  const counts = userData.map((data) => data.count);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "User Count",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 1,
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: "User Data Chart",
        font: {
          size: 14,
        },
      },
    },
  };

  return (
    <div className="relative w-full h-64 md:h-96">
      <Bar data={data} options={options} className="w-full h-full" />
    </div>
  );
}

export default UserCountChart;
