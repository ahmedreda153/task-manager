import { ITask } from '@/types/tasks';
import tasks from '@/data/tasks';
import AppError from '@/utils/appError';

export const getAllTasks = (): ITask[] => {
  return tasks;
};

export const createTask = (title: string, description: string): ITask => {
  const task: ITask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(task);
  return task;
};

export const getTaskById = (id: number): ITask => {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return task;
};

export const updateTask = (
  id: number,
  updates: {
    title?: string;
    description?: string;
    completed?: boolean;
  },
): ITask => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    throw new AppError('Task not found', 404);
  }

  const task = tasks[taskIndex];
  const updatedTask: ITask = {
    ...task,
    title: updates.title ?? task.title,
    description: updates.description ?? task.description,
    completed: updates.completed ?? task.completed,
    updatedAt: new Date(),
  };

  tasks[taskIndex] = updatedTask;
  return updatedTask;
};

export const deleteTask = (id: number): void => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    throw new AppError('Task not found', 404);
  }
  tasks.splice(taskIndex, 1);
};
