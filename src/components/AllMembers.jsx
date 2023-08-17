import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
const api = "https://chatback-2g5m.onrender.com";

const AllMembers = ({ data, myId }) => {
  const addFriend = async (id) => {
    const { data } = await axios.post(
      `${api}/connect/${id}`,
      {
        sessionUserId: myId,
      },
      {
        withCredentials: true,
      }
    );
    toast.success(data.message);
  };

  return (
    <div key={data?._id} className="flex items-center p-2 m-16 text-white">
      <span className="flex items-center justify-center w-10 h-10 mr-2 bg-green-300 rounded-full">
        {data?.username?.substring(0, 1).toUpperCase()}
      </span>{" "}
      <h1 className="flex-grow ">{data?.username} </h1>
      <svg
        onClick={() => addFriend(data._id)}
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="w-6 h-6 cursor-pointer "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
        />
      </svg>
    </div>
  );
};

export default AllMembers;
