import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import { Toaster } from "react-hot-toast";
import SearchedUser from "./pages/SearchedUser";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/searchedUser" element={<SearchedUser />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
