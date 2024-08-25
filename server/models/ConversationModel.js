import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            require: true
        }
    ]
}, { timestamps: true })

const ConversationModel = mongoose.model("Conversation", ConversationSchema)

export default ConversationModel