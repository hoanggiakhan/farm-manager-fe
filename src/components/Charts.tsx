import { Chart, registerables } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables);
const Charts: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sản lượng cây trồng (kg)',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        data: [650, 590, 800, 810, 560],
      },
      {
        label: 'Số lượng vật nuôi',
        backgroundColor: 'rgba(153,102,255,1)',
        borderColor: 'rgba(153,102,255,1)',
        data: [50, 60, 75, 82, 56],
      },
    ],
  };

  return (
    <div>
      <h4>Biểu đồ sản lượng cây trồng và vật nuôi</h4>
      <Bar data={data} />
    </div>
  );
}

export default Charts;
