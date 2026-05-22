import { Response } from "express";

export const success = (
  res: Response,
  data: any,
  message = "Success"
) => {
  return res.json({
    message,
    data,
  });
};

export const error = (
  res: Response,
  message = "Error",
  status = 500
) => {
  return res.status(status).json({
    message,
  });
};