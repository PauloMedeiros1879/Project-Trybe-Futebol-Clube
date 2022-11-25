import { NextFunction, Request, Response } from 'express';
import { IUsers } from '../interfaces';
import userS from '../services/userS';

export default class UserController {
  constructor(private userService: userS) {}

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const token = await this.userService.login(req.body as IUsers);
      return res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }
}
