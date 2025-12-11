import prisma from '@/database/prismaDB';
import { CreateProjectDTO, IProject, UpdateProjectDTO } from '@/types/projects';

export const findAllProjects = async (): Promise<IProject[]> => {
  const projects = await prisma.project.findMany();
  return projects;
};

export const findProjectById = async (id: string): Promise<IProject | null> => {
  const project = await prisma.project.findUnique({ where: { id } });
  return project;
};

export const createProject = async (
  data: CreateProjectDTO,
): Promise<IProject> => {
  const project = await prisma.project.create({ data });
  return project;
};

export const updateProject = async (
  id: string,
  updates: UpdateProjectDTO,
): Promise<IProject> => {
  const project = await prisma.project.update({ where: { id }, data: updates });
  return project;
};

export const deleteProject = async (id: string): Promise<void> => {
  await prisma.project.delete({ where: { id } });
};
