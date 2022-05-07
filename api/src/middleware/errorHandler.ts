import { Request, Response } from 'express';
import { AppError } from '../exception/AppError';

const errorHandler = (err: AppError, req: Request, res: Response, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    message
  });
};

module.exports = errorHandler;
