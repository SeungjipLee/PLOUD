import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/user";
import { useDispatch } from "react-redux";
import { getToken } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyAlert from "../../components/MyAlert";

// 구글 로그인
// 서버로부터 응답을 받아서 성공응답시 => 로그인
// 실패 시 => 회원가입
const SocialLogin = () => {
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <GoogleOAuthProvider
        clientId="392523178125-21b3u9bb52injjfa9kjdb3a0vbijcidg.apps.googleusercontent.com"
        // onScriptLoadError={() => console.log("실패")}
        // onScriptLoadSuccess={() => console.log("성공")}
      >
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            localStorage.setItem("credential", credentialResponse.credential);
            localStorage.setItem("clientId", credentialResponse.clientId);
            const response = await googleLogin(
              { token: credentialResponse.credential },
              (res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatch(getToken(res.data));
                navigate("/");
              },
              async (err) => {
                await setMessage("회원가입이 필요합니다.");
                setAlert(true);
              }
            );
          }}
          onError={async () => {
            await setMessage("소셜로그인에 실패했습니다.\n 다시 시도해 주세요.");
            setAlert(true);
          }}
        />
      </GoogleOAuthProvider>
      {alert && <MyAlert content={message} onClose={() => {setAlert(false); navigate('/signup')}}/>}
    </>
  );
};

export default SocialLogin;
