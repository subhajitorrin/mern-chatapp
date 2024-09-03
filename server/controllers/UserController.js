import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  uploadOnCloudinary,
  deleteImageFromCloudinary
} from "../utils/cloudinary.js";
import dotenv from "dotenv";
import ConversationModel from "../models/ConversationModel.js";
import MessageModel from "../models/MessageModel.js";

dotenv.config();

async function registerUser(req, res) {
  const { name, username, password, gender } = req.body;
  const file = req.file;
  try {
    if (!name || !username || !password || !gender) {
      return res
        .status(400)
        .json({ msg: "Not all credentials are provided!", success: false });
    }
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ msg: "User already exist, Login now", success: false });
    }
    let finalImage = file;
    if (!finalImage) {
      finalImage =
        gender.toLowerCase().trim() === "male"
          ? "https://avatar.iran.liara.run/public/boy"
          : "https://avatar.iran.liara.run/public/girl";
    } else {
      const cloudinary_response = await uploadOnCloudinary(
        finalImage.path,
        "profile_pictures"
      );
      if (!cloudinary_response)
        return res
          .status(500)
          .json({ msg: "File not uploaded on cloud", success: false });
      finalImage = cloudinary_response.url;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new UserModel({
      name,
      username,
      password: hashedPassword,
      image: finalImage,
      gender
    });
    const response = await newUser.save();
    const userObj = {
      name: response.name,
      username: response.username,
      gender: response.gender,
      image: response.image,
      _id: response._id
    };
    if (response) {
      return res.status(201).json({
        msg: "User created successfully",
        success: true,
        user: userObj
      });
    }
  } catch (error) {
    console.error("Error while register user", error);
    return res
      .status(500)
      .json({ msg: "Error while register user", error, success: false });
  }
}
async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Not all credentials are provided!", success: false });
    }
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res
        .status(404)
        .json({ msg: "User doesn't exist", success: false });
    }
    const isPassword = await bcryptjs.compare(password, existingUser.password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ msg: "Incorrect password", success: false });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        name: existingUser.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None"
    });
    const userObj = {
      name: existingUser.name,
      username: existingUser.username,
      gender: existingUser.gender,
      image: existingUser.image,
      _id: existingUser._id
    };
    return res
      .status(200)
      .json({ msg: "Login successfull", success: true, user: userObj });
  } catch (error) {
    console.error("Error while login user", error);
    return res
      .status(500)
      .json({ msg: "Error while login user", error, success: false });
  }
}

async function searchUser(req, res) {
  const { search } = req.params;
  const excludeUserId = req.id;
  try {
    if (!search) {
      return res
        .status(400)
        .json({ msg: "Username is required!", success: false });
    }

    const user = await UserModel.findOne({
      username: search,
      _id: { $ne: excludeUserId }
    }).select("-password");

    if (!user) {
      return res.status(203).json({ msg: "No users found", success: false });
    }
    return res.status(200).json({ msg: "Users found", success: true, user });
  } catch (error) {
    console.error("Error while fetching user by username", error);
    return res
      .status(500)
      .json({ msg: "Error while fetching user", error, success: false });
  }
}

async function updateUser(req, res) {
  const userid = req.id;
  const { name, username } = req.body;
  const file = req.file;
  try {
    if (!name && !username && !file) {
      return res
        .status(400)
        .json({ msg: "Nothing to update!", success: false });
    }
    const existingUser = await UserModel.findById(userid);
    if (!existingUser) {
      return res.status(400).json({ msg: "User not found!", success: false });
    }
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(409)
        .json({ msg: "Username already exist!", success: false });
    }
    const thingsToUpdate = {};
    if (name) thingsToUpdate.name = name;
    if (username) thingsToUpdate.username = username;
    if (file) {
      const cloudinaryBaseUrl = "http://res.cloudinary.com/";
      if (existingUser.image.startsWith(cloudinaryBaseUrl)) {
        await deleteImageFromCloudinary(existingUser.image);
      }
      const cloudinary_response = await uploadOnCloudinary(
        file.path,
        "profile_pictures"
      );
      if (!cloudinary_response) {
        return res
          .status(400)
          .json({ msg: "File not uploaded on cloud", success: false });
      }
      thingsToUpdate.image = cloudinary_response.url;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userid,
      thingsToUpdate,
      { new: true }
    );

    const userObj = {
      name: updatedUser.name,
      username: updatedUser.username,
      gender: updatedUser.gender,
      image: updatedUser.image,
      _id: updatedUser._id
    };

    return res
      .status(200)
      .json({ msg: "User updated successfully", success: true, user: userObj });
  } catch (error) {
    console.error("Error while updating user", error);
    return res
      .status(500)
      .json({ msg: "Error while updating user", error, success: false });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logout successful", success: true });
  } catch (error) {
    console.error("Error while logging out user", error);
    return res
      .status(500)
      .json({ msg: "Error while logging out user", error, success: false });
  }
}

