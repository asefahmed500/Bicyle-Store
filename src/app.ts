import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import connectDB from "./config/database";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Bicycle server running');
    res.send({
        success: true,
        message: "Bicycle server running"
    });
});


// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Error handling middleware
app.use(errorHandler); 

// 404 Not Found handler (ensure it's last)
app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint not found",
        success: false,
    });
});

// Database connection
connectDB();

export default app;
