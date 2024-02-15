import { useState } from "react";
import Modal from "../../../components/Modal";

const Chat = ({ chatData }) => {
  const [chatvalue, setChatvalue] = useState("");
  const [chatList, setChatList] = useState([]);

  const handleSubmit = async (e) => {
    if (e.key !== "Enter") return;
    await setChatList([
      ...chatList,
      { username: "사용자0", content: chatvalue },
    ]);
    // 채팅보내기
    setChatvalue("");
  };
  return (
    <Modal className="chat" title="채팅">
        <div className="chat-area">
          {chatList &&
            chatList.map((item, index) => {
              const { username, content } = item;
              return (
                <p>
                  {username} : {content}
                </p>
              );
            })}
        </div>
        <div>
          <textarea
            type="text"
            value={chatvalue}
            onChange={(e) => setChatvalue(e.target.value)}
            onKeyDown={handleSubmit}
            placeholder="댓글을 입력하세요."
          />
        </div>
    </Modal>
  );
};

export default Chat;
