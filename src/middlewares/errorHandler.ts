import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "An error occurred",
    success: false,
    error: err,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
