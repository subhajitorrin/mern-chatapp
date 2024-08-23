import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import ToastifyContainer from "./components/ToastifyContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  const width = useSelector((state) => state.screenWidth.width);
  const isLoggedIn = true;
  return (
    <>
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
            {!isLoggedIn && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="/register" element={<Navigate to={"/"} />} />
            </Route>
          </Routes>
        </div>
      </div>
      <ToastifyContainer />
    </>
  );
}

export default App;
