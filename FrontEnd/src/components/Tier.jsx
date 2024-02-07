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
<<<<<<< HEAD
        {isBronze&& 
          <div>
            <img src='images/bronze.png'></img>
            <p className='text-center me-2 text-xl font-bold'>브론즈</p>
          </div>
          }
        {isSilver&&
         <div>
           <img src='images/silver.png'></img>
           <p className='text-center me-2 text-xl font-bold'>실버</p>
         </div>
          }
        {isGold&&
         <div>
           <img src='images/gold.png'></img> 
           <p className='text-center me-2 text-xl font-bold'>골드</p>
         </div>
          }
=======
        {isBronze&& <img src='images/bronze.png'></img> }
        {isSilver&& <img src='images/silver.png'></img> }
        {isGold&& <img src='images/gold.png'></img> }
>>>>>>> 19764a914789842ee506a9dbe1c61738de5d0715
    </>
  )
};

<<<<<<< HEAD
export default Tier;
=======
<<<<<<< HEAD
export default Tier;
=======
export default Tier;
>>>>>>> 38714c0445dc4bf79f225ef2d20974520168c6bc
>>>>>>> 19764a914789842ee506a9dbe1c61738de5d0715
