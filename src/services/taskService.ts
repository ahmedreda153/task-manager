import { CreateTaskDTO, ITask, UpdateTaskDTO } from '@/types/tasks';
import * as TaskModel from '@/models/taskModel';
import AppError from '@/utils/appError';

export const getAllTasks = async (): Promise<ITask[]> => {
  return await TaskModel.findAllTasks();
};

export const createTask = async (data: CreateTaskDTO): Promise<ITask> => {
  return await TaskModel.createTask(data);
};

export const getTaskById = async (id: string): Promise<ITask> => {
  const task = await TaskModel.findTaskById(id);
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return task;
};

export const updateTask = async (
  id: string,
  updates: UpdateTaskDTO,
): Promise<ITask> => {
  return await TaskModel.updateTask(id, updates);
};

export const deleteTask = async (id: string): Promise<void> => {
  await TaskModel.deleteTask(id);
};
