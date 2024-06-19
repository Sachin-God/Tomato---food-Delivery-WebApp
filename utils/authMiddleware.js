import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default async function authController (req, res, next) {
    try {
        // const token = req.cookies.authtoken;
        const {token} = req.headers;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const decode = jwt.verify(token, process.env.JWTKEY)
        req.body.userId = decode._id;
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
}