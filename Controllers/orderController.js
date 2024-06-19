import Order from "../database/Models/Order.js";
import User from "../database/Models/User.js";
import { Stripe } from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE)

export const placeOrder = async (req,res, next) => {
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save()
        await User.findByIdAndUpdate(req.body.userId,{cartData: {}})

        const line_items = req.body.items.map((item) => ({
            price_data :{
                currency: "inr",
                product_data:{
                    name: item.name
                },
                unit_amount: item.price*100*82.14
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data :{
                currency: "inr",
                product_data:{
                    name: "Delivery Price"
                },
                unit_amount: 2*100*82.14
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({
            success:true,
            success_url:session.url
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const verifyOrder = async (req, res, next) => {
    try {
        const { orderId, success} = req.body
        if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, {payment: true})
            res.status(200).json({
                success: true,
                message: 'Payment SuccessFull'
            })
        } else {
            await Order.findByIdAndDelete(orderId)
            res.status(424).json({
                success: false,
                message: 'Payment unsuccessfull'
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const userOrder = async(req, res, next) => {
    try {
        const orders = await Order.find({userId: req.body.userId})
        res.json({
            success: true, 
            order: orders
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const allOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
        res.status(200).json({
            success: true,
            orders : orders
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const status = async (req, res, next) => {
    try {
        const change = await Order.findByIdAndUpdate(req.body.orderid, {status : req.body.status})
        res.json({
            success : true
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}