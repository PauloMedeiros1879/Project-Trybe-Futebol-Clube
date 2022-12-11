import TeamsModel from '../database/models/teamsM';

export default class TeamS {
  constructor(
    private teamModel:
    typeof TeamsModel,
  ) {}

  async findAllTeams(): Promise<TeamsModel[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }
}
