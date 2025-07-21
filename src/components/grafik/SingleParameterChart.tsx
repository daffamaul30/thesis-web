// components/SuhuChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

type ChartProps = {
  data: { timestamp: string; value: number }[];
  label: string;
};

const SingleParameterChart: React.FC<ChartProps> = ({ data, label }) => {
  const chartData = {
    labels: data.map((d) => d.timestamp),
    datasets: [
      {
        label: label,
        data: data.map((d) => d.value),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: label,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SingleParameterChart;
