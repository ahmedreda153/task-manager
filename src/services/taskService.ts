import { CreateTaskDTO, ITask, UpdateTaskDTO } from '@/types/tasks';
import * as TaskModel from '@/models/taskModel';
import AppError from '@/utils/appError';

export const getAllTasks = async (): Promise<ITask[]> => {
  return await TaskModel.findAll();
};

export const createTask = async (data: CreateTaskDTO): Promise<ITask> => {
  return await TaskModel.create(data);
};

export const getTaskById = async (id: number): Promise<ITask> => {
  const task = await TaskModel.findById(id);
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return task;
};

export const updateTask = async (
  id: number,
  updates: UpdateTaskDTO,
): Promise<ITask> => {
  const task = await TaskModel.update(id, updates);
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return task;
};

export const deleteTask = async (id: number): Promise<void> => {
  const deleted = await TaskModel.remove(id);
  if (!deleted) {
    throw new AppError('Task not found', 404);
  }
};
