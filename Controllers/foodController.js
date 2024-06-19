import Food from "../database/Models/Food.js";
import fs from 'fs';
import errorHandler from "../utils/errorHandler.js";

export const addFoodItems = async (req, res, next) => {
    let image_filename = `${req.file.filename}`
    const { name, description, price, category} = req.body

    const food = new Food({
        name,
        description,
        price,
        image: image_filename,
        category
    })

    try {
        await food.save()
        res.status(201).json({
            message : 'Food uploaded Successfully'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const allFoodList = async (req, res, next) => {
    try {
        const food_list = await Food.find()
        res.status(200).json(
            food_list
        )
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const removeFoodItem = async (req, res, next) => {
    try {
        const food = await Food.findById(req.body.id)
        if (!food) return next(errorHandler(404, 'item already Deleted'))
        fs.unlink(`uploads/${food.image}`, () => {})
        await Food.findByIdAndDelete(req.body.id)
        res.status(200).json({
            message : "Food item Deleted"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}