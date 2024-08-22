import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

function App() {
  const width = useSelector((state) => state.screenWidth.width);
  return (
    <div
      className={`h-screen w-full mainContainer ${
        width > 768 ? "px-[5%] py-[3%]" : ""
      }`}
    >
      <div
        className={`bg-[#00000041]  h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-[0] border  ${
          width > 768 ? "border-[#ffffff73]" : "border-none p-[1rem]"
        }`}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
