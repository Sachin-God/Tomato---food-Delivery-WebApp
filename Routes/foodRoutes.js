import { Router } from "express";
import { addFoodItems, allFoodList, removeFoodItem } from "../Controllers/foodController.js";
import {upload} from "../utils/StorageMiddleware.js";

const router = Router()

router.route('/upload').post(upload.single("image") ,addFoodItems)
router.route('/allfood').get(allFoodList)
router.route('/delete-food-item').post(removeFoodItem)


export default router;