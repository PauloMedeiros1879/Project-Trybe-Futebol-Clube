import { Request, Response } from 'express';
import MatchS from '../services/matchS';

export default class MatchC {
  constructor(private matchService: MatchS) {}

  async match(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (!inProgress) {
      const matches = await this.matchService.match();
      return res.status(200).json(matches);
    }
    return res.status(200).json({});
  }
}
