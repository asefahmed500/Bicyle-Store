import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { handleResponse, handleError } from "../utils/responseHandler";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    console.log("Request body:", req.body);  // Log the body
    handleResponse(res, "Bicycle created successfully", product);
  } catch (error) {
    handleError(res, "Failed to create bicycle", error, 400);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const filter = searchTerm
      ? { $or: [{ name: new RegExp(searchTerm, "i") }, { brand: new RegExp(searchTerm, "i") }, { type: searchTerm }] }
      : {};
    const products = await Product.find(filter);
    handleResponse(res, "Bicycles retrieved successfully", products);
  } catch (error) {
    handleError(res, "Failed to retrieve bicycles", error, 500);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return handleError(res, "Bicycle not found", null, 404);
    handleResponse(res, "Bicycle retrieved successfully", product);
  } catch (error) {
    handleError(res, "Failed to retrieve bicycle", error, 500);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) return handleError(res, "Bicycle not found", null, 404);
    handleResponse(res, "Bicycle updated successfully", product);
  } catch (error) {
    handleError(res, "Failed to update bicycle", error, 400);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) return handleError(res, "Bicycle not found", null, 404);
    handleResponse(res, "Bicycle deleted successfully", {});
  } catch (error) {
    handleError(res, "Failed to delete bicycle", error, 500);
  }
};
