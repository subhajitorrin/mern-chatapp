import express from "express"
import authToken from "../middleware/authToken.js"
import { receiveMessage, sendMessage } from "../controllers/MessageController.js"
const MessageRoutes = express.Router()
MessageRoutes.post("/sendmessage/:receiverid", authToken, sendMessage)
MessageRoutes.get("/receivemessage/:senderid", authToken, receiveMessage)
export default MessageRoutes