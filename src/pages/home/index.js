import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ChatArea from "./components/chat";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { API_URL } from "../../config/constants";

const socket = io(API_URL);

export default function Home() {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (user) {
      socket.emit("join-room", user._id);
      socket.emit("user-login", user._id);

      socket.off("online-users").on("online-users", (onlineUser) => {
        setOnlineUser(onlineUser);
      });

      socket
        .off("online-users-updated")
        .on("online-users-updated", (onlineusers) => {
          setOnlineUser(onlineusers);
        });
    }
  }, [user]);
  return (
    <div className="home-page">
      <Header socket={socket} />
      <div className={`main-content ${selectedChat ? "chat-selected" : ""}`}>
        <Sidebar socket={socket} onlineUser={onlineUser}></Sidebar>
        {selectedChat && <ChatArea socket={socket}></ChatArea>}
        {!selectedChat && (
          <div className="empty-chat-state">
            <i className="fa fa-comments-o" aria-hidden="true"></i>
            <h2>Select a chat</h2>
            <p>Choose a conversation from the list to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}
