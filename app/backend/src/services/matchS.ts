import TeamModel from '../database/models/teamsM';
import MatchModel from '../database/models/matchesM';

export default class MatchS {
  constructor(private matchModel: typeof MatchModel) {}

  async match(): Promise<MatchModel[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
