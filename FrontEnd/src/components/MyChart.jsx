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
          const response = await getScoreList(token);
          const rawData = response.data.data.scoreChange;
    
          // 날짜별로 데이터 그룹화
          const groupedData = rawData.reduce((acc, curr) => {
            const date = curr.date.split(' ')[0].replace(/\./g, '-');
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(curr.grade);
            return acc;
          }, {});
    
          // 각 그룹에 대한 평균 계산
          const averagedData = Object.entries(groupedData).map(([date, grades]) => {
            const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
            return { date, average };
          });
    
          // 차트에 사용할 라벨과 데이터 추출
          const dataLabels = averagedData.map(item => item.date);
          const dataScores = averagedData.map(item => item.average);
    
          setScoreList({ labels: dataLabels, scores: dataScores });
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
    
      fetchData();
    }, [token]);
          

  const data = {
    labels: scoreList.labels, // 날짜 라벨
    datasets: [
      {
        label: '점수',
        data: scoreList.scores, // 평균 점수 데이터
        fill: false,
        borderColor: 'rgb(243, 112, 75)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          autoSkip: false,
          stepSize: 20,
        }
      },
      x: {
        type: 'category',
        labels: scoreList.labels,
        title: {
          display: false,
          text: '날짜'
        },
        ticks: {
          display: false, // X 축의 라벨을 숨깁니다.
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function(context) {
            // context 배열에서 첫 번째 요소의 라벨(날짜)을 반환합니다.
            return context[0].label;
          }
        }
      },
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      }
    }
  };
  


  return <Line data={data} options={options} />;
};

export default MyChart;
