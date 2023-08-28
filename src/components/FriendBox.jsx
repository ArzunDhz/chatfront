import axios from "axios";
import React, { useEffect, useState } from "react";
const API = import.meta.env.VITE_API;
const FriendBox = ({ data, myId }) => {
  const [friendDataFromApi, setFriendDataFromApi] = useState();
  const friendId = data?.members.find((m) => m != myId);

  useEffect(() => {
    const getFriendData = async () => {
      const { data } = await axios.get(`${API}/user/getUserInfo/${friendId}`, {
        withCredentials: true,
      });
      setFriendDataFromApi(data);
    };
    getFriendData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center sm:flex-col">
        <div className="flex mt-2  relative justify-center w-[60px] h-[60px] items-center m-2 rounded-full bg-slate-600">
          <h1 className="text-xl font-bold">
            {friendDataFromApi?.username.slice(0, 1).toUpperCase()}
          </h1>
          <div className="absolute w-4 h-4 bg-green-300 rounded-full left-10 top-10 "></div>
        </div>
        <h1> {friendDataFromApi?.username} </h1>
      </div>
    </>
  );
};

export default FriendBox;
