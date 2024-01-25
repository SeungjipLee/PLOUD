import Button from "../../components/Button";

const SocialLogin = () => {
  return (
    <div className="SocialLogin">
      <div className="KakaoLogin"><Button>카카오 로그인</Button></div>
      <div className="GoogleLogin"><Button>구글 로그인</Button></div>
    </div>
  );
};

export default SocialLogin