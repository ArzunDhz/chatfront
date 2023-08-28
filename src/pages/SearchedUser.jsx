import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import { EarthImg, PersonImg } from "../assets/images";
import * as timeago from "timeago.js";
import { ChatUserIcon } from "../assets/icons";
import { toast } from "react-hot-toast";

const SearchedUser = () => {
  const { searchUserId } = useStore();
  const [userData, setUserData] = useState([]);
  const [isUserAdded, setIsUserAdded] = useState(false);
  const API = "https://chatback-2g5m.onrender.com";
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(
        `${API}/user/getUserInfo/${searchUserId}`,
        { withCredentials: true }
      );
      setUserData(data);
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const checkIfadded = async () => {
      const { data } = await axios.get(`${API}/checkIfFriend/${searchUserId}`, {
        withCredentials: true,
      });
      setIsUserAdded(data);
    };

    checkIfadded();
  }, [isUserAdded]);

  const addFriend = async () => {
    const { data } = await axios.post(
      `${API}/connect/${searchUserId}`,
      {},
      { withCredentials: true }
    );
    toast.success(data.message);
  };

  return (
    <>
      <div className="flex justify-center w-full h-screen overflow-hidden sm:flex-col bg-primary">
        {/* contain both image and form */}
        <h1 className=" md:hidden sm:visible text-center bg-primary text-[40px] text-pop">
          Kuranai
        </h1>
        <div className="flex items-center w-full h-screen justify-evenly">
          {/* image container */}
          <div className=" sm:hidden">
            <img
              src={PersonImg}
              alt="EathImage"
              height={400}
              width={400}
              className="object-contain "
            />
            <h1 className=" text-[5vw]  text-pop text-center ">
              {userData?.username}
            </h1>
            <h1 className="text-center text-[2vw] text-white">Hi there !!</h1>
          </div>

          {/* form container */}
          <div className="">
            <div className=" shadow-2xl px-20  sm:w-[400px]  form lg:w-[450px]  rounded-xl h-[450px]  items-center flex flex-col space-y-3  ">
              <div className="flex items-center justify-center w-32 h-32 mt-2 text-4xl font-bold rounded-full bg-pop">
                <img src={ChatUserIcon} alt="" />
              </div>
              <h1 className="text-4xl text-white"> {userData?.username}</h1>
              <div className="flex justify-center w-full pt-2 pb-5 space-x-8 font-bold">
                <button
                  onClick={addFriend}
                  className="p-1 w-[100px] rounded-full bg-pop"
                >
                  {isUserAdded?.added ? "UnFriend" : "Add Friend"}
                </button>
                <button className="p-1 w-[100px] bg-red-300 rounded-full">
                  Block
                </button>
              </div>
              <div className=" text-pop">
                <h1 className="py-2 text-sm">
                  Username : {userData?.username}
                </h1>
                <h1 className="py-2 text-sm">Id : {userData?._id}</h1>
                <h1 className="py-2 text-sm">
                  Joined Kurakani : {timeago.format(userData?.createdAt)}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedUser;
