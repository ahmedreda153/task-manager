import database from '@/database/db';
import { CreateTaskDTO, ITask, UpdateTaskDTO } from '@/types/tasks';

export const findAll = async (): Promise<ITask[]> => {
  const pool = await database;
  const result = await pool.request().query(`
    SELECT *
    FROM Tasks
  `);
  return result.recordset as ITask[];
};

export const findById = async (id: number): Promise<ITask | null> => {
  const pool = await database;
  const result = await pool.request().input('id', id).query(`
      SELECT *
      FROM Tasks 
      WHERE id = @id
    `);
  if (result.recordset.length === 0) return null;

  return result.recordset[0] as ITask;
};

export const create = async (data: CreateTaskDTO): Promise<ITask> => {
  const pool = await database;
  const result = await pool
    .request()
    .input('title', data.title)
    .input('description', data.description)
    .input('status', data.status)
    .input('assignee_id', data.assignee_id)
    .input('project_id', data.project_id).query(`
      INSERT INTO Tasks (title, description, status, assignee_id, project_id)
      OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.status, INSERTED.assignee_id, INSERTED.project_id
      VALUES (@title, @description, @status, @assignee_id, @project_id)
    `);
  return result.recordset[0] as ITask;
};

export const update = async (
  id: number,
  updates: UpdateTaskDTO,
): Promise<ITask | null> => {
  const pool = await database;

  const setClauses: string[] = [];
  const request = pool.request().input('id', id);

  Object.entries(updates).forEach(([key, value]) => {
    setClauses.push(`${key} = @${key}`);
    request.input(key, value);
  });

  if (setClauses.length === 0) return await findById(id);

  const result = await request.query(`
    UPDATE Tasks 
    SET ${setClauses.join(', ')}
    OUTPUT INSERTED.*
    WHERE id = @id
  `);

  if (result.recordset.length === 0) return null;

  return result.recordset[0] as ITask;
};

export const remove = async (id: number): Promise<boolean> => {
  const pool = await database;
  const result = await pool.request().input('id', id).query(`
      DELETE FROM Tasks WHERE id = @id
    `);
  return result.rowsAffected[0] > 0;
};
