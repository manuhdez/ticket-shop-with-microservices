import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  res.status(500).json([{ message: 'Something went wrong.' }]);
};
