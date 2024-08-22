import express from "express"
import { searchUser, loginUser, registerUser, updateUser } from "../controllers/UserController.js"
import uploadStorage from "../middleware/multer.js"
import authToken from "../middleware/authToken.js"
const UserRoutes = express.Router()
UserRoutes.post("/register", uploadStorage.single("image"), registerUser)
UserRoutes.post("/login", loginUser)
UserRoutes.get("/searchuser/:search", authToken, searchUser)
UserRoutes.put("/updateuser", authToken, uploadStorage.single("image"), updateUser)
export default UserRoutes