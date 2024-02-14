import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getScriptList, getScriptDetail } from "../../services/script";
import { useSelector } from "react-redux";

const NewsPage = ({ setScriptid, setTitle }) => {
  const token = useSelector((state) => state.userReducer.token);
  const [list, setList] = useState([]);
  //console.log(token);

  const getNewsList = async () => {
    getScriptList(
      token,
      1,
      (res) => {
        setList(res.data.data.scripts);
        //console.log(res);
      },
      (err) => {
        console.log(err);
        alert("ScriptList 로딩 에러");
      }
    );
  };

  useEffect(() => {
    getNewsList();
  }, []);

  //console.log(list);

  return (
    <>
      {list.map((i, index) => (
        <div
          key={index}
          className="rounded-md px-1 pt-1 my-2 text-center bg-white text-sm"
        >
          <hr />
          <button
            onClick={() => {
              setScriptid(i.scriptId);
              setTitle(i.scriptTitle);
            }}
            className="mt-2"
            style={{ textAlign: "left" }}
            title={i.scriptTitle}
          >
            {i.scriptTitle.length > 32
              ? `${i.scriptTitle.substring(0, 32)}...`
              : i.scriptTitle}
          </button>
        </div>
      ))}
    </>
  );
};

const SpeechPage = ({ setScriptid, setTitle }) => {
  const token = useSelector((state) => state.userReducer.token);
  const [list, setList] = useState([]);
  //console.log(token);

  const getSpeechList = async () => {
    getScriptList(
      token,
      2,
      (res) => {
        setList(res.data.data.scripts);
        //console.log(res);
      },
      (err) => {
        console.log(err);
        alert("ScriptList 로딩 에러");
      }
    );
  };

  useEffect(() => {
    getSpeechList();
  }, []);

  return (
    <>
      {list.map((i, index) => (
        <div
          key={index}
          className="rounded-md px-1 pt-1 my-2 text-center bg-white text-sm"
        >
          <hr />
          <button
            onClick={() => {
              setScriptid(i.scriptId);
              setTitle(i.scriptTitle);
            }}
            className="mt-2"
            style={{ textAlign: "left" }}
            title={i.scriptTitle}
          >
            {i.scriptTitle.length > 32
              ? `${i.scriptTitle.substring(0, 32)}...`
              : i.scriptTitle}
          </button>
        </div>
      ))}
    </>
  );
};

const ScriptPage = ({ scriptid, setContent }) => {
  // id 바뀔 때 마다 렌더링 되야함(단 id값 정의되지 않았을떄는 렌더링x), 스크립트 부분
  const token = useSelector((state) => state.userReducer.token);
  const [list, setList] = useState([]);

  const getDetail = async () => {
    getScriptDetail(
      token,
      scriptid,
      (res) => {
        setList(res.data.data);
        setContent(res.data.data.content);
      },
      (err) => {
        console.log(err);
        alert("getScriptDetail 에러");
      }
    );
  };

  useEffect(() => {
    getDetail();
  }, [scriptid]);

  return (
    <div
      style={{
        overflowWrap: "break-word",
        flex: "auto",
        whiteSpace: "pre-wrap",
      }}
    >
      {list.content}
    </div>
  );
};

const PracticePage2 = () => {
  const [level, setLevel] = useState("1");
  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scriptid, setScriptid] = useState("");
  const token = useSelector((state) => state.userReducer.token);

  const handleCategoty1 = () => {
    setCategory(2);
  };

  const handleCategoty2 = () => {
    setCategory(1);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="mt-28">
          <div className="text-center font-extrabold text-2xl mainBlueF mb-10">
            혼자연습
          </div>

          <div className="flex flex-col mx-60 bg-sky-50 ps-10 py-10 rounded-2xl mb-24">
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold">1. 대본 :</div>
              <Link
                to="/practice1"
                className="ms-5 bg-blue-300 text-gray-200 rounded-xl px-2 py-1"
              >
                직접 입력
              </Link>
              <button className="ms-3 bg-blue-500 text-white rounded-xl px-2 py-1">
                제공 대본
              </button>
              <p className="ms-3 text-red-500">
                🎤준비된 대본들을 찾아 연습해보세요!
              </p>
            </div>
            {/* <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold">2. 단계 :</div>
              <select
                name=""
                id=""
                className="ms-5 rounded-xl px-3 py-0.5 border border-black">
                <option value="">Level 1</option>
                <option value="">Level 2</option>
                <option value="">Level 3</option>
                <option value="">Level 4</option>
              </select>
              <p className="ms-3 text-red-500">🎤단계에 대한 설명이 들어가요</p>
            </div> */}
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold py-1">2. 분류 :</div>
              {category == 1 && (
                <>
                  <button className="ms-5 bg-blue-500 text-white rounded-xl px-2 ">
                    뉴스
                  </button>
                  <button
                    className="ms-3 bg-blue-300 text-gray-200 rounded-xl px-2 "
                    onClick={handleCategoty1}
                  >
                    연설
                  </button>
                </>
              )}
              {category == 2 && (
                <>
                  <button
                    className="ms-5 bg-blue-300 text-gray-200 rounded-xl px-2 "
                    onClick={handleCategoty2}
                  >
                    뉴스
                  </button>
                  <button className="ms-3 bg-sky-500 text-white rounded-xl px-2 ">
                    연설
                  </button>
                </>
              )}
            </div>
            <div className="flex mb-10 w-full">
              <div className="text-xl mainBlueF font-bold pt-1">3. 내용 :</div>

              <div className="ms-5 border border-gray-300 rounded-2xl py-2 w-3/4 h-80 flex bg-white">
                <div className="w-1/3 border-r border-gray-300 flex flex-col pe-4">
                  <div className="text-xl font-bold ms-5">대본 목록</div>
                  <div
                    className="m-2 h-64 rounded-xl p-1 text-xs"
                    style={{ overflowY: "auto" }}
                  >
                    {category === 1 && (
                      <NewsPage setScriptid={setScriptid} setTitle={setTitle} />
                    )}
                    {category === 2 && (
                      <SpeechPage
                        setScriptid={setScriptid}
                        setTitle={setTitle}
                      />
                    )}
                  </div>
                </div>
                <div className="w-2/3 ms-5 pb-5">
                  <div className="text-xl font-bold">미리보기</div>
                  <div
                    className="my-2 me-5 practiceScript h-64 rounded-xl p-4"
                    style={{ overflowY: "auto" }}
                  >
                    {scriptid !== "" && (
                      <ScriptPage scriptid={scriptid} setContent={setContent} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {scriptid !== "" && (
              <Link
                to="/practice/room"
                state={{
                  content: content,
                  title: title,
                  subject: "0",
                  object: "0",
                  predicate: "0",
                  category: category,
                }}
                className="self-center mb-2 rounded-xl px-2 py-1 bg-blue-500 text-gray-200 text-lg"
              >
                <span className="practice-startText">녹화 시작하기</span>
              </Link>
            )}
          </div>
        </div>
      </Page>
    </div>
  );
};

export default PracticePage2;
