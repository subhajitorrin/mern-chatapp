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
    origin: [process.env.CLIENT_URL],
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
  // console.log("A new user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) activeUsersMap[userId] = socket.id;
  io.emit("GET_ONLINE_USERS", Object.keys(activeUsersMap));
  socket.on("disconnect", async () => {
    // console.log("User disconnected", socket.id);
    delete activeUsersMap[userId];
    await updateLastSeen(userId);
    io.emit("GET_ONLINE_USERS", Object.keys(activeUsersMap));
  });
});

export { app, io, server };
