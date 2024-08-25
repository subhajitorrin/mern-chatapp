import express from "express";
import {
  searchUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  getUser,
  getConnections,
  getLastSeen
} from "../controllers/UserController.js";
import uploadStorage from "../middleware/multer.js";
import authToken from "../middleware/authToken.js";
const UserRoutes = express.Router();
UserRoutes.post("/register", uploadStorage.single("image"), registerUser);
UserRoutes.post("/login", loginUser);
UserRoutes.post("/logout", logoutUser);
UserRoutes.get("/searchuser/:search", authToken, searchUser);
UserRoutes.put(
  "/updateuser",
  authToken,
  uploadStorage.single("image"),
  updateUser
);
UserRoutes.get("/getuser", authToken, getUser);
UserRoutes.get("/getconnections", authToken, getConnections);
UserRoutes.get("/getlastseen/:userid", authToken, getLastSeen);

export default UserRoutes;
