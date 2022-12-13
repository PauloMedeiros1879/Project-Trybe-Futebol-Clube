import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) {}

  async leader(req: Request, res: Response) {
    const board = await this.leaderBoardService.leader();
    return res.status(200).json(board);
  }

  async leaderHome(req: Request, res: Response) {
    const board = await this.leaderBoardService.leaderHome();
    return res.status(200).json(board);
  }

  async leaderAway(req: Request, res: Response) {
    const board = await this.leaderBoardService.leaderAway();
    return res.status(200).json(board);
  }
}