import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs"
import { uploadOnCloudinary, deleteImageFromCloudinary } from "../utils/cloudinary.js"

async function registerUser(req, res) {
    const { name, username, password, gender } = req.body;
    const file = req.file
    try {
        if (!name || !username || !password || !gender) {
            return res
                .status(400)
                .json({ msg: "Not all credentials are provided!", success: false });
        }
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User already exist, Login now", success: false });
        }
        let finalImage = file;
        if (!finalImage) {
            finalImage = gender.toLowerCase().trim() === "male"
                ? "https://avatar.iran.liara.run/public/boy"
                : "https://avatar.iran.liara.run/public/girl";
        } else {
            const cloudinary_response = await uploadOnCloudinary(finalImage.path, "profile_pictures")
            if (!cloudinary_response) return res.status(400).json({ msg: "File not uploaded on cloud", success: false })
            finalImage = cloudinary_response.url;
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new UserModel({
            name,
            username,
            password: hashedPassword,
            image: finalImage,
            gender
        })
        const response = await newUser.save()
        const userObj = {
            name: response.name,
            username: response.username,
            gender: response.gender,
            image: response.image,
            _id: response._id
        }
        if (response) {
            return res
                .status(201)
                .json({ msg: "User created successfully", success: true, user: userObj });
        }
    } catch (error) {
        console.error("Error while register user", error);
        return res
            .status(500)
            .json({ msg: "Error while register user", error, success: false });
    }
}
async function loginUser(req, res) { }

export { registerUser, loginUser };
