import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'], // x-axis
  datasets: [
    {
      label: 'My First Dataset', // graph name
      data: [65, 59, 80, 81, 56, 55], // y-axis
      borderColor: 'rgba(75, 192, 192, 1)', // line color
      backgroundColor: 'blue', // bg color of points
      borderWidth: 2, // width of line
      tension: 0, // line curves
    },
  ],
};

const options = {
  responsive: true, // auto responsive
  plugins: {
    legend: {
      display: true,
      position: 'top' as const, // position of heading
    },

    tooltip: {
      enabled: true, // tool tip
      callbacks: {
        label(context: any) {
          const label = context.label || '';
          const value = context.raw || 0;
          return `${label}: ${value}`; // tool tip label with value
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true, // display or not
        text: 'Months', // text for axis
      },
      grid: {
        color: '#e0e0e0', // grid colors
      },
    },
    y: {
      beginAtZero: false, // begin with 0 point
      title: {
        display: true, // display or not
        text: 'Sales', // text for axis
      },
      grid: {
        color: '#e0e0e0', // grid colors
      },
    },
  },
};

const ChartJSFile = () => {
  return (
    <>
      <div className="w-full h-full max-w-[600px] max-h-[400px]">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default ChartJSFile;
