import { NextFunction, Request, Response } from 'express';

import AppError from '@/utils/appError';
import logger from '@/utils/logger';
import { handlePrismaError, isPrismaError } from '@/utils/prismaError';

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let error: AppError;
  if (isPrismaError(err)) {
    error = handlePrismaError(err);
  } else if (err instanceof AppError) {
    error = err;
  } else {
    error = new AppError(err.message || 'Something went wrong', 500);
  }

  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  logger.error(err);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

export default errorHandler;
