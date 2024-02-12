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
          'rgba(176, 171, 237, 0.2)',
          'rgba(96, 87, 219, 0.2)',
          'rgba(45, 36, 168, 0.2)',
          'rgba(243, 112, 75, 0.2)'
        ],
        borderColor: [
          'rgba(176, 171, 237, 1)',
          'rgba(96, 87, 219, 1)',
          'rgba(45, 36, 168, 1)',
          'rgba(243, 112, 75, 1)'
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
