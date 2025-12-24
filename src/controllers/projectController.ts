import { NextFunction, Request, Response } from 'express';

import { ProjectSchema, ProjectUpdateSchema } from '@/types/projects';
import ValidationError from '@/utils/validationError';
import * as projectService from '@/services/projectService';
import { IdSchema } from '@/types/tasks';

export const getAllProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedBody = ProjectSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ValidationError('Invalid body', parsedBody.error);
    }
    const project = await projectService.createProject(parsedBody.data);
    res.status(201).json({
      status: 'success',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (
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
    const project = await projectService.getProjectById(id);
    res.status(200).json({
      status: 'success',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
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
    const parsedBody = ProjectUpdateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ValidationError('Invalid body', parsedBody.error);
    }
    const updatedProject = await projectService.updateProject(
      id,
      parsedBody.data,
    );
    res
      .status(200)
      .json({ status: 'success', data: { project: updatedProject } });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
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
    await projectService.deleteProject(id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