async function getUser(req, res) {
  const id = req.id;
  try {
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User not found!", success: false });
    }
    return res
      .status(200)
      .json({ msg: "User fetched successfully", success: true, user });
  } catch (error) {
    console.error("Error while finding user", error);
    return res
      .status(500)
      .json({ msg: "Error while finding user", error, success: false });
  }
}

async function getConnections(req, res) {
  const user = req.id;
  try {
    const connections = await UserModel.findById(user)
      .select("Conversations")
      .populate({
        path: "Conversations",
        select: "updatedAt participants lastMessage"
      });
    let connectionList = [];
    for (const conv of connections.Conversations) {
      const obj = {};
      const otherUserId = conv.participants.find(
        element => element.toString() !== user
      );
      const otherUserRes = await UserModel.findById(otherUserId).select(
        "-password"
      );
      obj.user = otherUserRes;

      if (conv.lastMessage) {
        const lmsg = await MessageModel.findById(conv.lastMessage);
        if (lmsg) {
          obj.lastMessage = lmsg;
        }
      }
      connectionList.push(obj);
    }

    connectionList.sort(
      (a, b) =>
        new Date(b.lastMessage.updatedAt) - new Date(a.lastMessage.updatedAt)
    );

    return res.status(200).json({
      msg: "All connections fetched",
      success: true,
      connections: connectionList
    });
  } catch (error) {
    console.error("Error while finding connections", error);
    return res
      .status(500)
      .json({ msg: "Error while finding connections", error, success: false });
  }
}

async function getLastSeen(req, res) {
  try {
    const { userid } = req.params;
    const response = await UserModel.findById(userid).select("lastSeen");
    if (response) {
      return res.status(200).json({
        msg: "Last seen fetched successfully",
        success: true,
        lastSeen: response.lastSeen
      });
    }
  } catch (error) {
    console.error("Error while finding lastseen", error);
    return res
      .status(500)
      .json({ msg: "Error while finding lastseen", error, success: false });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user)
      return res.status(404).json({ msg: "User not found", success: false });
    return res
      .status(200)
      .json({ msg: "User found successfull", success: true, user });
  } catch (error) {
    console.error("Error while finding user by id", error);
    return res
      .status(500)
      .json({ msg: "Error while finding user by id", error, success: false });
  }
}

async function deleteConversation(req, res) {
  const user = req.id;
  const { partner } = req.params;
  try {
    const userRes = await UserModel.findById(user);
    if (!userRes) {
      return res.status(400).json({ msg: "User not found!", success: false });
    }
    const partnerRes = await UserModel.findById(partner);
    if (!partnerRes) {
      return res
        .status(400)
        .json({ msg: "Partner not found!", success: false });
    }
    const conversationRes = await ConversationModel.findOne({
      participants: { $all: [user, partner] }
    }).select("participants lastMessage");
    if (!conversationRes) {
      return res
        .status(400)
        .json({ msg: "Conversation not found!", success: false });
    }
    userRes.Conversations = userRes.Conversations.filter(
      item => item.toString() !== conversationRes._id.toString()
    );
    await userRes.save();
    return res
      .status(200)
      .json({ msg: "Conversationn deleted", success: true });
  } catch (error) {
    return res.status(500).json({ msg: "User not deleted!", success: false });
  }
}

export {
  registerUser,
  loginUser,
  searchUser,
  updateUser,
  logoutUser,
  getUser,
  getConnections,
  getLastSeen,
  getUserById,
  deleteConversation
};
