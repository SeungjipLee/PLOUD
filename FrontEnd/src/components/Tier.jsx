import React, { useEffect, useState } from 'react';
import { getScoreList } from '../services/statistic';
import { useSelector } from "react-redux";


        

const Tier = () => {
    const { token } = useSelector((state) => state.userReducer)
    const [ scoreList, setScoreList ] = useState([])
    const [ isBronze, setIsBronze ] = useState(false)
    const [ isSilver, setIsSilver ] = useState(false)
    const [ isGold, setIsGold ] = useState(false)
    const [ showModal, setShowModal ] = useState(false)
    const [ tier, setTier ] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getScoreList(
              token,
              (res) => {
                console.log(res.data.data.totalTime)
                setTier(res.data.data.totalTime)
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
            console.error(error);
          }
        };
        fetchData();
      }, []);
    
      const Modal = () => (
        <div style={{
          position: 'absolute', top: '30px', left:'120px',
          background: 'white', padding: '20px', borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '300px', height:'100px', zIndex:'1000',
        }}>
          {isBronze&&<p>현재 티어는 브론즈 입니다.</p>}
          {isBronze&&<p>나의 총 연습 시간 : {tier}분</p>}
          {isBronze&&<p>실버까지는 {60-tier}분 남았습니다.</p>}
          {isSilver&&<p>현재 티어는 실버 입니다.</p>}
          {isSilver&&<p>나의 총 연습 시간 : {tier}분</p>}
          {isSilver&&<p>골드까지는 {120-tier}분 남았습니다.</p>}
          {isGold&&<p>현재 티어는 골드 입니다.</p>}
          {isGold&&<p>나의 총 연습 시간 : {tier}분</p>}
          {isGold&&<p>현재 최고 티어입니다.</p>}
        </div>
      );
      
      const handleInfo = () => {
        setShowModal(!showModal)
      }


  return(
    <div className='relative'>
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
        <img
           src="/images/info.png"
           className="w-10 h-10 rounded-2xl absolute bottom-28 left-24"
           onClick={handleInfo}
          />
        {showModal && <Modal />}
    </div>
  )
};

export default Tier;