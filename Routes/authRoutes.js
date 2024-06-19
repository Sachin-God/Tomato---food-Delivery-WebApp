import { Router } from "express";
import { Login, Logout, SignUp } from "../Controllers/authController.js";

const router = Router()

router.route('/signup').post(SignUp)
router.route('/login').post(Login)
router.route('/logout').get(Logout)

export default router;