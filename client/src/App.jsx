import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ToastifyContainer from "./components/ToastifyContainer";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore";
import { useMediaQuery } from "react-responsive";
import { useResponsive } from "./store/ConversationStore.js";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
function RedirectAuthedUser({ children }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)"
  });
  const { isCheckingAuth, getUser } = useAuthStore();
  const { setIsMobile } = useResponsive();

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  if (isCheckingAuth) return <></>;

  return (
    <>
      <div
        className={`h-screen w-full select-none mainContainer ${
          !isMobile ? "px-[2%] py-[1%]" : ""
        }`}
      >
        <div
          className={`bg-[#00000041]  h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-[0] border  ${
            !isMobile ? "border-[#ffffff73]" : "border-none p-[1rem]"
          }`}
        >
          <Routes>
            <Route
              path="/login"
              element={
                <RedirectAuthedUser>
                  <Login />
                </RedirectAuthedUser>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectAuthedUser>
                  <Register />
                </RedirectAuthedUser>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <ToastifyContainer />
    </>
  );
}

export default App;
