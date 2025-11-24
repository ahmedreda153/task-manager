import z from 'zod';

export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const IdSchema = z.object({
  id: z.string(),
});

export const TaskSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
  })
  .strict();

export const TaskUpdateSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    completed: z.boolean().optional(),
  })
  .strict();
