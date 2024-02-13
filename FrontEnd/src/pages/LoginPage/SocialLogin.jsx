import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/user";
import { useDispatch } from "react-redux";
import { getToken } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

// 구글 로그인
// 서버로부터 응답을 받아서 성공응답시 => 로그인
// 실패 시 => 회원가입
const SocialLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <GoogleOAuthProvider
        clientId="392523178125-21b3u9bb52injjfa9kjdb3a0vbijcidg.apps.googleusercontent.com"
        onScriptLoadError={() => console.log("실패")}
        onScriptLoadSuccess={() => console.log("성공")}
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
              (err) => {
                alert("회원가입이 필요합니다.");
                navigate("/signup");
              }
            );
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      </>
  );
};

export default SocialLogin;
