import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary, deleteImageFromCloudinary } from "../utils/cloudinary.js"
import dotenv from "dotenv"

dotenv.config()

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
                .status(409)
                .json({ msg: "User already exist, Login now", success: false });
        }
        let finalImage = file;
        if (!finalImage) {
            finalImage = gender.toLowerCase().trim() === "male"
                ? "https://avatar.iran.liara.run/public/boy"
                : "https://avatar.iran.liara.run/public/girl";
        } else {
            const cloudinary_response = await uploadOnCloudinary(finalImage.path, "profile_pictures")
            if (!cloudinary_response) return res.status(500).json({ msg: "File not uploaded on cloud", success: false })
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
async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res
                .status(400)
                .json({ msg: "Not all credentials are provided!", success: false });
        }
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            return res
                .status(202)
                .json({ msg: "User doesn't exist, Register now", success: false });
        }
        const isPassword = await bcryptjs.compare(password, existingUser.password)
        if (!isPassword) {
            return res
                .status(203)
                .json({ msg: "Incorrect password", success: false });
        }

        const token = jwt.sign({
            id: existingUser._id,
            username: existingUser.username,
            name: existingUser.name
        }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 1000,
            sameSite: 'Strict'
        })
        const userObj = {
            name: existingUser.name,
            username: existingUser.username,
            gender: existingUser.gender,
            image: existingUser.image,
            _id: existingUser._id
        }
        return res.status(200).json({ msg: "Login successfull", success: true, user: userObj })
    } catch (error) {
        console.error("Error while login user", error);
        return res
            .status(500)
            .json({ msg: "Error while login user", error, success: false });
    }
}

async function searchUser(req, res) {
    const { search } = req.params
    const excludeUserId = req.id
    try {
        if (!search) {
            return res
                .status(400)
                .json({ msg: "Username is required!", success: false });
        }

        const regexPattern = new RegExp(`^${search}`, 'i');
        const users = await UserModel.find({
            username: { $regex: regexPattern },
            _id: { $ne: excludeUserId }
        }).select('-password');

        if (users.length === 0) {
            return res
                .status(404)
                .json({ msg: "No users found", success: false });
        }
        return res
            .status(200)
            .json({ msg: "Users found", success: true, users });

    } catch (error) {
        console.error("Error while fetching user by username", error);
        return res
            .status(500)
            .json({ msg: "Error while fetching user", error, success: false });
    }
}

async function updateUser(req, res) {
    const userid = req.id
    const { name, username } = req.body;
    const file = req.file
    try {
        if (!name && !username && !file) {
            return res
                .status(400)
                .json({ msg: "Nothing to update!", success: false });
        }
        const existingUser = await UserModel.findById(userid)
        if (!existingUser) {
            return res
                .status(400)
                .json({ msg: "User not found!", success: false });
        }
        const thingsToUpdate = {}
        if (name) thingsToUpdate.name = name;
        if (username) thingsToUpdate.username = username;
        if (file) {
            const cloudinaryBaseUrl = "http://res.cloudinary.com/";
            if (existingUser.image.startsWith(cloudinaryBaseUrl)) {
                await deleteImageFromCloudinary(existingUser.image);
            }
            const cloudinary_response = await uploadOnCloudinary(file.path, "profile_pictures");
            if (!cloudinary_response) {
                return res.status(400).json({ msg: "File not uploaded on cloud", success: false });
            }
            thingsToUpdate.image = cloudinary_response.url;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userid, thingsToUpdate, { new: true })

        const userObj = {
            name: updatedUser.name,
            username: updatedUser.username,
            gender: updatedUser.gender,
            image: updatedUser.image,
            _id: updatedUser._id
        }

        return res.status(200).json({ msg: "User updated successfully", success: true, user: userObj });

    } catch (error) {
        console.error("Error while updating user", error);
        return res
            .status(500)
            .json({ msg: "Error while updating user", error, success: false });
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token")
        return res.status(200).json({ msg: "Logout successful", success: true });
    } catch (error) {
        console.error("Error while logging out user", error);
        return res
            .status(500)
            .json({ msg: "Error while logging out user", error, success: false });
    }
}

async function getUser(req, res) {
    const id = req.id;
    try {
        const user = await UserModel.findById(id).select('-password');
        if (!user) {
            return res.status(400).json({ msg: "User not found!", success: false });
        }
        return res.status(200).json({ msg: "User fetched successfully", success: true, user });
    } catch (error) {
        console.error("Error while finding user", error);
        return res
            .status(500)
            .json({ msg: "Error while finding user", error, success: false });
    }
}


export { registerUser, loginUser, searchUser, updateUser, logoutUser, getUser };
