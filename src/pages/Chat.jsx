import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ChatMembers from "../components/chatMembers";
import AllMembers from "../components/AllMembers";
import Message from "../components/Message";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
const Chat = () => {
  const socket = useRef();
  const api = "https://chatback-2g5m.onrender.com";
  const [friendData, setFrinedData] = useState([]);
  const [myInfo, setMyInfo] = useState([]);
  const [conversationMember, setConversationMember] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [chatMessage, setChatMessage] = useState();
  const [arrivalMessage, settArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getMyInfo = async () => {
      const { data } = await axios.get(`${api}/user/info`, {
        withCredentials: true,
      });
      setMyInfo(data.data);
    };
    getMyInfo();
  }, []);
  // all socket  polling  is applied here

  useEffect(() => {
    socket.current = io("https://socket-g42x.onrender.com");
    socket.current.on("getMessage", (data) => {
      settArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", myInfo?._id);
    socket.current.on("getUsers", (data) => {});
  }, [myInfo?._id]);

  //rest of the user data i

  const getFriend = async () => {
    const { data } = await axios.get(`${api}/getMyConnection/${myInfo?._id}`, {
      withCredentials: true,
    });
    setConversationMember(data);
  };

  useEffect(() => {
    getFriend();
  }, [myInfo]);

  useEffect(() => {
    const getAlluserDetails = async () => {
      const { data } = await axios.get(`${api}/user/getAllUsers`, {
        withCredentials: true,
      });
      setFrinedData(data);
    };
    getAlluserDetails();
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      const { data } = await axios.get(
        `${api}/getMessage/${currentChat?._id}`,
        {
          withCredentials: true,
        }
      );
      setMessage(data.getMessage);
    };
    getMessage();
  }, [currentChat]);

  const sendMessage = async (e) => {
    if (chatMessage.length <= 0) return toast.error("Empty message");
    e.preventDefault();
    const { data } = await axios.post(
      `${api}/sendMessage`,
      {
        conversationId: currentChat?._id,
        text: chatMessage,
      },
      { withCredentials: true }
    );
    setMessage([...message, data.savedMessage]);
    setChatMessage("");

    const receiverId = currentChat.members.find((m) => m !== myInfo._id);
    if (receiverId) {
      socket.current.emit("send-message", {
        senderId: myInfo?._id,
        receiverId: receiverId,
        text: chatMessage,
      });
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <section className="flex w-full h-screen ">
        <div className="w-1/6 overflow-y-scroll text-white bg-black sm:w-full">
          <h1 className="text-center  text-[40px]  text-pop "> Kurakani</h1>
          {conversationMember?.map((e) => (
            <div key={e._id} onClick={() => setCurrentChat(e)}>
              <ChatMembers data={e} key={e._id} myId={myInfo._id} />
            </div>
          ))}
        </div>
        <div className="relative flex flex-col w-4/6 sm:5/6 ">
          <div className="flex-grow overflow-y-scroll text-white bg-slate-900 ">
            {currentChat ? (
              <>
                {message?.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      message={m}
                      key={m._id}
                      own={m?.sender === myInfo?._id}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="absolute grid  left-[30%] top-[45%]">
                  <h1 className=" text-[40px]"> Select a Conversation</h1>
                </div>
              </>
            )}
          </div>
          <div>
            <form
              className={!currentChat ? "hidden" : "flex bg-slate-900 "}
              onSubmit={sendMessage}
            >
              <input
                required
                type="text"
                className=" text-white flex-grow bg-slate-700 rounded-xl indent-3 h-[40px] "
                placeholder="Text..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button onClick={sendMessage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
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
        <div className="w-1/6 overflow-y-scroll bg-slate-800 sm:hidden ">
          <h1 className="mt-6 text-center text-pop text-[40px]">All Users </h1>
          {myInfo?._id &&
            friendData?.map((e) => (
              <div
                onClick={() => {
                  getFriend(), getFriend();
                }}
              >
                <AllMembers key={e?._id} data={e} myId={myInfo?._id} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Chat;
