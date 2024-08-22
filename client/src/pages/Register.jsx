import React, { useState } from "react";
import toast from "../utils/toast.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const handleSubmit = async () => {
    if (!name || !username || !password || !gender) {
      toast("Fill all the fields!");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("image", profilePhoto);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/register`,
        formData
      );
      if (response.status === 201) {
        toast("Register successfull");
        navigate("/login");
      }
      if (response.status === 202) {
        toast("Username already exist");
      }
    } catch (error) {
      console.error("Error while register user", error);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center text-white">
      <div className="border border-[#ffffff8a] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold  mb-6 text-center">
          Create an Account
        </h2>

        <div className="mb-4">
          <label className="block ">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#ffffff1f] border-[#ffffff37] w-full px-4 py-2 border rounded-lg outline-none"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block ">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#ffffff1f] border-[#ffffff37] w-full px-4 py-2 border rounded-lg outline-none"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block ">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="bg-[#ffffff1f] border-[#ffffff37] border w-full px-4 py-2 rounded-lg outline-none"
          />
          {profilePhoto && (
            <div className="mt-4">
              <img
                src={profilePhoto}
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block ">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#ffffff1f] border-[#ffffff37] border w-full px-4 py-2 rounded-lg outline-none"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label className="block ">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-[#ffffff1f] w-full px-4 py-2 rounded-lg outline-none border border-[#ffffff37]"
          >
            <option className="text-black w-[100px]" value="">
              Select your gender
            </option>
            <option className="text-black w-[100px]" value="male">
              Male
            </option>
            <option className="text-black w-[100px]" value="female">
              Female
            </option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#ffffff1f] text-white py-2 rounded-lg hover:bg-[#ffffff4d] transition duration-300"
        >
          Register
        </button>

        <p className="text-center mt-[10px]">
          Already have an account ?{" "}
          <span
            className="cursor-pointer font-[500]"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
