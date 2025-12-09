import z from 'zod';

export type TaskStatus = 'Active' | 'Inactive' | 'Pending';

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export const IdSchema = z.object({
  id: z.string({ message: 'Task ID is required and must be a string' }),
});

export const TaskSchema = z
  .object({
    title: z
      .string({ message: 'Title is required and must be a string' })
      .min(1, 'Title cannot be empty'),
    description: z
      .string({ message: 'Description is required and must be a string' })
      .min(1, 'Description cannot be empty'),
    status: z.enum(['Active', 'Inactive', 'Pending'], {
      error: "Status must be one of: 'Active', 'Inactive', or 'Pending'",
    }),
    assignee_id: z.number({
      message: 'Assignee ID is required and must be a number',
    }),
    project_id: z.number({
      message: 'Project ID is required and must be a number',
    }),
  })
  .strict();

export const TaskUpdateSchema = z
  .object({
    title: z
      .string({ message: 'Title must be a string' })
      .min(1, 'Title cannot be empty')
      .optional(),
    description: z
      .string({ message: 'Description must be a string' })
      .min(1, 'Description cannot be empty')
      .optional(),
    status: z
      .enum(['Active', 'Inactive', 'Pending'], {
        error: "Status must be one of: 'Active', 'Inactive', or 'Pending'",
      })
      .optional(),
    assignee_id: z
      .number({ message: 'Assignee ID must be a number' })
      .optional(),
    project_id: z.number({ message: 'Project ID must be a number' }).optional(),
  })
  .strict();

export type CreateTaskDTO = z.infer<typeof TaskSchema>;
export type UpdateTaskDTO = z.infer<typeof TaskUpdateSchema>;
