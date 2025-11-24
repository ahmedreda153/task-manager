import { ITask } from '@/types/tasks';

const tasks: ITask[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description 3',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default tasks;
