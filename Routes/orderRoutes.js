import { Router } from "express";
import authController from "../utils/authMiddleware.js";
import { allOrders, placeOrder, status, userOrder, verifyOrder } from "../Controllers/orderController.js";

const router = Router();

router.route('/place-order').post(authController, placeOrder)
router.route('/verify').post(verifyOrder)
router.route('/orders').post(authController, userOrder)
router.route('/allorders').get(allOrders)
router.route('/status').post(status)

export default router;