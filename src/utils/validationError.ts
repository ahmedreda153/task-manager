import { ZodError } from 'zod';
import AppError from './appError';

class ValidationError extends AppError {
  public details: { path: string; message: string }[];

  constructor(message: string, details: ZodError) {
    super(message, 400);
    this.details = details.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
  }
}

export default ValidationError;
