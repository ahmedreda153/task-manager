import { CreateProjectDTO, IProject, UpdateProjectDTO } from '@/types/projects';
import * as ProjectModel from '@/models/projectModel';
import AppError from '@/utils/appError';

export const getAllProjects = async (): Promise<IProject[]> => {
  return await ProjectModel.findAllProjects();
};

export const createProject = async (
  data: CreateProjectDTO,
): Promise<IProject> => {
  return await ProjectModel.createProject(data);
};

export const getProjectById = async (id: string): Promise<IProject> => {
  const project = await ProjectModel.findProjectById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  return project;
};

export const updateProject = async (
  id: string,
  updates: UpdateProjectDTO,
): Promise<IProject> => {
  return await ProjectModel.updateProject(id, updates);
};

export const deleteProject = async (id: string): Promise<void> => {
  await ProjectModel.deleteProject(id);
};
