import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = ({ scores }) => { // props로 scores 배열을 받음
  const data = {
    labels: ['명료도', '발화속도', '성량', '평균점수'],
    datasets: [
      {
        label: '점수',
        data: scores, // 외부에서 받은 scores 데이터 사용
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      }
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'PLOUD 발표 분석 점수'
      },
    },
    scales: {
      x: {
        ticks: {
          stepSize: 20
        },
        beginAtZero: true,
        max: 100
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
