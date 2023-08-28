import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Messages from "../components/Messages";
import { io } from "socket.io-client";
import { currentLoggedInUserInfoStore, currentUserStore } from "../store/store";
const API = import.meta.env.VITE_API;

const ChatWithSelectedFriend = () => {
  const { currentUserId, currentReceiverId } = currentUserStore();
  const { myInfo, getMyinfo } = currentLoggedInUserInfoStore();
  const [messages, setMessages] = useState();
  const [messageFromTextBox, setMessageFromTextBox] = useState("");
  const [currentLoggedUserId, setCurrentLoggedUserID] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [myConversations, setMyConversations] = useState();
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    getMyinfo();
  }, []);

  useEffect(() => {
    const getMyConversationFriends = async () => {
      const { data } = await axios.get(`${API}/getMyConnection`, {
        withCredentials: true,
      });
      setMyConversations(data?.data);
    };
    getMyConversationFriends();
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      const { data } = await axios.get(`${API}/getMessage/${currentUserId}`, {
        withCredentials: true,
      });
      setCurrentLoggedUserID(data.currentUser);
      setMessages(data.getMessage);
    };

    getMessage();
  }, [currentUserId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      myConversations?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", myInfo?._id);
  }, [myInfo?._id]);

  const handelSendMessage = async (e) => {
    e.preventDefault();
    if (messageFromTextBox.length == 0) return 0;
    const { data } = await axios.post(
      `${API}/sendMessage`,
      {
        conversationId: currentUserId,
        text: messageFromTextBox,
      },
      { withCredentials: true }
    );
    setMessages([...messages, data.savedMessage]);

    if (currentReceiverId) {
      socket.current.emit("send-message", {
        senderId: myInfo?._id,
        receiverId: currentReceiverId,
        text: messageFromTextBox,
      });
    }
    setMessageFromTextBox("");
  };
  return (
    <>
      <div className="relative flex flex-col w-full min-h-screen bg-gray-300 ">
        <div className="flex-grow overflow-y-scroll bg-green-900 ">
          {currentUserId &&
            messages?.map((m) => (
              <div ref={scrollRef}>
                <Messages
                  key={m?._id}
                  message={m}
                  own={m?.sender == currentLoggedUserId}
                />
              </div>
            ))}
        </div>
        <div className="relative bg-gray-600 ">
          <form
            className={
              !currentUserId ? "hidden" : "flex bg-slate-900 relative "
            }
            onSubmit={handelSendMessage}
          >
            <input
              required
              type="text"
              className="  text-white flex-grow bg-slate-700 rounded-xl indent-3 h-[40px] "
              placeholder="Text..."
              value={messageFromTextBox}
              onChange={(e) => setMessageFromTextBox(e.target.value)}
            />
            <button onClick={handelSendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8 bg-slate-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWithSelectedFriend;
