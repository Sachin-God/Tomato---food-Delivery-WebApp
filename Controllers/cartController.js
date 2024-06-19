import User from "../database/Models/User.js";

export const addToCart = async (req, res) => {
    try {
        const userData = await User.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(req.body.userId, { cartData });
        
        res.status(200).json({
            success: true,
            message: "Added to Cart"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        const userData = await User.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const cartData = userData.cartData || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(req.body.userId, { cartData });
        
        res.status(200).json({
            success: true,
            message: "Removed from Cart"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const getCart = async (req, res, next) => {
    try {
        const userData = await User.findById(req.body.userId);
        const cartData = userData.cartData || {};
        res.status(200).json({success: true,cartData})
    } catch (error) {
        console.log(error)
        next(error)
    }
}