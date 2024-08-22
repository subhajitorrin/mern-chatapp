import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.get("/", (req, res) => {
    res.send("Welcome to chatapp")
})

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to Database");
        console.log(`Server is running at http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.error("Error while connecting database", error);
})