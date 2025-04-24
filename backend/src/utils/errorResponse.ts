import { Response } from 'express';

export class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({
    success: false,
    error: message
  });
}; 