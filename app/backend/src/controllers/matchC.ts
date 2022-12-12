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
    const whileProgress = inProgress === 'true';
    const matches = await this.matchService.matchFilter(whileProgress);
    return res.status(200).json(matches);
  }

  /*
  async matchCreate(req: Request, res: Response): Promise<Response> {
    const matches = await this.matchService.matchCreate(req.body);
    return res.status(201).json(matches);
  }
  */
}
