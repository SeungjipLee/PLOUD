import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';

const KakaoSignUp = () => {
  const [data, setData] = useState('kakao');

  const responseKaKao = (res) => {
    setData(res);
    alert(JSON.stringify(data));
    console.log(res);
  };

  const responseFail = (err) => {
    alert(err);
  };

  useEffect(() => {
    const initializeKakao = async () => {
      await new Promise((resolve) => {
        if (window.Kakao) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
          script.onload = () => {
            resolve();
          };
          document.head.appendChild(script);
        }
      });

      window.Kakao.init('332a66cec4821eaa7ac45f2ff3dfcbb5');
      window.Kakao.isInitialized();
    };

    initializeKakao();
  }, []);

  return (
    <>
      <StKaKaoLogin>
        <KaKaoBtn
          jsKey={'332a66cec4821eaa7ac45f2ff3dfcbb5'}
          buttonText="KaKao"
          onSuccess={responseKaKao}
          onFailure={responseFail}
          getProfile={true}
        />
      </StKaKaoLogin>
    </>
  );
};

const StKaKaoLogin = styled.div`
  cursor: pointer;
`;

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 190px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #FFEB00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
  }
}`;

export default KakaoSignUp;
