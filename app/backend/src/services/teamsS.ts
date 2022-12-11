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

  async findIdTeams(id: number): Promise<TeamsModel> {
    const teams = await this.teamModel.findByPk(id);
    if (!teams) throw new Error('Error');
    return teams;
  }
}
