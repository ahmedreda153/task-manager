import { NextFunction, Request, Response } from 'express';

import { IdSchema, TaskSchema, TaskUpdateSchema } from '@/types/tasks';
import ValidationError from '@/utils/validationError';
import * as taskService from '@/services/taskService';

export const getAllTasks = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = taskService.getAllTasks();
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
      throw new ValidationError('Invalid body', parsedBody.error);
    }
    const { title, description } = parsedBody.data;
    const task = taskService.createTask(title, description);
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
      throw new ValidationError('Invalid parameters', parsedParams.error);
    }
    const { id } = parsedParams.data;
    const task = taskService.getTaskById(Number(id));
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
      throw new ValidationError('Invalid parameters', parsedParams.error);
    }
    const { id } = parsedParams.data;
    const parsedBody = TaskUpdateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ValidationError('Invalid body', parsedBody.error);
    }
    const { title, description, completed } = parsedBody.data;
    const updatedTask = taskService.updateTask(Number(id), {
      title,
      description,
      completed,
    });
    res.status(200).json({ status: 'success', data: { task: updatedTask } });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ValidationError('Invalid parameters', parsedParams.error);
    }
    const { id } = parsedParams.data;
    taskService.deleteTask(Number(id));
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
