import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendBox from "../components/FriendBox";
import { currentUserStore } from "../store/store";
const API = import.meta.env.VITE_API;
const MyFriend = () => {
  const [myConversations, setMyConversations] = useState();
  const [myId, setMyId] = useState();

  const { setCurrentUserID, setcurrentReceiverId } = currentUserStore();

  const friendClicked = (conversation) => {
    const receiverId = conversation.members.find((m) => m !== myId);
    setcurrentReceiverId(receiverId);
    setCurrentUserID(conversation._id);
  };
  useEffect(() => {
    const getMyConversationFriends = async () => {
      const { data } = await axios.get(`${API}/getMyConnection`, {
        withCredentials: true,
      });
      setMyConversations(data.data);
      console.log(data.data);
      setMyId(data.myId);
    };
    getMyConversationFriends();
  }, []);

  return (
    <>
      <div className="items-center space-x-4 overflow-x-scroll bg-black h-[150px] md:flex sm:items-center lg:flex-col sm:flex lg:space-y-4 lg:items-start lg:h-[760px] lg:overflow-y-scroll">
        {myConversations?.map((conversation) => (
          <div
            className="mt-4 cursor-pointer"
            onClick={(e) => friendClicked(conversation)}
          >
            <FriendBox data={conversation} myId={myId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFriend;
