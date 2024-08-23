import React, { useState } from "react";
import toast from "../utils/toast.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";
import { BeatLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async () => {
    if (username == "" || password == "") {
      toast("Fill all the fields");
      return;
    }
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="h-full w-full flex items-center justify-center text-white">
        <div className="border border-[#ffffff8a] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold  mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label className="block ">Username</label>
            <input
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#ffffff1f] border-[#ffffff37] w-full px-4 py-2 border rounded-lg outline-none"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block ">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#ffffff1f] border-[#ffffff37] border w-full px-4 py-2 rounded-lg outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            style={{ pointerEvents: isLoading ? "none" : "auto" }}
            onClick={handleSubmit}
            className="w-full bg-[#ffffff1f] text-white py-2 rounded-lg hover:bg-[#ffffff4d] transition duration-300"
          >
            {isLoading ? (
              <BeatLoader color="#ffffff" size={7} />
            ) : (
              <span>Login</span>
            )}
          </button>
          <p className="text-center mt-[10px]">
            Don't have an account ?{" "}
            <span
              className="cursor-pointer font-[500]"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
