import User from "../database/Models/User.js";
import dotenv from "dotenv";
import errorHandler from "../utils/errorHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

export const SignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            next(errorHandler(401, 'User Already Exists'))
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        return res.status(201).json({
            message: 'New User Created',
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "User Don't Exists"
            })
        }

        const comparedPassword = await bcrypt.compare(password, user.password)
        if (!comparedPassword) {
            return res.status(401).json({
                message: "Wrong Password"
            })
        } else {
            const token = jwt.sign({_id : user._id}, process.env.JWTKEY)
            return res.cookie('authtoken', token, {httpOnly : true}).status(200).json({
                message: "User Loggedin SuccessFully",
                token : token
            })
        }
    } catch (error) {
        next(error)
    }
}

export const Logout = (req, res, next) => {
    try {
        console.log('User signed Out');
        res.clearCookie('authtoken'); // Replace 'token' with your cookie name
        res.status(200).send('Logged out successfully');
    } catch (error) {
        next(error)
    }
}