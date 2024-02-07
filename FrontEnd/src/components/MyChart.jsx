import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getScoreList } from '../services/statistic';
import { useSelector } from "react-redux";


        

const MyChart = () => {
    const { token } = useSelector((state) => state.userReducer)
    const [ scoreList, setScoreList ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getScoreList(
              token,
              (res) => {
                console.log(res.data.data.scoreChange)
                setScoreList(res.data.data.scoreChange)
              },
              (err) => console.log('여기')
            );       
          } catch (error) {
            console.error("쩌어기");
          }
        };
        fetchData();
      }, []);
    
    const dataLabels = scoreList.map(s=>s.date.split(' ')[0].replace(/\./g, '-'))
    const dataScores = scoreList.map(s=>s.grade)
    console.log(dataLabels, dataScores)
      

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: '점수',
        data: dataScores,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
        y: {
            beginAtZero: true,
            max: 100, // Y축의 최대값을 100으로 설정
            // suggestedMin과 suggestedMax를 사용하여 최소/최대 값을 제공
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              // autoSkip: false를 추가하여 Chart.js가 자동으로 간격을 조정하는 것을 방지
              autoSkip: false,
              stepSize: 20, // 이제 stepSize를 20으로 설정
              callback: function(value, index, values) {
                return value; // '점' 단위를 다시 추가해주면 라벨에 점수와 '점'이 표시됩니다.
              }
            }
          },
      x: {
        type: 'time', 
        time: {
          unit: 'day', 
        },
        title: {
          display: false,
          text: '날짜'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        left: 20, // 왼쪽 전체 여백
        right: 20, // 오른쪽 전체 여백
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default MyChart;
