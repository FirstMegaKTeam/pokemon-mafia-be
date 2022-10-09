import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.status = status;
  }
}

// eslint-disable-next-line no-unused-vars
export const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);

  res
    .status(err instanceof ValidationError ? err.status : 500)
    .json({ Message: err instanceof ValidationError ? err.message : 'Sorry try later' });
};
