import { NextFunction, Request, Response } from 'express';

import { IdSchema, TaskSchema, TaskUpdateSchema } from '@/types/tasks';
import tasks from '@/data/tasks';
import AppError from '@/utils/appError';

export const getAllTasks = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedBody = TaskSchema.safeParse(req.body);
    if (!parsedBody.success) {
      next(new AppError('Invalid body', 400));
      return;
    }
    const { title, description } = parsedBody.data;
    const task = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(task);
    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedParams = IdSchema.safeParse(req.params);

    if (!parsedParams.success) {
      next(new AppError('Invalid parameters', 400));
      return;
    }
    const { id } = parsedParams.data;
    const task = tasks.find((task) => task.id === Number(id));
    if (!task) {
      next(new AppError('Task not found', 404));
      return;
    }
    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      next(new AppError('Invalid parameters', 400));
      return;
    }
    const { id } = parsedParams.data;
    const parsedBody = TaskUpdateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      next(new AppError('Invalid body', 400));
      return;
    }
    const { title, description, completed } = parsedBody.data;
    const task = tasks.find((task) => task.id === Number(id));
    if (!task) {
      next(new AppError('Task not found', 404));
      return;
    }
    const updatedTask = {
      ...task,
      title: title ?? task.title,
      description: description ?? task.description,
      completed: completed ?? task.completed,
      updatedAt: new Date(),
    };
    tasks[task.id - 1] = updatedTask;
    res.status(200).json({ status: 'success', data: { task: updatedTask } });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      next(new AppError('Invalid parameters', 400));
      return;
    }
    const { id } = parsedParams.data;
    const task = tasks.find((task) => task.id === Number(id));
    if (!task) {
      next(new AppError('Task not found', 404));
      return;
    }
    tasks.splice(task.id - 1, 1);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
