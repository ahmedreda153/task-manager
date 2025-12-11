import z from 'zod';

export type TaskStatus = 'Todo' | 'InProgress' | 'Review' | 'Done';

export interface ITask {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  assigneeId: string | null;
  projectId: string;
}

export const IdSchema = z.object({
  id: z.string({ message: 'Id is required and must be a string' }),
});

export const TaskSchema = z
  .object({
    title: z
      .string({ message: 'Title is required and must be a string' })
      .min(1, 'Title cannot be empty'),
    description: z
      .string({ message: 'Description must be a string' })
      .min(1, 'Description cannot be empty')
      .nullable()
      .optional(),
    status: z.enum(['Todo', 'InProgress', 'Review', 'Done'], {
      error: "Status must be one of: 'Todo', 'InProgress', 'Review', or 'Done'",
    }),
    assigneeId: z
      .uuid({ message: 'Assignee ID must be a valid UUID' })
      .nullable()
      .optional(),
    projectId: z.uuid({ message: 'Project ID must be a valid UUID' }),
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
      .nullable()
      .optional(),
    status: z
      .enum(['Todo', 'InProgress', 'Review', 'Done'], {
        error:
          "Status must be one of: 'Todo', 'InProgress', 'Review', or 'Done'",
      })
      .optional(),
    assigneeId: z
      .uuid({ message: 'Assignee ID must be a valid UUID' })
      .nullable()
      .optional(),
    projectId: z
      .uuid({ message: 'Project ID must be a valid UUID' })
      .optional(),
  })
  .strict();

export type CreateTaskDTO = z.infer<typeof TaskSchema>;
export type UpdateTaskDTO = z.infer<typeof TaskUpdateSchema>;
