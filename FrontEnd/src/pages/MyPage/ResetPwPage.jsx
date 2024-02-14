import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { getProfile, patchPassword } from "../../services/user";
import { useNavigate } from "react-router-dom";
import MyAlert from "../../components/MyAlert";

const ResetPwPage = () => {
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  // 로직
  const { token } = useSelector((state) => state.userReducer);
  const [profile, setProfile] = useState({});
  const [oldValue, setOldValue] = useState("");
  const [oldValueRe, setOldValueRe] = useState("");
  const [newValue, setNewValue] = useState("");
  const profileImgPath = `${profile.profileImg}`;
  const validatePassword = () =>
    /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,15}$/.test(newValue);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      try {
        const response = getProfile(
          token,
          (res) => {
            setProfile(res.data.data);
          },
          (err) => console.log(err)
        );
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    const inputForm = {
      oldValue,
      newValue,
    };

    if (validatePassword()) {
      if (oldValue === oldValueRe) {
        patchPassword(
          token,
          inputForm,
          async (res) => {
            await setMessage("비밀번호가 변경되었습니다.");
            setAlert2(true);
          },
          async (err) => {
            await setMessage("잠시 후 다시 실행 바랍니다.");
            setAlert(true);
          }
        );
      } else {
        async () => {
          await setMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          setAlert(true);
        };
      }
    } else {
      async () => {
        await setMessage("비밀번호 양식은 특수문자 포함 6~15글자입니다.");
        setAlert(true);
      };
    }
  };

  return (
    <>
      <div className="mypage bg-white w-full min-h-screen">
        <Page header={<Navbar />} footer={<Footer />}>
          <div className="mt-32 place-self-center flex justify-center">
            <h2 className="font-extrabold text-2xl">비밀번호 변경</h2>
          </div>
          <div className="flex justify-center relative bg-white rounded-md outline1 mx-auto my-5">
            <div className="outline1 py-10">
              <div className="flex fetImg ">
                <div
                  className="w-48 h-48"
                  style={{ overflow: "hidden", borderRadius: "5%" }}
                >
                  {!profile.profileImg && (
                    <img
                      src="images/Profile.PNG"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {profileImgPath && (
                    <img
                      src={`${profileImgPath}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <p className="pt-2" style={{ fontWeight: "bold" }}>
                  {profile.nickname}
                </p>
              </div>
              <div className="flex justify-center my-4">
                <form action="" className="mx-1">
                  <input
                    type="password"
                    className="w-64 block rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                    placeholder="비밀번호"
                    onChange={(e) => {
                      setOldValue(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="w-64 block rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                    placeholder="비밀번호 확인"
                    onChange={(e) => {
                      setOldValueRe(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="w-64 block rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                    placeholder="새 비밀번호"
                    onChange={(e) => {
                      setNewValue(e.target.value);
                    }}
                  />
                </form>
              </div>
              <div className="flex justify-center m-10">
                <button
                  onClick={handleSubmit}
                  className="custom-btn btn-1 rounded-md px-3 py-1 mx-3 my-3"
                >
                  비밀번호 변경하기
                </button>
              </div>
            </div>
          </div>
        </Page>
      </div>
      {alert && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
      {alert2 && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert2(false);
            navigate("/mypage");
          }}
        />
      )}
    </>
  );
};

export default ResetPwPage;
