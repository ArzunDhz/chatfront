import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatuserImg from "../assets/chatUser.png";
const ChatMembers = ({ data, myId }) => {
  const [user, setUser] = useState(null);
  const api = "https://chatback-2g5m.onrender.com";
  useEffect(() => {
    const friendId = data?.members?.find((m) => m !== myId);
    setUser(friendId);
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${api}/user/getUserInfo/${friendId}`,
          { withCredentials: true }
        );
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [data, myId]);
  return (
    <div className=" hover:bg-slate-500" key={user?._id}>
      <div className="flex items-center m-10 space-x-3 userContainer">
        <img src={ChatuserImg} className="w-10" alt="" />
        <h1> {user?.username} </h1>
      </div>
    </div>
  );
};

export default ChatMembers;
