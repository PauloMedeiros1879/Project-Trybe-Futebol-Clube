import { NextFunction, Request, Response } from 'express';

export default function validate(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  if (!body.email || !body.password) throw new Error('missingFields');
  if (!body.password) throw new Error('missingFields');
  next();
}
