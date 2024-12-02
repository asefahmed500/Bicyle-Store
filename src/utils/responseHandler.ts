import { Response } from "express";

export const handleResponse = (res: Response, message: string, data: any = {}, status = 200) => {
  res.status(status).json({
    message,
    success: true,
    data,
  });
};

export const handleError = (res: Response, message: string, error: any, status = 500) => {
  res.status(status).json({
    message,
    success: false,
    error,
  });
};
