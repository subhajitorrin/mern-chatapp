import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }]
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
