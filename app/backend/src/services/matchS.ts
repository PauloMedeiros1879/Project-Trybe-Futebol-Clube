import TeamM from '../database/models/teamsM';
import MatchM from '../database/models/matchesM';

export default class MatchS {
  constructor(private matchModel: typeof MatchM) {}

  async match(): Promise<MatchM[]> {
    const matches = await this.matchModel.findAll({
      include: [
        {
          model: TeamM,
          as: 'teamHome',
          attributes:
          { exclude: ['id'] },
        },
        {
          model: TeamM,
          as: 'teamAway',
          attributes:
          { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  async matchFilter(inProgress: boolean): Promise<MatchM[]> {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        {
          model: TeamM,
          as: 'teamHome',
          attributes:
            { exclude: ['id'] },
        },
        {
          model: TeamM,
          as: 'teamAway',
          attributes:
            { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }
}
