import express from "express"
import { loginUser, registerUser } from "../controllers/UserController.js"
import uploadStorage from "../middleware/multer.js"
const UserRoutes = express.Router()
UserRoutes.post("/register",uploadStorage.single("image"), registerUser)
UserRoutes.post("/login", loginUser)
export default UserRoutes