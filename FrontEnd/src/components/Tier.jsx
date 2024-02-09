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
        {isBronze&& 
          <div>
            <img src='images/bronze.png' style={{filter:"drop-shadow(0px 6px 6px #624637)"}}></img>
            <p className='text-center me-2 text-xl font-bold' style={{color:"#624637"}}>브론즈</p>
          </div>
          }
        {isSilver&&
         <div>
           <img src='images/silver.png' style={{filter:"drop-shadow(0px 6px 6px #c0c0c0"}}></img>
           <p className='text-center me-2 text-xl font-bold ' style={{color:"#c0c0c0"}}>실버</p>
         </div>
          }
        {isGold&&
         <div>
           <img src='images/gold.png' style={{filter:"drop-shadow(0px 6px 6px #ffd700"}}></img> 
           <p className='text-center me-2 text-xl font-bold' style={{color:"#ffd700"}}>골드</p>
         </div>
          }
    </>
  )
};

export default Tier;