import express from 'express'
import dotenv from 'dotenv';
import databaseConnection from './database/db.js';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js'
import foodRoutes from './Routes/foodRoutes.js'
import cartRoutes from './Routes/cartRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()
const port = process.env.PORT

databaseConnection();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
}))

app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
app.use('/images', express.static('uploads'))
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || '500';
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        statusCode,
        message,
        success: false
    })
})