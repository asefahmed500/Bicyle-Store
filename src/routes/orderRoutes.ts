import express from "express";
import { createOrder, calculateRevenue, getOrders } from "../controllers/orderController";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/revenue", calculateRevenue);

export default router;
