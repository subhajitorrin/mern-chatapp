import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import ToastifyContainer from "./components/ToastifyContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const width = useSelector((state) => state.screenWidth.width);

  useEffect(() => {
    async function authToken() {
      const token = Cookies.get("token");
      if (!token) {
        return setIsLoggedIn(false);
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/getuser`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    }
    authToken();
  }, [refetch]);

  if (isLoggedIn === null) return <></>;

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
            {!isLoggedIn == true && (
              <>
                <Route
                  path="/login"
                  element={<Login setRefetch={setRefetch} />}
                />
                <Route path="/register" element={<Register />} />
              </>
            )}
            4
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
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
