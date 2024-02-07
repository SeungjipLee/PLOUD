import React, { useEffect, useState } from 'react';
import { getScoreList } from '../services/statistic';
import { useSelector } from "react-redux";


        

const Tier = () => {
    const { token } = useSelector((state) => state.userReducer)
    const [ scoreList, setScoreList ] = useState([])
    const [ isBronze, setIsBronze ] = useState(false)
    const [ isSilver, setIsSilver ] = useState(false)
    const [ isGold, setIsGold ] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getScoreList(
              token,
              (res) => {
                console.log(res.data.data.totalTime)
                const tier = res.data.data.totalTime
                if (tier < 60) {
                    setIsBronze(true)
                    setIsSilver(false)
                    setIsGold(false)
                } else if (tier<120) {
                    setIsBronze(false)
                    setIsSilver(true)
                    setIsGold(false)
                } else {
                    setIsBronze(false)
                    setIsSilver(false)
                    setIsGold(true)
                }

            },
              (err) => console.log('여기')
            );       
          } catch (error) {
            console.error("쩌어기");
          }
        };
        fetchData();
      }, []);
    
    

  return(
    <>
        {isBronze&& <img src='images/bronze.png'></img> }
        {isSilver&& <img src='images/silver.png'></img> }
        {isGold&& <img src='images/gold.png'></img> }
    </>
  )
};

export default Tier;
