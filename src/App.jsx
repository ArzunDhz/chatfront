import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
