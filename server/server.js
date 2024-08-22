import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import UserRoutes from "./routes/UserRoutes.js"
import MessageRoutes from "./routes/MessageRoutes.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(cookieParser());

app.use("/",UserRoutes)
app.use("/",MessageRoutes)

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to Database");
        console.log(`Server is running at http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.error("Error while connecting database", error);
})