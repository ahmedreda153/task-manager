import { Prisma } from '../../generated/prisma/client.js';
import AppError from './appError';

const PRISMA_ERROR_MAP: Record<
  string,
  { statusCode: number; message: string } | undefined
> = {
  P2025: { statusCode: 404, message: 'Record not found' },
  P2002: { statusCode: 409, message: 'Unique constraint violation' },
  P2003: { statusCode: 400, message: 'Foreign key constraint violation' },
  P2014: { statusCode: 400, message: 'Required relation violation' },
};

export const isPrismaError = (
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError;
};

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
): AppError => {
  const errorInfo = PRISMA_ERROR_MAP[error.code];

  if (errorInfo) {
    return new AppError(errorInfo.message, errorInfo.statusCode);
  }

  return new AppError('Database error', 500);
};
