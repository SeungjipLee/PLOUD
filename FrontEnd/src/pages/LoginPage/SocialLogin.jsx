import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


const SocialLogin = () => {
  return (
        <GoogleOAuthProvider 
          clientId="클라이언트아이디적기"
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
        
  );
};

export default SocialLogin