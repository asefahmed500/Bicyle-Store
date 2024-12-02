import { Request, Response } from "express";
import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";
import { handleResponse, handleError } from "../utils/responseHandler";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product: productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return handleError(res, "Bicycle not found", null, 404);

    if (product.quantity < quantity) return handleError(res, "Insufficient stock", null, 400);

    product.quantity -= quantity;
    if (product.quantity === 0) product.inStock = false;
    await product.save();

    const totalPrice = product.price * quantity;
    const order = await Order.create({ email, product: productId, quantity, totalPrice });

    handleResponse(res, "Order created successfully", order);
  } catch (error) {
    handleError(res, "Failed to create order", error, 400);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('product'); // Populate product details
    handleResponse(res, "Orders fetched successfully", orders);
  } catch (error) {
    handleError(res, "Failed to fetch orders", error, 400);
  }
};
export const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;
    handleResponse(res, "Revenue calculated successfully", { totalRevenue });
  } catch (error) {
    handleError(res, "Failed to calculate revenue", error, 500);
  }
};
