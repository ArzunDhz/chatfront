import React from "react";
import * as timejs from "timeago.js";
import "./message.css";
const Messages = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{timejs.format(message.createdAt)}</div>
    </div>
  );
};

export default Messages;
