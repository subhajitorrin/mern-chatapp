import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/UserRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { app, io, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: [process.env.CLIENT_URL1, process.env.CLIENT_URL2],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Testing...");
});

app.use("/", UserRoutes);
app.use("/", MessageRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log("Connected to Database");
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error while connecting database", error);
  });
