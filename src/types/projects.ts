import z from 'zod';

export interface IProject {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema = z.object({
  title: z.string({ message: 'Title is required and must be a string' }),
  description: z
    .string({ message: 'Description must be a string' })
    .nullable()
    .optional(),
});

export const ProjectUpdateSchema = z.object({
  title: z.string({ message: 'Title must be a string' }).optional(),
  description: z
    .string({ message: 'Description must be a string' })
    .nullable()
    .optional(),
});

export type CreateProjectDTO = z.infer<typeof ProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof ProjectUpdateSchema>;
