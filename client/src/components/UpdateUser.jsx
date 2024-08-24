import React, { useRef, useState } from "react";
import toast from "../utils/toast.js";
import { useAuthStore } from "../store/AuthStore.js";
import { BeatLoader } from "react-spinners";

function UpdateUser() {
  const { update, isLoading } = useAuthStore();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileRef = useRef(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const triggerFileInput = (e) => {
    e.preventDefault();
    document.getElementById("profilePhotoInput").click();
  };

  async function handleUpdateProfile() {
    if (!profilePhoto && name === "" && username === "") {
      toast("Nothing to update!");
      return;
    }
    try {
      const formData = new FormData();
      if (name !== "") formData.append("name", name);
      if (username !== "") formData.append("username", username);
      if (profilePhoto) formData.append("image", profilePhoto);
      await update(formData);
      fileRef.current.value = "";
      setProfilePhoto(null);
      setName("");
      setUsername("");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  return (
    <div className="text-[15px] p-[1rem] overflow-hidden transition-all ease-linear duration-200 w-full h-full px-[1rem] top-[100%] left-0 z-[1]">
      <p className="font-[500] mb-[10px]">Update User</p>
      <div className="w-full flex justify-center mb-[10px]">
        <img
          src={profilePhoto ? URL.createObjectURL(profilePhoto) : ""}
          className="border border-[#ffffff73] object-cover h-[50px] w-[50px] rounded-[100%]"
        />
      </div>
      <div className="mb-[10px] w-full justify-between items-center text-[13px] flex flex-col gap-[10px]">
        <input
          value={name}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Update your name"
          className="bg-[#ffffff1f] border-[#ffffff37] w-full border px-[20px] py-[5px] rounded-[5px] outline-none"
        />
        <input
          value={username}
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Update your username"
          className="bg-[#ffffff1f] border-[#ffffff37] w-full border px-[20px] py-[5px] rounded-[5px] outline-none"
        />
        <input
          ref={fileRef}
          id="profilePhotoInput"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <label
          htmlFor="profilePhotoInput"
          onClick={triggerFileInput}
          className="bg-[#ffffff1f] border-[#ffffff37] border w-full px-[20px] py-[5px] rounded-[5px] text-[#ffffff7f] outline-none cursor-pointer text-center"
        >
          Update Profile Photo
        </label>
      </div>
      <button
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
        onClick={handleUpdateProfile}
        className="text-[13px] w-full bg-[#ffffff1f] text-white py-[6px] rounded-[5px] hover:bg-[#ffffff4d] transition duration-300"
      >
        {isLoading ? (
          <BeatLoader color="#ffffff" size={5} />
        ) : (
          <span>Update</span>
        )}
      </button>
    </div>
  );
}

export default UpdateUser;
