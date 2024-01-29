import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import KakaoSignUp from "./KakaoLogin";



const SocialLogin = () => {
  return (
    <>
        <GoogleOAuthProvider 
          clientId="392523178125-21b3u9bb52injjfa9kjdb3a0vbijcidg.apps.googleusercontent.com"
          onScriptLoadError={() => console.log("실패")}
          onScriptLoadSuccess={() => console.log("성공")}
          >

          <GoogleLogin
            
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
        <KakaoSignUp />
    </>      
  );
};

export default SocialLogin