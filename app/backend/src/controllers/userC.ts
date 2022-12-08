import { NextFunction, Request, Response } from 'express';
import { recover } from '../middlewares/jwt';
import IUserLogin from '../interfaces/IUserLogin';
import userS from '../services/userS';

export default class UserController {
  constructor(private userService: userS) {}

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const token = await this.userService.login(req.body as IUserLogin);
      return res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }

  static async validated(req: Request, res: Response, _next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Mensagem de erro');
    const user = recover(authorization);
    const { role } = user.data;
    res.status(200).json({ role });
  }
}
