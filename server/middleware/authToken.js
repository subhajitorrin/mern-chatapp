import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

function authToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            msg: "No token provided, authorization denied",
            success: false,
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id
        req.username = decoded.username
        req.name = decoded.name
        next()
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid token, authorization denied",
            success: false,
        });
    }
}

export default authToken