import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, { timestamps: true })

const MessageModel = mongoose.model("Message", MessageSchema)

export default MessageModel