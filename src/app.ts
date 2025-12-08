import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import taskRouter from '@/routes/taskRoutes';
import AppError from '@/utils/appError';
import errorHandler from '@/middlewares/errorHandler';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.set('etag', false);
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/tasks', taskRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Route not found', 404));
});

app.use(errorHandler);

export default app;
