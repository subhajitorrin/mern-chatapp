import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import UserModel from "../models/UserModel.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

let activeUsersMap = {};

async function updateLastSeen(userId) {
  try {
    await UserModel.findByIdAndUpdate(userId, { lastSeen: Date.now() });
  } catch (error) {
    console.log(error);
  }
}

io.on("connection", socket => {
  /*{get socket id from frontend}*/
  const userId = socket.handshake.query.userId;

  /*{store socket id on map}*/
  if (userId) activeUsersMap[userId] = socket.id;

  /*{send online users}*/
  io.emit("GET_ONLINE_USERS", Object.keys(activeUsersMap));

  /*{send msg to the receiver socket}*/
  socket.on("message", data => {
    const receiverSocketId = activeUsersMap[data.receiverId];
    if (!receiverSocketId) return;
    io.to(receiverSocketId).emit("receiveSocketMsg", {
      message: data.msg,
      createdAt: new Date(),
      updatedAt: new Date(),
      receiver: data.receiverId,
      sender: data.senderId,
      user: data.user
    });
  });

  /*{typing status}*/
  socket.on("typing", data => {
    const receiverSocketId = activeUsersMap[data.receiverId];
    if (!receiverSocketId) return;
    io.to(receiverSocketId).emit("receiveTyping", data);
  });

  /*{when socket disconnect}*/
  socket.on("disconnect", async () => {
    /*{delete the user from map}*/
    delete activeUsersMap[userId];
    /*{update the last seen of the disconnected user}*/
    await updateLastSeen(userId);
    /*{pass updated online users map}*/
    io.emit("GET_ONLINE_USERS", Object.keys(activeUsersMap));
  });
});

export { app, io, server };
