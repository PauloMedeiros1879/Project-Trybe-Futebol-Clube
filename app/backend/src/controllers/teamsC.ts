import { Request, Response } from 'express';
import TeamS from '../services/teamsS';

export default class TeamsC {
  constructor(private teamService: TeamS) {}

  async findAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.findAllTeams();
    return res.status(200).json(teams);
  }

  async findIdTeams(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const teams = await this.teamService.findIdTeams(Number(id));
    return res.status(200).json(teams);
  }
}
