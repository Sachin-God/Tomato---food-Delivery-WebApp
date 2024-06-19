import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../Controllers/cartController.js";
import authController from "../utils/authMiddleware.js";


const router = Router();

router.route('/add-to-cart').post(authController, addToCart);
router.route('/remove-from-cart').post(authController, removeFromCart);
router.route('/get-cart').post(authController, getCart);

export default router;