import { NextFunction, Request, Response } from 'express';

type errInformation = {
  [key: string]: { message: string, code: number }
};

const errorsInformation: errInformation = {
  missingFields: { message: 'All fields must be filled', code: 400 },
  invalidLogin: { message: 'Incorrect email or password', code: 401 },
};

export default function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { message } = error;
  const errorType = errorsInformation[message];
  return res.status(errorType.code).json({ message: errorType.message });
}