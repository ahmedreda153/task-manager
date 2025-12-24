import prisma from '@/database/prismaDB';
import { CreateTaskDTO, ITask, UpdateTaskDTO } from '@/types/tasks';

export const findAllTasks = async (): Promise<ITask[]> => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

export const findTaskById = async (id: string): Promise<ITask | null> => {
  const task = await prisma.task.findUnique({ where: { id } });
  return task;
};

export const createTask = async (data: CreateTaskDTO): Promise<ITask> => {
  const task = await prisma.task.create({ data });
  return task;
};

export const updateTask = async (
  id: string,
  updates: UpdateTaskDTO,
): Promise<ITask> => {
  const task = await prisma.task.update({ where: { id }, data: updates });
  return task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await prisma.task.delete({ where: { id } });
};
