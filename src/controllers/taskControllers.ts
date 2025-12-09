import { NextFunction, Request, Response } from 'express';

import { IdSchema, TaskSchema, TaskUpdateSchema } from '@/types/tasks';
import ValidationError from '@/utils/validationError';
import * as taskService from '@/services/taskService';

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = await taskService.getAllTasks();
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

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedBody = TaskSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ValidationError('Invalid body', parsedBody.error);
    }
    const task = await taskService.createTask(parsedBody.data);
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

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedParams = IdSchema.safeParse(req.params);

    if (!parsedParams.success) {
      throw new ValidationError('Invalid parameters', parsedParams.error);
    }
    const { id } = parsedParams.data;
    const task = await taskService.getTaskById(Number(id));
    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    const updatedTask = await taskService.updateTask(
      Number(id),
      parsedBody.data,
    );
    res.status(200).json({ status: 'success', data: { task: updatedTask } });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ValidationError('Invalid parameters', parsedParams.error);
    }
    const { id } = parsedParams.data;
    await taskService.deleteTask(Number(id));
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
