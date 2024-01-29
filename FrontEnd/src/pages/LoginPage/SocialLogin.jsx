import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";



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
              localStorage.setItem('credential', credentialResponse.credential);
              localStorage.setItem('clientId', credentialResponse.clientId);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
    </>      
  );
};

export default SocialLogin